 //import { deliveryOptions } from "../deliveryOptions";

export let cart = JSON.parse(localStorage.getItem('cart')) || [
    { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2,
      deliveryOptionId: 1
     },
    { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 3,
      deliveryOptionId: 2
     },
    { productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e", quantity: 4,
      deliveryOptionId: 3
     }
  ];
  


// Save cart to localStorage
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}



export function updateCart(){
    let cartQuantity=0;
    cart.forEach((item)=> {
      cartQuantity+=item.quantity;
    })
    console.log(cartQuantity);
    document.querySelector('.cart-quantity').innerHTML=cartQuantity;
    console.log(cart);
    saveToStorage();
  }

  export function removeFromCart(productId){
    const newCart= [];
    cart.forEach((cartItem)=> {
      if (cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    cart=newCart;
    saveToStorage();
  }
  
  export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem = null;

    // Check if the item already exists in the cart
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }