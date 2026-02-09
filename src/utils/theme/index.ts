import { extendTheme } from '@chakra-ui/react';

// Chakra default breakpoints: sm=30em, md=48em, lg=62em, xl=80em, 2xl=96em
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

// 2. Define your specific theme overrides if needed
export const libraryTheme = extendTheme({
  breakpoints,
  fonts: {
    heading: 'var(--font-inter), sans-serif',
    body: 'var(--font-inter), sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        outline: `none`,
        _hover: {
          opacity: `1`
        },
        _active: {
          opacity: `1`
        },
        _focus: {
          outline: `none`
        },
        _focusVisible: {
          outline: `none`
        }
      }
    },
    Input: {
      baseStyle: {
        outline: `none`,
        _hover: {
          outline: `1px solid #000000`
        },
        _active: {
          outline: `1px solid #000000`
        },
        _focus: {
          outline: `1px solid #000000`
        },
        _focusVisible: {
          outline: `1px solid #000000`
        }
      }
    }
  }
});
