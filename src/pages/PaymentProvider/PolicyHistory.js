import React, { useEffect, useState } from 'react';
import { paymentHistory } from '../../services/paymentProviderApi';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const PaymentHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paymentHistory();
        setHistoryData(data);
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
          Error fetching payment history data: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payment History
      </Typography>
      {historyData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="payment history table">
            <TableHead>
              <TableRow>
                <TableCell>Channel ID</TableCell>
                <TableCell>Channel Name</TableCell>
                <TableCell>Document Type</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Updated By</TableCell>
                <TableCell>Policies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>{history.channelId}</TableCell>
                  <TableCell>{history.name}</TableCell>
                  <TableCell>{history.docType}</TableCell>
                  <TableCell>{new Date(history.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(history.updatedAt).toLocaleString()}</TableCell>
                  <TableCell>{history.updatedBy}</TableCell>
                  <TableCell>
                    <ul>
                      {Object.keys(history.policies).length > 0 ? (
                        Object.keys(history.policies).map((policyKey) => (
                          <li key={policyKey}>
                            {policyKey}: {history.policies[policyKey].operator} {history.policies[policyKey].value} (Updated at: {new Date(history.policies[policyKey].updatedAt).toLocaleString()})
                          </li>
                        ))
                      ) : (
                        'No policies'
                      )}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No payment history available</Typography>
      )}
    </Container>
  );
};

export default PaymentHistory;
