import {Notice} from './Notice';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getNoticesAsync, selectByDirectoryId} from "../../store/notice-slice";

export const NoticeList = () => {
    const {directoryId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNoticesAsync());
    }, [dispatch])

    const noticeList = useSelector(selectByDirectoryId(directoryId));

    return (
        <div className='note-list'>
            {noticeList.map((notice) => (
                <Notice key={notice.id} notice={notice}/>
            ))}
        </div>
    )
};
