import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { withSnackbar } from 'notistack';

// Material-ui
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    minWidth: '350px',
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  section2: {
    margin: theme.spacing.unit * 2,
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  description: {
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '350px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '255px',
    },
  },
  title: {
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '315px',
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '350px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '255px',
    },
  },
  date: {
    [theme.breakpoints.up('md')]: {
      width: '185px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '170px',
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '350px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '255px',
    },
  },
});

class EditRecap extends Component {
  state = {
    title: 'Ładowanie...',
    sessionDate: moment().format('YYYY-MM-DD'),
    description: 'Ładowanie...',
    loading: true,
    errors: {},
  }

  componentWillMount() {
    const { match } = this.props;

    axios.get(`http://back.gostekk.pl/api/lies/${match.params.id}`)
      .then((res) => {
        const { title, sessionDate, description } = res.data;

        this.setState({
          title,
          sessionDate: moment(sessionDate).format('YYYY-MM-DD'),
          description,
          loading: false,
        });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const {
      fetchData,
      match,
      history,
      enqueueSnackbar,
    } = this.props;
    const { title, sessionDate, description } = this.state;

    const recap = {
      title,
      sessionDate,
      description,
    };

    axios.post(`http://back.gostekk.pl/api/lies/edit/${match.params.id}`, recap)
      .then(() => {
        fetchData();
        enqueueSnackbar('Podsumowanie zostało pomyślnie zmienone', { variant: 'success' });
        history.push('/');
      })
      .catch((err) => {
        enqueueSnackbar('Wystąpił błąd walidacji', { variant: 'error' });
        this.setState({ errors: err.response.data });
      });
  };

  render() {
    const { classes, history } = this.props;
    const {
      title,
      sessionDate,
      description,
      loading,
      errors,
    } = this.state;

    return (
      <Paper className={classes.root}>
        <form noValidate autoComplete="off">
          <div className={classes.section1}>
            <Grid container justify="space-between">
              <Grid item>
                <TextField
                  id="title"
                  label="Tytuł"
                  className={classes.title}
                  fullWidth
                  disabled={loading}
                  error={!!errors.title}
                  helperText={errors.title ? errors.title : undefined}
                  value={title}
                  onChange={this.handleChange('title')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="sessionDate"
                  fullWidth
                  label="Data"
                  type="date"
                  disabled={loading}
                  className={classes.date}
                  value={sessionDate}
                  error={!!errors.sessionDate}
                  helperText={errors.sessionDate ? errors.sessionDate : undefined}
                  onChange={this.handleChange('sessionDate')}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle" />
          <div className={classes.section2}>
            <TextField
              id="description"
              label="Podsumowanie sesji"
              autoFocus
              multiline
              placeholder="Krótki opis przebiegu sesji (min 3 zdania)"
              className={classes.description}
              disabled={loading}
              error={!!errors.description}
              helperText={errors.description ? errors.description : undefined}
              value={description}
              onChange={this.handleChange('description')}
              margin="normal"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className={classes.section3}>
            <Grid container justify="space-between">
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => history.push('/')}>
                  Wstecz
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" disabled={loading} onClick={this.handleSubmit}>
                  Zapisz
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Paper>
    );
  }
}

EditRecap.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string.isRequired }) },
  ).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(withSnackbar(EditRecap));
