import { Link } from '@tanstack/react-router';
import { useGetBusinessProfile, useGetProductCatalog } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Package, Warehouse, ShoppingCart, ArrowRight, Sprout, Award, Building2, MapPin, Phone, Truck, KeyRound } from 'lucide-react';
import { ProductCategory } from '../backend';

const categoryLabels: Record<string, string> = {
    [ProductCategory.machinery]: 'Machinery',
    [ProductCategory.handTools]: 'Hand Tools',
    [ProductCategory.irrigation]: 'Irrigation',
    [ProductCategory.fertilizers]: 'Fertilizers',
    [ProductCategory.other]: 'Other',
};

const categoryIcons: Record<string, string> = {
    [ProductCategory.machinery]: '🚜',
    [ProductCategory.handTools]: '🔧',
    [ProductCategory.irrigation]: '💧',
    [ProductCategory.fertilizers]: '🌱',
    [ProductCategory.other]: '📦',
};

const categoryImages: Record<string, string> = {
    [ProductCategory.machinery]: '/assets/generated/equipment-tractor.dim_800x500.png',
    [ProductCategory.handTools]: '/assets/generated/equipment-tools.dim_800x500.png',
    [ProductCategory.irrigation]: '/assets/generated/equipment-irrigation.dim_800x500.png',
    [ProductCategory.fertilizers]: '/assets/generated/equipment-seeder.dim_600x400.png',
    [ProductCategory.other]: '/assets/generated/equipment-harvester.dim_800x500.png',
};

// SVG wheat stalk component for animation
function WheatStalk({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Stem */}
            <line x1="12" y1="80" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Grain head */}
            <ellipse cx="12" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.9" />
            {/* Side grains */}
            <ellipse cx="7" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(-20 7 18)" />
            <ellipse cx="17" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(20 17 18)" />
            <ellipse cx="6" cy="28" rx="2.5" ry="4" fill="currentColor" opacity="0.6" transform="rotate(-25 6 28)" />
            <ellipse cx="18" cy="28" rx="2.5" ry="4" fill="currentColor" opacity="0.6" transform="rotate(25 18 28)" />
        </svg>
    );
}

