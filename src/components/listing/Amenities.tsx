import { Center, HStack, Text } from '@chakra-ui/react';
import { LuDumbbell, LuSchool, LuUtensils } from 'react-icons/lu';

import { fixIcon } from '../../utils/helpers/fix-icon';

const DumbbellIcon = fixIcon(LuDumbbell);
const SchoolIcon = fixIcon(LuSchool);
const UtensilsIcon = fixIcon(LuUtensils);

export const Amenities = () => {
  return (
    <HStack
      width='100%'
      justifyContent='flex-start'
      alignItems='center'
      flexWrap='wrap'
      gap='16px'
    >
      {[
        {
          title: 'Fully equipped kitchen',
          Icon: UtensilsIcon
        },
        { title: 'Gym', Icon: DumbbellIcon },
        { title: 'School', Icon: SchoolIcon }
      ].map(({ title, Icon }, index) => (
        <Center gap='8px' color='#71717A' key={index}>
          <Center boxSize='20px' minWidth='20px' fontSize='20px'>
            <Icon />
          </Center>
          <Text
            fontSize='14px'
            fontWeight='400'
            lineHeight='20px'
            letterSpacing='-1.1%'
            whiteSpace='nowrap'
          >
            {title}
          </Text>
        </Center>
      ))}
    </HStack>
  );
};
