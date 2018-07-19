import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios/index";

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
    dividerStyle: {
        marginTop: '2%',
        marginBottom: '2%'
    }
});

class NewsFeed extends React.Component {
    state = {
        expanded: null,
        newsList: []
    };

    componentWillMount () {
        axios.get('http://localhost:8080/get-all-news-entry')
            .then((response) => {
                if (response.status === 200) {
                    this.setState({newsList: response.data})
                } else {
                    console.log("Other than 200 status code")
                }
            }).catch(error => console.log("Error happened: " + error));
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                {this.state.newsList.map(value => (
                    <ExpansionPanel
                        key={value.id}
                        expanded={expanded === 'panel' + value.id}
                        onChange={this.handleChange('panel' + value.id)
                        }>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{value.source}</Typography>
                            <Typography className={classes.secondaryHeading}>{value.headLine}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails key={value.id}>
                            <Typography>
                                {value.description}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

NewsFeed.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsFeed);
