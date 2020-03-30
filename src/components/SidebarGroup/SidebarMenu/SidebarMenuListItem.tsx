import React, { useState } from 'react';
import clsx from 'clsx';
import { ListItem, Button, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { NavLink } from 'react-router-dom';

// const CustomRouterLink = forwardRef(function CustomLink(props, ref) {
//   return (
//     <div ref={ref as any} style={{ flexGrow: 1 }}>
//       <NavLink to="#" {...props} />
//     </div>
//   );
// });

const SidebarMenuListItem = (props: any) => {
  const {
    title,
    href,
    depth,
    children,
    icon: Icon,
    className,
    open: openProp,
    label: Label,
    selected,
    ...rest
  } = props;

  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((open: boolean) => !open);
  };

  let paddingLeft = 14;

  if (depth > 0) {
    paddingLeft = 32 + 20 * depth;
  }

  console.log(selected, href);

  const style = {
    paddingLeft,
    color: (selected === href) ? '#5383ff' : '',
  };

  if (children) {
    return (
      <ListItem
        {...rest}
        className={clsx('app-sidebar-item', className)}
        disableGutters>
        <Button
          color="primary"
          className={clsx('app-sidebar-button', { active: open })}
          onClick={handleToggle}
          style={style}>
          {Icon && <Icon className="app-sidebar-icon" />}
          <span>{title}</span>
          {open ? (
            <ExpandLessIcon className="sidebar-expand-icon" color="inherit" />
          ) : (
            <ExpandLessIcon
              className="sidebar-expand-icon sidebar-expand-icon-rotate"
              color="inherit"
            />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  } else {
    
    return (
      <ListItem
        {...rest}
        className={clsx('app-sidebar-item', className)}
        disableGutters>
        <NavLink to={href}>
          <Button
            color="primary"
            variant="text"
            className={clsx('app-sidebar-button-wrapper', `depth-${depth}`)}
            style={style}
          >
            {Icon && <Icon className="app-sidebar-icon" />}
            {title}
            {Label && (
              <span className="menu-item-label">
                <Label />
              </span>
            )}
          </Button>
        </NavLink>
      </ListItem>
    );
  }
};

export default SidebarMenuListItem;
