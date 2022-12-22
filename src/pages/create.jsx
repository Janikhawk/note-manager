import { useState } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { createNote, updateNote } from "../services/note-service";

export async function createAction({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const note = await createNote({parentId: params.noteId, ...updates});
    return redirect(`/notes/${note.id}`);
}

export default function CreateNote() {
    const [note, setNote] = useState({title: null, description: null, type: null})

    const navigate = useNavigate();

    return (
        <Form method="post" id="note-form">
            <label>
                <span>Type</span>
                <input type="radio" name="type" value='FILE' onChange={(event) => setNote({...note, type: event.target.value})}/> File
                <input type="radio" name="type" value='FOLDER' onChange={(event) => setNote({...note, type: event.target.value, description: null})}/> Folder
            </label>
            <label>
                <span>Title</span>
                <input
                    className="text-input"
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={note.title}
                    onChange={(event) => setNote({ ...note, title: event.target.value})}
                />
            </label>
            <>
            {note.type === 'FILE' ? (
            <label>
                <span>Description</span>
                <textarea
                    name="description"
                    defaultValue={note.description}
                    rows={6}
                />
            </label>
            ) : (<></>)}
            </>
            
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