import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'

export const pb = new PocketBase('https://r213.petit-hugommi1.fr:443')

// Copier ici les fonctions developpées en R214 | Système d'information

// 5) récupérer la liste de toutes les maisons

try {
    const fullListMaison = await pb.collection('maison').getFullList();
    console.table(JSON.stringify(fullListMaison, null, 2));
} catch (e) {
    console.error(e);
}


// 6) afficher une maison en connaissait son id

try {
    const maisonParId = await pb.collection('maison').getOne('444444444444444');
    console.table(JSON.stringify(maisonParId, null, 2));
} catch (e) {
    console.error(e);
}


// 7) Maisons par odre croissant de création dans la base de données

try {
    const maisonTriParDate = await pb.collection('maison').getFullList({ sort: 'created', });
    console.table(JSON.stringify(maisonTriParDate, null, 2));
} catch (e) {
    console.error(e);
}

// 8) Maisons par odre décroissant de création dans la base de données

try {
    const maisonTriParDateDesc = await pb.collection('maison').getFullList({ sort: '-created', });
    console.table(JSON.stringify(maisonTriParDateDesc, null, 2));
} catch (e) {
    console.error(e);
}

// 9) Toutes les maisons en favoris

try {
    const siFavori = await pb.collection('maison').getFullList({ filter: 'favori = true', });
    console.table(JSON.stringify(siFavori, null, 2));
} catch (e) {
    console.error(e);
}

// 10) Toutes les maisons qui une superficie supérieure à 100

try {
    const Superficie100 = await pb.collection('maison').getFullList({ filter: 'surface > 100', });
    console.table(JSON.stringify(Superficie100, null, 2));
} catch (e) {
    console.error(e);
}

// 11) Superficie supereieur à 100 et au moins 2 salles de bain

try {
    const Superficie100Et2Sdb = await pb.collection('maison').getFullList({ filter: 'surface > 100 && nbSdb >= 2', });
    console.table(JSON.stringify(Superficie100Et2Sdb, null, 2));
} catch (e) {
    console.error(e);
}

// 12) Superficie supereieur à 100 ou au moins 3 chambres

try {
    const Superficie100Et3Chb = await pb.collection('maison').getFullList({ filter: 'surface > 100 || nbChambres >= 3', });
    console.table(JSON.stringify(Superficie100Et3Chb, null, 2));
} catch (e) {
    console.error(e);
}

// 13) Superficie supereieur à 100 ordonnée par prix croissant

try {
    const Superficie100ParPrix = await pb.collection('maison').getFullList({ filter: 'surface > 100', sort: 'prix', });
    console.table(JSON.stringify(Superficie100ParPrix, null, 2));
} catch (e) {
    console.error(e);
}

// 14) Ordre croissant de leur nom

try {
    const TriParNom = await pb.collection('maison').getFullList({ sort: 'nomMaison', });
    console.table(JSON.stringify(TriParNom, null, 2));
} catch (e) {
    console.error(e);
}

// 15) Afficher la maison en donnant son nom
try {
    const maisonParNom = await pb.collection('maison').getFullList({ filter: 'nomMaison="villa Peujeux "' });
    console.table(JSON.stringify(maisonParNom, null, 2));
} catch (e) {
    console.error(e);
}

// 16) Nom différent et triées par odre croissant de nom

try {
    const maisonParNomEtTri = await pb.collection('maison').getFullList({ filter: 'nomMaison!="villa Peujeux "', sort: 'nomMaison', });
    console.table(JSON.stringify(maisonParNomEtTri, null, 2));
} catch (e) {
    console.error(e);
}

// Etape 8
export async function allMaisons() {
const records = await pb.collection('maison').getFullList() ;
return records ;
}

// Etape 11
export async function oneID(id) {
  const records = await pb.collection('maison').getOne(`${id}`);
  return records
}

// Etape 12
export async function allMaisonsFavoris() {
  const records = await pb.collection('maison').getFullList(
    { filter: 'favori = true', }
  )
  return records
}

// Etape 13
export async function allMaisonsSorted() {
  const records = await pb.collection('maison').getFullList({
    sort: 'prix',}
  )
  return records
}

// Etape 14
export async function bySurface(surface) {
  const records = await pb.collection('maison').getFullList({
   filter: `surface > ${surface}`,
})
  return records
}

// Etape 15
export async function surfaceORprice(surface, prix) {
  const records = await pb.collection('maison').getFullList({
    filter: `surface > ${surface} || prix < ${prix}`,
})
  return records
}

// Etape 19
export async function agentParID(id) {
  const records = await pb.collection('agent').getOne(`${id}`)
  return records
}




export async function allagentsSorted() {
  const records = await pb.collection('agent').getFullList({
    sort: 'Nom'
  })
  return records
}

export async function maisonDesAgents(id) {
  const records = await pb.collection('maison').getFullList({
    filter: `id_agent = '${id}'`,
  })
  return records
}