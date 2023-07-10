console.log("Exporting module");

export const cart = [];

export const addToCart = (name, price) => {
    cart.push({ name, price });

    console.log(`${name} : ${price}`);
};
