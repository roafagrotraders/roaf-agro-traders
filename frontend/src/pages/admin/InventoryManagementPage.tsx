import { useState } from 'react';
import { useGetAllInventory, useGetProductCatalog, useAddInventoryItem, useUpdateInventoryItem, useRemoveInventoryItem } from '../../hooks/useQueries';
import { type InventoryItem } from '../../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Warehouse, AlertTriangle } from 'lucide-react';

const LOW_STOCK_THRESHOLD = 5;

export default function InventoryManagementPage() {
    const { data: inventory, isLoading: inventoryLoading } = useGetAllInventory();
    const { data: products, isLoading: productsLoading } = useGetProductCatalog();
    const addItem = useAddInventoryItem();
    const updateItem = useUpdateInventoryItem();
    const removeItem = useRemoveInventoryItem();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');

    const isLoading = inventoryLoading || productsLoading;

    const getProduct = (productId: number) => products?.find((p) => p.id === productId);

    const inventoryProductIds = new Set(inventory?.map((i) => i.productId) || []);
    const availableProducts = products?.filter((p) => !inventoryProductIds.has(p.id)) || [];

    const openAdd = () => {
        setEditingItem(null);
        setSelectedProductId('');
        setQuantity('');
        setDialogOpen(true);
    };

    const openEdit = (item: InventoryItem) => {
        setEditingItem(item);
        setSelectedProductId(item.productId.toString());
        setQuantity(item.quantity.toString());
        setDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const qty = parseInt(quantity);
        if (isNaN(qty) || qty < 0) {
            toast.error('Please enter a valid quantity');
            return;
        }
        try {
            if (editingItem) {
                await updateItem.mutateAsync({ productId: editingItem.productId, quantity: BigInt(qty) });
                toast.success('Inventory updated successfully');
            } else {
                await addItem.mutateAsync({ productId: parseInt(selectedProductId), quantity: BigInt(qty) });
                toast.success('Inventory item added successfully');
            }
            setDialogOpen(false);
        } catch {
            toast.error('Failed to save inventory item');
        }
    };

    const handleDelete = async () => {
        if (deleteId === null) return;
        try {
            await removeItem.mutateAsync(deleteId);
            toast.success('Inventory item removed');
            setDeleteId(null);
        } catch {
            toast.error('Failed to remove inventory item');
        }
    };

    const isSaving = addItem.isPending || updateItem.isPending;

    const lowStockCount = inventory?.filter((i) => Number(i.quantity) <= LOW_STOCK_THRESHOLD).length || 0;

    return (
        <div className="min-h-screen">
            <section className="bg-primary/5 border-b border-border py-8">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-foreground">Inventory Management</h1>
                        <p className="text-muted-foreground text-sm mt-1">Track and manage product stock levels</p>
                    </div>
                    <Button onClick={openAdd} className="gap-2" disabled={availableProducts.length === 0}>
                        <Plus className="w-4 h-4" />
                        Add Item
                    </Button>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-card rounded-xl border border-border p-4 shadow-xs">
                        <div className="flex items-center gap-3">
                            <Warehouse className="w-8 h-8 text-primary" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{inventory?.length || 0}</div>
                                <div className="text-sm text-muted-foreground">Total Items</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-4 shadow-xs">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-success/15 flex items-center justify-center">
                                <span className="text-success font-bold text-sm">✓</span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground">
                                    {inventory?.filter((i) => Number(i.quantity) > LOW_STOCK_THRESHOLD).length || 0}
                                </div>
                                <div className="text-sm text-muted-foreground">Well Stocked</div>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl border p-4 shadow-xs ${lowStockCount > 0 ? 'bg-warning/10 border-warning/30' : 'bg-card border-border'}`}>
                        <div className="flex items-center gap-3">
                            <AlertTriangle className={`w-8 h-8 ${lowStockCount > 0 ? 'text-warning' : 'text-muted-foreground'}`} />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{lowStockCount}</div>
                                <div className="text-sm text-muted-foreground">Low Stock</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-14 w-full rounded-lg" />
                        ))}
                    </div>
                ) : !inventory?.length ? (
                    <div className="text-center py-20">
                        <Warehouse className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">No inventory items</h3>
                        <p className="text-muted-foreground mb-4">Add products to inventory to start tracking stock.</p>
                        <Button onClick={openAdd} className="gap-2" disabled={availableProducts.length === 0}>
                            <Plus className="w-4 h-4" />
                            Add Item
                        </Button>
                    </div>
                ) : (
                    <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold">Product</TableHead>
                                    <TableHead className="font-semibold">Category</TableHead>
                                    <TableHead className="font-semibold">Price</TableHead>
                                    <TableHead className="font-semibold">Quantity</TableHead>
                                    <TableHead className="font-semibold">Status</TableHead>
                                    <TableHead className="font-semibold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventory.map((item) => {
                                    const product = getProduct(item.productId);
                                    const qty = Number(item.quantity);
                                    const isLow = qty <= LOW_STOCK_THRESHOLD;
                                    const isOut = qty === 0;
                                    return (
                                        <TableRow key={item.productId} className={isLow ? 'bg-warning/5' : ''}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {isLow && <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />}
                                                    {product?.name || `Product #${item.productId}`}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {product?.category || '—'}
                                            </TableCell>
                                            <TableCell className="text-sm font-medium text-primary">
                                                {product ? `₹${product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`font-bold text-lg ${isOut ? 'text-destructive' : isLow ? 'text-warning' : 'text-foreground'}`}>
                                                    {qty}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {isOut ? (
                                                    <Badge className="bg-destructive/15 text-destructive border-0">Out of Stock</Badge>
                                                ) : isLow ? (
                                                    <Badge className="bg-warning/20 text-warning-foreground border-0">Low Stock</Badge>
                                                ) : (
                                                    <Badge className="bg-success/15 text-success border-0">In Stock</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                                                        onClick={() => openEdit(item)}
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                                                        onClick={() => setDeleteId(item.productId)}
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'Update Inventory' : 'Add Inventory Item'}</DialogTitle>
                        <DialogDescription>
                            {editingItem ? 'Update the quantity for this inventory item.' : 'Select a product and set the initial quantity.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {editingItem ? (
                            <div className="p-3 bg-muted/50 rounded-lg">
                                <div className="text-sm font-medium text-foreground">
                                    {getProduct(editingItem.productId)?.name || `Product #${editingItem.productId}`}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">Current quantity: {Number(editingItem.quantity)}</div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label>Product *</Label>
                                <Select value={selectedProductId} onValueChange={setSelectedProductId} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableProducts.map((p) => (
                                            <SelectItem key={p.id} value={p.id.toString()}>
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="0"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Enter quantity"
                                required
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSaving || (!editingItem && !selectedProductId)}>
                                {isSaving ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-foreground"></span>
                                        Saving...
                                    </span>
                                ) : editingItem ? 'Update' : 'Add Item'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove Inventory Item</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove this item from inventory? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {removeItem.isPending ? 'Removing...' : 'Remove'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
