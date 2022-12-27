import {useEffect} from "react";
import {Form, Outlet, redirect, useNavigate, useNavigation, useSubmit} from "react-router-dom";
import './root.css';
import Folder from "../components/directory/Folder";
import {MdAddCircleOutline, MdMode, MdOutlineDeleteForever} from "react-icons/md";
import Button from "../components/Button/button";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteDirectoryAsync,
    getDirectoriesAsync,
    selectAllDirectories,
    selectRootLevel
} from "../store/directory-slice";


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

    const dispatch = useDispatch();
    const modifiedDirectories = useSelector(selectAllDirectories);
    const selectedFolder = useSelector(state => state.directories.selectedFolder);

    useEffect(() => {
        dispatch(getDirectoriesAsync());
    }, [dispatch])

    useEffect(() => {
        if (!!selectedFolder) {
            navigate(`directory/${selectedFolder}`);
        } else {
            navigate('/');
        }
    }, [selectedFolder])

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('searchInput');

    const handleEditClick = () => {
        navigate(`directory/${selectedFolder}/edit`);
    }

    const handleDeleteClick = () => {
        let text = "Are you sure to delete selected folder?\nAll notices inside of that folder will also be deleted.";
        if (window.confirm(text) == true) {
            dispatch(deleteDirectoryAsync(selectedFolder))
        }
    }

    return (
        <>
        <div className="parent-sidebar">
            <div className="sidebar-buttons">
                <Form method="post">
                    <Button className='sidebar-button' icon={MdAddCircleOutline} type='submit'/>
                </Form>
                <Button className='sidebar-button' icon={MdMode} type='button' onClick={() => handleEditClick()}/>
                <Button className='sidebar-button' icon={MdOutlineDeleteForever} type='button' onClick={() => handleDeleteClick()}/>
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
                    <Folder
                        idList={selectRootLevel(modifiedDirectories)}
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