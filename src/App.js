import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./Components/Routes";
import DefaultLayout from "./Components/Layouts/DefaultLayout";
import { useContext } from "react";
import { UserContext } from "./Components/Context/AccountUser";
function App() {
  const { isLogin } = useContext(UserContext);
  return (
    <Router>
      <div>
        {!isLogin ? (
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
        ) : (
          <Routes>
            {privateRoutes.map((item, index) => {
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
        )}
      </div>
    </Router>
  );
}

export default App;
