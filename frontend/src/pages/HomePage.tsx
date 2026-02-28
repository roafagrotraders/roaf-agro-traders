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
                                        <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                                        <span className="text-sm text-primary-foreground font-medium">
                                            {profile?.address || 'Hangulgund Kokernag, near SBI Bank'}
                                        </span>
                                    </div>
                                    <a
                                        href={`tel:${profile?.contactNumber || '6006149326'}`}
                                        className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2 hover:bg-primary-foreground/20 transition-colors"
                                    >
                                        <Phone className="w-4 h-4 text-accent flex-shrink-0" />
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
                                    <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center flex-shrink-0">
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
                                    <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center flex-shrink-0">
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
                                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
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
            <section className="py-14 bg-muted/40">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold font-serif text-foreground mb-3">Product Categories</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Explore our wide range of agricultural tools and equipment for every farming need.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {categories.map((cat) => (
                            <Link key={cat} to="/catalog" className="group">
                                <Card className="overflow-hidden text-center hover:shadow-card-hover transition-all duration-200 hover:border-primary/30 cursor-pointer group-hover:-translate-y-0.5">
                                    <div className="aspect-video overflow-hidden bg-muted">
                                        <img
                                            src={categoryImages[cat]}
                                            alt={categoryLabels[cat]}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                    </div>
                                    <CardContent className="p-3 flex flex-col items-center gap-1">
                                        <span className="text-xl">{categoryIcons[cat]}</span>
                                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {categoryLabels[cat]}
                                        </span>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-14">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold font-serif text-foreground mb-2">Featured Products</h2>
                            <p className="text-muted-foreground">Top picks from our catalog</p>
                        </div>
                        <Button asChild variant="outline" className="hidden sm:flex gap-2">
                            <Link to="/catalog">
                                View All
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>

                    {productsLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="overflow-hidden">
                                    <Skeleton className="h-44 w-full" />
                                    <CardContent className="p-5 space-y-3">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-16 w-full" />
                                        <Skeleton className="h-8 w-1/3" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : featuredProducts.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                            <p>No products available yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {featuredProducts.map((product) => (
                                <Card key={product.id} className="overflow-hidden hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
                                    <div className="aspect-video overflow-hidden bg-muted">
                                        <img
                                            src={categoryImages[product.category] || '/assets/generated/equipment-tractor.dim_800x500.png'}
                                            alt={product.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {categoryLabels[product.category] || product.category}
                                            </Badge>
                                            <Badge className={product.available ? 'bg-success/15 text-success border-0' : 'bg-destructive/15 text-destructive border-0'}>
                                                {product.available ? 'In Stock' : 'Out of Stock'}
                                            </Badge>
                                        </div>
                                        <h3 className="font-bold text-foreground text-base mb-1 leading-snug">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-primary">
                                                ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                            </span>
                                            <Badge className="bg-accent/15 text-accent-foreground border-accent/20 border text-xs font-medium">
                                                <KeyRound className="w-3 h-3 mr-1" />
                                                For Rent
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Stats */}
            <section className="py-14 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Package, value: products?.length || '—', label: 'Products Available' },
                            { icon: Warehouse, value: '5+', label: 'Product Categories' },
                            { icon: ShoppingCart, value: 'Srachi', label: 'Authorized Dealer' },
                            { icon: Truck, value: 'Free', label: 'Home Delivery' },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <stat.icon className="w-8 h-8 text-primary-foreground/70" />
                                <div className="text-3xl font-bold font-serif">{stat.value}</div>
                                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
