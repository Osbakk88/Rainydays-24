
{
      "data"; {
      "name"; "7c3d2733-4bce-4b1e-bb7f-d90c3559c743", // Or "API Key" if no name was provided
      "status"; "ACTIVE",
      "key"; "be4ab55c-d5b0-44c3-8a11-67a7dafddd10" // The API Key
    }
    
    "meta"; {}
  }

  const options = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib3NiYWtrODgiLCJlbWFpbCI6ImNocm9zYjAyMzk3QHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQyNDA5ODEzfQ.64i04pbM8LHMxjYDSp_IQbCiOAQ0kP_O8z90mQB68vk',
      'X-Noroff-API-Key': '7c3d2733-4bce-4b1e-bb7f-d90c3559c743'
    }
  };

const container = document.querySelector('.container');
const API_URL = 'https://docs.noroff.dev/docs/v2/e-commerce/rainy-days';

async function fetchAndCreateProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        data.forEach(product => {
            const card= document.createElement('div');
            const image= document.createElement('img');
            const content= document.createElement('div');
            const title= document.createElement('h3');
            const price= document.createElement('p');

            card.className = 'card';
            card.className = 'card - image';
            card.className = 'card - content';
            card.className = 'card - title';
            card.className = 'card - price';

            image.src = product.image.url;
            image.alt = product.image.alt;
            title.innerText = product.title;
            price.innerText = product.price;

            content.appendChild(title);
            content.appendChild(price);
            card.appendChild(image);
            card.appendChild(content);
            container.appendChild(card);
        });
    } catch (error) {
        console.log(error);
    }
}

fetchAndCreateProducts();   

