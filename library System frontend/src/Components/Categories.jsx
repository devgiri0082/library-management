import * as React from 'react';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
let useStyles = makeStyles((theme) => ({
    paper: {
        margin: "50px 200px",
        padding: "20px"
    },
    title: {
        textAlign: "center",
        borderBottom: "1px solid black",
    }
}))

export default function Categories() {
    let [loading, setLoading] = React.useState(false);
    let [categories, setCategories] = React.useState([]);
    let classes = useStyles();
    const getCategories = async () => {
        let url = "books/categories/"
        setLoading(true);
        let response = await axios.get(url);
        console.log(response);
        let data = response.data;
        setCategories(data.categories);
        setLoading(false);
    }
    React.useState(() => {
        getCategories();
    }, [])
    if (localStorage.getItem("token") === null) {
        return (
            <h1>You are not authorized. Please log in first</h1>
        )
    }
    return (
        <Container fixed>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" className={classes.title}>List of all Categories</Typography>
                {loading ? <CircularProgress /> : <></>}
            </Paper>
        </Container >
    )
}
