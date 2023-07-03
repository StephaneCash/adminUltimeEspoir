import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AppContext from './context/AppContext';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import categoriesSlice from "./features/Categories"
import { getAllcategories } from './features/Categories';
import { getAllUsers } from './features/Users';
import { combineReducers } from "redux";  
import userSlice from './features/Users';
import sousCategoriesSlice, { getAllSousCategories } from './features/SousCategories';
import actualitesSlice, { getAllactualites } from './features/Classifications';
import DocumentsSlice, { getAllDocuments } from './features/Documents';
import textsSlice, { getAllTexts } from './features/Text';
import categorieActusSlice, { getAllcategoriesActus } from './features/CategoriesActus';

const store = configureStore({
  reducer: combineReducers({
    categories: categoriesSlice.reducer,
    users: userSlice.reducer,
    images: sousCategoriesSlice.reducer,
    actualites: actualitesSlice.reducer,
    documentsAdmin: DocumentsSlice.reducer,
    texts: textsSlice.reducer,
    categoriesActus: categorieActusSlice.reducer
  })
});

store.dispatch(getAllcategories());
store.dispatch(getAllUsers());
store.dispatch(getAllSousCategories());
store.dispatch(getAllactualites());
store.dispatch(getAllDocuments());
store.dispatch(getAllTexts());
store.dispatch(getAllcategoriesActus());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContext>
        <App />
      </AppContext>
    </Provider>
  </React.StrictMode>
);