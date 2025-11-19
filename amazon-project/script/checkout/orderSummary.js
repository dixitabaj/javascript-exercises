    import { products, getProduct } from '../../data/products.js';
    import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
    import {formatCurrency} from '../../../utils/money.js'
    import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
    import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
    import { renderPaymentSummary } from './paymentSummary.js';

    const today=dayjs();
    export function renderOrderSummary(){
    let cartHTML='';
    cart.forEach((cartItem) => {
    const productId=cartItem.productId;

    const matchingItem=getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;

    // Find the correct delivery option for this cart item
    const deliveryOption=getDeliveryOption(deliveryOptionId);

    // Now safely calculate delivery date
    const today = dayjs();
    const day = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = day.format('dddd, MMMM D');

    cartHTML +=`<div class="cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingItem.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingItem.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingItem.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary" data-product-id="${matchingItem.id}">
                Delete
                </span>
            </div>
            </div>
    ${deliveryOpt(matchingItem, cartItem)}
            
            
            </div>
        </div>
        </div>`;

    })

    //console.log(cartHTML);
    document.querySelector('.cart-item-container').innerHTML=cartHTML;

    document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
    console.log("delete");
    const productId = link.dataset.productId; // make sure you added data-id to the HTML
    removeFromCart(productId);
    renderPaymentSummary(productId);
    document.querySelector(`.cart-item-container-${productId}`).remove();
    });
    });
    document.querySelectorAll('.delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary(); // Re-render cart with updated delivery date
        renderPaymentSummary(productId);
        });
    });
    }
    function deliveryOpt(matchingItem, cartItem) {
    let deliveryHTML = `
    <div class="delivery-options" data-product-id="${matchingItem.id}">
        <div class="delivery-options-title">Choose a delivery option:</div>`;

    deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const day = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = day.format('dddd, MMMM D');

    const priceString =
        deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    deliveryHTML += `
        <div class="delivery-option" 
            data-product-id="${matchingItem.id}" 
            data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" 
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
        <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
        </div>`;
    });

    deliveryHTML += `</div>`;
    return deliveryHTML;
    }






