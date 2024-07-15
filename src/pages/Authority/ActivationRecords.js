import React, { useEffect, useState } from 'react';
import { activationRecord } from '../../services/authorityApi';
import { Container, Typography, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

const ActivationRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await activationRecord();
        setRecords(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderMethodChip = (method) => {
    if (method === 'ACTIVATE') {
      return <Chip label="ACTIVATE" color="success" variant="outlined" />;
    } else if (method === 'DEACTIVATE') {
      return <Chip label="DEACTIVATE" color="error" variant="outlined" />;
    } else {
      return <Chip label={method} variant="outlined" />;
    }
  };

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
          Error fetching activation records: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Activation Records
      </Typography>
      {records.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="activation records table">
            <TableHead>
              <TableRow>
                <TableCell>Attribute Name</TableCell>
                <TableCell>Merchant ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.attributeName}</TableCell>
                  <TableCell>{record.merchantId}</TableCell>
                  <TableCell>{new Date(record.date).toLocaleString()}</TableCell>
                  <TableCell>{renderMethodChip(record.method)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No activation records available</Typography>
      )}
    </Container>
  );
};

export default ActivationRecords;
