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

for (let plat of plats) {
  console.log(plat);
}
 