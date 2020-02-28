import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = (props: any): React.ReactElement => {
    const { children, location: { pathname } } = props;  
    useEffect(() => {
        window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
        });
    }, [pathname]);
    return children || null;
};

export default withRouter(ScrollToTop);