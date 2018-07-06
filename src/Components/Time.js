import React, { Component } from 'react'
import Paper from "@material-ui/core/es/Paper/Paper";

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date().toLocaleTimeString()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date().toLocaleTimeString()
        });
    }

    render() {
        return (
            <React.Fragment>
                <h3>{this.state.date}</h3>
            </React.Fragment>
        );
    }
}

export default Time