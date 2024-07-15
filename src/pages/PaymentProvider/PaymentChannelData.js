import React, { useEffect, useState } from 'react';
import { paymentChannelData } from '../../services/paymentProviderApi';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Grid
} from '@mui/material';

const PaymentChannelData = () => {
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paymentChannelData();
        setChannelData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error fetching payment channel data: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payment Channel Data
      </Typography>
      {channelData ? (
        <Card component={Paper} elevation={3} sx={{ mt: 3, p: 2 }}>
          <CardHeader
            title={<Typography variant="h5" fontWeight="bold">{channelData.name}</Typography>}
            subheader={`Channel ID: ${channelData.channelId}`}
          />
          <CardContent>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="textPrimary"><strong>Document Type:</strong> {channelData.docType}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="textPrimary"><strong>Created At:</strong> {new Date(channelData.createdAt).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="textPrimary"><strong>Updated At:</strong> {new Date(channelData.updatedAt).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="textPrimary"><strong>Updated By:</strong> {channelData.updatedBy}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Policies
            </Typography>
            <List>
              {Object.keys(channelData.policies).map((policyKey) => (
                <ListItem key={policyKey}>
                  <ListItemText
                    primary={<Typography variant="body1">{`${policyKey}: ${channelData.policies[policyKey].operator} ${channelData.policies[policyKey].value}`}</Typography>}
                    secondary={<Typography variant="body2" color="textSecondary">{`Updated at: ${new Date(channelData.policies[policyKey].updatedAt).toLocaleString()}`}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1">No channel data available</Typography>
      )}
    </Container>
  );
};

export default PaymentChannelData;
