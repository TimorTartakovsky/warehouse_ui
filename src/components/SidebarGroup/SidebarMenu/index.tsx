import React from 'react';
import { matchPath } from 'react-router-dom';
import { List, Typography } from '@material-ui/core';
import useRouter from '../helper/useRouter';
import SidebarMenuListItem from './SidebarMenuListItem';

export type Page = {
  label: string;
  icon: any;
  badge: any;
  to: string;
  content: Array<{
    label: string;
    description: string;
    to: string;
  }>;
}

export interface IPageContent {
  label: string;
  description: string;
  to: string;
}

export interface ISidebarMenuListProps {
  pages: Array<Page | IPageContent>;
  depth: number;
  router: any;
}

const SidebarMenuList = (props: ISidebarMenuListProps) => {
  const { pages, ...rest } = props;
  return (
    <List className="p-0">
      {pages.reduce(
        (items: React.ReactElement[], page: any) => reduceChildRoutes({ items, page, ...rest }),
        []
      )}
    </List>
  );
};

export interface IReduceChildRoutes {
  depth: number;
  page: Page;
  items: React.ReactElement[];
  router: any;
  
}

const reduceChildRoutes = (props: IReduceChildRoutes) => {
  const { router, items, page, depth } = props;
  let selected = null;
  if (page.content) {
    const open = matchPath(router.location.pathname, {
      path: page.to,
      exact: false
    });
    const foundMatch = page.content.find(p => p.to === router.location.pathname);
    selected = foundMatch && foundMatch.to;
    const openChildren = !!foundMatch ? true : false;

    items.push(
      <SidebarMenuListItem
        depth={depth}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        open={Boolean(open || openChildren)}
        title={page.label}>
        <div className="sidebar-menu-children py-2">
          <SidebarMenuList
            depth={depth + 1}
            pages={page.content}
            router={router}
          />
        </div>
      </SidebarMenuListItem>
    );
  } else {
    selected = page && page.to === router.location.pathname;
    items.push(
      <SidebarMenuListItem
        depth={depth}
        href={page.to}
        icon={page.icon}
        key={page.label}
        selected={selected}
        label={page.badge}
        title={page.label}
        current={page}
      />
    );
  }

  return items;
};

export interface ISidebarMenuProps {
  component?: any;
  pages?: Array<Page>;
  title?: string;
  className?: string;
}

const SidebarMenu = (props: ISidebarMenuProps) => {
  const { title, pages, className = '', component: Component, ...rest } = props;
  const router = useRouter();

  return (
    <Component {...rest} className={className}>
      {title && (
        <Typography className="app-sidebar-heading">{title}</Typography>
      )}
      <SidebarMenuList
        depth={0}
        pages={pages || []}
        router={router}
        // current={current}
        // setCurrent={pages && setCurrentState }
      />
    </Component>
  );
};

export default SidebarMenu;
