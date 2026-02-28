import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useGetAllOrders, useUpdateOrderStatus } from '../../hooks/useQueries';
import { OrderStatus } from '../../backend';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Plus, ShoppingCart, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    [OrderStatus.pending]: { label: 'Pending', color: 'bg-warning/20 text-warning-foreground border-0', icon: Clock },
    [OrderStatus.completed]: { label: 'Completed', color: 'bg-success/15 text-success border-0', icon: CheckCircle },
    [OrderStatus.cancelled]: { label: 'Cancelled', color: 'bg-destructive/15 text-destructive border-0', icon: XCircle },
};

function formatDate(timestamp: bigint) {
    const ms = Number(timestamp) / 1_000_000;
    return new Date(ms).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function OrderManagementPage() {
    const { data: orders, isLoading } = useGetAllOrders();
    const updateStatus = useUpdateOrderStatus();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filtered = orders?.filter((o) => statusFilter === 'all' || o.status === statusFilter) || [];

    const handleStatusChange = async (orderId: number, status: OrderStatus) => {
        try {
            await updateStatus.mutateAsync({ orderId, status });
            toast.success('Order status updated');
        } catch {
            toast.error('Failed to update order status');
        }
    };

    const counts = {
        all: orders?.length || 0,
        [OrderStatus.pending]: orders?.filter((o) => o.status === OrderStatus.pending).length || 0,
        [OrderStatus.completed]: orders?.filter((o) => o.status === OrderStatus.completed).length || 0,
        [OrderStatus.cancelled]: orders?.filter((o) => o.status === OrderStatus.cancelled).length || 0,
    };

    return (
        <div className="min-h-screen">
            <section className="bg-primary/5 border-b border-border py-8">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-foreground">Order Management</h1>
                        <p className="text-muted-foreground text-sm mt-1">View and manage all sales orders</p>
                    </div>
                    <Button asChild className="gap-2">
                        <Link to="/admin/orders/new">
                            <Plus className="w-4 h-4" />
                            New Order
                        </Link>
                    </Button>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Status Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                        { key: 'all', label: 'All Orders', color: 'text-foreground' },
                        { key: OrderStatus.pending, label: 'Pending', color: 'text-warning' },
                        { key: OrderStatus.completed, label: 'Completed', color: 'text-success' },
                        { key: OrderStatus.cancelled, label: 'Cancelled', color: 'text-destructive' },
                    ].map((s) => (
                        <button
                            key={s.key}
                            onClick={() => setStatusFilter(s.key)}
                            className={`bg-card rounded-xl border p-4 text-left transition-all shadow-xs hover:shadow-card ${statusFilter === s.key ? 'border-primary ring-1 ring-primary/30' : 'border-border'}`}
                        >
                            <div className={`text-2xl font-bold ${s.color}`}>{counts[s.key as keyof typeof counts]}</div>
                            <div className="text-sm text-muted-foreground">{s.label}</div>
                        </button>
                    ))}
                </div>

                {/* Filter */}
                <div className="flex items-center gap-3 mb-6">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Orders</SelectItem>
                            <SelectItem value={OrderStatus.pending}>Pending</SelectItem>
                            <SelectItem value={OrderStatus.completed}>Completed</SelectItem>
                            <SelectItem value={OrderStatus.cancelled}>Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">{filtered.length} orders</span>
                </div>

                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-14 w-full rounded-lg" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">No orders found</h3>
                        <p className="text-muted-foreground mb-4">
                            {statusFilter !== 'all' ? 'No orders with this status.' : 'Create your first order to get started.'}
                        </p>
                        <Button asChild className="gap-2">
                            <Link to="/admin/orders/new">
                                <Plus className="w-4 h-4" />
                                New Order
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold">Order ID</TableHead>
                                    <TableHead className="font-semibold">Customer</TableHead>
                                    <TableHead className="font-semibold">Items</TableHead>
                                    <TableHead className="font-semibold">Total</TableHead>
                                    <TableHead className="font-semibold">Date</TableHead>
                                    <TableHead className="font-semibold">Status</TableHead>
                                    <TableHead className="font-semibold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((order) => {
                                    const cfg = statusConfig[order.status];
                                    return (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-mono text-sm font-medium">
                                                #{order.id.toString().padStart(4, '0')}
                                            </TableCell>
                                            <TableCell className="font-medium">{order.customerName}</TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                            </TableCell>
                                            <TableCell className="font-semibold text-primary">
                                                ₹{order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(order.timestamp)}
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={order.status}
                                                    onValueChange={(v) => handleStatusChange(order.id, v as OrderStatus)}
                                                    disabled={updateStatus.isPending}
                                                >
                                                    <SelectTrigger className="w-[130px] h-8 text-xs">
                                                        <Badge className={`${cfg.color} text-xs`}>
                                                            {cfg.label}
                                                        </Badge>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={OrderStatus.pending}>Pending</SelectItem>
                                                        <SelectItem value={OrderStatus.completed}>Completed</SelectItem>
                                                        <SelectItem value={OrderStatus.cancelled}>Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                                                    onClick={() =>
                                                        navigate({
                                                            to: '/admin/orders/$orderId',
                                                            params: { orderId: order.id.toString() },
                                                        })
                                                    }
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}
