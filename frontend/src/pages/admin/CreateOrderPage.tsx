import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetProductCatalog, useCreateOrder } from '../../hooks/useQueries';
import { type OrderItem, type Product } from '../../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Trash2, ShoppingCart, User, Package } from 'lucide-react';

interface CartItem {
    product: Product;
    quantity: number;
}

export default function CreateOrderPage() {
    const navigate = useNavigate();
    const { data: products, isLoading: productsLoading } = useGetProductCatalog();
    const createOrder = useCreateOrder();

    const [customerName, setCustomerName] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [addQty, setAddQty] = useState<string>('1');

    const availableProducts = useMemo(
        () => products?.filter((p) => p.available && !cart.some((c) => c.product.id === p.id)) || [],
        [products, cart]
    );

    const totalAmount = useMemo(
        () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        [cart]
    );

    const handleAddToCart = () => {
        const product = products?.find((p) => p.id === parseInt(selectedProductId));
        const qty = parseInt(addQty);
        if (!product || isNaN(qty) || qty <= 0) {
            toast.error('Please select a product and enter a valid quantity');
            return;
        }
        setCart((prev) => [...prev, { product, quantity: qty }]);
        setSelectedProductId('');
        setAddQty('1');
    };

    const handleUpdateQty = (productId: number, qty: number) => {
        if (qty <= 0) {
            setCart((prev) => prev.filter((c) => c.product.id !== productId));
        } else {
            setCart((prev) =>
                prev.map((c) => (c.product.id === productId ? { ...c, quantity: qty } : c))
            );
        }
    };

    const handleRemoveFromCart = (productId: number) => {
        setCart((prev) => prev.filter((c) => c.product.id !== productId));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!customerName.trim()) {
            toast.error('Please enter a customer name');
            return;
        }
        if (cart.length === 0) {
            toast.error('Please add at least one product to the order');
            return;
        }
        const items: OrderItem[] = cart.map((c) => ({
            productId: c.product.id,
            quantity: BigInt(c.quantity),
        }));
        try {
            const orderId = await createOrder.mutateAsync({
                customerName: customerName.trim(),
                items,
                totalAmount,
            });
            toast.success(`Order #${orderId.toString().padStart(4, '0')} created successfully`);
            navigate({ to: '/admin/orders' });
        } catch {
            toast.error('Failed to create order. Please try again.');
        }
    };

    return (
        <div className="min-h-screen">
            <section className="bg-primary/5 border-b border-border py-8">
                <div className="container mx-auto px-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate({ to: '/admin/orders' })}
                        className="gap-2 mb-4 text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Orders
                    </Button>
                    <h1 className="text-2xl font-bold font-serif text-foreground">Create New Order</h1>
                    <p className="text-muted-foreground text-sm mt-1">Record a new retail or dealership transaction</p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Info */}
                    <Card className="shadow-xs">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                Customer Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="customerName">Customer Name *</Label>
                                <Input
                                    id="customerName"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Enter customer full name"
                                    required
                                    className="max-w-md"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Add Products */}
                    <Card className="shadow-xs">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <Package className="w-4 h-4 text-primary" />
                                Add Products
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-3 items-end">
                                <div className="flex-1 min-w-[200px] space-y-1.5">
                                    <Label>Product</Label>
                                    <Select
                                        value={selectedProductId}
                                        onValueChange={setSelectedProductId}
                                        disabled={productsLoading || availableProducts.length === 0}
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    productsLoading
                                                        ? 'Loading products...'
                                                        : availableProducts.length === 0
                                                        ? 'All products added'
                                                        : 'Select a product'
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableProducts.map((p) => (
                                                <SelectItem key={p.id} value={p.id.toString()}>
                                                    <span className="flex items-center gap-2">
                                                        {p.name}
                                                        <span className="text-muted-foreground text-xs">
                                                            — ₹{p.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                        </span>
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-28 space-y-1.5">
                                    <Label>Quantity</Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={addQty}
                                        onChange={(e) => setAddQty(e.target.value)}
                                        placeholder="Qty"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={!selectedProductId}
                                    className="gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add
                                </Button>
                            </div>

                            {/* Cart Items */}
                            {cart.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <div className="text-sm font-semibold text-foreground mb-2">
                                        Order Items ({cart.length})
                                    </div>
                                    {cart.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg border border-border"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-foreground text-sm truncate">
                                                    {item.product.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    ₹{item.product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} each
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleUpdateQty(item.product.id, parseInt(e.target.value) || 0)
                                                    }
                                                    className="w-20 h-8 text-center text-sm"
                                                />
                                                <div className="text-sm font-semibold text-primary w-24 text-right">
                                                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                </div>
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
                                                    onClick={() => handleRemoveFromCart(item.product.id)}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {cart.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                                    <p className="text-sm">No items added yet. Select a product above.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Order Summary */}
                    {cart.length > 0 && (
                        <Card className="shadow-xs border-primary/20 bg-primary/5">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-semibold text-foreground">Order Summary</span>
                                    <Badge variant="secondary">{cart.length} item{cart.length !== 1 ? 's' : ''}</Badge>
                                </div>
                                <Separator className="mb-3" />
                                {cart.map((item) => (
                                    <div key={item.product.id} className="flex justify-between text-sm py-1">
                                        <span className="text-muted-foreground">
                                            {item.product.name} × {item.quantity}
                                        </span>
                                        <span className="font-medium text-foreground">
                                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                                <Separator className="my-3" />
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-foreground text-lg">Total</span>
                                    <span className="font-bold text-primary text-2xl">
                                        ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate({ to: '/admin/orders' })}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createOrder.isPending || cart.length === 0 || !customerName.trim()}
                            className="gap-2 min-w-[140px]"
                        >
                            {createOrder.isPending ? (
                                <>
                                    <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-foreground"></span>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-4 h-4" />
                                    Create Order
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
