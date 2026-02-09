import { Icon, IconProps } from '@chakra-ui/react';
import { AssetProps } from '../type';

export const BackArrowIcon = ({
  boxSize = '48px',
  color = '#27272A',
  background = '#F4F4F5',
  ...rest
}: AssetProps) => {
  return (
    <Icon
      width={boxSize}
      height={boxSize}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <rect width='48' height='48' rx='24' fill={`${background}`} />
      <path
        d='M32.25 24H15.75'
        stroke={`${color}`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M22.5 17.25L15.75 24L22.5 30.75'
        stroke={`${color}`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  );
};
