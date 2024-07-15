import React, { useEffect, useState } from 'react';
import { paymentChannel } from '../../services/merchantApi';
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';

const PaymentChannelList = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paymentChannel();
        setChannels(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          Error fetching payment channel list: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payment Channel List
      </Typography>
      {channels.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="payment channel list table">
              <TableHead>
                <TableRow>
                  <TableCell>Channel ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Document Type</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Updated By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {channels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((channel) => (
                  <TableRow key={channel.channelId}>
                    <TableCell>{channel.channelId || '-'}</TableCell>
                    <TableCell>{channel.name || '-'}</TableCell>
                    <TableCell>{channel.docType || '-'}</TableCell>
                    <TableCell>{channel.createdAt ? new Date(channel.createdAt).toLocaleString() : '-'}</TableCell>
                    <TableCell>{channel.updatedAt ? new Date(channel.updatedAt).toLocaleString() : '-'}</TableCell>
                    <TableCell>{channel.updatedBy || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={channels.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant="body1">No payment channels available</Typography>
      )}
    </Container>
  );
};

export default PaymentChannelList;
