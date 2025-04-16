import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "@/routes";


function App() {
  

  return (
    <>
    
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
