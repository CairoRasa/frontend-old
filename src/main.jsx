import React from 'react';
import ReactDOM from 'react-dom';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import './index.css';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import PostItem from './pages/PostItem';
import {QueryClient, QueryClientProvider} from "react-query";
import EditPost from "./pages/EditPost";
import AdminViewItems from "./pages/AdminViewItems";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/admin/post" element={<PostItem/>}/>
            <Route path="/admin/post/edit/:id" element={<EditPost/>}/>
            <Route path="/admin/items" element={<AdminViewItems/>}/>
        </Route>
    )
);

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
