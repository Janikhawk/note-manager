import axios from "axios";

export const getNotices = () => {
    return axios.get('http://localhost:4200/notices');
};

export const createNotice = (notice) => {
    return axios.post('http://localhost:4200/notices', {...notice});
};

export const updateNotice = (notice) => {
    return axios.put(`http://localhost:4200/notices/${notice.id}`, {...notice});
};

export const deleteNotice = (noticeId) => {
    return axios.delete(`http://localhost:4200/notices/${noticeId}`);
};