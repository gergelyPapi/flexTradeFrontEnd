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

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            userName: '',
            email:'',
            password: '',
            formErrors: {userName: '',email: '', password: ''},
            userNameValid: null,
            emailValid: null,
            passwordValid: null
        };
    }

    handleClickOpen = () => {
        console.log("Closed")
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    updateUsername = (event) => {
        this.state.userName = event.target.value;
        this.validateField("userName", this.state.userName);
    };

    updateEmail = (event) => {
        this.state.email = event.target.value;
        this.validateField("email", this.state.email);
    };

    updatePassword = (event) => {
        this.state.password = event.target.value;
        this.validateField("password", this.state.password);
    };

    validateField(fieldName, value) {
        switch(fieldName) {
            case 'email':
                let validationArray = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                try {
                    if(validationArray) {
                        this.state.emailValid = true;
                    } else {
                        this.state.emailValid = false;
                    }
                }
                catch(err) {
                    console.log(err.message);
                    this.state.emailValid = false;
                }
                break;
            case 'password':
                this.state.passwordValid = value.length > 4;
                break;
            case 'userName':
                this.state.userNameValid = value.length >= 10;
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <FlexTradeConsumer>
                {(value) => {
                    const { registration } = value;

                    return (
                        <div>
                            <Button style={style.buttonStyle} variant="raised" onClick={this.handleClickOpen}>Registration</Button>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="form-dialog-title"
                            >
                                <DialogTitle id="form-dialog-title">Registration</DialogTitle>
                                <DialogContent style={style.dialogContent}>
                                    <DialogContentText>
                                        Please enter your credentials
                                        <Time/>
                                    </DialogContentText>
                                    <div className={"TextFieldArea"}>
                                        <TextField
                                            margin="dense"
                                            id="name"
                                            label="Username"
                                            type="username"
                                            fullWidth
                                            placeholder="Enter your Username"
                                            onKeyUp={(event) => this.updateUsername(event)}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="name"
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            placeholder="Enter your E-mail address"
                                            onKeyUp={(event) => this.updateEmail(event)}
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
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button color={'primary'}
                                            onClick={(event) => {
                                                registration(this.state.userName, this.state.email, this.state.password);
                                                this.handleClose()
                                                }
                                            }>
                                        GO!
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    )
                }}
            </FlexTradeConsumer>
        );
    }
}
