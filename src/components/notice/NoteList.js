import Note from './Note';
import {getNoteListByFolderId} from "../../services/note-service";
import {useLoaderData, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getNoticesAsync, selectAllNotices, selectByDirectoryId} from "../../store/notice-slice";

// export async function folderLoader({params}) {
//     const noticeList = useSelector(selectByDirectoryId(folderId));
//     return {noticeList};
// }

export async function folderAction({request, params}) {
    let formData = await request.formData();
    // return updateNote(params.folderId, {
    //     favorite: formData.get('favorite') === 'true'
    // });
}

const NoteList = () => {
    const {folderId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNoticesAsync());
    }, [dispatch])

    const noticeList = useSelector(selectByDirectoryId(folderId));

    return (
        <div className='note-list'>
            {noticeList.map((notice) => (
                <Note key={notice.id} notice={notice}/>
            ))}
        </div>
    )
};

export default NoteList;