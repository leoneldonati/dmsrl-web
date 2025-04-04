export function calculateFinalPrice(products: Product[]) {
  let sum = 0;
  products.forEach((prod) => {
    prod.presentations.forEach((pres) => (sum += pres.price * pres.quantity));
  });

  return sum;
}
