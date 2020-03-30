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
        <Typography 
                style={{ width: props.length || '100px' }}
                align="left"
                noWrap={props.noWrap || true}
                color="textPrimary"
                variant="inherit"
                display="block"
        >
            { props.children }
        </Typography>
      </ThemeProvider>
    )
}
