import React from 'react';
import { Link } from 'react-router-dom';
import { Hidden, IconButton, AppBar, Box, Tooltip } from '@material-ui/core';
import projectLogo from '../../../assets/images/react.svg';
import clsx from 'clsx';
import HeaderLogo from '../Logo';
import HeaderSearch from '../HeaderSearch';
import HeaderMenu from '../HeaderMenu';
import HeaderDots from '../HeaderDots';
import HeaderUserbox from '../HeaderUserbox';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import HeaderDrawer from '../HeaderDrawer';
// import { connect } from 'react-redux';

export interface IHeader {
    headerShadow?: boolean;
    headerFixed?: boolean;
    sidebarToggleMobile?: boolean;
    isCollapsedLayout?: boolean;
    setSidebarToggleMobile?: (a: boolean) =>void;
    setSidebarToggle?: (a: boolean) =>void;
    sidebarToggle?: () =>void;
}
const Header = (props: IHeader) => {
    const {
        headerShadow,
        headerFixed,
        sidebarToggleMobile,
        isCollapsedLayout,
        setSidebarToggleMobile,
        setSidebarToggle,
        sidebarToggle
      } = props;
      const toggleSidebar = () => {
        setSidebarToggle && setSidebarToggle(!sidebarToggle);
      };
    
      const toggleSidebarMobile = () => {
        setSidebarToggleMobile && setSidebarToggleMobile(!sidebarToggleMobile);
      };
    return (
        <>
        <AppBar
          color="secondary"
          className={clsx('app-header', {
            'app-header-collapsed-sidebar': isCollapsedLayout
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
                  <Box className="app-logo-text">Carolina</Box>
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
    )
}

export default Header;