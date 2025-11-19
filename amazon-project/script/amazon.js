import {cart, updateCart, saveToStorage} from  '../data/cart.js';
import {products} from '../data/products.js';
let productHTML='';
products.forEach((value)=>{
    productHTML +=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${value.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${value.getStarsURL()}">
            <div class="product-rating-count link-primary">
              ${value.rating.count}
            </div>
          </div>
        ${value.extraInfo()}
          <div class="product-price">
            $${value.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        ${value.ex}
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id="${value.id}">
            Add to Cart
          </button>
        </div>`;
        
}

);



console.log(productHTML);
document.querySelector('.products-grid').innerHTML = productHTML;
document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  
  function addToCart(productId){
    let matchingItem = cart.find(item => item.productId === productId);
  
      // Update quantity or add new
      if (matchingItem) { //truthy so it increases if there is no value goes to else automatically
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
      saveToStorage();
      
    }
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCart();
})
});


