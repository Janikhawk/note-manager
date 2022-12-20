import { useLoaderData, Form, useFetcher } from "react-router-dom";
import { getNote, updateNote } from "../note-service";

export async function noteLoader({params}) {
    return getNote(params.noteId);
}

export async function noteAction({request, params}) {
    let formData = await request.formData();
    return updateNote(params.noteId, {
        favorite: formData.get('favorite') === 'true'
    });
}

export default function Note() {
    const note = useLoaderData();

    return (
    <div id="note">
        {/* <div>
            <img src={note.avatar || null} alt={note.name} key={note.avatar} />
        </div> */}
        <div>
            <h1>
                {note.title ? (
                    <>
                        {note.title}
                    </>
                ) : (
                    <i>No title</i>
                )}{" "}
                <Favorite note={note}/>
            </h1>

            {note.description && <p>{note.description}</p>}

            <div>
                <Form action='edit'>
                    <button type='submit'>Edit</button>
                </Form>
                <Form
                    method="post"
                    action="destroy"
                    onSubmit={(event) => {
                        if (!window.confirm('Please confirm you want to delete this record')) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button type='submit'>Delete</button>
                </Form>
            </div>
        </div>
    </div>
    )
}

function Favorite({ note }) {
    // yes, this is a `let` for later
    const fetcher = useFetcher();

    let favorite = note.favorite;
    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}