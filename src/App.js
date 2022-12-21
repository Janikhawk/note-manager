import { Tree } from 'react-arborist';
import * as icons from "react-icons/md";
import { BsTree } from "react-icons/bs";
import './tree-styles.css';
import { SiGmail } from "react-icons/si";

import NoteList from './components/NoteList';
import clsx from 'clsx';
import { folderData } from './folder-data';
import { useState } from 'react';
import { FillFlexParent } from './components/fill-flex';
import * as faIcons from "react-icons/fa";


export default function App() {
  const [term, setTerm] = useState("");
  return (
    <div className="page">
      <div className="mainContent">
        <div className="sidebar">
          <FillFlexParent>
            {({ width, height }) => {
              return (
                <Tree
                  initialData={folderData}
                  openByDefault={false}
                  width={width}
                  height={height}
                  rowHeight={32}
                  renderCursor={Cursor}
                  searchTerm={term}
                  paddingBottom={32}
                >
                  {Node}
                </Tree>
              );
            }}
          </FillFlexParent>
        </div>
        
      </div>
    </div>
  );
};

function Node({ node, style, dragHandle }) {
  // console.log(node);
  const Icon = node.isOpen ? faIcons.FaRegFolderOpen : node.data.icon || BsTree;
  return (
    <div
      ref={dragHandle}
      style={style}
      className={clsx('node', node.state)}
      onClick={() => {
        node.isInternal && node.toggle();
        console.log(node)
      }}
    >
      <FolderArrow node={node} />
      <span>
        <Icon />
      </span>
      <span>{node.isEditing ? <Input node={node} /> : node.data.name}</span>
    </div>
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


