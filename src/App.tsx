import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import RouteDefinitions from "./routeDefinitions";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Routes>
        {RouteDefinitions.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <route.content />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
