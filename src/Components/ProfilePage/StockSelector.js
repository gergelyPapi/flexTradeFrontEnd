import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios/index";
import {FlexTradeConsumer} from "../../GlobalState/FlexTradeProvider";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectorButton: {
        margin: theme.spacing.unit,
        marginLeft: "30%",
        marginRight: "20%"
    }
});

class StockSelector extends React.Component {
    state = {
        open: false,
        stock: '',
        stockOptions: []
    };

    componentWillMount () {
        axios.get(`http://localhost:8080/get-all-stock-options`)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ stockOptions: response.data});
                } else {
                    console.log("Error fetching response")
                }
            }).catch(error => console.log("Error happened: " + error));
    }

    addStockToUser = (userName, stockCompCode, stockCompName) => {
        let comp_code = stockCompCode;
        let comp_name = stockCompName;
        axios.get(`http://localhost:8080/addStock/${userName}/${comp_name}/${comp_code}`)
            .then((response) => {
                if (response.status === 200) {
                    axios.get(`http://127.0.0.1:5000/get_ratios/${comp_name}/${comp_code}`)
                        .then((response) => {
                            console.log(response)
                        })
                } else {
                    console.log("Error fetching response")
                }
            }).catch(error => console.log("Error happened" + error));
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event)
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = (e, userName) => {
        this.handleClose();
        this.addStockToUser(userName, this.state.stock );
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained" color="primary" className={classes.selectorButton} onClick={this.handleClickOpen}>
                    Follow new stock !
                </Button>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Select your target stock</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="stock-simple">Stock to follow</InputLabel>
                                <Select
                                    value={this.state.stock}
                                    onChange={this.handleChange('stock')}
                                    input={<Input id="stock-simple" />}
                                >
                                    <MenuItem value={10}>
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.stockOptions.map(value => (
                                        <MenuItem key = {value.id} value={value.compCode}>{value.compName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <FlexTradeConsumer>
                            {(value) => {
                                const { userName } = value;

                                return (
                                    <Button onClick={ (event) => this.handleSubmit(event, userName)} color="primary">
                                        Confirm
                                    </Button>
                                )
                            }}
                        </FlexTradeConsumer>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

StockSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StockSelector);
