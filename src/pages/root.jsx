import {useEffect, useState} from "react";
import {Form, Outlet, redirect, useNavigate, useNavigation, useParams, useSubmit} from "react-router-dom";
import './root.css';
import Folder from "../components/directory/Folder";
import {MdAddCircleOutline, MdMode, MdOutlineDeleteForever} from "react-icons/md";
import Button from "../components/Button/button";
import {useDispatch, useSelector} from "react-redux";
import {getDirectoriesAsync, toggleFolder} from "../store/reducers/directory-slice";


// export async function rootLoader({request}) {
//     const url = new URL(request.url);
//     const searchInput = url.searchParams.get('searchInput');
//     const directories = await getDirectories(searchInput);
//     return {data: directories, searchInput};
// }

export async function rootAction({request, params}) {
    const urlArr = window.location.pathname.split('/');
    const parentNoteId = urlArr[urlArr.length - 1];
    return redirect(`/directory/${parentNoteId}/new`)
}

export default function Root() {
    const searchInput = '';
    const navigation = useNavigation();
    const navigate = useNavigate();
    const submit = useSubmit();
    const {folderId} = useParams();

    const [selectedNote, setSelectedNote] = useState(folderId ? folderId : null);

    const dispatch = useDispatch();
    const directories = useSelector((state) => state.directories.data);

    useEffect(() => {
        dispatch(getDirectoriesAsync());
    }, [dispatch])

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('searchInput');

    const selectNoteById = (folderId) => {
        if (selectedNote !== folderId) {
            setSelectedNote(folderId);
            navigate(`directory/${folderId}`);
        } else {
            setSelectedNote(null);
            navigate('/');
        }
    }

    const handleEditClick = () => {
        console.log('EDIT');
    }

    return (
        <>
        <div className="parent-sidebar">
            <div className="sidebar-buttons">
                <Form method="post">
                    <Button className='sidebar-button' icon={MdAddCircleOutline} type='submit'/>
                </Form>
                <Button className='sidebar-button' icon={MdMode} type='button' onClick={() => handleEditClick()}/>
                <Button className='sidebar-button' icon={MdOutlineDeleteForever} type='button' onClick={() => handleEditClick()}/>
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
                    <Folder folderList={directories} selectFolder={selectNoteById}/>
                </nav>
            </div>
        </div>
        <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
            <Outlet />
        </div>
        </>
    )
}