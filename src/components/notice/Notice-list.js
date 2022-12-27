import {Notice} from './Notice';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import './Notice-list.css';
import {selectByDirectoryId} from "../../store/notice-slice";

export const NoticeList = () => {
    const {directoryId} = useParams();
    const noticeList = useSelector(selectByDirectoryId(directoryId));

    return (
        <>
            {noticeList.length > 0 ?
                (
                    <div className='note-list'>
                        {noticeList.map((notice) => (
                            <Notice key={notice.id} notice={notice}/>
                        ))}
                    </div>
                ) :
                (<i>No notices in current directory</i>)
            }
        </>
    )
};
