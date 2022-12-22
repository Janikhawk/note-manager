import { redirect } from "react-router-dom";
import { deleteNote } from "../services/note-service";

export async function destroyAction({ params }) {
    await deleteNote(params.noteId);
    return redirect("/");
}