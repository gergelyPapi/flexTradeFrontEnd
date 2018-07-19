import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import NewsFeed from "./NewsFeed";
import {FlexTradeConsumer} from "../GlobalState/FlexTradeProvider";
import ProfileTab from "./ProfilePage/ProfileTab";

const customStyles = {
    tabContainer: {
        width: '70%',
        marginTop: '2 %',
        position: 'center',
    },

};

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginTop: '2 %',
        width: '85%',
        margin: 'auto'
    },
    secondTab: {
        marginTop: "10%",
        marginLeft: '20%',
        marginRight: "20%",
        textAlign: "center"
    }
});

class FullWidthTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;

        return (
                <FlexTradeConsumer>
                    {(value) => {
                        const {  } = value;
                        const isLoggedIn = localStorage.getItem("isLoggedIn");

                            return isLoggedIn ? (
                                <div className={classes.root}>
                                    <AppBar position="static" color="default">
                                        <Tabs
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                            indicatorColor="secondary"
                                            textColor="secondary"
                                            fullWidth
                                            centered
                                        >
                                            <Tab label="News Feed" />
                                            <Tab label="What we do?" />
                                            <Tab label="Profile Page" />
                                        </Tabs>
                                    </AppBar>
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={this.state.value}
                                        onChangeIndex={this.handleChangeIndex}
                                    >
                                        <TabContainer dir={theme.direction}><NewsFeed/></TabContainer>
                                        <TabContainer dir={theme.direction} >
                                            <div className={classes.secondTab}>
                                                <Typography variant="headline" color="inherit" style={styles.nameDisplay} >
                                                    We help you to make good decisions Bro! :)
                                                    <br/>
                                                </Typography>
                                            </div>
                                        </TabContainer>
                                        <TabContainer dir={theme.direction}><ProfileTab/></TabContainer>
                                    </SwipeableViews>
                                </div>
                            ) : (
                                <div className={classes.root}>
                                    <AppBar position="static" color="default">
                                        <Tabs
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                            indicatorColor="secondary"
                                            textColor="secondary"
                                            fullWidth
                                            centered
                                        >
                                            <Tab label="News Feed" />
                                            <Tab label="What we do?" />
                                        </Tabs>
                                    </AppBar>
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={this.state.value}
                                        onChangeIndex={this.handleChangeIndex}
                                    >
                                        <TabContainer dir={theme.direction}><NewsFeed/></TabContainer>
                                        <TabContainer dir={theme.direction} >
                                            <div className={classes.secondTab}>
                                                <Typography variant="headline" color="inherit" style={styles.nameDisplay} >
                                                    We help you to make good decisions Bro! :)
                                                    <br/>
                                                </Typography>
                                            </div>
                                        </TabContainer>
                                    </SwipeableViews>
                                </div>
                            )
                        }

                    }
                </FlexTradeConsumer>
        );
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
