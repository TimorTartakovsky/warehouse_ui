import React from 'react';
import IconButton, { IIconButton } from './IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

export enum EIconButtonGroupType {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

const useStyles = makeStyles((theme) => ({
    rootHorizontal: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    rootVertical: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
}));

export interface IIconButtonGroup {
    id: string;
    type: EIconButtonGroupType;
    buttons: IIconButton[];
    groupColor?: 'inherit' | 'primary' | 'secondary' | 'default';
}


export const IconButtonGroup = (props: IIconButtonGroup) => {
    const classes = useStyles();

    return (
        <div
            className={props.type === EIconButtonGroupType.horizontal ? classes.rootHorizontal : classes.rootVertical}
        >
            <ButtonGroup
                orientation={props.type === EIconButtonGroupType.horizontal ? 'horizontal' : 'vertical'}
                color={props.groupColor || 'primary'}
                aria-label={props.id}
            >
                {
                    props.buttons.map((b: IIconButton, i: number) => (
                        <IconButton key={i}  {...b}/>
                    ))
                }
            </ButtonGroup>

        </div>
    )
}

export {default as IconButton } from './IconButton';

