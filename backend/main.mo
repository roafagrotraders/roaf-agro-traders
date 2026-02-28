import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Nat32 "mo:core/Nat32";
import Int64 "mo:core/Int64";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  // ─── State ─────────────────────────────────────────────────────────────────

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ─── User Profle ───────────────────────────────────────────────────────────

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ─── Business Profile ──────────────────────────────────────────────────────

  public type BusinessProfile = {
    name : Text;
    description : Text;
    affiliation : Text;
    approvalStatus : Text;
    address : Text;
    contactNumber : Text;
  };

  public query func getBusinessProfile() : async BusinessProfile {
    {
      name = "Roaf Agro Traders";
      description = "Dealership and retail of agricultural tools and equipment.";
      affiliation = "Rural Business Service Hub";
      approvalStatus = "Approved by Horticultural and Agricultural Department";
      address = "Hangulgund Kokernag, near SBI Bank";
      contactNumber = "6006149326";
    };
  };

  // ─── Product Catalog ───────────────────────────────────────────────────────

  public type ProductCategory = {
    #machinery;
    #handTools;
    #irrigation;
    #fertilizers;
    #other;
  };

  public type Product = {
    id : Nat32;
    name : Text;
    category : ProductCategory;
    description : Text;
    price : Float;
    available : Bool;
  };

  module Product {
    public func compareByPrice(p1 : Product, p2 : Product) : Order.Order {
      switch (Float.compare(p1.price, p2.price)) {
        case (#equal) { Nat32.compare(p2.id, p1.id) };
        case (order) { order };
      };
    };
  };

  var nextProductId : Nat32 = 1;
  var nextOrderId : Nat32 = 1;

  let products = Map.empty<Nat32, Product>();

  // Public: anyone (including guests) can browse the catalog
  public query func getProductCatalog() : async [Product] {
    products.values().toArray();
  };

  public query func getProductsByCategory(category : ProductCategory) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public query func getProductsByPriceRange(minPrice : Float, maxPrice : Float) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        (p.price >= minPrice) and (p.price <= maxPrice)
      }
    ).sort(Product.compareByPrice);
  };

  public query func getProduct(productId : Nat32) : async ?Product {
    products.get(productId);
  };

  // Admin-only: manage product catalog
  public shared ({ caller }) func addProduct(
    name : Text,
    category : ProductCategory,
    description : Text,
    price : Float,
  ) : async Nat32 {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let id = nextProductId;
    nextProductId += 1;
    let product : Product = {
      id;
      name;
      category;
      description;
      price;
      available = true;
    };
    products.add(id, product);
    id;
  };

  public shared ({ caller }) func updateProduct(
    productId : Nat32,
    name : Text,
    category : ProductCategory,
    description : Text,
    price : Float,
    available : Bool,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(productId)) {
      case (?_product) {
        let updatedProduct : Product = {
          id = productId;
          name;
          category;
          description;
          price;
          available;
        };
        products.add(productId, updatedProduct);
      };
      case (null) {
        Runtime.trap("Product not found");
      };
    };
  };

  public shared ({ caller }) func removeProduct(productId : Nat32) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can remove products");
    };
    switch (products.get(productId)) {
      case (?_) { products.remove(productId) };
      case (null) { Runtime.trap("Product not found") };
    };
  };

  // ─── Inventory Management ──────────────────────────────────────────────────

  public type InventoryItem = {
    productId : Nat32;
    quantity : Nat;
  };

  let inventory = Map.empty<Nat32, InventoryItem>();

  // Admin-only: inventory is a staff/management module
  public shared ({ caller }) func addInventoryItem(productId : Nat32, quantity : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add inventory items");
    };
    switch (products.get(productId)) {
      case (?_) {
        let item : InventoryItem = { productId; quantity };
        inventory.add(productId, item);
      };
      case (null) { Runtime.trap("Product not found") };
    };
  };

  public shared ({ caller }) func updateInventoryItem(productId : Nat32, quantity : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update inventory items");
    };
    switch (inventory.get(productId)) {
      case (?_) {
        let updatedItem : InventoryItem = { productId; quantity };
        inventory.add(productId, updatedItem);
      };
      case (null) { Runtime.trap("Inventory item not found") };
    };
  };

  public shared ({ caller }) func removeInventoryItem(productId : Nat32) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can remove inventory items");
    };
    switch (inventory.get(productId)) {
      case (?_) { inventory.remove(productId) };
      case (null) { Runtime.trap("Inventory item not found") };
    };
  };

  // Admin-only: inventory data is internal/staff-facing
  public query ({ caller }) func getInventoryItem(productId : Nat32) : async ?InventoryItem {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view inventory");
    };
    inventory.get(productId);
  };

  public query ({ caller }) func getAllInventory() : async [InventoryItem] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view inventory");
    };
    inventory.values().toArray();
  };

  // ─── Sales and Order Management ────────────────────────────────────────────

  public type OrderStatus = {
    #pending;
    #completed;
    #cancelled;
  };

  public type OrderItem = {
    productId : Nat32;
    quantity : Nat;
  };

  public type SalesOrder = {
    id : Nat32;
    customerName : Text;
    items : [OrderItem];
    totalAmount : Float;
    status : OrderStatus;
    timestamp : Int64;
  };

  let orders = Map.empty<Nat32, SalesOrder>();

  // Authenticated users can create orders (retail/dealership transactions)
  public shared ({ caller }) func createOrder(
    customerName : Text,
    items : [OrderItem],
    totalAmount : Float,
  ) : async Nat32 {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create orders");
    };
    let id = nextOrderId;
    nextOrderId += 1;
    let order : SalesOrder = {
      id;
      customerName;
      items;
      totalAmount;
      status = #pending;
      timestamp = Int64.fromInt(Time.now());
    };
    orders.add(id, order);
    id;
  };

  // Admin-only: update order status
  public shared ({ caller }) func updateOrderStatus(orderId : Nat32, status : OrderStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(orderId)) {
      case (?order) {
        let updatedOrder : SalesOrder = {
          id = order.id;
          customerName = order.customerName;
          items = order.items;
          totalAmount = order.totalAmount;
          status;
          timestamp = order.timestamp;
        };
        orders.add(orderId, updatedOrder);
      };
      case (null) { Runtime.trap("Order not found") };
    };
  };

  // Admin-only: order data contains customer PII
  public query ({ caller }) func getOrder(orderId : Nat32) : async ?SalesOrder {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.get(orderId);
  };

  public query ({ caller }) func getAllOrders() : async [SalesOrder] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };
};
