import React from 'react';
import './scss/app.scss';
// import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </React.Suspense>
          }
        ></Route>
        <Route path="" element={<Home />}></Route>
        <Route
          path="Cart"
          element={
            <React.Suspense fallback={<div>Loading cart elements...</div>}>
              <Cart />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="Pizza/:id"
          element={
            <React.Suspense>
              <FullPizza />
            </React.Suspense>
          }
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
