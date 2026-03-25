import './style.css'

interface Articles {
  id_article: number;
  nom: string;
  prix: number;
  description: string; 
  image: string;
}

interface Message {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getTableau<T>(url: string): Promise<T[]> {
  const res = await fetch(url);
  return await res.json();
}

async function getObjet<O>(url: string): Promise<O> {
  const res = await fetch(url);
  return await res.json();
}

async function init() {

  console.log("Chargement des données...");

  const articlesData = await getTableau<Articles>('http://localhost/eatsmart-evann/evann-api-eatsmart/articles');

  const messageData = await getObjet<Message>('https://jsonplaceholder.typicode.com/todos/1');

  const appDiv = document.querySelector<HTMLDivElement>('#app');

  // const prix = articlesData.map(p => {
  //     if (p.prix < 10) {
  //       return `<strong><p>Prix : ${p.prix}€</p>
  //               <p>Bon Plan</p></strong>
  //               `
  //     }else{
  //       return `<strong><p>Prix : ${p.prix}€</p></strong>`
  //     }
  // });

  let panier: Articles[] = [];

  const listePlats = articlesData.map(p => 
  `<div class="card">
    <img id="img" src="${p.image}">
    <h3>${p.nom}</h3>
    <p>${p.description}</p>
    <input type="button" class="btn-order" name="btn${p.id_article}" value="Ajouter">
    <strong><p>Prix : ${p.prix}€</p></strong>
  </div>`
  ).join('');

  if (appDiv) {
    appDiv.innerHTML = `
    <header>
      <h1 style="display:inline">EatSmart - Carte du Restaurant ( ${articlesData.length} plats )</h1>
      <input type="search" id="search" name="search"/>
      <p>Message du jour : ${messageData.title}</p>
    </header>
    <div class="content-wrapper"> 
      <main class="menu-container">
        ${listePlats}
      </main>
      <aside class="cart-container">
          <h2>Votre Panier</h2>
          <div id="cart-items">
            <p>Votre panier est vide</p>
          </div>
          <hr>
          <div class="cart-total">
            <strong>Total : <span id="total-prix">0.00</span>€</strong>
          </div>
      </aside>
    </div>`

  }
  
  //Ajout d'un article dans le panier quand on clique sur un bouton
  const tousLesBoutons = document.querySelectorAll<HTMLButtonElement>('.btn-order');

  tousLesBoutons.forEach((btn, index) => {

    btn.addEventListener('click', () => {
      
      console.log(`Bouton n°${index} cliqué ! Plat = ${articlesData[index].nom}`);

      panier.push(articlesData[index]);

      console.log(`Panier = `, panier);

      const panierArticles = document.querySelector<HTMLDivElement>('#cart-items');
      
      const ajoutArticles = panier.map(p =>
        `
        <p>${p.nom} : ${p.prix} €</p>
        `
      ).join('');

      if (panierArticles){
        panierArticles.innerHTML= `
          ${ajoutArticles}
        `
      }

      //Calcul du total
      const panierTotal = document.querySelector<HTMLSpanElement>('#total-prix');

      const totalHTML = panier.reduce((total, p) => total + Number(p.prix), 0).toFixed(2);

      if (panierTotal){
        panierTotal.innerHTML= `
          ${totalHTML} 
        `
      }
    });
  
  });

  //Barre de recherche
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