import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import netlifyIdentity from "netlify-identity-widget";
import React from "react";

import { Avatar } from "@material-ui/core";
import lightblue from "@material-ui/core/colors/lightBlue";
import { CameraAlt, Check } from "@material-ui/icons";
import { Image } from "cloudinary-react";
import styled from "styled-components";

import { currentLocationAtom } from "@/atoms/beaches";
import { userAtom } from "@/atoms/user";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import logo from "./logo.png";
import NextImage from "next/image";

const LogoText = styled.div`
  font-family: "Roboto", cursive;
  cursor: pointer;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: lightblue[700],
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
  const [user, setUser] = useAtom(userAtom);
  const [currentLocation, setLocation] = useAtom(currentLocationAtom);
  const netlifyUser = netlifyIdentity.currentUser();
  const drawerClasses = useDrawerStyles();
  const router = useRouter();
  const logOut = () => {
    netlifyIdentity.logout();
  };

  const login = () => {
    netlifyIdentity.open("login");
  };

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
            {user?.isLoggedIn && (
              <>
                <ListItem button onClick={() => router.push("/profile")}>
                  <ListItemIcon>
                    {user?.image?.public_id ? (
                      <Avatar>
                        <Image
                          publicId={user?.image.public_id}
                          crop="scale"
                          width="50"
                          alt="profile picture"
                        />
                      </Avatar>
                    ) : (
                      <AccountCircleIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={`Welcome ${user.name}!`} />
                </ListItem>
                <Divider />
              </>
            )}
            {!user?.isLoggedIn && (
              <ListItem button onClick={() => router.push("/profile")}>
                <ListItemIcon>
                  <PhotoLibraryIcon />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItem>
            )}
            <ListItem button onClick={() => router.push("/feedback")}>
              <ListItemIcon>
                <PhotoLibraryIcon />
              </ListItemIcon>
              <ListItemText primary={"Media Feed"} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <CameraAlt />
              </ListItemIcon>
              <ListItemText primary={"Countries"} />
            </ListItem>
            <Divider />
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
          <Divider />
          <List>
            {user?.isLoggedIn && (
              <ListItem button onClick={logOut}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={"Log out"} />
              </ListItem>
            )}
            {!user?.isLoggedIn && (
              <ListItem button onClick={login}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"Log in"} />
              </ListItem>
            )}
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
              <NextImage
                src={logo}
                alt="logo"
                style={{ width: 40, height: 40 }}
              />
            </IconButton>
            <LogoText onClick={() => router.push("/")}>howisthe.surf</LogoText>
            {user?.isLoggedIn ? (
              <IconButton
                style={{ marginLeft: "auto" }}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => toggleOpen(!isOpen)}
                color="inherit"
              >
                {user?.image?.public_id ? (
                  <Avatar>
                    <Image
                      publicId={user?.image.public_id}
                      crop="scale"
                      width="55"
                      alt="profile picture"
                    />
                  </Avatar>
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
            ) : (
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
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
