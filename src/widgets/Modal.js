import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import { Avatar, Button, TextField } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ProfileModal = ({ open, onClose, user }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <div className={classes.paper}>
        <Avatar src={user.avatar} className={classes.avatar} />
        <form className={classes.form}>
          <TextField
            id="name"
            label="Name"
            defaultValue={user.name}
            className={classes.textField}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="email"
            label="Email"
            defaultValue={user.email}
            className={classes.textField}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="bio"
            label="Bio"
            defaultValue={user.bio}
            className={classes.textField}
            multiline
            rows={4}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onClose}
          >
            Close
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ProfileModal;
