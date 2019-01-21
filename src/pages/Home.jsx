import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { withSnackbar } from 'notistack';

// Material-ui
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
});

class Home extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleDeleteClick = (_id) => {
    const { fetchData, enqueueSnackbar } = this.props;

    axios.post('http://back.gostekk.pl/api/lies/delete', { _id })
      .then(() => {
        enqueueSnackbar('Podsumowanie zostało usunięte', { variant: 'info' });
        fetchData();
      })
      .catch(() => enqueueSnackbar('Wystąpił błąd podczas próby usunięcia.', { variant: 'error' }));
  }

  render() {
    const {
      classes,
      data,
      location,
      history,
    } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        { data.length ? data.map(recap => (
          <ExpansionPanel
            key={recap._id}
            expanded={expanded === recap._id}
            onChange={this.handleChange(recap._id)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography className={classes.heading}>{recap.title}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.secondaryHeading}>{moment(recap.sessionDate).format('DD.MM.YYYY')}</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {recap.description}
              </Typography>
            </ExpansionPanelDetails>
            <Divider />
            { location.search === '?admin=true'
              ? (
                <ExpansionPanelActions>
                  <Button size="small" onClick={() => this.handleDeleteClick(recap._id)}>Usuń</Button>
                  <Button size="small" color="primary" onClick={() => history.push(`/edit/${recap._id}`)}>
                    Edytuj
                  </Button>
                </ExpansionPanelActions>
              )
              : undefined}
          </ExpansionPanel>
        )) : undefined}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  fetchData: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(withSnackbar(Home));
