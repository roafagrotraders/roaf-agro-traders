import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import {
    type Product,
    type ProductCategory,
    type InventoryItem,
    type SalesOrder,
    type OrderStatus,
    type OrderItem,
    type UserProfile,
    type BusinessProfile,
} from '../backend';

// ─── Business Profile ──────────────────────────────────────────────────────

export function useGetBusinessProfile() {
    const { actor, isFetching } = useActor();
    return useQuery<BusinessProfile>({
        queryKey: ['businessProfile'],
        queryFn: async () => {
            if (!actor) throw new Error('Actor not available');
            return actor.getBusinessProfile();
        },
        enabled: !!actor && !isFetching,
    });
}

// ─── User Profile ──────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
    const { actor, isFetching: actorFetching } = useActor();
    const query = useQuery<UserProfile | null>({
        queryKey: ['currentUserProfile'],
        queryFn: async () => {
            if (!actor) throw new Error('Actor not available');
            return actor.getCallerUserProfile();
        },
        enabled: !!actor && !actorFetching,
        retry: false,
    });
    return {
        ...query,
        isLoading: actorFetching || query.isLoading,
        isFetched: !!actor && query.isFetched,
    };
}

export function useSaveCallerUserProfile() {
    const { actor } = useActor();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (profile: UserProfile) => {
            if (!actor) throw new Error('Actor not available');
            return actor.saveCallerUserProfile(profile);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
        },
    });
}

export function useIsCallerAdmin() {
    const { actor, isFetching } = useActor();
    return useQuery<boolean>({
        queryKey: ['isCallerAdmin'],
        queryFn: async () => {
            if (!actor) return false;
            return actor.isCallerAdmin();
        },
        enabled: !!actor && !isFetching,
    });
}

// ─── Product Catalog ──────────────────────────────────────────────────────

export function useGetProductCatalog() {
    const { actor, isFetching } = useActor();
    return useQuery<Product[]>({
        queryKey: ['productCatalog'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getProductCatalog();
        },
        enabled: !!actor && !isFetching,
    });
}

export function useGetProductsByCategory(category: ProductCategory | null) {
    const { actor, isFetching } = useActor();
    return useQuery<Product[]>({
        queryKey: ['productsByCategory', category],
        queryFn: async () => {
            if (!actor || !category) return [];
            return actor.getProductsByCategory(category);
        },
        enabled: !!actor && !isFetching && !!category,
    });
}

export function useAddProduct() {
    const { actor } = useActor();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {
            name: string;
            category: ProductCategory;
            description: string;
            price: number;
        }) => {
            if (!actor) throw new Error('Actor not available');
            return actor.addProduct(data.name, data.category, data.description, data.price);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
            queryClient.invalidateQueries({ queryKey: ['productsByCategory'] });
        },
    });
}

export function useUpdateProduct() {
    const { actor } = useActor();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {
            productId: number;
            name: string;
            category: ProductCategory;
            description: string;
            price: number;
            available: boolean;
        }) => {
            if (!actor) throw new Error('Actor not available');
            return actor.updateProduct(
                data.productId,
                data.name,
                data.category,
                data.description,
                data.price,
                data.available
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
            queryClient.invalidateQueries({ queryKey: ['productsByCategory'] });
        },
    });
}

export function useRemoveProduct() {
    const { actor } = useActor();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productId: number) => {
            if (!actor) throw new Error('Actor not available');
            return actor.removeProduct(productId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productCatalog'] });
            queryClient.invalidateQueries({ queryKey: ['productsByCategory'] });
            queryClient.invalidateQueries({ queryKey: ['inventory'] });
        },
    });
}

// ─── Inventory ────────────────────────────────────────────────────────────

export function useGetAllInventory() {
    const { actor, isFetching } = useActor();
    return useQuery<InventoryItem[]>({
        queryKey: ['inventory'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAllInventory();
        },
        enabled: !!actor && !isFetching,
    });
}

export function useAddInventoryItem() {
    const { actor } = useActor();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { productId: number; quantity: bigint }) => {
            if (!actor) throw new Error('Actor not available');
            return actor.addInventoryItem(data.productId, data.quantity);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory'] });
        },
    });
}

export function useUpdateInventoryItem() {
    const { actor } = useActor();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { productId: number; quantity: bigint }) => {
            if (!actor) throw new Error('Actor not available');
            return actor.updateInventoryItem(data.productId, data.quantity);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory'] });
        },
    });
}

export function useRemoveInventoryItem() {
    const { actor } = useActor();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productId: number) => {
            if (!actor) throw new Error('Actor not available');
            return actor.removeInventoryItem(productId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory'] });
        },
    });
}

// ─── Orders ───────────────────────────────────────────────────────────────

export function useGetAllOrders() {
    const { actor, isFetching } = useActor();
    return useQuery<SalesOrder[]>({
        queryKey: ['orders'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAllOrders();
        },
        enabled: !!actor && !isFetching,
    });
}

export function useGetOrder(orderId: number | null) {
    const { actor, isFetching } = useActor();
    return useQuery<SalesOrder | null>({
        queryKey: ['order', orderId],
        queryFn: async () => {
            if (!actor || orderId === null) return null;
            return actor.getOrder(orderId);
        },
        enabled: !!actor && !isFetching && orderId !== null,
    });
}

export function useCreateOrder() {
    const { actor } = useActor();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {
            customerName: string;
            items: OrderItem[];
            totalAmount: number;
        }) => {
            if (!actor) throw new Error('Actor not available');
            return actor.createOrder(data.customerName, data.items, data.totalAmount);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export function useUpdateOrderStatus() {
    const { actor } = useActor();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { orderId: number; status: OrderStatus }) => {
            if (!actor) throw new Error('Actor not available');
            return actor.updateOrderStatus(data.orderId, data.status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['order'] });
        },
    });
}
