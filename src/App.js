import React, {Component} from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "./components/page/HomePage";
import ProductsPage from "./components/page/ProductsPage";
import TicketForm from "./components/form/TicketForm";
import './App.css';

class App extends Component {

  render() {
    return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* Agregar rutas a componentes de otros modulos */}
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/ticket/:name/:version/create' element={<TicketForm />} />

        {/* Descomentar para agregar un componente que consulte tickets */}
        {/*<Route path='/ticket/:name/:version/query' element={<TicketTable />} />*/}
      </Routes>
    );
  }
}

export default App;
