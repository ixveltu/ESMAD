const productName = "Teclado Mecânico";
const price = 89.99;
const stock = 14;
const onSale = true;
let discount = null;

console.log("Tipo de 'productName':", typeof productName);
console.log("Tipo de 'price':", typeof price);
console.log("Tipo de 'stock':", typeof stock);
console.log("Tipo de 'onSale':", typeof onSale);
console.log("Tipo de 'discount':", typeof discount);

const ivaRate = 0.23;
const priceWithIVA = (price * (1 + ivaRate)).toFixed(2);
console.log("Preço com IVA (23%):", priceWithIVA);

const formattedString = `${productName} – ${priceWithIVA}€ (stock: ${stock})`;
console.log(formattedString);

function classifyStock(stock) {
 if (stock === 0) {
  return "Sold Out";
 } else if (stock >= 1 && stock <= 5) {
  return "Critical Stock";
 } else if (stock >= 6 && stock <= 20) {
  return "Normal Stock";
 } else {
  return "High Stock";
 }
}

console.log("stock:", classifyStock(stock));
console.log("stock 0:", classifyStock(0));
console.log("stock 5:", classifyStock(5));
console.log("stock 14:", classifyStock(14));
console.log("stock 23:", classifyStock(23));

let tag;
onSale ? (tag = "On Sale") : (tag = "Regular Price");
console.log("Tag:", tag);

// fetch data
async function fetchProductData() {
 try {
  const response = await fetch("./db.txt");

  if (!response.ok) {
   throw new Error("Error fetchin");
  }
  const products = await response.json();
  return products;
 } catch (e) {
  console.error("Error:", e);
 }
 return [];
}

fetchProductData();

async function checkStock() {
 const products = await fetchProductData();

 products.forEach((product) => {
  let status = "";
  if (product.stock === 0) {
   status = "Sold Out";
  } else if (product.stock >= 1 && product.stock <= 5) {
   status = "Critical Stock";
  } else if (product.stock >= 6 && product.stock <= 20) {
   status = "Normal Stock";
  } else {
   status = "High Stock";
  }
  console.log(`${product.nome}: ${status}`);
 });
}

checkStock();

async function printUpperCase() {
 const products = await fetchProductData();

 products.forEach((product) => {
  console.log(product.nome.toUpperCase());
 });
}

printUpperCase();

async function printTotalValue() {
 const products = await fetchProductData();

 let total = 0;
 products.forEach((product) => {
  const totalValue = product.preco * product.stock;

  console.log(`${product.nome}: ${totalValue.toFixed(2)}€`);
  total += totalValue;
 });

 console.log("Total Value:", total.toFixed(2) + "€");
}

printTotalValue();

async function productList() {
 const products = await fetchProductData();

 let availableProducts = [];
 let unavailableProducts = [];
 products.forEach((product) => {
  product.stock >= 1
   ? availableProducts.push(product.nome)
   : unavailableProducts.push(product.nome);
 });
 console.log("number of available products:", availableProducts.length);
 console.log("number of unavailable products:", unavailableProducts.length);
}

productList();

async function productDescription() {
 const products = await fetchProductData();

 products.forEach((product) => {
  let tag;
  emPromocao ? (tag = "On Sale") : (tag = "Regular Price");
  console.log("Tag:", tag);

  console.log(`${product.nome} ${product.preco} ${product.tag}`);
 });
}

productDescription();
