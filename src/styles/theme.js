import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#ff1744',
    },
  },
  typography: {
    useNextVariants: true,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 960,
      xl: 1280,
    },
  },
});

export default theme;
