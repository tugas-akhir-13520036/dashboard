import { authorityClient } from "./config";

export const merchantList = async () => {
   try {
       const response = await authorityClient.get("/authority/merchant");
       return response.data;
   } catch (error) {
       throw new Error(error);
   }
}

export const attributesList = async () => {
    try {
         const response = await authorityClient.get("/authority/attributes");
         return response.data;
    } catch (error) {
         throw new Error(error);
    }
}

export const activationRecord = async () => {
    try {
        const response = await authorityClient.get("/authority/activation-record");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const merchantDataById = async (id) => {
    try {
        const response = await authorityClient.get(`/authority/merchant/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const activateAttribute = async (data) => {
    try {
        const response = await authorityClient.post("/authority/merchant/activate-attribute", data);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const deactiveAttribute = async (data) => {
    try {
        const response = await authorityClient.post("/authority/merchant/deactivate-attribute", data);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const getEligibleAttributes = async () => {
    try {
        const response = await authorityClient.get("/authority/eligible-attributes");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
