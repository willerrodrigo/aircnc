import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.107:3333' //Configurado para o expo
});

export default api;