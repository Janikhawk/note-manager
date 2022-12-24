import { MdDeleteForever } from 'react-icons/md';

const Note = ({title, description}) => {
    return <div className='note'>
        <span>{title}</span>
        <span>{description}</span>
        <div className='note-footer'>
            <small></small>
            <MdDeleteForever className='delete-icon' size='1.3em' />
        </div>
    </div>
};

export default Note;