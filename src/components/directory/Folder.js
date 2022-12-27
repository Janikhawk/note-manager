import * as icons from "react-icons/md";
import * as faIcons from "react-icons/fa";
import './Folder.css';
import {useDispatch, useSelector} from "react-redux";
import {entities, toggleFolder} from "../../store/reducers/directory-slice";

const Folder = ({idList}) => {
    const directoriesMap = useSelector(entities);
    const selectedFolder = useSelector(state => state.directories.selectedFolder);

    const dispatch = useDispatch();

    return (idList.map((id) => (
        <div key={directoriesMap[id].id}>
            <div
                className={`directory-row ${directoriesMap[id].id === selectedFolder ? 'selected' : ''}` }
                onClick={() => dispatch(toggleFolder(directoriesMap[id].id))}
            >
                <FolderArrow node={directoriesMap[id]}/>
                <span>{directoriesMap[id].isOpen ? <faIcons.FaRegFolderOpen/> : <faIcons.FaRegFolder/>}</span>
                <span>{directoriesMap[id].name}</span>
            </div>
            <div style={{display: directoriesMap[id].isOpen ? 'block' : 'none', paddingLeft: 20}}>
                {directoriesMap[id].children && <Folder idList={directoriesMap[id].children} directoriesMap={directoriesMap} />}
            </div>
        </div>
    )));
};

export default Folder;

function FolderArrow({ node }) {
    if (!node.children?.length) return <span className='left-space'></span>;
    return (
        <span>
            {node.isOpen ? <icons.MdArrowDropDown /> : <icons.MdArrowRight />}
        </span>
    );
}