import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1F1F1F',
    },
    secondary: {
      main: '#DB2D37',
    },
    icons: {
      main: '#ffffff'
    }
  },
  breakpoints: {
    values: {
      mobile: 460,
      tablet: 600,
      laptop: 900,
      large: 1200
    }
  }
});

export default theme

