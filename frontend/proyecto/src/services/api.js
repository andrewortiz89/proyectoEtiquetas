// frontend/proyecto/src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // ajusta si tu backend corre en otro puerto
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
