import {useState} from "react";
import {
    Form,
    Outlet,
    redirect,
    useLoaderData,
    useNavigate,
    useNavigation,
    useParams,
    useSubmit
} from "react-router-dom";
import {getDirectories} from "../services/note-service";
import './root.css';
import {useSelector} from "react-redux";
import Folder from "../components/directory/Folder";
import {MdAddCircleOutline, MdMode, MdOutlineDeleteForever} from "react-icons/md";
import Button from "../components/Button/button";


export async function rootLoader({request}) {
    const url = new URL(request.url);
    const searchInput = url.searchParams.get('searchInput');
    const directories = await getDirectories(searchInput);
    return {directories, searchInput};
}

export async function rootAction({request, params}) {
    const urlArr = window.location.pathname.split('/');
    const parentNoteId = urlArr[urlArr.length - 1];
    return redirect(`/directory/${parentNoteId}/new`)
}

export default function Root() {
    const {directories, searchInput} = useLoaderData();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const submit = useSubmit();
    const [data, setData] = useState({directories, searchInput});
    let {noteId} = useParams();
    const [selectedNote, setSelectedNote] = useState(noteId ? noteId : null);

    const someState = useSelector((state) => state);
    //console.log('store', someState);

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('searchInput');

    // useEffect(() => {
    //     document.getElementById('searchInput').value = searchInput;
    //     //setData({notes, searchInput})
    // }, [searchInput]);

    const selectNoteById = (folderId) => {
        if (selectedNote != folderId) {
            setSelectedNote(folderId);
            navigate(`directory/${folderId}`);
        } else {
            setSelectedNote(null);
            navigate('/');
        }
    }

    return (
        <>
        <div className="parent-sidebar">
            <div className="sidebar-buttons">
                <Form method="post">
                    <Button className='sidebar-button' icon={MdAddCircleOutline} type='submit'/>
                </Form>
                <Button className='sidebar-button' icon={MdMode}/>
                <Button className='sidebar-button' icon={MdOutlineDeleteForever}/>
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