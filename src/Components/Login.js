import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Time from "./Time";
import {FlexTradeConsumer} from "../GlobalState/FlexTradeProvider";

const style = {
    dialogContent: {
        textAlign: 'center',
        paddingTop: 30
    },
    buttonStyle: {
        margin: '1%'
    }
};

export default class LoginForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            userName: '',
            password: '',
            userNameValid: null,
            passwordValid: null
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    updateUserName(event) {
        let inputValue = event.target.value;
        this.state.userName = inputValue;
        this.validateField("userName", inputValue);
    }

    updatePassword(event) {
        let inputValue = event.target.value;
        this.state.password = inputValue;
        this.validateField("password", inputValue);
    }

    validateField(fieldName, value) {
        switch(fieldName) {
            case 'userName':
                this.state.userNameValid = value.length >= 10;
                break;
            case 'password':
                this.state.passwordValid = value.length >= 4;
                break;
            default:
                break;
        }
    }

    render () {
        return (
            <div style={style}>
                <Button style={style.buttonStyle} variant="raised" onClick={this.handleClickOpen}>Login</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent style={style.dialogContent}>
                        <DialogContentText>
                            Please enter your credentials
                            <Time/>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Username"
                            type="username"
                            fullWidth
                            placeholder="Enter your Username"
                            onKeyUp={(event) => this.updateUserName(event)}
                        />
                        <TextField
                            margin="dense"
                            id="pw"
                            label="Password"
                            type="password"
                            fullWidth
                            placeholder="Enter your Password"
                            onKeyUp={(event) => this.updatePassword(event)}
                        />
                    </DialogContent>
                    <FlexTradeConsumer>
                        {(value) => {
                            const {logIn} = value;

                            return(
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button color={'primary'}
                                            onClick={() => {
                                                logIn(this.state.userName, this.state.password);
                                                this.handleClose();
                                                }
                                            }>
                                        GO!
                                    </Button>
                                </DialogActions>
                                )
                        }}
                    </FlexTradeConsumer>

                </Dialog>
            </div>
        )
    }
}
