import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import HomeIcon from '@material-ui/icons/Home';
import PostScream from '../scream/PostScream';
import Notifications from './Notifications';

export class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            {/* <MyButton tip={'Make a Post'}>
                                <AddIcon color="primary" />
                            </MyButton> */}
                            <PostScream />

                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="primary" />
                                </MyButton>
                            </Link>

                            {/* <MyButton tip={'Notifications'}>
                                <NotificationIcon color="primary" />
                            </MyButton> */}
                            <Notifications />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/">
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signup"
                            >
                                Signup
                            </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Navbar);
