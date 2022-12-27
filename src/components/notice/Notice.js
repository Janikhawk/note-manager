import {MdDeleteForever, MdModeEdit} from 'react-icons/md';
import {useDispatch} from "react-redux";
import './Notice.css';
import {deleteNoticeAsync} from "../../store/notice-slice";
import {useNavigate} from "react-router-dom";

export const Notice = ({notice}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditNotice = () => {
        console.log(notice);
        navigate(`/notice/${notice.id}/edit`)
    }

    const handleDeleteNotice = () => {
        let text = "Are you sure to delete selected notice?";
        if (window.confirm(text) === true) {
            dispatch(deleteNoticeAsync(notice.id))
        }
    }

    return <div className='note'>
        <span>{notice.title}</span>
        <span>{notice.description}</span>
        <div className='note-footer'>
            <MdModeEdit className='delete-icon' size='1.3em' onClick={handleEditNotice}/>
            <MdDeleteForever className='delete-icon' size='1.3em' onClick={handleDeleteNotice}/>
        </div>
    </div>
};
