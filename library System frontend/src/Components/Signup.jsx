import { Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
let useStyle = makeStyles((theme) => ({
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
    },
    hidden: {
        display: "none",
    }
}))
export default function Signup() {
    let history = useHistory();
    let classes = useStyle("");
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [image, setImage] = useState(undefined);
    let sendData = async () => {
        let url = "http://localhost:3300/auth/signup";
        let form = new FormData();
        form.append("name", name);
        form.append("email", email);
        form.append("password", password);
        if (image) form.append("profilePic", image);
        let response = await fetch(url, {
            method: "POST",
            body: form
        })
        let data = await response.json();
        console.log(data);
        if (response.status === 201) history.push("/Login")
    }
    return (
        <Paper elevation={3} className={classes.box}>
            <Typography variant="h4">Sign up</Typography>
            <TextField required label="name" name="name" variant="outlined" type="text" className={classes.text} onChange={(e) => setName(e.target.value)}></TextField>
            <TextField required label="email" name="email" variant="outlined" type="email" className={classes.text} onChange={(e) => setEmail(e.target.value)}></TextField>
            <TextField required label="password" name="password" variant="outlined" type="password" className={classes.text} onChange={(e) => setPassword(e.target.value)}></TextField>
            <TextField required label="Confirm Password" variant="outlined" type="password" className={classes.text} onChange={(e) => setConfirmPassword(e.target.value)}></TextField>
            <input accept="image/*" id="profilePic" className={classes.hidden} type="file" name="profilePic" onChange={(e) => setImage(e.target.files[0])} />
            <label htmlFor="profilePic">
                <Button variant="contained" color="secondary" className={classes.avatar} component="span">Upload Avatar</Button>
                {image?.name}
            </label>
            <Button variant="contained" color="primary" disabled={name === "" || email === "" || password === "" || confirmPassword !== password} className={classes.submit} onClick={sendData}>Submit</Button>
        </Paper >
    )
}
