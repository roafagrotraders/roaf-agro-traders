import { useState } from 'react';
import { useGetProductCatalog, useAddProduct, useUpdateProduct, useRemoveProduct } from '../../hooks/useQueries';
import { type Product, ProductCategory } from '../../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import ProductCard from '../../components/product/ProductCard';

const categoryLabels: Record<string, string> = {
    [ProductCategory.machinery]: 'Machinery',
    [ProductCategory.handTools]: 'Hand Tools',
    [ProductCategory.irrigation]: 'Irrigation',
    [ProductCategory.fertilizers]: 'Fertilizers',
    [ProductCategory.other]: 'Other',
};

interface ProductFormData {
    name: string;
    category: ProductCategory;
    description: string;
    price: string;
    available: boolean;
}

const defaultForm: ProductFormData = {
    name: '',
    category: ProductCategory.other,
    description: '',
    price: '',
    available: true,
};

export default function ProductManagementPage() {
    const { data: products, isLoading } = useGetProductCatalog();
    const addProduct = useAddProduct();
    const updateProduct = useUpdateProduct();
    const removeProduct = useRemoveProduct();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [form, setForm] = useState<ProductFormData>(defaultForm);

    const openAdd = () => {
        setEditingProduct(null);
        setForm(defaultForm);
        setDialogOpen(true);
    };

    const openEdit = (product: Product) => {
        setEditingProduct(product);
        setForm({
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price.toString(),
            available: product.available,
        });
        setDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(form.price);
        if (isNaN(price) || price < 0) {
            toast.error('Please enter a valid price');
            return;
        }
        try {
            if (editingProduct) {
                await updateProduct.mutateAsync({
                    productId: editingProduct.id,
                    name: form.name,
                    category: form.category,
                    description: form.description,
                    price,
                    available: form.available,
                });
                toast.success('Product updated successfully');
            } else {
                await addProduct.mutateAsync({
                    name: form.name,
                    category: form.category,
                    description: form.description,
                    price,
                });
                toast.success('Product added successfully');
            }
            setDialogOpen(false);
        } catch (err) {
            toast.error('Failed to save product. Please try again.');
        }
    };

    const handleDelete = async () => {
        if (deleteId === null) return;
        try {
            await removeProduct.mutateAsync(deleteId);
            toast.success('Product removed successfully');
            setDeleteId(null);
        } catch {
            toast.error('Failed to remove product');
        }
    };

    const isSaving = addProduct.isPending || updateProduct.isPending;

    return (
        <div className="min-h-screen">
            <section className="bg-primary/5 border-b border-border py-8">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-foreground">Product Management</h1>
                        <p className="text-muted-foreground text-sm mt-1">Add, edit, and manage your product catalog</p>
                    </div>
                    <Button onClick={openAdd} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Product
                    </Button>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-48 rounded-xl" />
                        ))}
                    </div>
                ) : !products?.length ? (
                    <div className="text-center py-20">
                        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">No products yet</h3>
                        <p className="text-muted-foreground mb-4">Add your first product to get started.</p>
                        <Button onClick={openAdd} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add Product
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                actions={
                                    <>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                                            onClick={() => openEdit(product)}
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                                            onClick={() => setDeleteId(product.id)}
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </>
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                        <DialogDescription>
                            {editingProduct ? 'Update the product details below.' : 'Fill in the details to add a new product.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="e.g., Hand Trowel Set"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                value={form.category}
                                onValueChange={(v) => setForm({ ...form, category: v as ProductCategory })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(categoryLabels).map(([value, label]) => (
                                        <SelectItem key={value} value={value}>{label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Describe the product..."
                                rows={3}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹) *</Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        {editingProduct && (
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div>
                                    <Label htmlFor="available" className="font-medium">Available</Label>
                                    <p className="text-xs text-muted-foreground">Toggle product availability</p>
                                </div>
                                <Switch
                                    id="available"
                                    checked={form.available}
                                    onCheckedChange={(v) => setForm({ ...form, available: v })}
                                />
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-foreground"></span>
                                        Saving...
                                    </span>
                                ) : editingProduct ? 'Update Product' : 'Add Product'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove Product</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove this product? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {removeProduct.isPending ? 'Removing...' : 'Remove'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
