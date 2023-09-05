import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CreateQuestionsAuth from './CreateQuestions';

const homePagePath = "/"
const createPagePath = "/create"

const router = createHashRouter([
  {
    exact: true,
    path: `${homePagePath}:id?`,
    element: <App homePagePath={homePagePath} createPagePath={createPagePath} />
  },
  {
    exact: true,
    path: `${createPagePath}`,
    element: <CreateQuestionsAuth createPagePath={createPagePath} homePagePath={homePagePath} />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
