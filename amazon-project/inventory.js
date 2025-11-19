let products = JSON.parse(localStorage.getItem('product')) || [{
    name: "abc",
    sku: "abc",
    stock: 3,
    price: 24
}];

window.onload = function() { // this loads this function automatically when the window opens
    display();
};
function addProduct(){
    const product_name=document.querySelector('.product-name').value;
    const sku=document.querySelector('.product-sku').value;
    const stock=document.querySelector('.product-stock').value;
    const price=document.querySelector('.product-price').value;
products.push({ name: product_name, sku: sku, stock: stock, price: price });
console.log(products);
localStorage.setItem('product', JSON.stringify(products));
display();
}

function openAddProductPopup(){
    document.querySelector('#add-product-popup').style.display='inline';
}

function closeAddProductPopup(){
    document.querySelector('#add-product-popup').style.display='None';
}
function display(product=products){
    let productDetailsHTML='';
    product.forEach((product, index)=>{
        productDetailsHTML+=`
        <tr>
        <td>${product.name}</td>
<td>${product.sku}</td>
<td>${product.price}</td>
<td>${product.stock}</td>
<td><button onclick="deleteProduct(${index})">Delete</button></td>
<td><button onclick="editProduct(${index})">Edit</button></td>
        </tr>`
    });
    document.querySelector('.product-table tbody').innerHTML=productDetailsHTML;
}

function deleteProduct(index){
    products.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(products));
    display();
}

function editProduct(index){
    const product = products[index];
    // Pre-fill the popup inputs with current values
    document.querySelector('.product-name').value = product.name;
    document.querySelector('.product-sku').value = product.sku;
    document.querySelector('.product-stock').value = product.stock;
    document.querySelector('.product-price').value = product.price;
    
    // Show the popup
    openAddProductPopup();

    // Change the save button to update instead of add
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.textContent = 'Update';
    
    saveBtn.onclick = function() {
        // Update the product
        products[index] = {
            name: document.querySelector('.product-name').value,
            sku: document.querySelector('.product-sku').value,
            stock: document.querySelector('.product-stock').value,
            price: document.querySelector('.product-price').value
        };
        localStorage.setItem('product', JSON.stringify(products));
        display();
        closeAddProductPopup();

        // Reset save button back to Add
        saveBtn.textContent = '+ Add Product';
        saveBtn.onclick = addProduct;
        clearInputs();
    };
}

function clearInputs(){
    document.querySelector('.product-name').value = '';
    document.querySelector('.product-sku').value = '';
    document.querySelector('.product-stock').value = '';
    document.querySelector('.product-price').value = '';
}

function filterProducts(){
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
    );
    display(filtered);
}

