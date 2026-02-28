import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetOrder, useGetProductCatalog, useUpdateOrderStatus } from '../../hooks/useQueries';
import { OrderStatus } from '../../backend';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { ArrowLeft, User, Calendar, Package, Receipt, Clock, CheckCircle, XCircle } from 'lucide-react';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    [OrderStatus.pending]: { label: 'Pending', color: 'bg-warning/20 text-warning-foreground border-0', icon: Clock },
    [OrderStatus.completed]: { label: 'Completed', color: 'bg-success/15 text-success border-0', icon: CheckCircle },
    [OrderStatus.cancelled]: { label: 'Cancelled', color: 'bg-destructive/15 text-destructive border-0', icon: XCircle },
};

function formatDate(timestamp: bigint) {
    const ms = Number(timestamp) / 1_000_000;
    return new Date(ms).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function OrderDetailsPage() {
    const { orderId } = useParams({ from: '/admin/orders/$orderId' });
    const navigate = useNavigate();
    const orderIdNum = parseInt(orderId);
    const { data: order, isLoading } = useGetOrder(isNaN(orderIdNum) ? null : orderIdNum);
    const { data: products } = useGetProductCatalog();
    const updateStatus = useUpdateOrderStatus();

    const getProduct = (productId: number) => products?.find((p) => p.id === productId);

    const handleStatusChange = async (status: OrderStatus) => {
        if (!order) return;
        try {
            await updateStatus.mutateAsync({ orderId: order.id, status });
            toast.success('Order status updated');
        } catch {
            toast.error('Failed to update order status');
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-64 w-full rounded-xl" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <Receipt className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Order Not Found</h2>
                <p className="text-muted-foreground mb-4">The order you're looking for doesn't exist.</p>
                <Button
                    onClick={() => navigate({ to: '/admin/orders' })}
                    variant="outline"
                    className="gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                </Button>
            </div>
        );
    }

    const cfg = statusConfig[order.status];
    const StatusIcon = cfg.icon;

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
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold font-serif text-foreground">
                                Order #{order.id.toString().padStart(4, '0')}
                            </h1>
                            <p className="text-muted-foreground text-sm mt-1">Full order details and transaction breakdown</p>
                        </div>
                        <Badge className={`${cfg.color} text-sm px-3 py-1 flex items-center gap-1.5`}>
                            <StatusIcon className="w-4 h-4" />
                            {cfg.label}
                        </Badge>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="shadow-xs">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                Customer Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold text-foreground">{order.customerName}</div>
                            <div className="text-sm text-muted-foreground mt-1">Retail / Dealership Customer</div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xs">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                Order Date
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-base font-semibold text-foreground">{formatDate(order.timestamp)}</div>
                            <div className="text-sm text-muted-foreground mt-1">Transaction timestamp</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Items */}
                <Card className="shadow-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Package className="w-4 h-4 text-primary" />
                            Order Items ({order.items.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold pl-6">Product</TableHead>
                                    <TableHead className="font-semibold">Category</TableHead>
                                    <TableHead className="font-semibold text-center">Qty</TableHead>
                                    <TableHead className="font-semibold text-right">Unit Price</TableHead>
                                    <TableHead className="font-semibold text-right pr-6">Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.items.map((item, idx) => {
                                    const product = getProduct(item.productId);
                                    const qty = Number(item.quantity);
                                    const unitPrice = product?.price ?? 0;
                                    const subtotal = unitPrice * qty;
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium pl-6">
                                                {product?.name || `Product #${item.productId}`}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {product?.category || '—'}
                                            </TableCell>
                                            <TableCell className="text-center font-semibold">{qty}</TableCell>
                                            <TableCell className="text-right text-sm text-muted-foreground">
                                                {product ? `₹${unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold text-foreground pr-6">
                                                {product ? `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <Separator />
                        <div className="flex items-center justify-between px-6 py-4">
                            <span className="font-bold text-foreground text-lg">Total Amount</span>
                            <span className="font-bold text-primary text-2xl">
                                ₹{order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Status Update */}
                <Card className="shadow-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-primary" />
                            Update Order Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Current status:</span>
                                <Badge className={`${cfg.color} flex items-center gap-1`}>
                                    <StatusIcon className="w-3.5 h-3.5" />
                                    {cfg.label}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">Change to:</span>
                                <Select
                                    value={order.status}
                                    onValueChange={(v) => handleStatusChange(v as OrderStatus)}
                                    disabled={updateStatus.isPending}
                                >
                                    <SelectTrigger className="w-[160px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={OrderStatus.pending}>Pending</SelectItem>
                                        <SelectItem value={OrderStatus.completed}>Completed</SelectItem>
                                        <SelectItem value={OrderStatus.cancelled}>Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                                {updateStatus.isPending && (
                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary inline-block"></span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
