import { type Product, ProductCategory } from '../../backend';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface ProductCardProps {
    product: Product;
    actions?: React.ReactNode;
}

export default function ProductCard({ product, actions }: ProductCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col h-full">
            <div className="h-1.5 bg-gradient-to-r from-primary/60 to-accent/60"></div>
            <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg">{categoryIcons[product.category] || '📦'}</span>
                        <Badge variant="secondary" className="text-xs font-medium">
                            {categoryLabels[product.category] || product.category}
                        </Badge>
                    </div>
                    <Badge
                        className={
                            product.available
                                ? 'bg-success/15 text-success border-0 text-xs shrink-0'
                                : 'bg-destructive/15 text-destructive border-0 text-xs shrink-0'
                        }
                    >
                        {product.available ? '● In Stock' : '○ Out of Stock'}
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
