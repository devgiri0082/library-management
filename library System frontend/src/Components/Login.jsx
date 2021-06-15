import React from 'react'
import { Box, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
let useStyles = makeStyles((theme) => ({
    box: {
        position: "absolute",
        display: "flex",
        width: "600px",
        flexDirection: "Column",
        top: "25%",
        left: "25%",
        gap: "10px",
        padding: "30px",
        justifyContent: "center",
        alignItems: "center"
    },
    submit: {
        width: "100px",
    },
    text: {
        width: "500px"
    }
}))
export default function Login() {
    let history = useHistory();
    const navigateTo = (path) => {
        history.push(`/${path}`)
    }
    if (localStorage.getItem("token") !== null) navigateTo("Books")
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let classes = useStyles();
    let signIn = async () => {
        let url = "http://localhost:3300/auth/login";
        let body = { email: email, password: password };
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        let data = await response.json();
        console.log(data);
        if (response.status === 200) {
            localStorage.setItem("token", data.Access_token);
            navigateTo("Books");
        }
    }
    return (
        <Paper elevation={3} className={classes.box}>
            <Typography variant="h4">Log In</Typography>
            <TextField required label="email" name="email" variant="outlined" type="text" className={classes.text} onChange={(e) => setEmail(e.target.value)}></TextField>
            <TextField required label="password" name="password" variant="outlined" type="password" className={classes.text} onChange={(e) => setPassword(e.target.value)} ></TextField>
            <Button variant="contained" disabled={email === "" || password === ""} color="primary" className={classes.submit} onClick={signIn}>Submit</Button>
            <Box display="flex">
                <Typography variant="subtitle1" style={{ marginRight: "10px" }}>Don't have a account yet ?</Typography>
                <Button variant="contained" color="secondary" onClick={() => navigateTo("Signup")} style={{ fontSize: "13px" }}>Sign Up</Button>
            </Box>
        </Paper>

    )
}
