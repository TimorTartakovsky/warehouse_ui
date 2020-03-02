import React, { Fragment } from 'react';
import clsx from 'clsx';

// import { connect } from 'react-redux';

import { Sidebar } from '../../SidebarGroup';
import { Header } from '../../HeaderGroup';
import { Footer } from '../../FooterGroup'

const LeftSidebar = (props: any) => {
  const {
    children,
    sidebarToggle,
    sidebarFixed,
    footerFixed,
    contentBackground
  } = props;

  return (
    <>
      <div className={clsx('app-wrapper', contentBackground)}>
        <Header />
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
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

// const mapStateToProps = state => ({
//   sidebarToggle: state.ThemeOptions.sidebarToggle,
//   sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
//   sidebarFixed: state.ThemeOptions.sidebarFixed,

//   headerFixed: state.ThemeOptions.headerFixed,
//   headerSearchHover: state.ThemeOptions.headerSearchHover,
//   headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,

//   footerFixed: state.ThemeOptions.footerFixed,

//   contentBackground: state.ThemeOptions.contentBackground
// });

// export default connect(mapStateToProps)(LeftSidebar);

export default LeftSidebar;