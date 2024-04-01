
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../../services/AuthService.ts";
import {NavBar} from "../../components/NavBar";

export function AuthenticatedRoutes() {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? (
    <>
        <NavBar />
        <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}
