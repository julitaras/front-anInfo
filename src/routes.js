import TicketForm from "./components/form/TicketForm";
import HomePage from "./components/page/HomePage";
import ProductsPage from "./components/page/ProductsPage";

export default [
    { path: "/", name: "Inicio", Component: <HomePage /> },
    /* Agregar rutas a componentes de otros modulos */
    { path: "/products", name: "Productos", Component: <ProductsPage /> },
    { path: "/ticket/:name/:version/create", name: "Crear Ticket", Component: <TicketForm /> },
    /* Descomentar para agregar un componente que consulte tickets */
    /*{ path: "/ticket/:name/:version/query", name: "Consulta Tickets", Component: TicketTable }*/
  ];

