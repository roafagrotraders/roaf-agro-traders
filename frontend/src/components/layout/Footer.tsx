import { Link } from '@tanstack/react-router';
import { Sprout, Heart, Phone, Mail, MapPin, Truck, KeyRound, Award } from 'lucide-react';

export default function Footer() {
    const year = new Date().getFullYear();
    const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'roaf-agro-traders');

    return (
        <footer className="bg-sidebar text-sidebar-foreground mt-auto">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Sprout className="w-6 h-6 text-sidebar-primary" />
                            <span className="font-bold text-lg">Roaf Agro Traders</span>
                        </div>
                        <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
                            Dealership and retail of agricultural tools and equipment. Serving farmers with quality products.
                        </p>
                        <div className="flex flex-col gap-1 text-xs text-sidebar-foreground/60">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-sidebar-primary inline-block"></span>
                                Rural Business Service Hub
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-sidebar-primary inline-block"></span>
                                Horticultural & Agricultural Dept. Approved
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-sidebar-foreground/80">Quick Links</h3>
                        <nav className="flex flex-col gap-2">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/catalog', label: 'Product Catalog' },
                                { to: '/about', label: 'About Us' },
                            ].map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-sm text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-sidebar-foreground/80">Our Services</h3>
                        <div className="flex flex-col gap-2.5 text-sm text-sidebar-foreground/70">
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-sidebar-primary flex-shrink-0" />
                                <span>Home Delivery Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <KeyRound className="w-4 h-4 text-sidebar-primary flex-shrink-0" />
                                <span>Machines Available on Rent</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-sidebar-primary flex-shrink-0" />
                                <span>Authorized Dealer – Srachi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sprout className="w-4 h-4 text-sidebar-primary flex-shrink-0" />
                                <span>Kashmir Province</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-sidebar-foreground/80">Contact</h3>
                        <div className="flex flex-col gap-2 text-sm text-sidebar-foreground/70">
                            <span className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-sidebar-primary flex-shrink-0 mt-0.5" />
                                <span>Hangulgund Kokernag, near SBI Bank</span>
                            </span>
                            <a
                                href="tel:6006149326"
                                className="flex items-center gap-2 hover:text-sidebar-primary transition-colors"
                            >
                                <Phone className="w-4 h-4 text-sidebar-primary flex-shrink-0" />
                                6006149326
                            </a>
                            <a
                                href="mailto:roafagrotraders@gmail.com"
                                className="flex items-center gap-2 hover:text-sidebar-primary transition-colors"
                            >
                                <Mail className="w-4 h-4 text-sidebar-primary flex-shrink-0" />
                                roafagrotraders@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-sidebar-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sidebar-foreground/50">
                    <span>© {year} Roaf Agro Traders. All rights reserved.</span>
                    <span className="flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 text-sidebar-primary fill-sidebar-primary mx-0.5" /> using{' '}
                        <a
                            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sidebar-primary hover:underline"
                        >
                            caffeine.ai
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
