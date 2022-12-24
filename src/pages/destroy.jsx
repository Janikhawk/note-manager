import { redirect } from "react-router-dom";

export async function destroyAction({ params }) {
    //await deleteNote(params.noteId);
    return redirect("/");
}