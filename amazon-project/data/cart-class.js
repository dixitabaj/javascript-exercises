class Cart {
    cartItems = [];
    #localStorageKey ; //can only be accessed within the class only
    
    constructor(localStorageKey){
        
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
    }
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
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
    }
  
    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
  
    updateCart() {
      let cartQuantity = 0;
      this.cartItems.forEach(item => cartQuantity += item.quantity);
      document.querySelector('.cart-quantity').innerHTML = cartQuantity;
      this.saveToStorage();
    }
  
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.productId !== productId);
      this.saveToStorage();
    }
  
    updateDeliveryOption(productId, deliveryOptionId) {
      const item = this.cartItems.find(i => i.productId === productId);
      if(item){
        item.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      }
    }
  }
  
  // Usage
  
  const cart = new Cart('cart-oop');
  const businessCart=new Cart('business-oop');
  console.log(cart);
  console.log(businessCart);
  