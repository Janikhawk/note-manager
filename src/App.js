import { Tree } from 'react-arborist';
import * as icons from "react-icons/md";
import { BsTree } from "react-icons/bs";
import styles from './gmail-styles.css';
import { SiGmail } from "react-icons/si";

import NoteList from './components/NoteList';
import clsx from 'clsx';
import { gmailData } from './gmail-data';
import { useState } from 'react';
import { FillFlexParent } from './components/fill-flex';

const App = () => {
  // return <div className="container">
  //   <NoteList/>
  // </div>
  const [term, setTerm] = useState("");

  return (
    <div className={styles.page}>
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <div className={styles.header}>
            <icons.MdMenu />
            <SiGmail />
            <h1>Gmail</h1>
          </div>
          <button className={styles.composeButton}>
            <icons.MdOutlineCreate />
            Compose
          </button>
          <FillFlexParent>
            {({ width, height }) => {
              return (
                <Tree
                  initialData={gmailData}
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
  console.log(node);
  console.log(style);
  console.log(dragHandle)
  const Icon = node.data.icon || BsTree;
  return (
    <div
      ref={dragHandle}
      style={style}
      className={clsx(styles.node, node.state)}
      onClick={() => node.isInternal && node.toggle()}
    >
      <FolderArrow node={node} />
      <span>
        <Icon />
      </span>
      <span>{node.isEditing ? <Input node={node} /> : node.data.name}</span>
      <span>{node.data.unread === 0 ? null : node.data.unread}</span>
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
  return <div className={styles.dropCursor} style={{ top, left }}></div>;
}

export default App;

