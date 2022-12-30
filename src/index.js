import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import ErrorPage from './pages/Error-page/Error-page';
import EditDirectory from './pages/Edit/Edit-directory';
import CreateNote from './pages/Create/Create';
import {Provider} from 'react-redux/es/exports';
import {store} from "./store";
import EditNotice from "./pages/Edit/Edit-notice";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {DirectoryContent} from "./pages/Directory-content/Directory-content";
import App from "./pages/App/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          { index: true, element: <DirectoryContent/>},
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
