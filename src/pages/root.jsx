import {useEffect} from "react";
import {Form, Outlet, redirect, useNavigate, useNavigation} from "react-router-dom";
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
import {Input} from "../components/Input/input";


export async function rootAction({request, params}) {
    const urlArr = window.location.pathname.split('/');
    const parentNoteId = urlArr[urlArr.length - 1];
    return redirect(`/directory/${parentNoteId}/new`)
}

export default function Root() {
    const navigation = useNavigation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const directoriesRootIds = useSelector(selectRootLevel());
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


    const handleEditClick = () => {
        navigate(`directory/${selectedFolder}/edit`);
    }

    const handleDeleteClick = () => {
        let text = "Are you sure to delete selected folder?\nAll notices inside of that folder will also be deleted.";
        if (window.confirm(text) == true) {
            dispatch(deleteDirectoryAsync(selectedFolder))
        }
    }

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('searchInput');

    return (
        <>
            <div>
                <div className='search'>
                    <form id='search-form' role='search'>
                        <Input searching={searching}/>
                        <div className='search-spinner' aria-hidden hidden={!searching}/>
                        <div className='sr-only' aria-live="polite"/>
                    </form>
                </div>
            </div>
            <div className='root-body'>
                <div className="parent-sidebar">
                    <div className="sidebar-buttons">
                        <Form method="post">
                            <Button className='sidebar-button' icon={MdAddCircleOutline} type='submit'/>
                        </Form>
                        <Button className='sidebar-button' icon={MdMode} type='button' onClick={() => handleEditClick()}/>
                        <Button className='sidebar-button' icon={MdOutlineDeleteForever} type='button' onClick={() => handleDeleteClick()}/>
                    </div>
                    <div id='sidebar'>
                        <nav>
                            <Folder
                                idList={directoriesRootIds}
                            />
                        </nav>
                    </div>
                </div>
                <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}