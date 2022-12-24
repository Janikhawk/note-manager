import { useEffect, useState } from "react";
import { NavLink, Outlet, Form, redirect, useLoaderData, useNavigation, useSubmit, useNavigate, useParams } from "react-router-dom";
import FolderTree from "./folder-tree";
import { createNote, getDirectories } from "../services/note-service";
import './root.css';
import { useSelector } from "react-redux";


export async function rootLoader({request}) {
    const url = new URL(request.url);
    const searchInput = url.searchParams.get('searchInput');
    const notes = await getDirectories(searchInput);
    return {notes, searchInput};
}

export async function rootAction({request, params}) {
    const urlArr = window.location.pathname.split('/');
    const parentNoteId = urlArr[urlArr.length - 1];
    return redirect(`/notes/${parentNoteId}/new`)
}

export default function Root() {
    const {notes, searchInput} = useLoaderData();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const submit = useSubmit();
    const [data, setData] = useState({notes, searchInput});
    let {noteId} = useParams();
    const [selectedNote, setSelectedNote] = useState(noteId ? noteId : null);

    const someState = useSelector((state) => state);
    console.log('store', someState);

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('searchInput');

    // useEffect(() => {
    //     document.getElementById('searchInput').value = searchInput;
    //     //setData({notes, searchInput})
    // }, [searchInput]);

    const selectNoteById = (noteId) => {
        setSelectedNote(noteId);
        if (noteId) {
            navigate(`notes/${noteId}`);
        } else {
            navigate('/');
        }
    }

    return (
        <>
        <div className="parent-sidebar">
            <div className="sidebar-buttons">
                <Form method="post">
                    <button type="submit">Add</button>
                </Form>
                <button type="button">Edit</button>
                <button type="button">Remove</button>
            </div>
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
                </div>
                <nav>
                    <FolderTree
                        folderData={notes}
                        selectNoteById={selectNoteById}
                        selectedNoteId={selectedNote}
                        />
                </nav>
            </div>
        </div>
        <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
            <Outlet />
        </div>
        </>
    )
}