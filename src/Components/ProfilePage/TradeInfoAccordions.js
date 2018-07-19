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
    }
});

class TradeInfoAccordions extends React.Component {

    constructor (props) {
        super(props);
    }
    state = {
        expanded: null,
        stockInfo: []
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    loadStocks (e, userName) {
        e.preventDefault();
        axios.get(`http://localhost:8080/stock/${userName}`)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({stockInfo: response.data})
                } else {
                    console.log("Other than 200 status code")
                }
            }).catch(error => console.log(error));
    }

    componentWillMount () {
        const userName = localStorage.getItem("userName");
        axios.get(`http://localhost:8080/get-all-stock-by-user/${userName}`)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({stockInfo: response.data})
                } else {
                    console.log("Other than 200 status code")
                }
            }).catch(error => console.log(error));
    }
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                {this.state.stockInfo.map(value => (
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
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

TradeInfoAccordions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TradeInfoAccordions);
