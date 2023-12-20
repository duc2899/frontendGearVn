import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./Components/Routes";
import DefaultLayout from "./Components/Layouts/DefaultLayout";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          {publicRoutes.map((item, index) => {
            const Layout = item.Layout || DefaultLayout;
            const Page = item.component;
            return (
              <Route
                key={index}
                path={item.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
