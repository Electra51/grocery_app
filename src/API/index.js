export const getAllProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  return await res.json();
};
export const getProductsByCategory = async (category) => {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  return await res.json();
};
export const getCart = async () => {
  const res = await fetch("https://dummyjson.com/carts/1");
  return await res.json();
};

export const addToCart = async (id) => {
  const res = await fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
    }),
  });
  return await res.json();
};
