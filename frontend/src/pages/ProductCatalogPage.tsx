import { useState, useMemo } from 'react';
import { useGetProductCatalog } from '../hooks/useQueries';
import { ProductCategory } from '../backend';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '../components/product/ProductCard';
import { Search, SlidersHorizontal, Package, X, Truck, KeyRound } from 'lucide-react';

const categoryLabels: Record<string, string> = {
    all: 'All Categories',
    [ProductCategory.machinery]: 'Machinery',
    [ProductCategory.handTools]: 'Hand Tools',
    [ProductCategory.irrigation]: 'Irrigation',
    [ProductCategory.fertilizers]: 'Fertilizers',
    [ProductCategory.other]: 'Other',
};

// Animated leaf divider component
function AnimatedLeafDivider() {
    return (
        <div className="relative flex items-center justify-center gap-3 py-2 overflow-hidden pointer-events-none select-none">
            {/* Drifting leaf particles */}
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-success/50 animate-leaf-drift absolute left-[10%] top-0">
                <path d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-primary/40 animate-leaf-drift-delayed absolute left-[30%] top-1">
                <path d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-success/35 animate-leaf-drift-slow absolute right-[25%] top-0">
                <path d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-accent/40 animate-leaf-drift absolute right-[10%] top-1">
                <path d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z" fill="currentColor" />
            </svg>
            {/* Center leaf cluster icon */}
            <img
                src="/assets/generated/leaf-cluster-icon.dim_128x128.png"
                alt=""
                className="w-8 h-8 object-contain opacity-30 animate-float-up"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
        </div>
    );
}

export default function ProductCatalogPage() {
    const { data: products, isLoading } = useGetProductCatalog();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');

    const filtered = useMemo(() => {
        if (!products) return [];
        return products.filter((p) => {
            const matchesSearch =
                !search ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
            const matchesAvailability =
                availabilityFilter === 'all' ||
                (availabilityFilter === 'available' && p.available) ||
                (availabilityFilter === 'unavailable' && !p.available);
            return matchesSearch && matchesCategory && matchesAvailability;
        });
    }, [products, search, selectedCategory, availabilityFilter]);

    const hasFilters = search || selectedCategory !== 'all' || availabilityFilter !== 'all';

    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('all');
        setAvailabilityFilter('all');
    };

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <section className="bg-primary/5 border-b border-border py-10 relative overflow-hidden">
                {/* Animated pollen/particle decorations */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-success/30 animate-pollen-float absolute bottom-4 left-[15%]">
                        <circle cx="20" cy="20" r="8" fill="currentColor" />
                        <circle cx="20" cy="20" r="4" fill="white" opacity="0.5" />
                    </svg>
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-primary/25 animate-pollen-float-delayed absolute bottom-6 left-[40%]">
                        <circle cx="20" cy="20" r="8" fill="currentColor" />
                        <circle cx="20" cy="20" r="4" fill="white" opacity="0.5" />
                    </svg>
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-accent/30 animate-pollen-float absolute bottom-3 right-[20%]">
                        <circle cx="20" cy="20" r="8" fill="currentColor" />
                    </svg>
                    {/* Leaf cluster accent - top right */}
                    <img
                        src="/assets/generated/leaf-cluster-icon.dim_128x128.png"
                        alt=""
                        className="absolute top-2 right-4 w-14 h-14 object-contain opacity-10 animate-sway-slow"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Product Catalog</h1>
                            <p className="text-muted-foreground">
                                Browse our complete range of agricultural tools and equipment
                            </p>
                        </div>
                        {/* Service Badges */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="flex items-center gap-2 bg-success/10 border border-success/25 rounded-full px-4 py-1.5">
                                <Truck className="w-4 h-4 text-success shrink-0" />
                                <span className="text-sm font-semibold text-foreground">Home Delivery Available</span>
                            </div>
                            <div className="flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-1.5">
                                <KeyRound className="w-4 h-4 text-accent-foreground shrink-0" />
                                <span className="text-sm font-semibold text-foreground">Machines on Rent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Animated leaf divider */}
                <AnimatedLeafDivider />

                {/* Filters */}
                <div className="bg-card rounded-xl border border-border p-4 mb-8 mt-2 shadow-xs">
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(categoryLabels).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Availability" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Items</SelectItem>
                                <SelectItem value="available">In Stock</SelectItem>
                                <SelectItem value="unavailable">Out of Stock</SelectItem>
                            </SelectContent>
                        </Select>
                        {hasFilters && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                                <X className="w-4 h-4" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Results count */}
                {!isLoading && (
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{' '}
                            <span className="font-semibold text-foreground">{products?.length || 0}</span> products
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {selectedCategory !== 'all' && (
                                <Badge variant="secondary" className="gap-1">
                                    {categoryLabels[selectedCategory]}
                                    <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-destructive">
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            )}
                            {availabilityFilter !== 'all' && (
                                <Badge variant="secondary" className="gap-1">
                                    {availabilityFilter === 'available' ? 'In Stock' : 'Out of Stock'}
                                    <button onClick={() => setAvailabilityFilter('all')} className="ml-1 hover:text-destructive">
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            )}
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="rounded-xl border border-border bg-card p-5 space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-8 w-1/3" />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                        <p className="text-muted-foreground mb-4">
                            {hasFilters ? 'Try adjusting your filters.' : 'No products have been added yet.'}
                        </p>
                        {hasFilters && (
                            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
