import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#CF2D39",
    },
    secondary: {
      main: "#000",
    },
    secondary_2: {
      main: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

// theme = createTheme(theme, {
//     palette: {
//       info: {
//         main: theme.palette.secondary.main,
//       },
//     },
//   });

export default theme;
