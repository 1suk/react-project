import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../pages/Main'
import Header from "../components/Layout/Header";
import MovieDetail from "../pages/MovieDetail";
import MyReviews from "../pages/MyReviews";

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<Main/>}/>
                    <Route path="/movie/:id" element={<MovieDetail/>}/>
                    <Route path="/myReviews" element={<MyReviews/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter