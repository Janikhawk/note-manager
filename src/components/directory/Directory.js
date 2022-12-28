import * as icons from "react-icons/md";
import * as faIcons from "react-icons/fa";
import './Directory.css';
import {useDispatch, useSelector} from "react-redux";
import {entities, selectAvailableIds, selectDirectory, toggleDirectory} from "../../store/directory-slice";

export const Directory = ({idList}) => {
    const directoriesMap = useSelector(entities);
    const selectedDirectory = useSelector(state => state.directories.selectedDirectory);
    const directoryWithSearchedNoticesIdList = useSelector(selectAvailableIds());
    const availableIdList = directoryWithSearchedNoticesIdList.length ? idList.filter(id => directoryWithSearchedNoticesIdList.includes(id)) : idList;

    const dispatch = useDispatch();
    const handleArrowClick = (directoryId) => {
        dispatch(toggleDirectory(directoryId))
    }

    return (availableIdList.map((id) => (
        <div key={directoriesMap[id].id}>
            <div
                className={`directory-row ${directoriesMap[id].id === selectedDirectory ? 'selected' : ''}` }
                onClick = {() => dispatch(selectDirectory(directoriesMap[id].id))}
            >
                <DirectoryArrow node={directoriesMap[id]}  onClick={() => handleArrowClick(directoriesMap[id].id)}/>
                <span>{directoriesMap[id].isOpen ? <faIcons.FaRegFolderOpen/> : <faIcons.FaRegFolder/>}</span>
                <span>{directoriesMap[id].name}</span>
            </div>
            <div style={{display: directoriesMap[id].isOpen ? 'block' : 'none', paddingLeft: 20}}>
                {directoriesMap[id].children && <Directory idList={directoriesMap[id].children} directoriesMap={directoriesMap} />}
            </div>
        </div>
    )));
};

function DirectoryArrow({ node, onClick }) {
    if (!node.children?.length) return <span className='left-space'></span>;
    return (
        <span onClick={onClick}>
            {node.isOpen ? <icons.MdArrowDropDown /> : <icons.MdArrowRight />}
        </span>
    );
}