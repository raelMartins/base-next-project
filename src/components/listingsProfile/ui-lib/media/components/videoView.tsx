import {IconButton} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {FiPause, FiPlay} from 'react-icons/fi';
import {VideoViewProps} from '../type';

const VideoView = ({
  setVolume,
  videoRef,
  setDuration,
  setIsPlaying,
  setCurrentTime,
  srcObj,
  isPlaying,
}: VideoViewProps) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(video.volume);
    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [videoRef]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };
  const updateTime = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleLoad = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
    updateTime();
  };
  return (
    <>
      <video
        ref={videoRef}
        src={srcObj?.url}
        onLoadedData={handleLoad}
        onTimeUpdate={updateTime}
        style={{
          width: '100%',
          minWidth: '70%',
          height: '100%',
          maxHeight: '600px',
          margin: '0px auto',
          background: '#e4e4e7',
          objectFit: 'cover',
        }}
      />
      <IconButton
        aria-label={isPlaying ? 'Pause' : 'Play'}
        icon={isPlaying ? <FiPause /> : <FiPlay />}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        size="lg"
        borderRadius="full"
        bg="whiteAlpha.200"
        color="white"
        opacity={1}
        transition="opacity 0.3s"
        onClick={togglePlay}
        _hover={{bg: 'whiteAlpha.300'}}
        fontSize="24px"
        w="60px"
        h="60px"
      />
    </>
  );
};

export default VideoView;
