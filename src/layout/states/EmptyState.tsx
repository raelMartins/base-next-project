import { GeneralFeedbackIcon } from '@/components/assets/navbar/sidemenu';
import { Text, VStack } from '@chakra-ui/react';
import { ReactElement } from 'react';

export const EmptyState = ({
  title = 'Nothing Found',
  description = 'No results found',
  icon = <GeneralFeedbackIcon boxSize={`36px`} />,
  height = '400px'
}: {
  title?: string;
  description?: string;
  icon?: ReactElement;
  height?: string;
}) => {
  return (
    <VStack
      w={`100%`}
      p={`42px`}
      height={height}
      justify={'center'}
      gap={`4px`}
    >
      {icon}
      <Text fontSize={`16px`} fontWeight={`600`} textTransform={`uppercase`}>
        {title}
      </Text>
      <Text fontSize={`14px`} fontWeight={`400`}>
        {description}
      </Text>
    </VStack>
  );
};
