 //import { deliveryOptions } from "../deliveryOptions";
function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
    
        loadFromStorage() {
          this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
          if (!this.cartItems) {
            this.cartItems = [{
              productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
              quantity: 2,
              deliveryOptionId: '1'
            }, {
              productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
              quantity: 1,
              deliveryOptionId: '2'
            }];
          }
        },
      saveToStorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
      },
       updateCart(){
        let cartQuantity=0;
        this.cartItems.forEach((item)=> {
          cartQuantity+=item.quantity;
        })
        console.log(cartQuantity);
        document.querySelector('.cart-quantity').innerHTML=cartQuantity;
        console.log(cart);
        this.saveToStorage();
      },
        removeFromCart(productId){
        const newCart= [];
        this.cartItems.forEach((cartItem)=> {
          if (cartItem.productId !== productId){
            newCart.push(cartItem);
          }
        });
        cart=newCart;
        this.saveToStorage();
      },
       updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem = null;
    
        // Check if the item already exists in the cart
        this.cartItems.forEach((item) => {
          if (item.productId === productId) {
            matchingItem = item;
          }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      }
      
 };
 return cart
}
