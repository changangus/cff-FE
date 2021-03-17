import { createMuiTheme } from "@material-ui/core";
import { teal, grey } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[900],
    },
    secondary: {
      main: grey[500],
      contrastText: '#000000'
    }
  }
});