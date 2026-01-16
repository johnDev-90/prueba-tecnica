export const get_products = async () => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "GET",
    });

    const response = await result.json();

    return response;
  } catch (error) {
    console.log(error);
  }
};
