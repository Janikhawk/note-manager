import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { createNote, updateNote } from "../services/note-service";

export async function createAction({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const note = await createNote();
    await updateNote(note.id, updates);
    return redirect(`/notes/${note.id}`);
}

export default function CreateNote() {
    const note = {
        title: null,
        description: null
    };
    const navigate = useNavigate();

    return (
        <Form method="post" id="note-form">
            {/* <p>
                <span>Title</span>
                <input
                    placeholder="Title"
                    aria-label="Title"
                    type="text"
                    name="title"
                    defaultValue={note.title}
                />
            </p> */}
            <label>
                <span>Title</span>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={note.title}
                />
            </label>
            {/* <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={note.avatar}
                />
            </label> */}
            <label>
                <span>Description</span>
                <textarea
                    name="description"
                    defaultValue={note.description}
                    rows={6}
                />
            </label>
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