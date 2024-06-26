import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import {makeStyles} from "@mui/styles";
import React from "react";

import styled from "@emotion/styled";
import {Check} from "@mui/icons-material";

import {currentLocationAtom} from "@/atoms/beaches";
import {useAtom} from "jotai";
import NextImage from "next/image";
import {useRouter} from "next/router";
import logo from "./logo.png";

const LogoText = styled.div`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  cursor: pointer;
`;

const LoginOut = styled.a`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#0288d1",
  },
  menuButton: {
    marginRight: "auto",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Lacquer !important",
  },
}));

const useDrawerStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function MenuAppBar() {
  const classes = useStyles();
  const [isOpen, toggleOpen] = React.useState(false);
  const [currentLocation, setLocation] = useAtom(currentLocationAtom);
  const drawerClasses = useDrawerStyles();
  const router = useRouter();


  return (
    <>
      <Drawer open={isOpen} onClose={() => toggleOpen(!isOpen)} anchor="right">
        <div
          className={drawerClasses.list}
          role="presentation"
          onClick={() => toggleOpen(false)}
          onKeyDown={() => toggleOpen(false)}
        >
          <List>

            <ListItem button onClick={() => setLocation("fl")}>
              {currentLocation === "fl" && (
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
              )}
              <ListItemText primary={"Florida"} />
            </ListItem>
            <ListItem button onClick={() => setLocation("pt")}>
              {currentLocation === "pt" && (
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
              )}
              <ListItemText primary={"Portugal"} />
            </ListItem>
            <ListItem button onClick={() => setLocation("es")}>
              {currentLocation === "es" && (
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
              )}
              <ListItemText primary={"Spain"} />
            </ListItem>
            <ListItem button onClick={() => setLocation("fr")}>
              {currentLocation === "fr" && (
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
              )}
              <ListItemText primary={"France"} />
            </ListItem>
            <ListItem button onClick={() => setLocation("uk")}>
              {currentLocation === "uk" && (
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
              )}
              <ListItemText primary={"UK"} />
            </ListItem>
          </List>


        </div>
      </Drawer>
      <div className={classes.root}>
        <AppBar position="static" className={classes.header}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => router.push("/")}
            >
              <NextImage src={logo} alt="logo" width="40" height="40" />
            </IconButton>

              <IconButton
                style={{ marginLeft: "auto" }}
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => toggleOpen(!isOpen)}
                color="inherit"
              >
                {currentLocation === "fl" ? <MenuIcon /> : <MenuIcon />}
              </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
