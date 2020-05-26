import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../utils/ScreamSkeleton';

import { connect } from 'react-redux';
import { getAllScreams } from '../redux/action/dataAction';
import PropTypes from 'prop-types';

export class home extends Component {
    componentDidMount() {
        this.props.getAllScreams();
    }

    render() {
        const { screams, loading } = this.props.data;
        let recentScreamMarkup = !loading ? (
            screams.map((scream) => (
                <Scream key={scream.screamId} scream={scream} />
            ))
        ) : (
            <ScreamSkeleton />
        );

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamMarkup}
                </Grid>

                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getAllScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { getAllScreams })(home);
