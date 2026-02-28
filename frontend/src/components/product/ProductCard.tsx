import { type Product, ProductCategory } from '../../backend';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KeyRound } from 'lucide-react';

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

interface ProductCardProps {
    product: Product;
    actions?: React.ReactNode;
}

export default function ProductCard({ product, actions }: ProductCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col h-full">
            <div className="aspect-video overflow-hidden bg-muted relative">
                <img
                    src={categoryImages[product.category] || '/assets/generated/equipment-tractor.dim_800x500.png'}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
                <div className="absolute top-2 right-2">
                    <Badge
                        className={
                            product.available
                                ? 'bg-success/90 text-white border-0 text-xs'
                                : 'bg-destructive/90 text-white border-0 text-xs'
                        }
                    >
                        {product.available ? '● In Stock' : '○ Out of Stock'}
                    </Badge>
                </div>
                {/* Rental badge on image */}
                <div className="absolute bottom-2 left-2">
                    <Badge className="bg-accent/90 text-accent-foreground border-0 text-xs font-semibold">
                        <KeyRound className="w-3 h-3 mr-1" />
                        Available for Rent
                    </Badge>
                </div>
            </div>
            <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-lg">{categoryIcons[product.category] || '📦'}</span>
                    <Badge variant="secondary" className="text-xs font-medium">
                        {categoryLabels[product.category] || product.category}
                    </Badge>
                </div>

                <h3 className="font-bold text-foreground text-base mb-1.5 leading-snug">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="text-xl font-bold text-primary">
                        ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    {actions && <div className="flex gap-2">{actions}</div>}
                </div>
            </CardContent>
        </Card>
    );
}
