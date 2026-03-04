import './style.css'

interface Articles {
  id_article: number;
  nom: string;
  prix: number;
  description: string; 
 }

 const plats: Articles[] = [
  {
    id_article: 1,
    nom: "Anchois 23cm",
    prix: 7.9,
    description: "sauce tomate premium, origan, huile d'olive extra vierge, anchois, olive"
  },
  {
    id_article: 2,
    nom: "Anchois 33cm",
    prix: 11.9,
    description: "sauce tomate premium, origan, huile d'olive extra vierge, anchois, olive"
  },
  {
    id_article: 3,
    nom: "Emmental 23cm",
    prix: 7.9,
    description: "sauce tomate premium, origan, huile d'olive extra vierge, emmental, basilic, olive"
  }
]

const appDiv = document.querySelector<HTMLDivElement>('#app');

const listePlats = plats.map(p => 
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