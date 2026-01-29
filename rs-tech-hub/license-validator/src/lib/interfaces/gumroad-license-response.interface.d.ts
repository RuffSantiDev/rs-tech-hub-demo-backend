export interface GumroadCard {
    expiry_month: number | null;
    expiry_year: number | null;
    type: string | null;
    visual: string | null;
}
export interface GumroadPurchase {
    seller_id: string;
    product_id: string;
    product_name: string;
    permalink: string;
    product_permalink: string;
    email: string;
    price: number;
    gumroad_fee: number;
    currency: string;
    quantity: number;
    discover_fee_charged: boolean;
    can_contact: boolean;
    referrer: string;
    card: GumroadCard;
    order_number: number;
    sale_id: string;
    sale_timestamp: string;
    purchaser_id: string;
    subscription_id: string;
    variants: string;
    license_key: string;
    is_multiseat_license: boolean;
    ip_country: string;
    recurrence: string;
    is_gift_receiver_purchase: boolean;
    refunded: boolean;
    disputed: boolean;
    dispute_won: boolean;
    id: string;
    created_at: string;
    custom_fields: any[];
    chargebacked: boolean;
    subscription_ended_at: string | null;
    subscription_cancelled_at: string | null;
    subscription_failed_at: string | null;
}
export interface GumroadLicenseResponse {
    success: boolean;
    uses: number;
    purchase: GumroadPurchase;
}
export declare const example_response: {
    success: boolean;
    uses: number;
    purchase: {
        seller_id: string;
        product_id: string;
        product_name: string;
        permalink: string;
        product_permalink: string;
        email: string;
        price: number;
        gumroad_fee: number;
        currency: string;
        quantity: number;
        discover_fee_charged: boolean;
        can_contact: boolean;
        referrer: string;
        card: {
            expiry_month: null;
            expiry_year: null;
            type: null;
            visual: null;
        };
        order_number: number;
        sale_id: string;
        sale_timestamp: string;
        purchaser_id: string;
        subscription_id: string;
        variants: string;
        license_key: string;
        is_multiseat_license: boolean;
        ip_country: string;
        recurrence: string;
        is_gift_receiver_purchase: boolean;
        refunded: boolean;
        disputed: boolean;
        dispute_won: boolean;
        id: string;
        created_at: string;
        custom_fields: never[];
        chargebacked: boolean;
        subscription_ended_at: null;
        subscription_cancelled_at: null;
        subscription_failed_at: null;
    };
};
//# sourceMappingURL=gumroad-license-response.interface.d.ts.map