import {NoticeList} from "../../components/notice/Notice-list";
import {useSelector} from "react-redux";
import {selectByDirectoryId} from "../../store";
import {useParams} from "react-router-dom";

export const DirectoryContent = () => {
    const {directoryId} = useParams();
    const noticeList = useSelector(selectByDirectoryId(directoryId));

    return <NoticeList noticeList={noticeList}/>;
}