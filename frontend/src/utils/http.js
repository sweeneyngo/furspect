import http from './http-common';
import axios from 'axios';

export const upload = (file, progress) => {
    let formData = new FormData();
    formData.append('file', file);
    return http.get('/inspect', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        progress,
    });
};

export const getFiles = () => {
    const config = {
        method: 'get',
        url: 'http://127.0.0.1:5000',
        headers: {
            'User-Agent': 'Axios - console app',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    };
    axios(config).then((resp) => {
        console.log(resp.data);
        return resp.data;
    });

    return '';
};
