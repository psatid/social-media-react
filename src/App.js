import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './utils/AuthRoute';
import axios from 'axios';

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import NavBar from './components/layout/Navbar';
import User from './pages/user';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/type';
import { logoutUser, getUserData } from './redux/action/userAction';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
    'https://asia-east2-hw-project-1537196375025.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser);
        // window.location.href = '/login';
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <NavBar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <AuthRoute exact path="/login" component={Login} />
                            <AuthRoute
                                exact
                                path="/signup"
                                component={Signup}
                            />
                            <Route
                                exact
                                path="/users/:handle"
                                component={User}
                            />
                            <Route
                                exact
                                path="/users/:handle/scream/:screamId"
                                component={User}
                            />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
