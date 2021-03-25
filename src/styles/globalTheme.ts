import { createMuiTheme } from "@material-ui/core";
import { grey, orange } from "@material-ui/core/colors";

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
    button: {
      fontSize: 20
    },
    h6: {
      fontSize: 24
    }
  }
});

theme.props = {
  MuiFormControl: {
    margin: "normal",
  }
};

theme.overrides = {
  MuiButton: {
    containedSecondary: {
      
    },
    containedPrimary: {
      
    }
  },
  MuiLink: {
    root: {
      fontFamily: "Quicksand",
      fontSize: 18
    }
  }
}