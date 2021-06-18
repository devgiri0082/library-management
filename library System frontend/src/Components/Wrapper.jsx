
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import React, { useEffect, useState } from 'react'
import { CssBaseline, Drawer, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AccountCircle, Book, Bookmark, Category } from '@material-ui/icons';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
}));

export default function Wrapper(props) {
    const history = useHistory();
    let [open, setOpen] = useState(false);

    function navigateTo(link) {
        setOpen(false);
        history.push(`/${link}`);
    }
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setOpen(!open)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title} style={{ cursor: "pointer" }} onClick={() => navigateTo("")}>
                            Library Management
                        </Typography>
                        <Button color="inherit" onClick={() => navigateTo("Login")}>Login</Button>
                    </Toolbar>
                </AppBar>
                <React.Fragment>
                    <Drawer anchor="left" open={open} onClose={() => setOpen(!open)}>
                        <Typography variant="h5" style={{ margin: "10px auto", borderBottom: "2px solid black" }}>Options</Typography>
                        {[{ text: "Books", icon: <Book />, link: "Books" },
                        { text: "Categories", icon: <Category />, link: "Categories" },
                        { text: "Member", icon: <AccountCircle />, link: "Member" },
                        { text: "Book Issued", icon: <Bookmark />, link: "Issue" }].map(({ text, icon, link }, index) => (
                            <ListItem className={classes.list} button key={text} onClick={() => navigateTo(link)}>
                                <ListItemIcon primary={icon}>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </Drawer>
                </React.Fragment>
                {props.children}
            </div>
        </div >
    )
}
