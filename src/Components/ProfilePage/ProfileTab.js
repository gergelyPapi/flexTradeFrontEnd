import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ProfilePageGrid from "./ProfilePageGrid";

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

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <ProfilePageGrid/>
        );
    }
}

ProfileTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileTab);
