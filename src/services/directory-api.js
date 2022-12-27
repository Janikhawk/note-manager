import axios from "axios";

export const getDirectories = () => axios.get('http://localhost:4200/directories');

export const createDirectory = (directory) => {
    return axios.post('http://localhost:4200/directories', {...directory});
};