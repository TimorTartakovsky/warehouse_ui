import React from 'react';
import clsx from 'clsx';
// import { Header} from '../../HeaderGroup';
import { SidebarCollapsed } from '../../SidebarGroup'

export interface ICollapsedSidebar {
    children?: React.ReactElement | React.ReactElement[];
    contentBackground?: any;
}

const CollapsedSidebar = (props: ICollapsedSidebar): React.ReactElement => {
    return (
        <div>
            CollapsedSidebar
        </div>
    )
    // const { children, contentBackground } = props;
    // return (
    //     <>
    //         <div className={clsx('app-wrapper vh-100', contentBackground)}>
    //             <Header isCollapsedLayout={true} />
    //             <div className="app-main">
    //             <SidebarCollapsed />
    //             <div className={clsx('app-content')}>
    //                 <div className="app-inner-content-layout--main">{children}</div>
    //             </div>
    //             </div>
    //         </div>
    //     </>
    // )
}

export default CollapsedSidebar;