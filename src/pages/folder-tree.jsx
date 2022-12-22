import { Tree } from 'react-arborist';
import * as icons from "react-icons/md";
import '../styles/tree-styles.css';
import clsx from 'clsx';
// import { folderData } from '../services/folder-data';
import { useState } from 'react';
import { FillFlexParent } from '../components/fill-flex';
import * as faIcons from "react-icons/fa";


export default function FolderTree({selectNoteById, folderData}) {
  const [term, setTerm] = useState("");

  return (
          <FillFlexParent>
            {({ width, height }) => {
              return (
                <Tree
                  initialData={folderData ? folderData : []}
                  openByDefault={false}
                  width={width}
                  height={height}
                  rowHeight={32}
                  renderCursor={Cursor}
                  searchTerm={term}
                  paddingBottom={32}
                  onSelect={(nodes) => {
                    selectNoteById(nodes[0]?.id);
                  }}
                >
                  {Node}
                </Tree>
              );
            }}
          </FillFlexParent>
  );
};

function Node({ node, style, dragHandle }) {
  const Icon = node.type === 'FILE' ? faIcons.FaRegFileAlt : node.isOpen ? faIcons.FaRegFolderOpen : faIcons.FaRegFolder || faIcons.FaRegFolder;
  return (
    <div
      ref={dragHandle}
      style={style}
      className={clsx('node', node.state)}
      onClick={() => {
        node.isInternal && node.toggle();
      }
      }
    >
      <FolderArrow node={node} />
      <span>
        <Icon />
      </span>
      <span>{node.isEditing ? <Input node={node} /> : node.data.title}</span>
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


