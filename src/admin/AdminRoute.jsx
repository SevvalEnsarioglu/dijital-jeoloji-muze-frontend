import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "./services/adminAuthService";

export default function AdminRoute({ children }) {
    return isAdminAuthenticated() ? children : <Navigate to="/admin/login" />;
}
