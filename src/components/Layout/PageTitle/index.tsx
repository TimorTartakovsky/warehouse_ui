import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import { connect } from 'react-redux';
import { IRootState } from '../../../store';
import { NavLink } from 'react-router-dom';

export interface ITabPanel {
    children: React.ReactElement | React.ReactElement[],
    index: number,
    value: number,
}

const TabPanel = (props: ITabPanel) => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && <Box p={4}>{children}</Box>}
    </Typography>
  );
}

export interface IPageTitleProps {
    pageTitleStyle?: string;
    pageTitleBackground?: string;
    pageTitleShadow?: boolean;
    pageTitleBreadcrumb?: boolean;
    pageTitleIconBox?: boolean;
    pageTitleDescription?: boolean;
    titleHeading?: string;
    titleDescription?: string;
    customComponent?: React.ReactElement | React.ReactElement[];
}

const PageTitle = (props: IPageTitleProps) => {
  const {
    pageTitleStyle = '',
    pageTitleBackground = '',
    pageTitleShadow = false,
    pageTitleIconBox = false,
    pageTitleDescription = false,
  } = props;

  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);
  
  return (
    <Fragment>
      <Paper
        square
        elevation={pageTitleShadow ? 6 : 2}
        className={clsx('app-page-title', pageTitleStyle, pageTitleBackground)}>
        <div>
          <Box className="app-page-title--first">
            {pageTitleIconBox && (
              <Paper
                elevation={2}
                className="app-page-title--iconbox d-70 d-flex align-items-center bg-secondary justify-content-center">
                <DashboardTwoToneIcon />
              </Paper>
            )}
            <div className="app-page-title--heading">
              <h1>{props.titleHeading}</h1>
              {pageTitleDescription && (
                <div className="app-page-title--description">
                  {props.titleDescription}
                </div>
              )}
            </div>
          </Box>
        </div>

        {!open && (
          <div className="d-flex align-items-center">       
            {
              // buttons && buttons.map((b: IPageTitleButtons) => (
              //   <NavLink
              //     key={b.key}
              //     to={b.link || ''}
              //   >
              //     <Button style={{ marginLeft: '5px' }} variant="contained">
              //       <span className="d-none d-xl-block">{ b.label }</span>
              //       <span className="btn-wrapper--icon d-block d-xl-none">
              //         { b.label }
              //       </span>
              //     </Button>
              //   </NavLink>
              // ))
            }   
          </div>
        )}
      </Paper>
    </Fragment>
  );
}
const mapStateToProps = (state: IRootState) => ({
  pageTitleStyle: state.theme.pageTitleStyle,
  pageTitleBackground: state.theme.pageTitleBackground,
  pageTitleShadow: state.theme.pageTitleShadow,
  pageTitleBreadcrumb: state.theme.pageTitleBreadcrumb,
  pageTitleIconBox: state.theme.pageTitleIconBox,
  pageTitleDescription: state.theme.pageTitleDescription
});

export default connect(mapStateToProps)(PageTitle);