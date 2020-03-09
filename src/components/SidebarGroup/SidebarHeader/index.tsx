import React, { Dispatch } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Hidden, IconButton, AppBar, Box, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  setSidebarToggle,
  setSidebarToggleMobile
} from '../../../store/theme-options';
import projectLogo from '../../../assets/images/react.svg';

import HeaderLogo from '../../HeaderGroups/HeaderLogo';
import HeaderDots from '../../HeaderGroups/HeaderDots';
import HeaderDrawer from '../../HeaderGroups/HeaderDrawer';
import HeaderUserbox from '../../HeaderGroups/HeaderUserbox';
import HeaderSearch from '../../HeaderGroups/HeaderSearch';
import HeaderMenu from '../../HeaderGroups/HeaderMenu';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { IRootState } from '../../../store';

export interface ISidebarHeaderProps {
  headerShadow?: boolean;
  headerFixed?: boolean;
  sidebarToggle?: boolean;
  isCollapsedLayout?: boolean;
  sidebarToggleMobile?: boolean;
  setSidebarToggleMobile?: (p: boolean) => void
  setSidebarToggle?: (p: boolean) => void; 
}

const SidebarHeader = (props: ISidebarHeaderProps) => {
  const toggleSidebar = () => {
    setSidebarToggle && setSidebarToggle(!sidebarToggle);
  };

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile && setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile,
    setSidebarToggle,
    sidebarToggle
  } = props;

  return (
    <>
      <AppBar
        color="secondary"
        className={clsx('app-header', {
          'app-header-collapsed-sidebar': props.isCollapsedLayout
        })}
        position={headerFixed ? 'fixed' : 'absolute'}
        elevation={headerShadow ? 11 : 3}>
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box className="app-header-toolbar">
          <Hidden lgUp>
            <Box
              className="app-logo-wrapper"
              title="Carolina React Admin Dashboard with Material-UI PRO">
              <Link to="/DashboardDefault" className="app-logo-link">
                <IconButton
                  color="primary"
                  size="medium"
                  className="app-logo-btn">
                  <img
                    className="app-logo-img"
                    alt="Carolina React Admin Dashboard with Material-UI PRO"
                    src={projectLogo}
                  />
                </IconButton>
              </Link>
              <Hidden smDown>
                <Box className="app-logo-text">Warehouse</Box>
              </Hidden>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box className="d-flex align-items-center">
              {!props.isCollapsedLayout && (
                <Box
                  className={clsx('btn-toggle-collapse', {
                    'btn-toggle-collapse-closed': sidebarToggle
                  })}>
                  <Tooltip title="Toggle Sidebar" placement="right">
                    <IconButton
                      color="inherit"
                      onClick={toggleSidebar}
                      size="medium"
                      className="btn-inverse">
                      {sidebarToggle ? (
                        <MenuRoundedIcon />
                      ) : (
                        <MenuOpenRoundedIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              <HeaderSearch />
              <HeaderMenu />
            </Box>
          </Hidden>
          <Box className="d-flex align-items-center">
            <HeaderDots />
            <HeaderUserbox />
            <HeaderDrawer />
            <Box className="toggle-sidebar-btn-mobile">
              <Tooltip title="Toggle Sidebar" placement="right">
                <IconButton
                  color="inherit"
                  onClick={toggleSidebarMobile}
                  size="medium">
                  {sidebarToggleMobile ? (
                    <MenuOpenRoundedIcon />
                  ) : (
                    <MenuRoundedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  headerShadow: state.theme.headerShadow,
  headerFixed: state.theme.headerFixed,
  sidebarToggleMobile: state.theme.sidebarToggleMobile,
  sidebarToggle: state.theme.sidebarToggle
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setSidebarToggle: (enable: boolean): void => dispatch(setSidebarToggle(enable)),
  setSidebarToggleMobile: (enable: boolean): void => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader);
