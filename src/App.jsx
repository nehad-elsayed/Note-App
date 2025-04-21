import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AuthContextProvider from "./contexts/auth";
import { Toaster } from "react-hot-toast";
import CounterContextProvider from "./contexts/ConterContext";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import ProtectedAuthRoute from "./protectedRoutes/ProtectedAuthRoute";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute>  },
        { path: "/register", element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute>  },
        { path: "/login", element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute>  },
      ],
    },
  ]);

  return (
    <>
      <CounterContextProvider>
        <AuthContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
        </AuthContextProvider>
      </CounterContextProvider>
    </>
  );
}

export default App;
