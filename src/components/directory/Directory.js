import * as icons from "react-icons/md";
import * as faIcons from "react-icons/fa";
import './Directory.css';
import {useDispatch, useSelector} from "react-redux";
import {entities, toggleDirectory} from "../../store/directory-slice";

export const Directory = ({idList}) => {
    const directoriesMap = useSelector(entities);
    const selectedDirectory = useSelector(state => state.directories.selectedDirectory);

    const dispatch = useDispatch();

    return (idList.map((id) => (
        <div key={directoriesMap[id].id}>
            <div
                className={`directory-row ${directoriesMap[id].id === selectedDirectory ? 'selected' : ''}` }
                onClick={() => dispatch(toggleDirectory(directoriesMap[id].id))}
            >
                <DirectoryArrow node={directoriesMap[id]}/>
                <span>{directoriesMap[id].isOpen ? <faIcons.FaRegFolderOpen/> : <faIcons.FaRegFolder/>}</span>
                <span>{directoriesMap[id].name}</span>
            </div>
            <div style={{display: directoriesMap[id].isOpen ? 'block' : 'none', paddingLeft: 20}}>
                {directoriesMap[id].children && <Directory idList={directoriesMap[id].children} directoriesMap={directoriesMap} />}
            </div>
        </div>
    )));
};

function DirectoryArrow({ node }) {
    if (!node.children?.length) return <span className='left-space'></span>;
    return (
        <span>
            {node.isOpen ? <icons.MdArrowDropDown /> : <icons.MdArrowRight />}
        </span>
    );
}