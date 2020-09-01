var shopitems = [];
var cartItems =[];
let product1 = {itemName: "Gaming Laptop" , brand: 'Lenovo' , price: 1199 , id : 0  , picture : 'img/1.jpg'};
let product2 = {itemName: "Wireless Router" , brand: 'Tp-link' , price: 199.99 , id : 1  , picture : 'img/2.jpg'};
let product3 = {itemName: "Bluetooth earbuds" , brand: 'Black' , price: 99.99 , id : 464654  , picture : 'img/3.jpg'};
shopitems = [product1 , product2 ,product3];
//get Html Shop
var shop = document.getElementsByClassName('shopping-items')[0];
genrateShopItems(shopitems);
//console.log('This is the shop',  document.getElementsByClassName('shopping-items')[] );
/*
 <div class="item">
      <div class="image">
        <img class=item-img src="img/1.jpg" width="150" height="150" alt="item1" />
      </div>
      <div class="description">
        <span class="item-title">Gaming Laptop</span>
        <span class="item-brand">Lenovo</span>
        <span class="price">1199$</span>
      </div>
      <div class="add-button">
        <button class="add-btn" onclick="addToCartClicked(event)" type="button">Add to Cart</button>
        <div class="like-button">
          <div>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
*/
function genrateShopItems(shopitems){ 
//get the shop main container //shopping-items
// loop the array to access every JS shop item
for(var i =0 ; i< shopitems.length ;i++  ){ console.log('sho item',shopitems[i]);
 var shopItemRow = document.createElement('div');
let picture = shopitems[i].picture;
let itemName = shopitems[i].itemName;
let brand =  shopitems[i].brand;
let price = shopitems[i].price;
let id = shopitems[i].id;

 var htmtShopItem = `
           <div class="item">
          <div class="image">
          <img class=item-img src="${picture}" width="50" height="50" alt="item1" />
          </div>
          <div class="description">
          <span class="item-title">${itemName}</span>
          <span class="item-brand"> Brand : ${brand} </span>
          <span class="price">PRICE:$ ${price} </span>
          <button class="add-btn" onclick="addToCart(${id})" type="button">Add to Cart</button>
          <div class="like-button">
          </div>
          </div>
          `;
shopItemRow.innerHTML = htmtShopItem;
   shop.append(shopItemRow); console.log('item added to shop');
}
//shopitems.foreach( item => {  } );  

}
function addToCart(itemID){
  console.log('you clicked item ',itemID)
  var clickedItem ;
  for (var i = 0; i < shopitems.length; i++) {
      if(shopitems[i].id == itemID) {
        clickedItem = shopitems[i];
      }
  }
 console.log('you clicked ',clickedItem.itemName);
  if(clickedItem) addItemsToCart (clickedItem.itemName, clickedItem.brand, clickedItem.price, clickedItem.picture,clickedItem.id);
}










function toggle(){
  var popup = document.getElementById('popup');
  popup.classList.toggle('active');
    var blur = document.getElementById('blur');
 // blur.classList.toggle('active');
}
var cart = document.getElementsByClassName('cart')[0];
var shopItems = document.getElementsByClassName('item');


function addToCartClicked(event){ 
  console.log('clicked',event)
  var button = event.target;
  var shopItems = button.parentElement.parentElement;
  var title = shopItems.getElementsByClassName('item-title')[0].innerText;
  var brand = shopItems.getElementsByClassName('item-brand')[0].innerText;
  var prices = shopItems.getElementsByClassName('price')[0].innerText;
  var imageSrc = shopItems.getElementsByClassName('item-img')[0].src;
  addItemsToCart (title, brand, prices, imageSrc);
}
function addItemsToCart (title, brand, prices, imageSrc ,id){

   if(itemExist(id)){ alert('Item Exist in cart'); return;}
  let quantity =1 ;
   let cratItem = {itemName: title , brand: brand , price: prices , id : id  , picture : imageSrc ,quantity : quantity};
  cartItems.push(cratItem);
  console.log('this is the cart',cartItems);
  var cartRow = document.createElement('div');
      //generate the cart item HTML 
       if(imageSrc && title){
               var cartRowContents = `
               <div class="item">
              <div class="image">
              <img class=item-img src="${imageSrc}" width="50" height="50" alt="item1" />
              </div>
              <div class="description">
              <span class="item-title">${title}</span>
              <span>PRICE:$ ${prices} </span>
              <span>Quantity:$ ${quantity} </span> 
              <button onClick="addQuantity(${id})">+</button>
              <button onClick="removeQuantity(${id})">-</button>
              </div>
              </div>
              `;
       cartRow.innerHTML = cartRowContents;
       cart.append(cartRow); console.log('item added');
        refreshCart();
     // cartItems.append(cartRow)
       }
}

   var carttotalRow = document.createElement('div');
function refreshCart(){
  console.log(cart);
  cart.innerHTML = '';
  carttotalRow.innerHTML ='';
console.log(cart);
 var itemsTotalPrice = 0;
   for (var i = 0; i < cartItems.length; i++) {
           var cartRow = document.createElement('div');
        //generate the cart item HTML 
                 var cartRowContents = `
                <div class="item">
                <div class="image">
                <img class=item-img src="${cartItems[i].picture}" width="50" height="50" alt="item1" />
                </div>
                <div class="description">
                <span class="item-title">${cartItems[i].itemName}</span>
                <span>PRICE:$ ${cartItems[i].price} </span>
                <span>Quantity: ${cartItems[i].quantity} </span> 
                <button onClick="addQuantity(${cartItems[i].id})">+</button>
                <button onClick="removeQuantity(${cartItems[i].id})">-</button>
                 <button onClick="remove(${cartItems[i].id})">remove</button>
                </div>
                </div>
                `;
         cartRow.innerHTML = cartRowContents;
         cart.append(cartRow); console.log('item added');
          itemsTotalPrice += (cartItems[i].price*cartItems[i].quantity);

      } 
      carttotalRow.innerHTML = `<br></br><h4>TOTAL: $ ${itemsTotalPrice} </h4>`;
      cart.append(carttotalRow);
}

function addQuantity(id){
   console.log('cuurent cart id ',id)
console.log('called');
    for (var i = 0; i < cartItems.length; i++) {
     if(cartItems[i].id == id){
       cartItems[i].quantity ++ ; 
        cartItems[i].price =   cartItems[i].price *  cartItems[i].quantity ;
        cartItems[i].price.toFixed(2);
       refreshCart(); console.log('called2')
       } 
   console.log('Cart item Updated',cartItems);
   }


   // set the new qutity in this element 
   // path[4].children[0].childNodes[1].children[1].children[2].childNodes[0].data
}

// function limitDecimals(){
//   let cost = cartItems[0].price
//   console.log('costprice', cost)
//   for (let i = 0; i < cost; i++)
// }


function removeQuantity(id){

   
   for (var i = 0; i < cartItems.length; i++) {
   if(cartItems[i].id == id){
     cartItems[i].quantity -- ;  
     cartItems[i].price =   cartItems[i].price *  cartItems[i].quantity ;
     refreshCart();
   }
   }

 
   // set the new qutity in this element 
   // path[4].children[0].childNodes[1].children[1].children[2].childNodes[0].data
}
function remove(id){
   for (var i = 0; i < cartItems.length; i++) {
   if(cartItems[i].id == id){
cartItems.splice(i,1);
     refreshCart();
   }
   }
}
function itemExist(id) {
  var itemExist = false ;
   for(var i= 0 ; i< cartItems.length ; i++ ){
    if(cartItems[i].id == id ){
      itemExist = true ;
      break;
    }
   }

   return itemExist;
}