import React from "react";
import Admin from "./admin/admin";
import Login from "./components/login/login";
import LogOut from "./components/logout/logout";
import NotFound from "./components/not-found/notFound";
import { Switch, Route, Redirect } from "react-router-dom";
import UserRoute from "./components/protectedRoute/userRoute";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./user/user";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={LogOut} />
        <ProtectedRoute path="/admin" component={Admin} />
        <UserRoute path="/user" component={User} />
        <Route path="/reg" component={RegistrationForm} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" to="/login" exact />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
