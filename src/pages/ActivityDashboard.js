import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Container, Card, CardContent, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale } from 'chart.js';

ChartJS.register(CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginBottom: theme.spacing(2),
  },
  chart: {
    width: '100%',
    height: '300px',
  },
  list: {
    width: '100%',
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
}));

const ActivityDashboard = ({ activityData, onBack }) => {
  const classes = useStyles();

  const chartData = {
    labels: activityData.map((data) => data.timestamp),
    datasets: [
      {
        label: 'Activity Count',
        data: activityData.map((_, index) => index + 1),
        backgroundColor: '#00ACC1',
      },
    ],
  };

  return (
    <Container className={classes.container}>
      <Button variant="contained" color="primary" onClick={onBack}>Back to landing page</Button>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Your Statistics
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Graph of your chat activities.
          </Typography>
          <div className={classes.chart}>
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">
            Details Chat Activity
            <span style={{ float: 'right', color: '#3f51b5', cursor: 'pointer' }}>See All</span>
          </Typography>
          <List className={classes.list}>
            {activityData.map((item, index) => (
              <ListItem key={index} className={classes.listItem}>
                <ListItemText primary={item.activity} secondary={item.timestamp} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ActivityDashboard;
