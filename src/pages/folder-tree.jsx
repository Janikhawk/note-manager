import { Tree } from 'react-arborist';
import * as icons from "react-icons/md";
import '../styles/tree-styles.css';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import * as faIcons from "react-icons/fa";
import { useParams } from 'react-router-dom';


export default function FolderTree({selectedNoteId, selectNoteById, folderData}) {
  const [term, setTerm] = useState("");
  const treeRef = useRef();

  const [selectedMap, setSelectedMap] = useState({});

  const handleNodeClick = (node) => {
    node.isInternal && node.toggle();
    if (node.isSelected && selectedMap[node.data.id]) {
      node.deselect();
      const newMapCopy = {...selectedMap};
      delete newMapCopy[node.data.id];
      setSelectedMap(newMapCopy);
      selectNoteById(null);
    } else {
      setSelectedMap({...selectedMap, [node.data.id]: true});
      selectNoteById(node.data.id)
    }
  };

  return (
    <Tree
      ref={treeRef}
      initialData={folderData ? folderData : []}
      openByDefault={false}
      rowHeight={32}
      renderCursor={Cursor}
      searchTerm={term}
      paddingBottom={32}
      selection = {selectedNoteId}
    >
      {(event) => Node({...event, handleNodeClick})}
    </Tree>
  );
};

function Node(props) {
  const { node, style, dragHandle, handleNodeClick} = props;
  const Icon = node.type === 'FILE' ? faIcons.FaRegFileAlt : node.isOpen ? faIcons.FaRegFolderOpen : faIcons.FaRegFolder || faIcons.FaRegFolder;
  return (
    <>{!node.data.parentId ? (<div
      ref={dragHandle}
      style={style}
      className={clsx('node', node.state)}
      onClick={() => {
        handleNodeClick(node);
      }}
    >
      <FolderArrow node={node}/>
      <span>
        <Icon />
      </span>
      <span>{node.isEditing ? <Input node={node} /> : node.data.name}</span>
    </div>) : (<></>)}</>
  );
}

function Input({ node }) {
  return (
    <input
      autoFocus
      type="text"
      defaultValue={node.data.name}
      onFocus={(e) => e.currentTarget.select()}
      onBlur={() => node.reset()}
      onKeyDown={(e) => {
        if (e.key === "Escape") node.reset();
        if (e.key === "Enter") node.submit(e.currentTarget.value);
      }}
    />
  );
}

function FolderArrow({ node }) {
  if (node.isLeaf) return <span></span>;
  return (
    <span>
      {node.isOpen ? <icons.MdArrowDropDown /> : <icons.MdArrowRight />}
    </span>
  );
}

function Cursor({ top, left }) {
  return <div className='dropCursor' style={{ top, left }}></div>;
}
