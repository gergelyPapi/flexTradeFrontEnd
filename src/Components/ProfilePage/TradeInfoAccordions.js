import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios/index";
import Paper from "@material-ui/core/es/Paper/Paper";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import Button from "@material-ui/core/es/Button/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Stars from '@material-ui/icons/Stars';
import Autorenew from '@material-ui/icons/Autorenew';
import ExpansionPanelActions from "@material-ui/core/es/ExpansionPanelActions/ExpansionPanelActions";
import Grid from "@material-ui/core/es/Grid/Grid";
import TestProfilePage from "./ProfilePageGrid";
import {FlexTradeConsumer} from "../../GlobalState/FlexTradeProvider";


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    rowIndex: {
        textAlign: "center"
    },
    rowValue: {
        textAlign: "right"
    },
    table: {
        width: "100%"
    },
    deleteButtonContainer: {
        textAlign: "right",
        height: "30%"
    }
});

class TradeInfoAccordions extends React.Component {

    state = {
        expanded: null
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    upVote(event) {
        event.preventDefault();
        console.log("Voted up!")
    }

    markStock(event) {
        event.preventDefault();
        console.log("Marked")
    }

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <FlexTradeConsumer>
                {(value) => {
                    const { userName, stockList, unFollowStock } = value;

                    return (
                        <div className={classes.root}>
                            {stockList.map(value => (
                                <ExpansionPanel
                                    key={value.id}
                                    expanded={expanded === 'panel' + value.id}
                                    onChange={this.handleChange('panel' + value.id)
                                    }>
                                    <ExpansionPanelSummary key={value.id} expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>{value.stockCode}</Typography>
                                        <Typography className={classes.secondaryHeading}>{value.compName}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails key={value.id}>
                                        <Typography className={classes.root}>
                                            <Paper>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Index</TableCell>
                                                            <TableCell numeric>Value</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow key={value.id}>
                                                            <TableCell className={classes.rowIndex} >Debt to Equity Ratio</TableCell>
                                                            <TableCell className={classes.rowValue}>{value.debtEquityRatio}</TableCell>
                                                        </TableRow>
                                                        <TableRow key={value.id}>
                                                            <TableCell className={classes.rowIndex} numeric>Earnings Per Share</TableCell>
                                                            <TableCell className={classes.rowValue} numeric>{value.earningsPerShare}</TableCell>
                                                        </TableRow>
                                                        <TableRow key={value.id}>
                                                            <TableCell className={classes.rowIndex} numeric>Price To Earnings Ratio</TableCell>
                                                            <TableCell className={classes.rowValue} numeric>{value.priceEarningsRatio}</TableCell>
                                                        </TableRow>
                                                        <TableRow key={value.id}>
                                                            <TableCell className={classes.rowIndex} numeric>Return On Equity</TableCell>
                                                            <TableCell className={classes.rowValue} numeric>{value.returnOnEquity}</TableCell>
                                                        </TableRow>
                                                        <TableRow key={value.id}>
                                                            <TableCell className={classes.rowIndex} numeric>Working Capital Ratio</TableCell>
                                                            <TableCell className={classes.rowValue} numeric>{value.workingCapitalRatio}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Paper>
                                        </Typography>
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button variant="contained" color="primary" className={classes.button}
                                                onClick={event => {unFollowStock(userName, value.stockCode)}}
                                        >
                                            Drop
                                            <DeleteIcon className={classes.rightIcon} />
                                        </Button>
                                        <Button variant="contained" color="secondary"
                                                disabled
                                                className={classes.button}
                                                onClick={event => console.log("Clicked")}
                                        >
                                            Show Price Chart
                                            <TrendingUp  className={classes.rightIcon} />
                                        </Button>
                                        <Button variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                disabled
                                                onClick={event => this.markStock(event)}
                                        >
                                            <Stars  className={classes.rightIcon} />
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                            ))}
                        </div>
                    )
                }}
            </FlexTradeConsumer>
        );
    }
}

TradeInfoAccordions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TradeInfoAccordions);

