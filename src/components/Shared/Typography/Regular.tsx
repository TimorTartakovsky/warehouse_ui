import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 16,
      },
    },
});

export const RegularTypography = (props: any)  => {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="subtitle1">
            { props.children }
        </Typography>
      </ThemeProvider>
    )
}
