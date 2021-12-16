import React, {Component} from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import routes from "./routes";

class App extends Component {


  render() {
    return (
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route path={path} element={Component} />
        ))}
      </Routes>
    );
  }
}

export default App;
