import React from 'react';

export interface IMiniLayout {
    children: React.ReactElement | React.ReactElement[];
}

const MinimalLayout = (props: IMiniLayout) => {
  const { children } = props;
  return <>{children}</>;
};

export default MinimalLayout;
