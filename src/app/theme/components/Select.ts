import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import {colors} from '../foundations/colors';
import typography from '../foundations/typography';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    borderColor: "secondary",
    borderWidth: '1px',
    borderRadius: 'md',
    paddingX: '1rem',
    paddingY: '0.5rem',
    fontSize: typography.fontSizes.sm,
    color: "textPrimary",
    border: "1px solid secondary",
    _focus: {
      borderColor: "textPrimary",
    },
    _disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      color: "disabled",
    },
    'option': {
        background: 'bg',
        color: "textPrimary",
        padding: '0.5rem 1rem',
    },
  },
  menu: {
    borderColor: "secondary",
    borderWidth: '1px',
    borderRadius: 'md',
    width: '100%',
    marginTop: '2px',
    boxShadow: 'md',
    display: 'flex',
  }
});

const SelectStyles = defineMultiStyleConfig({ baseStyle });

export default SelectStyles;
