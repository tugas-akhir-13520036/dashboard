import { paymentProviderClient } from "./config";

export const paymentChannelData = async () => {
    try {
        const response = await paymentProviderClient.get("/payment-provider");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const paymentHistory = async () => {
    try {
        const response = await paymentProviderClient.get("/payment-provider/history");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const paymentAttributeList = async () => {
    try {
        const response = await paymentProviderClient.get("/payment-provider/attributes");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const modifyPolicy = async (data) => {
    try {
        const response = await paymentProviderClient.post("/payment-provider/channel-policy", data);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteChannelPolicy = async (data) => {
    try {
        const response = await paymentProviderClient.delete("/payment-provider/channel-policy", {
            data: data,
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}