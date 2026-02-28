import { Link } from '@tanstack/react-router';
import { useGetBusinessProfile, useGetProductCatalog } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Package, Warehouse, ShoppingCart, ArrowRight, Sprout, Award, Building2, MapPin, Phone } from 'lucide-react';
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
                        <div className="flex items-center gap-2 mb-4">
                            <Badge className="bg-accent text-accent-foreground border-0 text-xs font-semibold px-3 py-1">
                                <Award className="w-3 h-3 mr-1" />
                                Dept. Approved
                            </Badge>
                            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground text-xs">
                                Rural Business Service Hub
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
                                <div className="flex flex-wrap gap-4 mb-8">
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
                            { icon: Sprout, text: 'Quality Agricultural Products', color: 'text-accent' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-14 container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold font-serif text-foreground mb-3">Product Categories</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Explore our wide range of agricultural tools and equipment for every farming need.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {categories.map((cat) => (
                        <Link key={cat} to="/catalog" className="group">
                            <Card className="text-center p-4 hover:shadow-card-hover transition-all duration-200 hover:border-primary/30 cursor-pointer group-hover:-translate-y-0.5">
                                <CardContent className="p-0 flex flex-col items-center gap-2">
                                    <span className="text-3xl">{categoryIcons[cat]}</span>
                                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {categoryLabels[cat]}
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-14 bg-muted/40">
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
                                    <CardContent className="p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {categoryLabels[product.category] || product.category}
                                            </Badge>
                                            <Badge className={product.available ? 'bg-success/15 text-success border-0' : 'bg-destructive/15 text-destructive border-0'}>
                                                {product.available ? 'In Stock' : 'Out of Stock'}
                                            </Badge>
                                        </div>
                                        <h3 className="font-bold text-foreground text-lg mt-2 mb-1">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                                        <div className="text-xl font-bold text-primary">
                                            ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-8 sm:hidden">
                        <Button asChild variant="outline" className="gap-2">
                            <Link to="/catalog">
                                View All Products
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-14 container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { icon: Package, label: 'Products Available', value: products?.filter(p => p.available).length ?? '—', color: 'text-primary' },
                        { icon: Warehouse, label: 'Product Categories', value: 5, color: 'text-accent' },
                        { icon: ShoppingCart, label: 'Serving Farmers', value: 'Daily', color: 'text-success' },
                    ].map((stat, i) => (
                        <Card key={i} className="text-center p-6">
                            <CardContent className="p-0 flex flex-col items-center gap-2">
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
