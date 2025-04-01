const container = document.getElementById("maleproducts");
const API_URL = "https://v2.api.noroff.dev/rainy-days";

async function fetchAndCreateMaleProducts() {
  try {
    if (!container) return;

    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;

    if (products.length === 0) {
      container.textContent = "No products available.";
      return;
    }

    products
      .filter((product) => product.gender === "Male")
      .forEach((product) => {
        const card = document.createElement("div");
        const image = document.createElement("img");
        const content = document.createElement("div");
        const title = document.createElement("h3");
        const price = document.createElement("p");
        const anchor = document.createElement("a");

        card.className = "card";
        image.className = "card-image";
        content.className = "card-content";
        title.className = "card-title";
        price.className = "card-price";

        image.src = product.image.url;
        image.alt = product.image.alt;
        title.innerText = product.title;
        price.innerText = `$${product.price.toFixed(2)}`;
        anchor.href = `product/index.html?id=${product.id}`;
        anchor.setAttribute("aria-label", `View details for ${product.title}`);

        content.appendChild(title);
        content.appendChild(price);
        card.appendChild(image);
        card.appendChild(content);
        anchor.appendChild(card);

        container.appendChild(anchor);
      });
  } catch (error) {
    container.textContent = "Failed to load products. Please try again later.";
  }
}

fetchAndCreateMaleProducts();
