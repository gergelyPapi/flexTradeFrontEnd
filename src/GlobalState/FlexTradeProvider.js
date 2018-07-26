import React, { Component } from 'react';
import axios from 'axios'

const FlexTradeContext = React.createContext();

export class FlexTradeProvider extends Component {

    state = {
        userName: null,
        isLoggedIn: null,
        stockList: []
    };

    componentDidMount() {
        if (localStorage.getItem("userName")) {
            let currentUserName = localStorage.getItem("userName")
            this.setState (
                {userName: currentUserName, isLoggedIn: true}
            );
            axios.get(`http://localhost:8080/get-all-stock-by-user/${currentUserName}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({stockList: response.data})
                    } else {
                        console.log("Other than 200 status code")
                    }
                }).catch(error => console.log(error));
        }
    }

    loadStocks = (userName) => {
        axios.get(`http://localhost:8080/get-all-stock-by-user/${userName}`)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({stockList: response.data})
                } else {
                    console.log("Other than 200 status code")
                }
            }).catch(error => console.log(error));
    };

    unFollowStock = (userName, stockCode) => {
        axios.get(`http://localhost:8080/remove-stock-from-user/${userName}/${stockCode}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    this.loadStocks(userName);
                } else {
                    console.log("Other than 200 status code")
                }
            }).catch(error => console.log(error));
    };

    addStockToUser = (userName, stockCompCode) => {
        axios.get(`http://localhost:8080/add-stock-to-user/${userName}/${stockCompCode}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    this.loadStocks(userName);
                } else {
                    console.log("Error fetching response")
                }
            }).catch(error => console.log("Error happened" + error));
    };


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
                    stockList: this.state.stockList,
                    logIn: this.logIn,
                    logOut: this.logOut,
                    registration: this.registration,
                    deleteUser: this.deleteUser,
                    unFollowStock: this.unFollowStock,
                    loadStocks: this.loadStocks,
                    addStockToUser: this.addStockToUser
                }
            }>
                {this.props.children}
            </FlexTradeContext.Provider>
        )
    }
}

export const FlexTradeConsumer = FlexTradeContext.Consumer;