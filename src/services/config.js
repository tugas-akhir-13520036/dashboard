import axios from "axios";

export const merchantClient = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json",
    },
});

export const authorityClient = axios.create({
    baseURL: "http://localhost:3002",
    headers: {
        "Content-Type": "application/json",
    },
});

export const paymentProviderClient = axios.create({
    baseURL: "http://localhost:3003",
    headers: {
        "Content-Type": "application/json",
    },
});