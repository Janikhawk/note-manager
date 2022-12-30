import {NoticeList} from "../../components/notice/Notice-list";
import {useSelector} from "react-redux";
import {selectByDirectoryId} from "../../store";
import {useParams} from "react-router-dom";
import DefaultIndex from "../Default-page/Default-index";

export const DirectoryContent = () => {
    const {directoryId = 1} = useParams();
    const noticeList = useSelector(selectByDirectoryId(directoryId));

    return (noticeList && noticeList.length ? <NoticeList noticeList={noticeList}/> : <DefaultIndex/>);
}