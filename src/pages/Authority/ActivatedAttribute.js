import React, { useState } from 'react';
import { activateAttribute } from '../../services/authorityApi';
import { Container, Typography, TextField, Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material';

const ActivatedAttribute = () => {
  const [merchantId, setMerchantId] = useState('');
  const [attributeName, setAttributeName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResponseMessage('');
    setOpen(false);

    try {
      const response = await activateAttribute({ merchantId, attributeName });
      setResponseMessage(response.message || 'Attribute activated successfully');
      setOpen(true);
    } catch (error) {
      setError(error.message);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Activate Attribute
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Merchant ID"
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Attribute Name"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
          {error ? `Error: ${error}` : responseMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ActivatedAttribute;
