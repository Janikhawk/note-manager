import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateNote } from "../services/note-service";

export async function editAction({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateNote(params.noteId, updates);
    return redirect(`/notes/${params.noteId}`);
}

export default function EditNote() {
    const note = useLoaderData();
    const navigate = useNavigate();

    return (
        <Form method="post" id="note-form">
            {/* <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={note.first}
                />
                <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={note.last}
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