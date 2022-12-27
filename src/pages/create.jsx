import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createDirectoryAsync} from "../store/directory-slice";
import {createNoticeAsync} from "../store/notice-slice";


export default function CreateNote() {
    const {directoryId = 1} = useParams();
    const noteInitialValue = {title: null, description: null, directoryId: directoryId};
    const directoryInitialValue = {parentId: directoryId, name: null};

    const [data, setData] = useState({
        dataType: 'FILE',
        note: noteInitialValue,
        directory: directoryInitialValue
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createDirectory = async (event) => {
        try {
            event.preventDefault();
            if (data.dataType === 'FILE') {
                dispatch(createNoticeAsync(data.note));

            } else {
                dispatch(createDirectoryAsync(data.directory));
            }
            navigate(-1);
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form id="note-form" onSubmit={createDirectory}>
            <label>
                <>
                    <span>Type</span>
                    <input type="radio" name="type" value='FILE' onChange={(event) => setData({...data, directory: directoryInitialValue, dataType: event.target.value})}/> File
                    <input type="radio" name="type" value='DIRECTORY' onChange={(event) => setData({...data, note: noteInitialValue, dataType: event.target.value})}/> Folder
                </>
            </label>
            {data.dataType === 'FILE' ? (
                <>
                    <label>
                        <span>Title</span>
                        <input
                            className="text-input"
                            type="text"
                            name="title"
                            placeholder="Title"
                            defaultValue={data.note.title}
                            onChange={(event) => setData({ ...data, note: {...data.note, title: event.target.value}})}
                        />
                    </label>
                    <label>
                        <span>Description</span>
                        <textarea
                            name="description"
                            defaultValue={data.note.description}
                            rows={6}
                            onChange={(event) => setData({ ...data, note: {...data.note, description: event.target.value}})}
                        />
                    </label>
                </>
            ) : (
                <label>
                    <span>Name</span>
                    <input
                        className="text-input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        defaultValue={data.directory.name}
                        onChange={(event) => setData({ ...data, directory: {...data.directory, name: event.target.value}})}
                    />
                </label>
            )}
            <p>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => { navigate(-1);}}
                >Cancel</button>
            </p>
        </form>
    );
}