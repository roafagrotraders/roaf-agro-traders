import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useIsCallerAdmin, useGetCallerUserProfile } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, ChevronDown, LogOut, User, Package, Warehouse, ShoppingCart, LayoutDashboard, Sprout } from 'lucide-react';

export default function Header() {
    const { identity, login, clear, isLoggingIn } = useInternetIdentity();
    const queryClient = useQueryClient();
    const isAuthenticated = !!identity;
    const { data: isAdmin } = useIsCallerAdmin();
    const { data: userProfile } = useGetCallerUserProfile();
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await clear();
        queryClient.clear();
        navigate({ to: '/' });
    };

    const handleLogin = async () => {
        try {
            await login();
        } catch (error: unknown) {
            const err = error as Error;
            if (err?.message === 'User is already authenticated') {
                await clear();
                setTimeout(() => login(), 300);
            }
        }
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/catalog', label: 'Products' },
        { to: '/about', label: 'About Us' },
    ];

    const adminLinks = [
        { to: '/admin/products', label: 'Products', icon: Package },
        { to: '/admin/inventory', label: 'Inventory', icon: Warehouse },
        { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    ];

    return (
        <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <img
                                src="/assets/generated/roaf-logo.dim_256x256.png"
                                alt="Roaf Agro Traders Logo"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></span>';
                                }}
                            />
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                                Roaf Agro Traders
                            </div>
                            <div className="text-xs text-muted-foreground leading-tight">Agricultural Tools & Equipment</div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                                activeProps={{ className: 'text-primary bg-primary/10 font-semibold' }}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {isAdmin && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1 text-sm font-medium">
                                        <LayoutDashboard className="w-4 h-4" />
                                        Admin
                                        <ChevronDown className="w-3 h-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    {adminLinks.map((link) => (
                                        <DropdownMenuItem key={link.to} asChild>
                                            <Link to={link.to} className="flex items-center gap-2 cursor-pointer">
                                                <link.icon className="w-4 h-4" />
                                                {link.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </nav>

                    {/* Auth */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                                        <User className="w-4 h-4" />
                                        <span className="max-w-[120px] truncate">
                                            {userProfile?.name || 'Account'}
                                        </span>
                                        <ChevronDown className="w-3 h-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <div className="px-2 py-1.5 text-sm font-medium text-foreground">
                                        {userProfile?.name || 'User'}
                                    </div>
                                    {isAdmin && (
                                        <div className="px-2 py-0.5 text-xs text-accent-foreground bg-accent/20 rounded mx-1 mb-1">
                                            Administrator
                                        </div>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                size="sm"
                                onClick={handleLogin}
                                disabled={isLoggingIn}
                                className="hidden sm:flex gap-2"
                            >
                                {isLoggingIn ? (
                                    <>
                                        <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-foreground"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        )}

                        {/* Mobile Menu */}
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72">
                                <div className="flex flex-col gap-1 mt-6">
                                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                                        <Sprout className="w-5 h-5 text-primary" />
                                        <span className="font-bold text-foreground">Roaf Agro Traders</span>
                                    </div>
                                    {navLinks.map((link) => (
                                        <SheetClose key={link.to} asChild>
                                            <Link
                                                to={link.to}
                                                className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    {isAdmin && (
                                        <>
                                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-3 pb-1">
                                                Admin
                                            </div>
                                            {adminLinks.map((link) => (
                                                <SheetClose key={link.to} asChild>
                                                    <Link
                                                        to={link.to}
                                                        className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2"
                                                        onClick={() => setMobileOpen(false)}
                                                    >
                                                        <link.icon className="w-4 h-4" />
                                                        {link.label}
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </>
                                    )}
                                    <div className="mt-4 pt-4 border-t border-border">
                                        {isAuthenticated ? (
                                            <Button
                                                variant="outline"
                                                className="w-full gap-2"
                                                onClick={() => { handleLogout(); setMobileOpen(false); }}
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </Button>
                                        ) : (
                                            <Button
                                                className="w-full"
                                                onClick={() => { handleLogin(); setMobileOpen(false); }}
                                                disabled={isLoggingIn}
                                            >
                                                Login
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
