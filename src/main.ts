import './style.css'

interface Articles {
  id_article: number;
  nom: string;
  prix: number;
  description: string; 
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
    <h3>${p.nom}</h3>
    <p>${p.description}</p>
    <strong><p>Prix : ${p.prix}€</p></strong>
  </div>`
  ).join('');

  if (appDiv) {
    appDiv.innerHTML = `
    <header>
      <h1>EatSmart - Carte du Restaurant</h1>
    </header>
    <main class="menu-container">
      ${listePlats}
    </main>`
  }
}

init();