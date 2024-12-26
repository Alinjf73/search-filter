const searchInput = document.querySelector("#search");
const productsCenter = document.querySelector(".products-center");
const buttons = document.querySelectorAll(".btn");
let allProductsData = [];
const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });
  productsCenter.innerHTML = "";
  //   render to DOM
  filteredProducts.forEach((item) => {
    const productsDiv = document.createElement("div");
    productsDiv.classList = "product";
    productsDiv.innerHTML = `<div class="product-image">
            <img src=${item.image} alt="p-${item.id}" />
          </div>
          <div class="product-desc">
            <p class="product-price">${item.price}</p>
            <p class="product-title">${item.title}</p>
          </div>`;
    productsCenter.appendChild(productsDiv);
  });
}

// search
searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

// filter

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filters.searchItems = e.target.dataset.filter;
    renderProducts(allProductsData, filters);
  });
});
