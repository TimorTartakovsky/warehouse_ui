import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core';
import typography from './typography';

// const vars = require('../../assets/core/_variables-mui.scss');
// @ts-ignore
// import vars from '!!sass-vars-to-js-loader!../../assets/core/_variables-mui.scss';

const options = {
  palette: {
    primary: {
      main: '#5383ff',
    },
    grey: {
      300: '#fefefe',
      A100: '#f8f9ff'
    },
    secondary: {
      main: '#3d4977'
    },
    error: {
      main: '#f83245'
    },
    success: {
      main: '#1bc943'
    },
    warning: {
      main: '#f4772e'
    },
    helpers: {
      main: 'rgba(25, 46, 91, .035)'
    },
    contrastThreshold: 3,
    tonalOffset: 0.1
  },
  shape: {
    borderRadius: '0.5rem'
  },
  overrides: {
    MuiButton: {
      text: {
        paddingLeft: '14px',
        paddingRight: '14px'
      },
      containedSizeSmall: {
        paddingLeft: '14px',
        paddingRight: '14px'
      },
      root: {
        textTransform: 'none',
        fontWeight: 'normal'
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#070919',
        padding: '8px 16px',
        fontSize: '13px'
      },
      arrow: {
        color: '#070919',
      }
    }
  },
  typography
}

const MuiTheme: Theme = createMuiTheme(options as any);

export default MuiTheme;
