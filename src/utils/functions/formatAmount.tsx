'use client';

import countries from '@/constants/country';
import HoverText from '@/uilib/hoverOnText';
import { HStack, Text } from '@chakra-ui/react';
interface FormatToColorfulCurrencyProps {
  amount: number | string;
  curr?: string;
  decimalStyle?: Record<string, unknown>;
  condition?: boolean;
  excludeCurrency?: boolean;
  wrapper?: Record<string, unknown>;
  lens?: number;
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string;
  [key: string]: unknown;
}

export const FormatToColorfulCurrency = ({
  amount,
  curr = 'naira',
  decimalStyle,
  excludeCurrency = false,
  wrapper,
  lens = 17,
  fontSize,
  fontWeight,
  lineHeight = '100%',
  ...rest
}: FormatToColorfulCurrencyProps) => {
  if (typeof window === 'undefined') return null;

  const defaultCurrency =
    (localStorage.getItem('baseCurrency') &&
      localStorage.getItem('baseCurrency') !== 'undefined' &&
      JSON.parse(JSON.stringify(localStorage.getItem('baseCurrency')!))) ||
    'USD';
  const defaultCountry =
    (localStorage.getItem('baseCountry') &&
      localStorage.getItem('baseCurrency') !== 'undefined' &&
      (() => {
        try {
          return JSON.parse(
            JSON.stringify(localStorage.getItem('baseCountry')!)
          );
        } catch {
          return 'United States Of America';
        }
      })()) ||
    'United States Of America';
  const locale =
    countries.find((item: { name: string }) => item.name === defaultCountry)
      ?.locale || 'en-US';

  const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: defaultCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const parts = formatter.formatToParts(value);
    const result: string[] = [];
    parts.forEach((item) => {
      if (item.type === 'currency') result[0] = item.value;
      else if (item.type === 'integer' || item.type === 'group')
        result[1] = item.value;
    });
    const integerPart = `${result[0] ?? ''}${result[1] ?? ''}`;
    const decimalPart = parts.find((p) => p.type === 'fraction')?.value || '00';
    const decimalSeparator =
      parts.find((p) => p.type === 'decimal')?.value || '.';
    let formattedString = formatter.format(value);
    if (excludeCurrency) {
      formattedString = formattedString.replace(/^[^\d]+/, '').trim();
    }
    return [
      integerPart,
      decimalPart,
      decimalSeparator,
      formattedString
    ] as const;
  };

  const escapeRegExp = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  try {
    const formattedAmount =
      amount && typeof amount === 'string'
        ? Number(amount.replace(/,/g, ''))
        : Number(amount?.toString()?.replace(/,/g, ''));
    if (Number.isNaN(formattedAmount)) throw new Error('Invalid amount');

    const [, , decimalSeparator, formattedString] =
      formatCurrency(formattedAmount);
    const separatorRegex = new RegExp(
      `(${escapeRegExp(decimalSeparator)}\\d{2})`
    );
    const parts = formattedString.split(separatorRegex).filter(Boolean);
    const decimalSeparatorRegex = new RegExp(
      `^${escapeRegExp(decimalSeparator)}\\d{2}$`
    );

    return (
      <HStack alignItems='center' spacing='none' {...wrapper}>
        <HoverText
          text={
            formattedString.length > lens
              ? formattedString
              : ((parts?.[0] as string) ?? '')
          }
          lens={lens}
          as='span'
          pr='0px'
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
          {...rest}
        />
        {formattedString.length <= lens && (
          <Text
            as='span'
            color='lightgrey'
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={lineHeight}
            {...decimalStyle}
          >
            {parts?.[1]}
          </Text>
        )}
      </HStack>
    );
  } catch {
    const [, , decimalSeparator, formattedString] = formatCurrency(0);
    const separatorRegex = new RegExp(
      `(${escapeRegExp(decimalSeparator)}\\d{2})`
    );
    const parts = formattedString.split(separatorRegex).filter(Boolean);
    const decimalSeparatorRegex = new RegExp(
      `^${escapeRegExp(decimalSeparator)}\\d{2}$`
    );
    return (
      <Text
        w='fit-content'
        fontSize={fontSize}
        fontWeight={fontWeight}
        lineHeight={lineHeight}
        {...rest}
      >
        {parts.map((part, index) =>
          decimalSeparatorRegex.test(part) ? (
            <Text
              key={index}
              as='span'
              color='lightgrey'
              fontSize={fontSize}
              fontWeight={fontWeight}
              lineHeight={lineHeight}
              {...decimalStyle}
            >
              {part}
            </Text>
          ) : (
            <Text key={index} as='span'>
              {part}
            </Text>
          )
        )}
      </Text>
    );
  }
};
