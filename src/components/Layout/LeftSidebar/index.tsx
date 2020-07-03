import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Sidebar, SidebarHeader } from '../../SidebarGroup/';
import { IRootState } from '../../../store';

export interface ILeftSidebar {
  children?: React.ReactElement | React.ReactElement[];
  sidebarToggle?: boolean;
  sidebarToggleMobile?: boolean;
  sidebarFixed?: boolean;
  headerFixed?: boolean;
  headerSearchHover?: boolean;
  footerFixed?: boolean;
  contentBackground?: string;
}

const LeftSidebar = (props: ILeftSidebar) => {
  const {
    children = null,
    sidebarToggle,
    sidebarFixed,
    footerFixed,
    contentBackground
  } = props;

  return (
    <>
      <div className={clsx('app-wrapper', contentBackground)}>
        <SidebarHeader />
        <div
          className={clsx('app-main', {
            'app-main-sidebar-static': !sidebarFixed
          })}>
          <Sidebar />
          <div
            className={clsx('app-content', {
              'app-content-sidebar-collapsed': sidebarToggle,
              'app-content-sidebar-fixed': sidebarFixed,
              'app-content-footer-fixed': footerFixed
            })}>
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


const mapStateToProps = (state: IRootState) => ({
  sidebarToggle: state.theme.sidebarToggle,
  sidebarToggleMobile: state.theme.sidebarToggleMobile,
  sidebarFixed: state.theme.sidebarFixed,
  headerFixed: state.theme.headerFixed,
  headerSearchHover: state.theme.headerSearchHover,
  footerFixed: state.theme.footerFixed,
  contentBackground: state.theme.contentBackground
});

export default connect(mapStateToProps)(LeftSidebar);
