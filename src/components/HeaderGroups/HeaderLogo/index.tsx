import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { IconButton, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import projectLogo from '../../../assets/images/react.svg';
import { IRootState } from '../../../store';

export interface IHeaderLogo {
    sidebarToggle: boolean;
    sidebarHover: boolean;
}

const HeaderLogo = (props: IHeaderLogo): React.ReactElement => {
  const { sidebarToggle, sidebarHover } = props;
  return (
    <>
      <div
        className={clsx('app-header-logo', {
          'app-header-logo-close': sidebarToggle,
          'app-header-logo-open': sidebarHover
        })}>
        <Box
          className="header-logo-wrapper"
          title="Warehouse Manager Dashboard">
          <Link to="/DashboardDefault" className="header-logo-wrapper-link">
            <IconButton
              color="primary"
              size="medium"
              className="header-logo-wrapper-btn">
              <img
                className="app-header-logo-img"
                alt="Warehouse Manager Dashboard"
                src={projectLogo}
              />
            </IconButton>
          </Link>
          <Box className="header-logo-text">Warehouse</Box>
        </Box>
      </div>
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  sidebarToggle: state.theme.sidebarToggle,
  sidebarHover: state.theme.sidebarHover
});

export default connect(mapStateToProps)(HeaderLogo);
