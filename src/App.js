import React, {Component} from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "./components/page/HomePage";
import ProductsPage from "./components/page/ProductsPage";
import TicketPage from "./components/page/TicketPage";
import './App.css';

class App extends Component {

  render() {
    return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/ticket/:name/:version' element={<TicketPage />} />
        
        {/*<Route path='/ticket/:id' element={<TicketPage />} /> */}
      </Routes>
    );
  }
}

export default App;
