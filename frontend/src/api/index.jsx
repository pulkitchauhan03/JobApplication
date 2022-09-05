import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });
// const API = axios.create({ baseURL: 'https://job-application-av.herokuapp.com/api' });

export const fetchCandidates = () => API.get('/');
export const createCandidate = (newPost) => API.post('/add/', newPost);
export const deleteCandidate = (id) => API.delete(`/delete/${id}/`);
export const getResume = (id) => API.get(`/resume/${id}`);
export const getCandidate = (id) => API.get(`/details/${id}/`);
export const updateStatus = (id, status) => API.patch(`/status-update/${id}`, status);