import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import ErrorPage from './pages/error-page';
import Root, {rootAction, rootLoader} from './pages/root';
import DefaultIndex from './pages/default-index';
import EditNote, {editAction} from './pages/edit';
import {destroyAction} from './pages/destroy';
import CreateNote, {createAction} from './pages/create';
import store from './store/store';
import {Provider} from 'react-redux/es/exports';
import NoteList, {folderAction, folderLoader} from "./components/notice/NoteList";

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
            path: 'directory/:folderId',
            element: <NoteList/>,
            loader: folderLoader,
            action: folderAction
          },
          {
            path: 'directory/new',
            element: <CreateNote/>,
            action: createAction,
            loader: rootLoader,
          },
          {
            path: 'directory/:folderId/new',
            element: <CreateNote/>,
            action: createAction,
            loader: rootLoader,
          },
          {
            path: "notes/:noteId/edit",
            element: <EditNote />,
            //loader: noteLoader,
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
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
