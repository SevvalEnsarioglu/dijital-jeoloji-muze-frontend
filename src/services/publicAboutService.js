import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/api/hakkimizda`;

export const getPublicAbout = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};
