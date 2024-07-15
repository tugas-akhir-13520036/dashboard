import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getEligibleAttributes } from '../../services/authorityApi';

const GetEligibleAttrData = () => {
  const [eligibleAttrData, setEligibleAttrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEligibleAttributes();
        console.log('data:', data);
        setEligibleAttrData(data);
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
          Error fetching eligilble attribute data: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{mb: 4}}>
        Eligible Attribute Data
      </Typography>
      {eligibleAttrData ? (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Attribute Name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {eligibleAttrData.map((row) => (
                    <TableRow key={row}>
                    <TableCell component="th" scope="row">
                        {row}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

        </TableContainer>
      ) : (
        <Typography variant="body1">No eligible data available</Typography>
      )}
    </Container>
  );
};

export default GetEligibleAttrData;
