import React from 'react';
import ReactDOM from 'react-dom';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';
import './index.css';
import './App.css';
import Layout from './components/Layout';
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const PostItem = React.lazy(() => import('./pages/PostItem'));
import { QueryClient, QueryClientProvider } from "react-query";
const EditPost = React.lazy(() => import('./pages/EditPost'));
const AdminViewItems = React.lazy(() => import('./pages/AdminViewItems'));
const ItemDescription = React.lazy(() => import('./pages/ItemDescription'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={
                <React.Suspense fallback={<>...</>}>
                    <Home />
                </React.Suspense>
            } />
            <Route path="/login" element={
                <React.Suspense fallback={<>...</>}>
                    <Login />
                </React.Suspense>
            } />
            <Route path="/signup" element={
                <React.Suspense fallback={<>...</>}>
                    <SignUp />
                </React.Suspense>
            } />
            <Route path="/admin/post" element={
                <React.Suspense fallback={<>...</>}>
                    <PostItem />
                </React.Suspense>
            } />
            <Route path="/admin/post/edit/:id" element={
                <React.Suspense fallback={<>...</>}>
                    <EditPost />
                </React.Suspense>
            } />
            <Route path="/admin/items" element={
                <React.Suspense fallback={<>...</>}>
                    <AdminViewItems />
                </React.Suspense>
            } />
            <Route path="/item/:id" element={
                <React.Suspense fallback={<>...</>}>
                    <ItemDescription />
                </React.Suspense>
            } />
        </Route>
    )
);

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
