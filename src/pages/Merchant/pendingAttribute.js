import React, { useEffect, useState } from 'react';
import { pendingAttribute } from '../../services/merchantApi';
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
  TablePagination,
  Chip
} from '@mui/material';

const PendingAttribute = () => {
  const [attributeData, setAttributeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pendingAttribute();
        setAttributeData(data);
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

  const renderStatusChip = (status) => {
    if (status === 'ACTIVE') {
      return <Chip label="ACTIVE" color="success" variant="outlined" />;
    } else if (status === 'PENDING') {
      return <Chip label="PENDING" color="error" variant="outlined" />;
    } else {
      return <Chip label={status} variant="outlined" />;
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
          Error fetching pending attribute data: {error}
        </Typography>
      </Container>
    );
  }

  const rows = Object.keys(attributeData).map((key) => ({
    key,
    value: attributeData[key].value.toString(),
    status: attributeData[key].status,
    createdAt: new Date(attributeData[key].createdAt).toLocaleString(),
    updatedAt: new Date(attributeData[key].updatedAt).toLocaleString(),
    updatedBy: attributeData[key].updatedBy,
  }));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pending Attributes
      </Typography>
      {rows.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="pending attributes table">
              <TableHead>
                <TableRow>
                  <TableCell>Attribute</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Updated By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.key}>
                    <TableCell>{row.key}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{renderStatusChip(row.status)}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>{row.updatedAt}</TableCell>
                    <TableCell>{row.updatedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant="body1">No pending attributes available</Typography>
      )}
    </Container>
  );
};

export default PendingAttribute;
