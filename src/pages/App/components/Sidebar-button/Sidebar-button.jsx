import './Sidebar-button.css';
import Button from "../../../../components/Button/Button";
import {MdAddCircleOutline, MdMode, MdOutlineDeleteForever} from "react-icons/md";
import {deleteDirectoryAsync} from "../../../../store";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export default function SidebarButton() {

    const selectedDirectory = useSelector(state => state.directories.selectedDirectory);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateClick = () => {
        navigate(`directory/${selectedDirectory}/new`);
    }

    const handleEditClick = () => {
        navigate(`directory/${selectedDirectory}/edit`);
    }

    const handleDeleteClick = () => {
        let text = "Are you sure to delete selected directory?\nAll notices inside of that directory will also be deleted.";
        if (window.confirm(text) == true) {
            dispatch(deleteDirectoryAsync(selectedDirectory))
        }
    }

    return (
        <div className="sidebar-buttons">
            <Button className='sidebar-button' icon={MdAddCircleOutline} type='button' onClick={() => handleCreateClick()}/>
            <Button className='sidebar-button' icon={MdMode} type='button' onClick={() => handleEditClick()}/>
            <Button className='sidebar-button' icon={MdOutlineDeleteForever} type='button' onClick={() => handleDeleteClick()}/>
        </div>
    )
}