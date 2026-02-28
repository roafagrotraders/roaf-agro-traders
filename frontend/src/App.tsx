import { createRootRoute, createRoute, createRouter, RouterProvider, Outlet, useNavigate } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile, useSaveCallerUserProfile, useIsCallerAdmin } from './hooks/useQueries';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductCatalogPage from './pages/ProductCatalogPage';
import BusinessProfilePage from './pages/BusinessProfilePage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import InventoryManagementPage from './pages/admin/InventoryManagementPage';
import OrderManagementPage from './pages/admin/OrderManagementPage';
import OrderDetailsPage from './pages/admin/OrderDetailsPage';
import CreateOrderPage from './pages/admin/CreateOrderPage';
import ProfileSetupModal from './components/ProfileSetupModal';

function Layout() {
    const { identity, isInitializing } = useInternetIdentity();
    const isAuthenticated = !!identity;
    const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
    const saveProfile = useSaveCallerUserProfile();

    const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null && !isInitializing;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            {showProfileSetup && (
                <ProfileSetupModal
                    onSave={async (name) => {
                        await saveProfile.mutateAsync({ name });
                    }}
                    isSaving={saveProfile.isPending}
                />
            )}
        </div>
    );
}

function AdminGuard({ children }: { children: React.ReactNode }) {
    const { identity } = useInternetIdentity();
    const { data: isAdmin, isLoading } = useIsCallerAdmin();
    const navigate = useNavigate();

    if (!identity) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="text-6xl">🔒</div>
                <h2 className="text-2xl font-bold text-foreground">Authentication Required</h2>
                <p className="text-muted-foreground">Please log in to access this page.</p>
                <button
                    onClick={() => navigate({ to: '/' })}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                    Go Home
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="text-6xl">🚫</div>
                <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
                <p className="text-muted-foreground">You don't have permission to access this page.</p>
                <button
                    onClick={() => navigate({ to: '/' })}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                    Go Home
                </button>
            </div>
        );
    }

    return <>{children}</>;
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const catalogRoute = createRoute({ getParentRoute: () => rootRoute, path: '/catalog', component: ProductCatalogPage });
const profileRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: BusinessProfilePage });

const adminProductsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/products',
    component: () => <AdminGuard><ProductManagementPage /></AdminGuard>,
});
const adminInventoryRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/inventory',
    component: () => <AdminGuard><InventoryManagementPage /></AdminGuard>,
});
const adminOrdersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/orders',
    component: () => <AdminGuard><OrderManagementPage /></AdminGuard>,
});
const adminOrderDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/orders/$orderId',
    component: () => <AdminGuard><OrderDetailsPage /></AdminGuard>,
});
const adminCreateOrderRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/orders/new',
    component: () => <AdminGuard><CreateOrderPage /></AdminGuard>,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    catalogRoute,
    profileRoute,
    adminProductsRoute,
    adminInventoryRoute,
    adminOrdersRoute,
    adminOrderDetailsRoute,
    adminCreateOrderRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <RouterProvider router={router} />
            <Toaster richColors position="top-right" />
        </ThemeProvider>
    );
}
