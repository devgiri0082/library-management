import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles({
    items: {
        display: "flex",
        gap: "30px"
    },
    box: {
        padding: "10px"
    }
});

export default function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, open, deleting } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = async () => {
        await deleting();
        onClose();
    };
    return (
        <Dialog p={3} onClose={handleClose} aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" open={open}>
            <DialogContent>
                <DialogContentText>
                    <ListItemText className={classes.title}>Are you sure you want to delete?</ListItemText>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" autoFocus onClick={handleClose}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleListItemClick} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog >
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
