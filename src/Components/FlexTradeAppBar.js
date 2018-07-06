import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import MainDrawer from "./MainDrawer";
import Button from "@material-ui/core/es/Button/Button";
import Login from "./Login";
import {FlexTradeConsumer} from "../GlobalState/FlexTradeProvider";
import Registration from "./Registration";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    nameDisplay: {
        marginRight: "30px"
    }
};

/*const appBarContent = (

);*/


function FlexTradeAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <Avatar alt="Remy Sharp" src="dollar.png" className={classes.avatar} />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        flexTrade
                    </Typography>
                    <FlexTradeConsumer>
                        {(value) => {
                            const { userName, logOut } = value;

                            return userName ? (
                                <React.Fragment>
                                    <Typography variant="headline" color="inherit" style={styles.nameDisplay} >
                                        Welcome {userName}
                                    </Typography>
                                    <div>
                                        <Button variant="raised" onClick={logOut}>Logout</Button>
                                    </div>
                                    <MainDrawer/>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Login />
                                    <Registration />
                                </React.Fragment>
                            )
                        }}
                    </FlexTradeConsumer>
                </Toolbar>
            </AppBar>
        </div>
    );
}

FlexTradeAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlexTradeAppBar);
