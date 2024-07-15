import React, { useEffect, useState } from 'react';
import { paymentAttributeList } from '../../services/paymentProviderApi';
import { CircularProgress, Container, Typography, Box, Card, CardContent, Pagination } from '@mui/material';

const PaymentAttributeList = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paymentAttributeList();
        setAttributes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attributes.slice(indexOfFirstItem, indexOfLastItem);

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
          Error fetching payment attributes: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payment Attribute List
      </Typography>
      {currentItems.length > 0 ? (
        currentItems.map((attribute, index) => (
          <Card key={index} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6">{attribute.name}</Typography>
              <Typography variant="body1">Type: {attribute.type}</Typography>
              <Typography variant="body1">Validation Function: {attribute.validationFunc ? 'Yes' : 'No'}</Typography>
              {attribute.policyOps && (
                <Box mt={2}>
                  <Typography variant="body1">Policy Operations:</Typography>
                  <ul>
                    {attribute.policyOps.map((policyOp, idx) => (
                      <li key={idx}>{policyOp}</li>
                    ))}
                  </ul>
                </Box>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No attributes available</Typography>
      )}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(attributes.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default PaymentAttributeList;
