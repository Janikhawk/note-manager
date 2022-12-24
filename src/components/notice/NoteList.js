import Note from './Note';
import {getNoteListByFolderId, updateNote} from "../../services/note-service";
import {useLoaderData} from "react-router-dom";

export async function folderLoader({params}) {
    const notices =  await getNoteListByFolderId(params.folderId);
    return {notices};
}

export async function folderAction({request, params}) {
    let formData = await request.formData();
    // return updateNote(params.folderId, {
    //     favorite: formData.get('favorite') === 'true'
    // });
}

const NoteList = () => {
    const {notices} = useLoaderData();
    return (
        <div className='note-list'>
            {notices.map((notice) => (
                <Note key={notice.id} title={notice.title} description={notice.description}/>
            ))}
        </div>
    )
};

export default NoteList;