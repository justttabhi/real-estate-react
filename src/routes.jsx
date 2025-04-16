import { Home } from "@/pages";
import PropertyDetail from "./pages/property-detail";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
   {
    name: "property-detail",
    path: "/property-detail",
    element: <PropertyDetail />,
  },
];

export default routes;
