import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Material-ui
import AppBar from '@material-ui/core/AppBar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  grow: {
    flexGrow: 1,
  },
};

function Navigation(props) {
  const { classes, history, location } = props;

  return (
    <div>
      <AppBar position="static" variant="regular">
        <Toolbar>
          { location.pathname !== '/'
            ? (
              <IconButton aria-label="Back" color="inherit" hidden onClick={() => history.push('/')}>
                <ArrowBack />
              </IconButton>
            )
            : undefined }
          <Typography variant="h6" align={location.pathname === '/' ? 'left' : 'center'} color="inherit" className={classes.grow}>
            L I E S
          </Typography>
          <Button color="inherit" onClick={() => history.push('/add')}>Dodaj wpis</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default withStyles(styles)(withRouter(Navigation));