// SVG leaf component
function LeafSvg({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path
                d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z"
                fill="currentColor"
                opacity="0.85"
            />
            <line x1="20" y1="38" x2="20" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

export default function HomePage() {
    const { data: profile, isLoading: profileLoading } = useGetBusinessProfile();
    const { data: products, isLoading: productsLoading } = useGetProductCatalog();

    const featuredProducts = products?.filter(p => p.available).slice(0, 3) || [];
    const categories = Object.values(ProductCategory);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/generated/hero-banner.dim_1200x400.png"
                        alt="Agricultural tools and equipment"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
                </div>

                {/* Animated Agro Strip Banner */}
                <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none opacity-20">
                    <div className="flex animate-scroll-field" style={{ width: '200%' }}>
                        <img
                            src="/assets/generated/agro-strip-banner.dim_1200x200.png"
                            alt=""
                            className="h-16 w-auto object-cover shrink-0"
                            style={{ minWidth: '50%' }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <img
                            src="/assets/generated/agro-strip-banner.dim_1200x200.png"
                            alt=""
                            className="h-16 w-auto object-cover shrink-0"
                            style={{ minWidth: '50%' }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                </div>

                {/* Animated Wheat Stalks - Right side decoration (hidden on mobile, flex on md+) */}
                <div className="absolute bottom-0 right-0 hidden md:flex items-end gap-3 pr-6 pointer-events-none">
                    <WheatStalk className="h-28 text-primary-foreground/20 animate-sway origin-bottom" />
                    <WheatStalk className="h-36 text-primary-foreground/25 animate-sway-delayed origin-bottom" />
                    <WheatStalk className="h-24 text-primary-foreground/15 animate-sway-alt origin-bottom" />
                    <WheatStalk className="h-32 text-primary-foreground/20 animate-sway origin-bottom" />
                    <WheatStalk className="h-20 text-primary-foreground/20 animate-sway-slow origin-bottom" />
                </div>

                {/* Floating Leaves */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <LeafSvg className="absolute top-12 right-1/4 w-6 h-6 text-success/40 animate-leaf-drift" />
                    <LeafSvg className="absolute top-20 right-1/3 w-4 h-4 text-success/30 animate-leaf-drift-delayed" />
                    <LeafSvg className="absolute top-8 right-1/2 w-5 h-5 text-primary-foreground/20 animate-leaf-drift-slow" />
                </div>

                {/* Animated Seedling - decorative */}
                <div className="absolute bottom-4 right-48 pointer-events-none hidden lg:block">
                    <img
                        src="/assets/generated/seedling-sprout.dim_256x256.png"
                        alt=""
                        className="w-16 h-16 object-contain opacity-25 animate-sprout-pulse"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                </div>

                <div className="relative container mx-auto px-4 py-20 md:py-28">
                    <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <Badge className="bg-accent text-accent-foreground border-0 text-xs font-semibold px-3 py-1">
                                <Award className="w-3 h-3 mr-1" />
                                Dept. Approved
                            </Badge>
                            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground text-xs">
                                Rural Business Service Hub
                            </Badge>
                            {/* Authorized Dealer Badge */}
                            <Badge className="bg-amber-600/90 text-white border-0 text-xs font-semibold px-3 py-1">
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                Authorized Dealer – Srachi, Kashmir
                            </Badge>
                        </div>
                        {profileLoading ? (
                            <div className="space-y-3">
                                <Skeleton className="h-10 w-3/4 bg-primary-foreground/20" />
                                <Skeleton className="h-6 w-full bg-primary-foreground/20" />
                            </div>
                        ) : (
                            <>
                                <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground font-serif mb-4 leading-tight">
                                    {profile?.name || 'Roaf Agro Traders'}
                                </h1>
                                <p className="text-lg text-primary-foreground/85 mb-6 leading-relaxed">
                                    {profile?.description || 'Dealership and retail of agricultural tools and equipment.'}
                                    {' '}Your trusted partner for quality farming solutions.
                                </p>
                                {/* Address & Contact in Hero */}
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2">
                                        <MapPin className="w-4 h-4 text-accent shrink-0" />
                                        <span className="text-sm text-primary-foreground font-medium">
                                            {profile?.address || 'Hangulgund Kokernag, near SBI Bank'}
                                        </span>
                                    </div>
                                    <a
                                        href={`tel:${profile?.contactNumber || '6006149326'}`}
                                        className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2 hover:bg-primary-foreground/20 transition-colors"
                                    >
                                        <Phone className="w-4 h-4 text-accent shrink-0" />
                                        <span className="text-sm text-primary-foreground font-medium">
                                            {profile?.contactNumber || '6006149326'}
                                        </span>
                                    </a>
                                </div>
                                {/* Service Highlights */}
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <div className="flex items-center gap-2 bg-success/20 backdrop-blur-sm rounded-full px-4 py-1.5 border border-success/30">
                                        <Truck className="w-4 h-4 text-success" />
                                        <span className="text-sm text-primary-foreground font-semibold">Home Delivery Available</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-accent/20 backdrop-blur-sm rounded-full px-4 py-1.5 border border-accent/30">
                                        <KeyRound className="w-4 h-4 text-accent" />
                                        <span className="text-sm text-primary-foreground font-semibold">Machines on Rent</span>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="flex flex-wrap gap-3">
                            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                                <Link to="/catalog">
                                    Browse Products
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                                <Link to="/about">About Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="bg-card border-b border-border py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                        {[
                            { icon: CheckCircle, text: 'Horticultural & Agricultural Dept. Approved', color: 'text-success' },
                            { icon: Building2, text: 'Rural Business Service Hub Member', color: 'text-primary' },
                            { icon: Truck, text: 'Home Delivery Available', color: 'text-success' },
                            { icon: KeyRound, text: 'Machines Available on Rent', color: 'text-accent-foreground' },
                            { icon: Sprout, text: 'Authorized Dealer – Srachi, Kashmir', color: 'text-primary' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rental & Delivery Highlights */}
            <section className="py-10 bg-primary/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Machines on Rent */}
                        <Card className="overflow-hidden shadow-card border-primary/20 hover:shadow-card-hover transition-shadow md:col-span-1">
                            <div className="h-1.5 bg-gradient-to-r from-accent to-primary"></div>
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                                        <KeyRound className="w-7 h-7 text-accent-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-lg mb-1">Machines on Rent</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                            Agricultural machines available on a rental basis. Get the equipment you need without the full purchase cost.
                                        </p>
                                        <a
                                            href="tel:6006149326"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-foreground hover:underline"
                                        >
                                            <Phone className="w-3.5 h-3.5" />
                                            Inquire for Rental
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Home Delivery */}
                        <Card className="overflow-hidden shadow-card border-success/20 hover:shadow-card-hover transition-shadow md:col-span-1">
                            <div className="h-1.5 bg-gradient-to-r from-success to-primary"></div>
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center shrink-0">
                                        <Truck className="w-7 h-7 text-success" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-lg mb-1">Home Delivery Available</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                            We deliver agricultural tools and equipment right to your doorstep. Convenient and reliable delivery service.
                                        </p>
                                        <a
                                            href="tel:6006149326"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-success hover:underline"
                                        >
                                            <Phone className="w-3.5 h-3.5" />
                                            Call to Order
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Authorized Dealer */}
                        <Card className="overflow-hidden shadow-card border-amber-500/20 hover:shadow-card-hover transition-shadow md:col-span-1">
                            <div className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-700"></div>
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <Award className="w-7 h-7 text-amber-700" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-lg mb-1">Authorized Dealer</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                            Official authorized dealer of <span className="font-semibold text-foreground">Srachi</span> products in Kashmir Province. Genuine products guaranteed.
                                        </p>
                                        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            Srachi – Kashmir Province
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Equipment Showcase */}
            <section className="py-14 container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold font-serif text-foreground mb-3">Our Equipment</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Quality agricultural machinery and tools for every farming need.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-card hover:shadow-card-hover transition-shadow">
                        <img
                            src="/assets/generated/equipment-tractor.dim_800x500.png"
                            alt="Agricultural Tractor"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-end p-4">
                            <span className="text-primary-foreground font-bold text-lg">Tractors & Machinery</span>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-card hover:shadow-card-hover transition-shadow">
                        <img
                            src="/assets/generated/equipment-irrigation.dim_800x500.png"
                            alt="Irrigation Systems"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-end p-4">
                            <span className="text-primary-foreground font-bold text-lg">Irrigation Systems</span>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-card hover:shadow-card-hover transition-shadow">
                        <img
                            src="/assets/generated/equipment-tools.dim_800x500.png"
                            alt="Hand Tools"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-end p-4">
                            <span className="text-primary-foreground font-bold text-lg">Hand Tools</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-card hover:shadow-card-hover transition-shadow">
                        <img
                            src="/assets/generated/equipment-seeder.dim_600x400.png"
                            alt="Seeders and Planters"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-end p-4">
                            <span className="text-primary-foreground font-bold text-lg">Seeders & Planters</span>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-card hover:shadow-card-hover transition-shadow">
                        <img
                            src="/assets/generated/equipment-harvester.dim_800x500.png"
                            alt="Harvesters"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-end p-4">
                            <span className="text-primary-foreground font-bold text-lg">Harvesters</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-14 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold font-serif text-foreground mb-3">Shop by Category</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Find the right tools for your agricultural needs.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                to="/catalog"
                                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-card transition-all text-center"
                            >
                                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                                    {categoryIcons[cat]}
                                </span>
                                <span className="text-sm font-semibold text-foreground">{categoryLabels[cat]}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-14 container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold font-serif text-foreground mb-2">Featured Products</h2>
                        <p className="text-muted-foreground">Top picks from our catalog</p>
                    </div>
                    <Button asChild variant="outline" className="hidden sm:flex">
                        <Link to="/catalog">
                            View All
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>
                {productsLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-xl border border-border bg-card p-5 space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-8 w-1/3" />
                            </div>
                        ))}
                    </div>
                ) : featuredProducts.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                        <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                        <p>No products available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-card-hover transition-shadow">
                                <div className="relative mb-3">
                                    <img
                                        src={categoryImages[product.category] || '/assets/generated/equipment-tools.dim_800x500.png'}
                                        alt={product.name}
                                        className="w-full h-40 object-cover rounded-lg"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                    <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                                        {product.available ? (
                                            <Badge className="bg-success/90 text-success-foreground text-xs border-0">In Stock</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                                        )}
                                        <Badge className="bg-accent/90 text-accent-foreground text-xs border-0">
                                            <KeyRound className="w-2.5 h-2.5 mr-1" />
                                            Available for Rent
                                        </Badge>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-xs mb-2">{categoryLabels[product.category]}</Badge>
                                <h3 className="font-bold text-foreground mb-1">{product.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</span>
                                    <Button asChild size="sm" variant="outline">
                                        <Link to="/catalog">
                                            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                                            View
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="text-center mt-8 sm:hidden">
                    <Button asChild variant="outline">
                        <Link to="/catalog">
                            View All Products
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-14 bg-primary text-primary-foreground relative overflow-hidden">
                {/* Animated wheat stalks background decoration */}
                <div className="absolute bottom-0 left-0 flex items-end gap-2 pl-4 pointer-events-none opacity-15">
                    <svg viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 text-primary-foreground animate-sway origin-bottom">
                        <line x1="12" y1="80" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <ellipse cx="12" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.9" />
                        <ellipse cx="7" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(-20 7 18)" />
                        <ellipse cx="17" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(20 17 18)" />
                    </svg>
                    <svg viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-28 text-primary-foreground animate-sway-delayed origin-bottom">
                        <line x1="12" y1="80" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <ellipse cx="12" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.9" />
                        <ellipse cx="7" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(-20 7 18)" />
                        <ellipse cx="17" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(20 17 18)" />
                    </svg>
                    <svg viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 text-primary-foreground animate-sway-alt origin-bottom">
                        <line x1="12" y1="80" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <ellipse cx="12" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.9" />
                        <ellipse cx="7" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(-20 7 18)" />
                        <ellipse cx="17" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(20 17 18)" />
                    </svg>
                </div>
                <div className="absolute bottom-0 right-0 flex items-end gap-2 pr-4 pointer-events-none opacity-15">
                    <svg viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 text-primary-foreground animate-sway-slow origin-bottom">
                        <line x1="12" y1="80" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <ellipse cx="12" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.9" />
                        <ellipse cx="7" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(-20 7 18)" />
                        <ellipse cx="17" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(20 17 18)" />
                    </svg>
                    <svg viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-32 text-primary-foreground animate-sway origin-bottom">
                        <line x1="12" y1="80" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <ellipse cx="12" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.9" />
                        <ellipse cx="7" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(-20 7 18)" />
                        <ellipse cx="17" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(20 17 18)" />
                    </svg>
                    <svg viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 text-primary-foreground animate-sway-delayed origin-bottom">
                        <line x1="12" y1="80" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <ellipse cx="12" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.9" />
                        <ellipse cx="7" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(-20 7 18)" />
                        <ellipse cx="17" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(20 17 18)" />
                    </svg>
                </div>

                <div className="relative container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Package, value: products?.length || '—', label: 'Products Available' },
                            { icon: Warehouse, value: '5+', label: 'Equipment Categories' },
                            { icon: CheckCircle, value: '100%', label: 'Genuine Products' },
                            { icon: Sprout, value: 'Dept.', label: 'Approved Business' },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <stat.icon className="w-8 h-8 text-primary-foreground/70" />
                                <span className="text-3xl font-bold font-serif">{stat.value}</span>
                                <span className="text-sm text-primary-foreground/70">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
