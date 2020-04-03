import React, { useState } from 'react';
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
  current: IPageContent;
  setCurrent: (a: IPageContent) => void; 
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
  current: IPageContent;
  setCurrent: (a: IPageContent) => void; 
  items: React.ReactElement[];
  router: any;
  
}

const defaultCurrentPage = { label: '', description: '', to: '' };

const reduceChildRoutes = (props: IReduceChildRoutes) => {
  const { router, items, page, depth, current, setCurrent } = props;
  let selected = null;
  if (page.content) {
    const open = matchPath(router.location.pathname, {
      path: page.to,
      exact: false
    });
    const foundMatch = page.content.find(p => p.to === router.location.pathname);
    if (foundMatch) {
      setCurrent(foundMatch);
    }
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
            current={current}
            setCurrent={setCurrent}
            depth={depth + 1}
            pages={page.content}
            router={router}
          />
        </div>
      </SidebarMenuListItem>
    );
  } else {
    items.push(
      <SidebarMenuListItem
        depth={depth}
        href={page.to}
        icon={page.icon}
        key={page.label}
        selected={selected}
        label={page.badge}
        title={page.label}
        current={current}
        setCurrent={setCurrent}
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
  const [current, setCurrent] = useState(defaultCurrentPage);
  const { title, pages, className = '', component: Component, ...rest } = props;
  const router = useRouter();
  return (
    <Component {...rest} className={className}>
      {title && (
        <Typography className="app-sidebar-heading">{title}</Typography>
      )}
      <SidebarMenuList
        depth={0} pages={pages || []}
        router={router}
        current={current}
        setCurrent={setCurrent}
      />
    </Component>
  );
};

export default SidebarMenu;
