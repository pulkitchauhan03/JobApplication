import { FETCH_ALL, CREATE, RESUME, DELETE, LIKE, UPDATE } from '../constants/actionTypes';

export default (candidates = [], action) => {
    switch (action.type) {
        case DELETE:
            return candidates.filter((candidate) => candidate.id !== action.payload); 
        case FETCH_ALL:
            // console.log(action.payload);
            return action.payload;
        case CREATE:
            return [ ...candidates, action.payload];
        case UPDATE:
            return candidates.map((candidate) => candidate.id === action.payload.id ? action.payload : candidate);
        default:
            return candidates;
    }
}