import {Form, useLoaderData, redirect, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectDirectoryById, updateDirectoryAsync} from "../store/directory-slice";

export async function editAction({ request, params }) {
    console.log(request);
    console.log(params);
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    //await updateNote(params.noteId, updates);
    return redirect(`/notes/${params.noteId}`);
}

export default function EditFolder() {
    const navigate = useNavigate();
    const {folderId} = useParams();
    const selectedFolder = useSelector(state => selectDirectoryById(state, folderId));
    const folderData = {...selectedFolder};

    const dispatch = useDispatch();

    const changeName = (event) => {
        folderData.name = event.target.value;
    }

    const updateDirectory = async (event) => {
        try {
            event.preventDefault();
            dispatch(updateDirectoryAsync(folderData));
            navigate(-1);
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form id="note-form" onSubmit={(e) => updateDirectory(e)}>
            <label>
                <span>Name</span>
                <input
                    className="text-input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    defaultValue={folderData.name}
                    onChange = {changeName}
                />
            </label>
            {/*<label>*/}
            {/*    <span>Title</span>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        name="title"*/}
            {/*        placeholder="Title"*/}
            {/*        defaultValue={note.title}*/}
            {/*    />*/}
            {/*</label>*/}
            {/*<label>*/}
            {/*    <span>Description</span>*/}
            {/*    <textarea*/}
            {/*        name="description"*/}
            {/*        defaultValue={note.description}*/}
            {/*        rows={6}*/}
            {/*    />*/}
            {/*</label>*/}
            <p>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => { navigate(-1); }}
                >Cancel</button>
            </p>
        </form>
    );
}