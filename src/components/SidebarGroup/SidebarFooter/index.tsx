import React from 'react';
import { IconButton, Box, Tooltip } from '@material-ui/core';
import { Bell, Activity, Briefcase, Calendar } from 'react-feather';

const SidebarFooter = () => {
  return (
    <>
      <Box className="app-sidebar-footer-wrapper">
        <ul className="app-sidebar-footer">
          <li>
            <Tooltip arrow title="Projects Application">
              <IconButton href="/ApplicationsProjects">
                <Activity />
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip arrow title="Dashboard">
              <IconButton href="/dashboard" className="mx-1">
                <Bell />
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip arrow title="Dashboard">
              <IconButton href="/dashboard" className="mx-1">
                <Calendar />
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip arrow title="Dashboard">
              <IconButton href="/dashboard">
                <Briefcase />
              </IconButton>
            </Tooltip>
          </li>
        </ul>
      </Box>
    </>
  );
}

export default SidebarFooter;
