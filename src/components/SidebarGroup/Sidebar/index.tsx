import React, { Dispatch } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Hidden, Drawer, Paper } from '@material-ui/core';

import { connect } from 'react-redux';

import SidebarHeader from '../SidebarHeader';
import SidebarUserbox from '../SidebarUserbox';
import SidebarMenu from '../SidebarMenu';
import SidebarFooter from '../SidebarFooter';

import navItems from './navItems';

import {
  setSidebarToggleMobile,
  setSidebarHover,
  setSidebarToggle,
  setSidebarFooter,
  setSidebarUserbox
} from '../../../store/theme-options';
import { IRootState } from '../../../store';
import { IActionPayload, IActionBasic } from '../../../actions';

export interface ISidebarProps {
  setSidebarToggleMobile: (p: boolean) => void;
  setSidebarHover: (p: boolean) => void;
  sidebarToggleMobile: boolean;
  sidebarFixed: boolean;
  sidebarHover: boolean;
  sidebarToggle: boolean;
  sidebarUserbox: boolean;
  sidebarShadow: boolean;
  sidebarFooter: boolean;
}

const Sidebar = (props: ISidebarProps) => {
  const {
    setSidebarToggleMobile,
    sidebarToggleMobile,
    sidebarFixed,
    sidebarHover,
    setSidebarHover,
    sidebarToggle,
    sidebarUserbox,
    sidebarShadow,
    sidebarFooter
  } = props;

  const toggleHoverOn = () => setSidebarHover(true);
  const toggleHoverOff = () => setSidebarHover(false);

  const closeDrawer = () => setSidebarToggleMobile(!sidebarToggleMobile);

  const sidebarMenuContent = (
    <div
      className={clsx({
        'app-sidebar-nav-close': sidebarToggle && !sidebarHover
      })}>
      {navItems.map(list => (
        <SidebarMenu
          component="div"
          key={list.label}
          pages={list.content}
          title={list.label}
        />
      ))}
    </div>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggleMobile}
          onClose={closeDrawer}
          variant="temporary"
          elevation={4}
          className="app-sidebar-wrapper-lg">
          <SidebarHeader />
          <PerfectScrollbar>
            {sidebarUserbox && <SidebarUserbox />}
            {sidebarMenuContent}
            {sidebarFooter && <SidebarFooter />}
          </PerfectScrollbar>
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Paper
          onMouseEnter={toggleHoverOn}
          onMouseLeave={toggleHoverOff}
          className={clsx('app-sidebar-wrapper', {
            'app-sidebar-wrapper-close': sidebarToggle,
            'app-sidebar-wrapper-open': sidebarHover,
            'app-sidebar-wrapper-fixed': sidebarFixed
          })}
          square
          open={sidebarToggle}
          elevation={sidebarShadow ? 11 : 3}
        >
          <SidebarHeader />
          <div
            className={clsx({
              'app-sidebar-menu': sidebarFixed,
              'app-sidebar-collapsed': sidebarToggle && !sidebarHover
            })}>
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              {sidebarUserbox && <SidebarUserbox />}
              {sidebarMenuContent}
              {sidebarFooter && <SidebarFooter />}
            </PerfectScrollbar>
          </div>
        </Paper>
      </Hidden>
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  sidebarFixed: state.theme.sidebarFixed,
  headerFixed: state.theme.headerFixed,
  sidebarToggle: state.theme.sidebarToggle,
  sidebarHover: state.theme.sidebarHover,
  sidebarShadow: state.theme.sidebarShadow,
  sidebarFooter: state.theme.sidebarFooter,
  sidebarUserbox: state.theme.sidebarUserbox,
  sidebarToggleMobile: state.theme.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload | IActionBasic>) => ({
  setSidebarToggleMobile: (enable: boolean) => dispatch(setSidebarToggleMobile(enable)),
  setSidebarToggle: (enable: boolean) => dispatch(setSidebarToggle(enable)),
  setSidebarHover: (enable: boolean) => dispatch(setSidebarHover(enable)),
  setSidebarFooter: (enable: boolean) => dispatch(setSidebarFooter(enable)),
  setSidebarUserbox: (enable: boolean) => dispatch(setSidebarUserbox(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
