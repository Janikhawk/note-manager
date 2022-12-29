import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import ErrorPage from './pages/error-page';
import Root, {rootAction} from './pages/root';
import DefaultIndex from './pages/default-index';
import EditDirectory from './pages/edit-directory';
import {destroyAction} from './pages/destroy';
import CreateNote from './pages/create';
import {Provider} from 'react-redux/es/exports';
import {store} from "./store/store";
import EditNotice from "./pages/edit-notice";
import {NoticeList} from "./components/notice/Notice-list";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {DirectoryContent} from "./pages/directory-content";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          { index: true, element: <DefaultIndex/>},
          {
            path: 'directory/:directoryId',
            element: <DirectoryContent/>,
          },
          {
            path: 'directory/new',
            element: <CreateNote/>,
          },
          {
            path: 'directory/:directoryId/new',
            element: <CreateNote/>,
          },
          {
            path: 'notice/:noticeId/edit',
            element: <EditNotice/>
          },
          {
            path: 'directory/:directoryId/edit',
            element: <EditDirectory />,
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
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
    </DndProvider>
  </Provider>
  // </React.StrictMode>
);
