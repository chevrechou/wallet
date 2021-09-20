import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useToken, { logout } from "../utils";
import { Redirect, useHistory } from "react-router-dom";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function MainDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({ left: false });
  const { token, setToken } = useToken();
  const history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logout = () => {
    history.push("/login");
    sessionStorage.clear();
  };
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon color="primary" />,
      onClick: () => <Redirect to={{ pathname: "/" }} />,
    },
    {
      text: "Sign Out",
      icon: <ExitToAppIcon />,
      onClick: () => logout(), //setToken({ token: "" }),
    },
  ];

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuOptions.map((option) => (
          <ListItem button key={option.text}>
            <ListItemIcon onClick={() => option.onClick()}>
              {option.icon}
            </ListItemIcon>
            <ListItemText primary={option.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
  const ANCHOR = "left";

  return (
    <div>
      <Button onClick={toggleDrawer(ANCHOR, true)}>Menu</Button>
      <Drawer
        anchor={ANCHOR}
        open={state[ANCHOR]}
        onClose={toggleDrawer(ANCHOR, false)}
      >
        {list(ANCHOR)}
      </Drawer>
    </div>
  );
}
