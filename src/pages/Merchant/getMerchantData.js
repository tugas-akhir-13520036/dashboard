import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getMerchantData } from '../../services/merchantApi';
import CollapseTable from '../../components/collapseTable';

const GetMerchantData = () => {
  const [merchantData, setMerchantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMerchantData();
        setMerchantData(data);
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
          Error fetching merchant data: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{mb: 4}}>
        Merchant Data
      </Typography>
      {merchantData ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Merchant ID</TableCell>
                <TableCell>Document Type</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Updated By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CollapseTable row={merchantData} />
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No merchant data available</Typography>
      )}
    </Container>
  );
};

export default GetMerchantData;
