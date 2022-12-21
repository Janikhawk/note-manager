import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/error-page';
import Root, { rootAction,  rootLoader } from './routes/root';
import Note, { noteAction, noteLoader } from './routes/note';
import DefaultIndex from './routes/default-index';
import EditNote, { editAction } from './routes/edit';
import { destroyAction } from './routes/destroy';
import CreateNote, { createAction } from './routes/create';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    // children: [
    //   {
    //     errorElement: <ErrorPage/>,
    //     children: [
    //       { index: true, element: <DefaultIndex/>},
    //       {
    //         path: 'notes/:noteId',
    //         element: <Note/>,
    //         loader: noteLoader,
    //         action: noteAction
    //       },
    //       {
    //         path: 'notes/new',
    //         element: <CreateNote/>,
    //         action: createAction,
    //       },
    //       {
    //         path: "notes/:noteId/edit",
    //         element: <EditNote />,
    //         loader: noteLoader,
    //         action: editAction,
    //     },
    //     {
    //         path: "notes/:noteId/destroy",
    //         action: destroyAction,
    //         errorElement: <div>Oops! There was an error.</div>,
    //     },
    //     ]
    //   }
    // ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
