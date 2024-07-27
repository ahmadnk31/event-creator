export function formatPrice(price: number ) {
    return Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: 'EUR',
    }).format(price);
}