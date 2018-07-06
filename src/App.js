import React, { Component } from 'react';
import FlexTradeAppBar from "./Components/FlexTradeAppBar";
import Tabs from "./Components/Tabs";
import {FlexTradeProvider} from "./GlobalState/FlexTradeProvider";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from "@material-ui/core/es/colors/red";
import blue from "@material-ui/core/es/colors/blue";

const theme = createMuiTheme({
        palette: {
            primary: red,
            secondary: blue,
        },
        status: {
            danger: 'orange',
        },
    }
);
const appStyles = {
    tabs: {
        marginTop: '2%'

    },
    appBar: {
        marginRight: '2%'
    }
};

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
            <FlexTradeProvider>
                <FlexTradeAppBar style={appStyles.appBar}/>
                <div style={appStyles.tabs}>
                    <Tabs/>
                </div>
            </FlexTradeProvider>
        </MuiThemeProvider>
    );
  }
}

export default App;
