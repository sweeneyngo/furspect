import http from './http-common';

export const upload = (file, progress) => {
    let formData = new FormData();
    formData.append('file', file);
    return http.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        progress,
    });
};

export const getFiles = () => {
    return http.get('/files');
};
