import { Icon } from '@chakra-ui/react';
import { AssetProps } from '../type';

export const PaymentReceivedIcon = ({
  boxSize = '40px',
  color = '#16A34A',
  background = '#DCFCE7',
  ...rest
}: AssetProps) => {
  return (
    <Icon
      width={boxSize}
      height={boxSize}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <rect width='40' height='40' rx='20' fill={`${background}`} />
      <path
        d='M20 13.125V26.875'
        stroke={`${color}`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.375 21.25L20 26.875L25.625 21.25'
        stroke={`${color}`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  );
};

export const OutstandingPaymentIcon = ({
  boxSize = '40px',
  color = '#EA580C',
  background = '#FFEDD5',
  ...rest
}: AssetProps) => {
  return (
    <Icon
      width={boxSize}
      height={boxSize}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <rect width='40' height='40' rx='20' fill={`${background}`} />
      <path
        d='M16.875 17.5H13.125V13.75'
        stroke={`${color}`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.125 17.5L15.3344 15.2906C16.6139 14.0112 18.3462 13.2877 20.1556 13.2772C21.9651 13.2667 23.7057 13.9699 25 15.2344'
        stroke={`${color}`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.125 22.5H26.875V26.25'
        stroke={`${color}`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M26.875 22.5L24.6656 24.7094C23.3861 25.9888 21.6538 26.7123 19.8444 26.7228C18.0349 26.7333 16.2943 26.0301 15 24.7656'
        stroke={`${color}`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  );
};
