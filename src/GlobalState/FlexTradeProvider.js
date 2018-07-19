import React, { Component } from 'react';
import axios from 'axios'

const FlexTradeContext = React.createContext();

export class FlexTradeProvider extends Component {

    state = {
        userName: null,
        isLoggedIn: null
    };

    componentDidMount() {
        if (localStorage.getItem("userName")) {
            this.setState (
                {userName: localStorage.getItem("userName"), isLoggedIn: true}
            );
        }
    }


    logIn = (name, password) => {
        axios.post('http://localhost:8080/login', { userName: name, password: password })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("userName", response.data.userName);
                    localStorage.setItem("isLoggedIn", true);
                    this.setState (
                        {userName: response.data.userName, isLoggedIn: true}
                    );
                } else {
                    console.log("Other than 200 status code")
                }
            }).catch(error => console.log("Error happened: " + error));
    };

    logOut = () => {
        this.setState ({userName: null, isLoggedIn: false});
        localStorage.clear();
    };

    registration = (name, email, password) => {
        axios.post('http://localhost:8080/registration', { userName: name, email: email, password: password })
            .then((response) => {
                if (response.status === 200) {

                } else {
                    console.log("Other than 200 status code")
                }
            }).catch(error => console.log("Error happened: " + error));
    };

    deleteUser = (name) => {
        axios.post('http://localhost:8080/user/delete', { userName: name})
            .then((response) => {
                if (response.status === 200) {
                    this.setState ({userName: null});
                } else {
                    console.log("Other than 200 status code")
                }
            }).catch(error => console.log("Error happened: " + error));
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