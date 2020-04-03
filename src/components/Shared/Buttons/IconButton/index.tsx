import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export interface IIconButton {
    btnType: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | React.ReactElement;
    text?: string;
    isDisabled?: boolean;
    children?: React.ReactElement;
    onButtonClicked: (e: any, btnType: string) => void 
} 

const IconButton = (props: IIconButton) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={props.icon}
        onClick={e => props.onButtonClicked(e, props.btnType)}
        disabled={props.isDisabled}
      >
        {props.text || props.children}
      </Button>
    </div>
  );
}

export default IconButton;

/** <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
      <Button
        variant="contained"
        disabled
        color="secondary"
        className={classes.button}
        startIcon={<KeyboardVoiceIcon />}
      >
        Talk
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button> */