import './style.css'

interface Articles {
  id_article: number;
  nom: string;
  prix: number;
  description: string; 
  image: string;
}

async function getTableau<T>(url: string): Promise<T[]> {
  const res = await fetch(url);
  return await res.json();
}

async function init() {
  console.log("Chargement des données...");

  const articlesData = await getTableau<Articles>('http://localhost/eatsmart-evann/evann-api-eatsmart/articles');

  const appDiv = document.querySelector<HTMLDivElement>('#app');

  const listePlats = articlesData.map(p => 
  `<div class="card">
    <img id="img" src="${p.image}">
    <h3>${p.nom}</h3>
    <p>${p.description}</p>
    <strong><p>Prix : ${p.prix}€</p></strong>
    <input type="button" class="btn-order" name="btn${p.id_article}" value="Ajouter">
  </div>`
  ).join('');

  if (appDiv) {
    appDiv.innerHTML = `
    <header>
      <h1 style="display:inline">EatSmart - Carte du Restaurant</h1>
      <input type="search" id="search" name="search"/>
    </header>
    <main class="menu-container">
      ${listePlats}
    </main>`
  }
  
  const tousLesBoutons = document.querySelectorAll<HTMLButtonElement>('.btn-order');

  tousLesBoutons.forEach((btn, index) => {

    btn.addEventListener('click', () => {
      
      console.log(`Bouton n°${index} cliqué ! Plat = ${articlesData[index].nom}`);
    
    });
  
  });

  const search = document.querySelector<HTMLInputElement>('#search');

  search?.addEventListener('input', () => {

    const valeur = search.value.toLowerCase();

    const cards = document.querySelectorAll<HTMLDivElement>('.card');

    cards.forEach(card => {

      const nom = card.querySelector('h3')?.textContent?.toLowerCase() || '';

      if (nom.includes(valeur)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });

}

init();