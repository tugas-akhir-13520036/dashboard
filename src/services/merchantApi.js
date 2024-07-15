import { merchantClient } from "./config";

export const getMerchantData = async () => {
    try {
        const response = await merchantClient.get("/merchant");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const proposeAttribute = async (data) => {
    try {
        const response = await merchantClient.post("/merchant/propose-attribute", data);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const pendingAttribute = async () => {
    try {
        const response = await merchantClient.get("/merchant/pending-attribute");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const paymentChannel = async () => {
    try {
        const response = await merchantClient.get("/payment/payment-channels");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const processPayment = async (data) => {
    try {
        const response = await merchantClient.post("/payment/process-payment", data);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const attributeHistory = async () => {
    try {
        const response = await merchantClient.get("/merchant/history");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const attributeList = async () => {
    try {
        const response = await merchantClient.get("/merchant/attribute");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}