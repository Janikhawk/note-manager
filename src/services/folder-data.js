import * as faIcons from "react-icons/fa";

export const folderData = [
    {
      id: "s7nziw1",
      name: "some",
      icon: faIcons.FaRegFolder,
    },
    {
      id: "2",
      name: "random",
      icon: faIcons.FaRegFolder,
    },
    {
      id: "3",
      name: "name",
      icon: faIcons.FaRegFolder,
    },
    {
      id: "12",
      name: "folder with children",
      icon: faIcons.FaRegFolder,
      isOpen: false,
      children: [
        {
          id: "13",
          name: "one",
          icon: faIcons.FaRegFolder,
        },
        {
          id: "14",
          name: "two",
          icon: faIcons.FaRegFolder,
        },
        {
          id: "15",
          name: "three",
          icon: faIcons.FaRegFolder,
        },
        {
          id: "16",
          name: "four",
          icon: faIcons.FaRegFolder,
        },
      ],
    },
  ];