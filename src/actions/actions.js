export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_HIDEMODAL = 'SET_HIDEMODAL';
export const SET_OPENMODAL = 'SET_OPENMODAL';

export function setMovies(value) {
    return { type: SET_MOVIES, value };
}   

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setProfile(value) {
    return { type: SET_PROFILE, value };
}

export function setHideModal(value) {
    return { type: SET_HIDEMODAL, value };
}

export function setOpenModal(value) {
    return { type: SET_OPENMODAL, value };
}