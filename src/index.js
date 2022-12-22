import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/error-page';
import Root, { rootAction,  rootLoader } from './pages/root';
import Note, { noteAction, noteLoader } from './pages/note';
import DefaultIndex from './pages/default-index';
import EditNote, { editAction } from './pages/edit';
import { destroyAction } from './pages/destroy';
import CreateNote, { createAction } from './pages/create';
import FolderTree from './pages/folder-tree';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          { index: true, element: <DefaultIndex/>},
          {
            path: 'notes/:noteId',
            element: <Note/>,
            loader: noteLoader,
            action: noteAction
          },
          {
            path: 'notes/new',
            element: <CreateNote/>,
            action: createAction,
          },
          {
            path: "notes/:noteId/edit",
            element: <EditNote />,
            loader: noteLoader,
            action: editAction,
        },
        {
            path: "notes/:noteId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
        },
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
