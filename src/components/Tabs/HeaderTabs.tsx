import React from 'react';
import { Grid,  Box, Typography, Tabs, Tab, Card, CardContent } from '@material-ui/core';

export interface ITabPanel {
    children: React.ReactElement | React.ReactElement[];
    index: number;
    value: any;
}

const TabPanel = (props: ITabPanel) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}

export interface ITabsWithHeaderTab {
    label: string;
}

export interface ITabsWithHeaderProps {
    handleChange?: (event: any, newValue: any) => void
    currentTab?: string;
    tabs?: ITabsWithHeaderTab[];
    bodies?: any[];
}

const TabsWithHeader = (props: ITabsWithHeaderProps) => {
  const { bodies, tabs, handleChange, currentTab } = props;
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <Card className="card-box mb-4">
            <div className="card-header bg-white card-header-tab pb-0 px-0">
              <div className="card-header--title">
                <Tabs
                  value={currentTab}
                  indicatorColor="secondary"
                  textColor="primary"
                  variant="fullWidth"
                  onChange={handleChange}>
                    {
                    tabs && tabs.map((tab: ITabsWithHeaderTab): React.ReactElement => (
                        <Tab className="p-3" label={tab.label} />
                    ))
                    }
                </Tabs>
              </div>
            </div>
            <CardContent className="p-0">
                {
                    bodies && bodies.map(d => (
                        <TabPanel value={currentTab} index={0}>
                            <Grid container spacing={4} className="mt-3">
                            <Grid item xs={12}>
                                <div className="text-center">
                                    {d}
                                </div>
                            </Grid>
                            </Grid>
                        </TabPanel>
                    ))
                }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TabsWithHeader;
