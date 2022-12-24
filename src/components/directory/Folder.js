import {useState} from "react";
import * as icons from "react-icons/md";
import * as faIcons from "react-icons/fa";
import './Folder.css';

const Folder = ({folderList, selectFolder}) => {
    const [list, setList] = useState(folderList);

    const expandFunction = (item, index) => {
        const tempList = [...list];
        tempList[index].isOpen = !tempList[index].isOpen;
        setList(tempList)
        selectFolder(item.id);
    }

    return list.map((folderItem, index) => (
        <div key={folderItem.id}>
            <div className='directory-row' onClick={() => expandFunction(folderItem, index)}>
                <FolderArrow node={folderItem}/>
                <span>{folderItem.isOpen ? <faIcons.FaRegFolderOpen/> : <faIcons.FaRegFolder/>}</span>
                <span>{folderItem.name}</span>
            </div>
            <div style={{display: folderItem.isOpen ? 'block' : 'none', paddingLeft: 20}}>
                {folderItem.children && <Folder folderList={folderItem.children} selectFolder={selectFolder}/>}
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