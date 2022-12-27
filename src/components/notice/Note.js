import {MdDeleteForever} from 'react-icons/md';
import {useDispatch} from "react-redux";
import './Note.css';
import {deleteNoticeAsync} from "../../store/notice-slice";

const Note = ({notice}) => {

    const dispatch = useDispatch();

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
            <small></small>
            <MdDeleteForever className='delete-icon' size='1.3em' onClick={handleDeleteNotice}/>
        </div>
    </div>
};

export default Note;