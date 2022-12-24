import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

export async function editAction({ request, params }) {
    console.log(request);
    console.log(params);
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    //await updateNote(params.noteId, updates);
    return redirect(`/notes/${params.noteId}`);
}

export default function EditNote() {
    const note = useLoaderData();
    const navigate = useNavigate();

    return (
        <Form method="post" id="note-form">
            <label>
                <span>Title</span>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={note.title}
                />
            </label>
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
                    onClick={() => { navigate(-1); }}
                >Cancel</button>
            </p>
        </Form>
    );
}