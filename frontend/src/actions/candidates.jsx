import { FETCH_ALL, CREATE, RESUME, DELETE, LIKE, UPDATE } from '../constants/actionTypes';
import * as api from '../api';
import base64toBlob from '../components/controls/GetResume';
import download from 'downloadjs';

export const getCandidates = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCandidates();
        // console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const createCandidate = (post) => async (dispatch) => {
    try {
        const { data } = await api.createCandidate(post);
        dispatch({ type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteCandidate = (id) => async (dispatch) => {
    try {
        await api.deleteCandidate(id);
        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const getResume = (id) => async () => {
    try {
        const { data } = await api.getResume(id);
        console.log(typeof(data));
        download(base64toBlob(data), "resume", "application/pdf");
    } catch (error) {
        console.log(error);
    }
}

export const getCandidate = (id) => async () => {
    try {
        const { data } = await api.getCandidate(id);
        return(data);
    } catch(error) {
        console.log(error);
    }
}

export const updateStatus = (id, status) => async (dispatch) => {
    try {
        const { data } = await api.updateStatus(id, status);
        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}