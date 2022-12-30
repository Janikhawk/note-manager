import './Create.css';
import '../../styles/input.css';
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createDirectoryAsync, createNoticeAsync} from "../../store";
import Tag from "./Tag/Tag";


export default function CreateNote() {
    const {directoryId = 1} = useParams();
    const noteInitialValue = {title: null, description: null, directoryId: directoryId, tags: []};
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

    const handleTagAddition = (tags) => {
        setData({...data, note: ({...data.note, tags})});
    }

    return (
        <form className="form" onSubmit={createDirectory}>
            <label className='label'>
                <>
                    <span>Type</span>
                    <input type="radio" name="type" value='FILE' onChange={(event) => setData({...data, directory: directoryInitialValue, dataType: event.target.value})}/> File
                    <input type="radio" name="type" value='DIRECTORY' onChange={(event) => setData({...data, note: noteInitialValue, dataType: event.target.value})}/> Folder
                </>
            </label>
            {data.dataType === 'FILE' ? (
                <>
                    <label className='label'>
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
                    <label className='label'>
                        <span>Description</span>
                        <textarea
                            className='text-input'
                            name="description"
                            defaultValue={data.note.description}
                            rows={6}
                            onChange={(event) => setData({ ...data, note: {...data.note, description: event.target.value}})}
                        />
                    </label>
                    <label className='label'>
                        <span>Tags</span>
                        <Tag
                            defaultTags={data.note.tags}
                            onTagAdded={handleTagAddition}
                        />
                    </label>
                </>
            ) : (
                <label className='label'>
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
            <p className='form-buttons'>
                <button className='button' type="submit">Save</button>
                <button
                    className='button'
                    type="button"
                    onClick={() => navigate(-1)}
                >Cancel</button>
            </p>
        </form>
    );
}