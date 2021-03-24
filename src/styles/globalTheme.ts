import { createMuiTheme } from "@material-ui/core";
import { teal, grey, orange } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#38786a",
      main: "#004c3f",
      dark: "#002419"
    },
    secondary: {
      main: grey[700],
      contrastText: '#FFFFFF'
    },
    error: {
      main: orange[700]
    }
  },
  typography: {
    fontFamily: "Quicksand",
    fontSize: 24,
  }
});

theme.props = {
  MuiFormControl: {
    margin: "normal",
  },
};