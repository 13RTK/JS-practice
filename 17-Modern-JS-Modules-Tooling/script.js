// import * as ShoppingCart from "./ShoppingCart.js";
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import { cloneDeep } from "lodash-es";

/*
add("bread", "20");
console.log(shoppingCart.flat());

const res = await fetch("https://jsonplaceholder.typicode.com/posts");
const data = await res.json();

console.log(data);
console.log("Something");

const ShoppingCart2 = (() => {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = (name, price) => {
        cart.push({ name, price });
        console.log(`${name} : ${price}`);
    };

    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
    };
})();

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("apple", 2);
console.log(ShoppingCart2);
*/

// ShoppingCart.addToCart("Apple", 39);

const state = {
    cart: [
        {
            product: "bread",
            quantity: 5,
            product: "pizza",
            quantity: 5,
        },
    ],
    user: { loggedIn: true },
};

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

if (module.hot) {
    module.hot.accept();
}
