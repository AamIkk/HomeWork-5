const categories=document.getElementById('categories')
const products=document.getElementById('products')
const cartCount=document.getElementById('cartCount')

const _shopUrl='https://fakestoreapi.com/products/'

async function getShop(){
    const res=await fetch(_shopUrl)
    const data=await res.json()
    console.log(data);
    showCotegories(data);
    renderProducts(data)
}

getShop()

function showCotegories(arr){
    let newCategories=[]

    const categoriesFilter=arr.filter(el=>{
        if(el.category.name && !newCategories.includes(el.category.name)){
            newCategories.push(el.category.name)
        }
    })

    console.log(newCategories);

    categories.innerHTML=''
    for (const name of newCategories) {
        categories.innerHTML+=`
        <li>${name}</li>
        `
    }
}

function renderProducts(arr){
    products.innerHTML=''
    for (const product of arr) {
        products.innerHTML+=`
    <div onclick='getItemBuId(${product.id})' class="card" style="width: 18rem; ">
        <img src=${product.image} class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.category}</p>
        <h6>${product.price}$</h6>
  </div>
</div>
        
        `
    }
}

async function getItemBuId(id){
    const res=await fetch(_shopUrl+id)
    const data=await res.json()
    console.log(data);
    showOneCard(data);
}

getItemBuId(2)

function showOneCard(obj){
    products.innerHTML=''
    products.innerHTML+=`
    <div class="card" style="width: 22rem;">
      <img src=${obj.image} class="card-img-top" alt="...">
  <div class="card-body">
      <h5 class="card-title">${obj.title}</h5>
      <p class="card-text">${obj.description}</p>
      <h4>${obj.price}$</h4>
      <a href="#" onclick='addItemToCart(${obj.id})' class="btn btn-primary">Добавить в корзину!</a>
   </div>
 </div>
    `
}
let arrCart=[]

async function addItemToCart(id){
    const res=await fetch(_shopUrl+id)
    const data=await res.json()
    console.log(data);
    arrCart.push(data)
    const cartData=JSON.stringify(arrCart)
    localStorage.setItem('cart', cartData )
    getItemFromCart()
}

function getItemFromCart(){
    const data=JSON.parse(localStorage.getItem('cart'))
    console.log(data, 'localStorage');
    arrCart=data
}
getItemFromCart()
cartCount.innerHTML=arrCart.length