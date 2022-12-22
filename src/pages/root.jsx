import { useEffect, useState } from "react";
import { NavLink, Outlet, Form, redirect, useLoaderData, useNavigation, useSubmit, useNavigate } from "react-router-dom";
import FolderTree from "./folder-tree";
import { createNote, getNotes } from "../services/note-service";


export async function rootLoader({request}) {
    const url = new URL(request.url);
    const searchInput = url.searchParams.get('searchInput');
    const notes = await getNotes(searchInput);
    return {notes, searchInput};
}

export async function rootAction({request, params}) {
    const urlArr = window.location.pathname.split('/');
    const parentNoteId = urlArr[urlArr.length - 1];
    return redirect(`/notes/${parentNoteId}/new`)
}

export default function Root() {
    const {notes, searchInput} = useLoaderData();
    console.log(notes);
    const navigation = useNavigation();
    const navigate = useNavigate();
    const submit = useSubmit();
    const [data, setData] = useState({notes, searchInput});

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('searchInput');

    useEffect(() => {
        document.getElementById('searchInput').value = searchInput;
        //setData({notes, searchInput})
    }, [searchInput]);

    const selectNoteById = (noteId) => {
        if (!noteId) return;
        navigate(`notes/${noteId}`)
    }

    return (
        <>
            <div id='sidebar'>
                <div>
                    <Form id='search-form' role='search'>
                        <input
                            id='searchInput'
                            className={[searching ? 'loading' : '', 'text-input'].join(' ')}
                            aria-label='Search notes'
                            placeholder='Search'
                            type='search'
                            name='searchInput'
                            defaultValue={searchInput}
                            onChange={(event) => {
                                const isFirstSearch = searchInput === null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch
                                });
                            }}
                        />
                        <div id='search-spinner' aria-hidden hidden={!searching}/>
                        <div className='sr-only' aria-live="polite"/>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {console.log(notes)}
                    <FolderTree folderData={notes} selectNoteById={selectNoteById}/>
                    {/* {notes.length ? (
                        <ul>
                            {notes.map((note) => (
                                <li key={note.id}>
                                    <NavLink 
                                        to={`notes/${note.id}`}
                                        className={({isActive, isPending}) => isActive ? 'active' : isPending ? 'pending' : ''}
                                    >
                                        {note.title ? (<>{note.title}</>) : (<i>No title</i>)}{" "}
                                        {note.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No notes</i>
                        </p>
                    )} */}
                </nav>
            </div>
            <div id="detail" className={
                navigation.state === "loading" ? "loading" : ""
            }>
                <Outlet />
            </div>
        </>
    )
}