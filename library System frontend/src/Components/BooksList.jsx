import { CircularProgress, Container, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import SimpleDialog from './SimpleDialog';
import axios from "axios";

let useStyle = makeStyles((theme) => ({
    paper: {
        margin: "50px 200px",
        padding: "20px"
    },
    title: {
        textAlign: "center",
        borderBottom: "1px solid black",
    },
    icon: {
        cursor: "pointer",
    }
}))
export default function BooksList() {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");
    let [loading, setLoading] = useState(true);
    let [books, setBooks] = useState();
    let url = "books/";
    let getBook = async () => {
        setLoading(true);
        let response = await axios.get(url);
        console.log(response, "this is a response");
        let data = response.data;
        setBooks(data.books);
        console.log("data has been set");
        setLoading(false);
    }
    let deleting = async () => {
        let url = "Books";
        let response = await fetch(`${url}/${selectedValue}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        console.log(response, "delete");
        await getBook();
    }
    const handleClickOpen = (id) => {
        setSelectedValue(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedValue("");
    };
    useEffect(() => {
        getBook()
        // eslint-disable-next-line
    }, []);
    if (localStorage.getItem("token") === null) {
        return (
            <h1>You are not authorized. Please log in first</h1>
        )
    }
    return (
        <Container fixed>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" className={classes.title}>List of all Books</Typography>
                <List >
                    {loading ? <CircularProgress /> : books.map(elem =>
                    (
                        <ListItem>
                            <ListItemText primary={elem.title} secondary={elem.author.join(", ")} />
                            <ListItemIcon className={classes.icon} onClick={() => handleClickOpen(elem["_id"])}><Delete /></ListItemIcon>
                        </ListItem>

                    )
                    )}
                </List>
            </Paper>
            <SimpleDialog open={open} onClose={handleClose} deleting={deleting} />
        </Container >
    )
}
