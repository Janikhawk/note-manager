import './App.css';
import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDirectoriesAsync, getNoticesAsync} from "../../store";
import Sidebar from "./components/Sidebar/Sidebar";
import SidebarButton from "./components/Sidebar-button/Sidebar-button";
import SearchBar from "../../components/Search-bar/Search-bar";


export default function App() {
    const navigate = useNavigate();

    const selectedDirectory = useSelector(state => state.directories.selectedDirectory);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDirectoriesAsync());
        dispatch(getNoticesAsync());
    }, [dispatch])

    useEffect(() => {
        if (!!selectedDirectory) {
            navigate(`directory/${selectedDirectory}`);
        } else {
            navigate('/');
        }
    }, [selectedDirectory]);

    return (
        <>
            <SearchBar/>
            <div className='root-body'>
                <div className="parent-sidebar">
                    <SidebarButton/>
                    <Sidebar/>
                </div>
                {/*<div className={['detail', navigation.state === "loading" ? "loading" : ""].join(" ")}>*/}
                <div className='detail'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}