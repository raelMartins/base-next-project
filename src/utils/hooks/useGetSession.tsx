import { getSession } from '@/api/utils/sessionmanagers';
import { useState, useEffect } from 'react';

const useGetSession = (keyOrKeys: string) => {
  const [sessionData, setSessionData] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [refetchKey, setRefetchKey] = useState(
    `${Math.round(Math.random() * 1000)}-${Date.now()}`
  );

  useEffect(() => {
    const fetchSessions = async () => {
      if (Array.isArray(keyOrKeys)) {
        const sessions: any = {};

        for (const key of keyOrKeys) {
          const data = await getSession(key);
          sessions[key] = data;
        }

        setSessionData(sessions);
        setFetching(false);
      } else {
        const data = await getSession(keyOrKeys);
        setSessionData(data);
        setFetching(false);
      }
    };

    fetchSessions();
  }, [refetchKey]);

  return {
    sessionData,
    fetching,
    refetch: () => {
      setRefetchKey(`${Math.round(Math.random() * 1000)}-${Date.now()}`);
    }
  };
};

export default useGetSession;
