import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Chip
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { merchantDataById } from '../services/authorityApi';

const CollapseTable = ({ row, showDetails }) => {
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [merchantDetail, setMerchantDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const handleDetailOpen = async () => {
    setDetailOpen(true);
    setLoadingDetail(true);
    setDetailError(null);
    try {
      const data = await merchantDataById(row.merchantId);
      setMerchantDetail(data);
    } catch (error) {
      setDetailError(error.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
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

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.merchantId}</TableCell>
        <TableCell>{row.docType}</TableCell>
        <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
        <TableCell>{new Date(row.updatedAt).toLocaleString()}</TableCell>
        <TableCell>{row.updatedBy}</TableCell>
        {showDetails && (
          <TableCell>
            <Button variant="outlined" size='small' onClick={handleDetailOpen}>
              Details
            </Button>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={showDetails ? 8 : 7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Attributes
              </Typography>
              <Table size="small" aria-label="attributes">
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Updated By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(row.attributes).map((key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      <TableCell>{row.attributes[key].value}</TableCell>
                      <TableCell>{renderStatusChip(row.attributes[key].status)}</TableCell>
                      <TableCell>{new Date(row.attributes[key].createdAt).toLocaleString()}</TableCell>
                      <TableCell>{new Date(row.attributes[key].updatedAt).toLocaleString()}</TableCell>
                      <TableCell>{row.attributes[key].updatedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {showDetails && (
        <Dialog
          open={detailOpen}
          onClose={handleDetailClose}
          fullWidth="md"
          maxWidth="md"
          aria-labelledby="merchant-detail-title"
          aria-describedby="merchant-detail-description"
        >
          <DialogTitle id="merchant-detail-title">Merchant Details</DialogTitle>
          <DialogContent>
            {loadingDetail ? (
              <CircularProgress />
            ) : detailError ? (
              <Typography color="error">Error: {detailError}</Typography>
            ) : (
              merchantDetail && (
                <>
                  <DialogContentText id="merchant-detail-description">
                    Name: {merchantDetail.name}
                  </DialogContentText>
                  <DialogContentText>
                    Merchant ID: {merchantDetail.merchantId}
                  </DialogContentText>
                  <DialogContentText>
                    Document Type: {merchantDetail.docType}
                  </DialogContentText>
                  <DialogContentText>
                    Created At: {new Date(merchantDetail.createdAt).toLocaleString()}
                  </DialogContentText>
                  <DialogContentText>
                    Updated At: {new Date(merchantDetail.updatedAt).toLocaleString()}
                  </DialogContentText>
                  <DialogContentText>
                    Updated By: {merchantDetail.updatedBy}
                  </DialogContentText>
                  <Typography variant="h6" gutterBottom component="div" mt={2}>
                    Attributes
                  </Typography>
                  <Table size="small" aria-label="attributes">
                    <TableHead>
                      <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Updated At</TableCell>
                        <TableCell>Updated By</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(merchantDetail.attributes).map((key) => (
                        <TableRow key={key}>
                          <TableCell component="th" scope="row">
                            {key}
                          </TableCell>
                          <TableCell>{merchantDetail.attributes[key].value}</TableCell>
                          <TableCell>{renderStatusChip(merchantDetail.attributes[key].status)}</TableCell>
                          <TableCell>{new Date(merchantDetail.attributes[key].createdAt).toLocaleString()}</TableCell>
                          <TableCell>{new Date(merchantDetail.attributes[key].updatedAt).toLocaleString()}</TableCell>
                          <TableCell>{merchantDetail.attributes[key].updatedBy}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDetailClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

CollapseTable.propTypes = {
  row: PropTypes.shape({
    attributes: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
    docType: PropTypes.string.isRequired,
    merchantId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    updatedBy: PropTypes.string.isRequired,
  }).isRequired,
  showDetails: PropTypes.bool,
};

CollapseTable.defaultProps = {
  showDetails: false,
};

export default CollapseTable;
