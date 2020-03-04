import React from 'react';

export interface IWareHouseDashboardState {}

export interface IWareHouseDashboardProps {}

class WareHouseDashboard extends React.Component<IWareHouseDashboardProps, IWareHouseDashboardState> {

    render(): React.ReactElement {
        return (
            <div>
                Dashboard
            </div>
        )
    }

}

export default WareHouseDashboard;