import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from "@material-ui/core/es/SwipeableDrawer/SwipeableDrawer";
import {FlexTradeConsumer} from "../GlobalState/FlexTradeProvider";
import Login from "./Login";
import Typography from "@material-ui/core/es/Typography/Typography";

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    userActionButtonDisplay: {
        marginRight: "10px"
    }
};

class TemporaryDrawer extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <FlexTradeConsumer>

                {(value) => {
                    const { userName } = value;

                    return userName ? (
                        <React.Fragment>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('right', false)}
                                onKeyDown={this.toggleDrawer('right', false)}
                            >
                                <div className={classes.list}>
                                    <List>
                                        <Typography variant="title" gutterBottom>
                                            User Actions:
                                        </Typography>
                                    </List>
                                        <Divider />
                                    <List><Button>Submit Feedback</Button></List>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('right', false)}
                                onKeyDown={this.toggleDrawer('right', false)}
                            >
                                <div className={classes.list}>
                                    <List><Login/></List>
                                    <Divider />
                                    <List><Button>Submit Feedback</Button></List>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }}

            </FlexTradeConsumer>
        );

        return (
            <div>
                <Button variant="raised" color="secondary" onClick={this.toggleDrawer('right', true)}>User Actions</Button>
                <SwipeableDrawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                    {sideList}
                </SwipeableDrawer>
            </div>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
