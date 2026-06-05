import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { token, user, loading } = useAuth();

    // Show a loading screen/spinner during context initial state recovery
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-400 text-sm font-medium">Restoring Session...</span>
                </div>
            </div>
        );
    }

    // Redirect to login if token does not exist
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to unauthorized user dashboard if role is not permitted
    if (allowedRoles && user) {
        const userRoleUpper = (user.role || '').toUpperCase();
        const allowedRolesUpper = allowedRoles.map(r => r.toUpperCase());
        
        if (!allowedRolesUpper.includes(userRoleUpper)) {
            const roleRoutes = {
                SUPER_ADMIN: '/dashboard/super-admin',
                OWNER: '/dashboard/owner',
                STAFF: '/dashboard/staff',
                CUSTOMER: '/dashboard/customer',
            };
            const targetRoute = roleRoutes[userRoleUpper] || '/login';
            return <Navigate to={targetRoute} replace />;
        }
    }

    return children;
}
