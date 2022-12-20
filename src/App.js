import { Tree } from 'react-arborist';
import * as icons from "react-icons/md";

import NoteList from './components/NoteList';

export const gmailData = [
  {
    id: "1",
    name: "Inbox",
    unread: 1,
  },
  {
    id: "2",
    name: "Starred",
    unread: 0,
  },
  {
    id: "3",
    name: "Snoozed",
    unread: 0,
  },
  {
    id: "4",
    name: "Sent",
    unread: 0,
  },
  {
    id: "5",
    name: "Drafts",
    unread: 14,
  },
  {
    id: "6",
    name: "Spam",
    unread: 54,
  },
  {
    id: "7",
    name: "Important",
    unread: 0,
  },
  {
    id: "8",
    name: "Chats",
    unread: 0,
  },
  {
    id: "9",
    name: "Scheduled",
    unread: 0,
  },
  {
    id: "10",
    name: "All Mail",
    unread: 0,
  },
  {
    id: "11",
    name: "Trash",
    unread: 0,
  },
  {
    id: "12",
    name: "Categories",
    children: [
      {
        id: "13",
        name: "Social",
        unread: 946,
      },
      {
        id: "14",
        name: "Updates",
        unread: 4580,
      },
      {
        id: "15",
        name: "Forums",
        unread: 312,
      },
      {
        id: "16",
        name: "Promotions",
        unread: 312,
      },
    ],
  },
];

const App = () => {
  // return <div className="container">
  //   <NoteList/>
  // </div>
  return (
    <Tree data={gmailData}>
      {Node}
    </Tree>
  );
};

function Node({ node, style, dragHandle }) {
  return (
    <div
      ref={dragHandle}
      style={style}
      onClick={() => node.isInternal && node.toggle()}
    >
      <FolderArrow node={node} />
      <span>
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

export default App;