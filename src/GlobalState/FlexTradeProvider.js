import React, { Component } from 'react';
import axios from 'axios'

const FlexTradeContext = React.createContext();

export class FlexTradeProvider extends Component {
    state = {
        userName: null,
        isLoggedIn: null
    };

    logIn = (name, password) => {
        axios.post('http://localhost:8080/login', { userName: name, password: password })
            .then((response) => {
                if (response.status === 200) {
                    this.setState (
                        {userName: response.data.userName,
                            isLoggedIn: true
                        });
                } else {
                    console.log("BAD BAD BAD")
                }
            }).catch(error => console.log(error));
    };

    logOut = () => {this.setState ({userName: null, isLoggedIn: false})};

    registration = (name, email, password) => {
        axios.post('http://localhost:8080/registration', { userName: name, email: email, password: password })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    this.setState ({userName: response.data.userName});
                } else {
                    console.log("BAD BAD BAD")
                }
            }).catch(error => console.log("Error happened" + error));
    };

    deleteUser = (name) => {
        axios.post('http://localhost:8080/user/delete', { userName: name})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    this.setState ({userName: null});
                } else {
                    console.log("BAD BAD BAD")
                }
            }).catch(error => console.log("Error happened" + error));
    };

    render () {
        return (
            <FlexTradeContext.Provider value = {
                {
                    userName: this.state.userName,
                    isLoggedIn: this.state.isLoggedIn,
                    logIn: this.logIn,
                    logOut: this.logOut,
                    registration: this.registration,
                    deleteUser: this.deleteUser
                }
            }>
                {this.props.children}
            </FlexTradeContext.Provider>
        )
    }
}

export const FlexTradeConsumer = FlexTradeContext.Consumer;