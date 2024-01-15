import React from 'react';
import Header from './components/header/Header';
import HomePage from './pages/home/HomePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FavoriteMoviesPage from './pages/favoriteMovies/FavoriteMoviesPage';



function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/list"  element={<FavoriteMoviesPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
