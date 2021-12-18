import TicketForm from "./components/form/TicketForm";
import HomePage from "./components/page/HomePage";
import ProductsPage from "./components/page/ProductsPage";
import HoursPage from "./components/page/HoursPage";
import TicketTable from "./components/table/TicketTable";

const routes = [
    /* Agregar rutas a componentes de otros modulos */
    { path: "/", name: "Inicio", Component: <HomePage /> },
    { path: "/products", name: "Productos", Component: <ProductsPage /> },
    { path: "/tickets/:name/:version/create", name: "Crear Ticket", Component: <TicketForm /> },
    { path: "/tickets/:name/:version/query", name: "Consulta Tickets", Component: <TicketTable /> },
    { path: "/hours", name: "Recursos", Component: <HoursPage/>},
];

export default routes;
