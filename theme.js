// styles/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#cc1414', // Red
    },
    secondary: {
      main: '#FFFFFF', // White
    },
    text: {
      primary: '#000000', // Black
    },
    link: {
      primary: '#000000', // Black
    },
  },
});

export default theme;
