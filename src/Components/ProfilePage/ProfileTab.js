import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TradeInfoAccordions from "./TradeInfoAccordions";
import StockSelector from "./StockSelector";
import Button from "@material-ui/core/es/Button/Button";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    graphContainer: {
        height: 500,
        width: 500,
    },
    accordionContainer: {
        height: 500,
        width: 500,
    },
    control: {
        height: 200,
        width: 800,
    },
    margin: {
        margin: theme.spacing.unit,
        marginLeft: "30%",
        marginRight: "20%"
    }
});

class ProfileTab extends React.Component {
    state = {
        spacing: '24',
    };

    displayLocal = () => {
        alert(
            "Store: " + localStorage.getItem("userName") + localStorage.getItem("isLoggedIn") + "\n" +
            "State: " + this.state.userName
        )
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                        <Grid key={1} item>
                            <StockSelector/>
                            <TradeInfoAccordions/>
                        </Grid>
                        <Grid key={2} item>
                            <Button onClick={this.displayLocal}>Display Local</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

ProfileTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileTab);
