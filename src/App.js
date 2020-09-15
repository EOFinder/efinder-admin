import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MainMenu } from "./components";
import { Login } from "./pages";
import store from "./redux/store";
import { Provider } from "react-redux";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <MainMenu />
                    </PrivateRoute>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;