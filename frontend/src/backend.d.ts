import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: number;
    name: string;
    description: string;
    available: boolean;
    category: ProductCategory;
    price: number;
}
export interface InventoryItem {
    productId: number;
    quantity: bigint;
}
export interface SalesOrder {
    id: number;
    customerName: string;
    status: OrderStatus;
    totalAmount: number;
    timestamp: bigint;
    items: Array<OrderItem>;
}
export interface OrderItem {
    productId: number;
    quantity: bigint;
}
export interface BusinessProfile {
    name: string;
    description: string;
    approvalStatus: string;
    address: string;
    affiliation: string;
    contactNumber: string;
}
export interface UserProfile {
    name: string;
}
export enum OrderStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed"
}
export enum ProductCategory {
    fertilizers = "fertilizers",
    other = "other",
    irrigation = "irrigation",
    handTools = "handTools",
    machinery = "machinery"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addInventoryItem(productId: number, quantity: bigint): Promise<void>;
    addProduct(name: string, category: ProductCategory, description: string, price: number): Promise<number>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(customerName: string, items: Array<OrderItem>, totalAmount: number): Promise<number>;
    getAllInventory(): Promise<Array<InventoryItem>>;
    getAllOrders(): Promise<Array<SalesOrder>>;
    getBusinessProfile(): Promise<BusinessProfile>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInventoryItem(productId: number): Promise<InventoryItem | null>;
    getOrder(orderId: number): Promise<SalesOrder | null>;
    getProduct(productId: number): Promise<Product | null>;
    getProductCatalog(): Promise<Array<Product>>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeInventoryItem(productId: number): Promise<void>;
    removeProduct(productId: number): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateInventoryItem(productId: number, quantity: bigint): Promise<void>;
    updateOrderStatus(orderId: number, status: OrderStatus): Promise<void>;
    updateProduct(productId: number, name: string, category: ProductCategory, description: string, price: number, available: boolean): Promise<void>;
}
