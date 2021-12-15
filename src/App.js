import React, {Component} from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import TicketPage from "./components/pages/TicketPage";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/ticket/:id' element={<TicketPage />} />
      </Routes>
    );
  }
}

export default App;
