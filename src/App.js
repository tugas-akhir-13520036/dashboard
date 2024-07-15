import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/header';
import Sidebar from './components/sidebar';
import GetMerchantData from './pages/Merchant/getMerchantData';
import ProposeAttribute from './pages/Merchant/proporseAttribute';
import PendingAttribute from './pages/Merchant/pendingAttribute';
import PaymentChannelList from './pages/Merchant/paymentChannelList';
import PaymentProcess from './pages/Merchant/paymentProcess';
import AttributeHistory from './pages/Merchant/attributeHistory';
import MerchantList from './pages/Authority/MerchantList';
import ActivatedAttribute from './pages/Authority/ActivatedAttribute';
import DeactivateAttribute from './pages/Authority/DeactiveAttribute';
import ActivationRecords from './pages/Authority/ActivationRecords';
import EligibleAttribute from './pages/Authority/EligibleAttribute';
import PaymentChannelData from './pages/PaymentProvider/PaymentChannelData';
import ModifyPolicy from './pages/PaymentProvider/ModifyPolicy';
import DeletePolicy from './pages/PaymentProvider/DeletePolicy';
import PolicyHistory from './pages/PaymentProvider/PolicyHistory';
import AttributeList from './pages/Merchant/attributeList';
import AttributeListAuthority from './pages/Authority/AttributeList';
import PaymentAttributeList from './pages/PaymentProvider/PaymentAttributeList';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <CssBaseline />
      <Header toggleSidebar={toggleSidebar}/>
      <Box sx={{ display: 'flex' }}>
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Box component="main" sx={{ flexGrow: 1, p: 3}}>
          <Routes>
            <Route path="/" element={<Navigate to="/merchant/get-merchant-data" replace />} />
            <Route path="/merchant/*" element={<GetMerchantData />} />
            <Route path="/authority/*" element={<MerchantList />} />
            <Route path="/payment-provider/*" element={<PaymentChannelData />} />
            {/* Merchant Routes */}
            <Route path="/merchant/get-merchant-data" element={<GetMerchantData />} />
            <Route path="/merchant/propose-attribute" element={<ProposeAttribute />} />
            <Route path="/merchant/pending-attribute" element={<PendingAttribute />} />
            <Route path="/merchant/payment-channel-list" element={<PaymentChannelList />} />
            <Route path="/merchant/payment-process" element={<PaymentProcess />} />
            <Route path="/merchant/attribute-history" element={<AttributeHistory />} />
            <Route path="/merchant/attribute-list" element={<AttributeList />} />
            {/* Authority Routes */}
            <Route path="/authority/merchant-list" element={<MerchantList />} />
            <Route path="/authority/activated-attribute" element={<ActivatedAttribute />} />
            <Route path="/authority/deactivate-attribute" element={<DeactivateAttribute />} />
            <Route path="/authority/activation-records" element={<ActivationRecords />} />
            <Route path="/authority/eligible-attribute" element={<EligibleAttribute />} />
            <Route path="/authority/attributes-list" element={<AttributeListAuthority />} />

            {/* Payment Provider Routes */}
            <Route path="/payment-provider/payment-channel-data" element={<PaymentChannelData />} />
            <Route path="/payment-provider/modify-policy" element={<ModifyPolicy />} />
            <Route path="/payment-provider/delete-policy" element={<DeletePolicy />} />
            <Route path="/payment-provider/policy-history" element={<PolicyHistory />} />
            <Route path="/payment-provider/attribute-list" element={<PaymentAttributeList />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
