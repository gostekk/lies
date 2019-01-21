import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';

// Material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../styles/theme';

// Components
import Navigation from '../components/Navigation';

// Pages
import Home from '../pages/Home';
import AddRecap from '../pages/AddRecap';
import EditRecap from '../pages/EditRecap';

class App extends Component {
  state = {
    data: [],
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('http://back.gostekk.pl/api/lies')
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { data } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <div>
              <CssBaseline />
              <Navigation />
              <Switch>
                <Route path="/" exact render={props => <Home {...props} data={data} fetchData={this.fetchData} />} />
                <Route path="/add" exact render={props => <AddRecap {...props} fetchData={this.fetchData} />} />
                <Route path="/edit/:id" exact render={props => <EditRecap {...props} fetchData={this.fetchData} />} />
              </Switch>
            </div>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
