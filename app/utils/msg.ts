import { calculateFinalPrice } from "./prices";

export function createMsg(selectedProducts: Product[]): string {
  // Mapeamos cada producto a un string que incluya su información y la de cada presentación
  const mappedMessages = selectedProducts.map((product, index) => {
    // Para cada presentación, armamos un mensaje con los datos (por ejemplo, presentación, cantidad y precio)
    const presentationsMsg = product.presentations
      .map(
        (p) =>
          `  - ${p.presentation}: Cantidad ${p.quantity}, Precio $${
            p.price
          }, --TOTAL: $${p.quantity * p.price}`
      )
      .join("\n");

    // Devolvemos el mensaje para el producto
    return `Producto ${index + 1}: ${product.name}\n${presentationsMsg} `;
  });

  // Unimos todos los mensajes de productos en uno solo, separándolos con una línea en blanco
  return mappedMessages
    .join("\n\n")
    .concat(`\n\n -> PRECIO FINAL: $${calculateFinalPrice(selectedProducts)}`);
}
