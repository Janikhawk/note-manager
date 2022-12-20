import { useEffect } from "react";
import { NavLink, Outlet, Form, redirect, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import { createNote, getNotes } from "../note-service";


export async function rootLoader({request}) {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const notes = await getNotes(q);
    return {notes, q};
}

export async function rootAction() {
    return redirect(`/notes/new`)
}

export default function Root() {
    const {notes, q} = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

    useEffect(() => {
        document.getElementById('q').value = q;
    }, [q]);

    return (
        <>
            <div id='sidebar'>
                <div>
                    <Form id='search-form' role='search'>
                        <input
                            id='q'
                            className={searching ? 'loading' : ''}
                            aria-label='Search notes'
                            placeholder='Search'
                            type='search'
                            name='q'
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q === null;
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
                    {notes.length ? (
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
                    )}
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