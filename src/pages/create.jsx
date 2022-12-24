import {useState} from "react";
import {Form, redirect, useNavigate, useParams} from "react-router-dom";
import {createDirectory, createNote} from "../services/note-service";

export async function createAction({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const folderId = params.folderId ? params.folderId : 1;
    updates.type === 'FILE' ?
        await createNote({...updates, directoryId: folderId}) :
        await createDirectory({...updates, parentId: folderId });
    return redirect(`/folder/${params.folderId}`);
}

const noteInitialValue = {title: null, description: null, directoryId: null};
const folderInitialValue = {parentId: 1, name: null};

export default function CreateNote() {
    const [data, setData] = useState({
        dataType: 'FILE',
        note: noteInitialValue,
        folder: folderInitialValue
    })

    const navigate = useNavigate();

    return (
        <Form method="post" id="note-form">
            <label>
                <>
                    <span>Type</span>
                    <input type="radio" name="type" value='FILE' onChange={(event) => setData({...data, folder: folderInitialValue, dataType: event.target.value})}/> File
                    <input type="radio" name="type" value='FOLDER' onChange={(event) => setData({...data, note: noteInitialValue, dataType: event.target.value})}/> Folder
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
                        defaultValue={data.folder.name}
                        onChange={(event) => setData({ ...data, folder: {...data.folder, name: event.target.value}})}
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
        </Form>
    );
}