import {useState} from "react";
import * as icons from "react-icons/md";
import * as faIcons from "react-icons/fa";
import './Folder.css';
import {useDispatch} from "react-redux";
import {toggleFolder} from "../../store/reducers/directory-slice";

const Folder = ({folderList, selectFolder, node = 1}) => {
    console.log(folderList)
    const someList = folderList.filter(folder => folder.parentId === node);
    console.log(someList)
    const [list, setList] = useState(folderList);
    const dispatch = useDispatch();

    const expandFunction = (item, index) => {
        const tempList = [...list];
        //tempList[index].isOpen = !tempList[index].isOpen;
        dispatch(toggleFolder(item.id))
        //setList(tempList)
        //selectFolder(item.id);
    }

    return someList.map((folderItem, index) => (
        <div key={folderItem.id}>
            <div className='directory-row' onClick={() => expandFunction(folderItem, index)}>
                <FolderArrow node={folderItem}/>
                <span>{folderItem.isOpen ? <faIcons.FaRegFolderOpen/> : <faIcons.FaRegFolder/>}</span>
                <span>{folderItem.name}</span>
            </div>
            <div style={{display: folderItem.isOpen ? 'block' : 'none', paddingLeft: 20}}>
                {folderItem.children && <Folder someList={folderItem.children} selectFolder={selectFolder}/>}
            </div>
        </div>
    ));
};

export default Folder;

function FolderArrow({ node }) {
    if (!node.children) return <span className='left-space'></span>;
    return (
        <span>
            {node.isOpen ? <icons.MdArrowDropDown /> : <icons.MdArrowRight />}
        </span>
    );
}