import {MdDeleteForever, MdModeEdit} from 'react-icons/md';
import {useDispatch} from "react-redux";
import './Notice.css';
import {deleteNoticeAsync} from "../../store/notice-slice";
import {useNavigate} from "react-router-dom";
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "./Notice-list";
import {memo} from "react";

export function Notice({notice, moveNotice, id, index}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [, drag] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: { id, index },
            end: (item, monitor) => {
                const { id: droppedId, index: fromIndex } = item;
                if (!monitor.didDrop()) {
                    console.log(droppedId, index, fromIndex)
                    moveNotice(droppedId, index, fromIndex)
                }
            },
        }),
        [id, index, moveNotice],
    )

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop(obj) {
                const { id: draggedId, index: fromIndex } = obj;
                if (draggedId !== id) {
                    moveNotice(draggedId, index, fromIndex)
                }
            },
        }),
        [id, index, moveNotice],
    )

    const handleEditNotice = () => {
        navigate(`/notice/${notice.id}/edit`)
    }

    const handleDeleteNotice = () => {
        let text = "Are you sure to delete selected notice?";
        if (window.confirm(text) === true) {
            dispatch(deleteNoticeAsync(notice.id))
        }
    }

    return <div className='note' ref={(node) => drag(drop(node))}>
        <span>{notice.title}</span>
        <span>{notice.description}</span>
        <div className='note-footer'>
            <MdModeEdit className='delete-icon' size='1.3em' onClick={handleEditNotice}/>
            <MdDeleteForever className='delete-icon' size='1.3em' onClick={handleDeleteNotice}/>
        </div>
    </div>
};
