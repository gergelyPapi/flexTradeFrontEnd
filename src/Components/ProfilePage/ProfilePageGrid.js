import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StockSelector from "./StockSelector";
import TradeInfoAccordions from "./TradeInfoAccordions";
import Button from "@material-ui/core/es/Button/Button";
import Autorenew from "@material-ui/icons/es/Autorenew";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

function ProfilePageGrid(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <StockSelector/>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Button disabled variant="contained" color="secondary" className={classes.button}
                                onClick={event => console.log("Refreshed")}
                        >
                            <Autorenew  className={classes.rightIcon} />
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <TradeInfoAccordions/>
                    </Paper>
                </Grid>
                {/*<Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>*/}
            </Grid>
        </div>
    );
}

ProfilePageGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePageGrid);
