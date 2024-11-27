var data = {
  drinks: [
    {
      id: 1,
      name: "ice tea",
      Price: "10 dh",
      img: "photo/drinks/ice tea.jpg",
    },
    {
      id: 2,
      name: "jus d'orange",
      Price: "15 dh",
      img: "photo/drinks/jus d'orange.jpg",
    },
    {
      id: 3,
      name: "jus de fraise",
      Price: "15 dh",
      img: "photo/drinks/jus de fraise.jpg",
    },
    {
      id: 4,
      name: "jus de banane",
      Price: "16 dh",
      img: "photo/drinks/jus de banane.jpg",
    },
    {
      id: 5,
      name: "jus d'ananas",
      Price: "20 dh",
      img: "photo/drinks/jus d'ananas.jpg",
    },
    {
      id: 6,
      name: "Mojito",
      Price: "25 dh",
      img: "photo/drinks/jus mojito.jpg",
    },
  ],
  pizza: [
    {
      id: 8,
      name: "viande hachee",
      Price: "5 dh",
      img: "photo/pizza/pizza viande hachee.jpg",
    },
    {
      id: 9,
      name: "fruit de mer",
      Price: "5 dh",
      img: "photo/pizza/pizza fruit de mer.jpg",
    },
    {
      id: 10,
      name: "vegetarienne",
      Price: "5 dh",
      img: "photo/pizza/pizza vegetarienne.jpg",
    },
  ],
  tajine: [
    {
      id: 11,
      name: "Tajine de legume",
      Price: "35 dh",
      img: "photo/tajine/tajine de legume.jpg",
    },
    {
      id: 12,
      name: "Tajine de poisson",
      Price: "40 dh",
      img: "photo/tajine/tajine de poisson.jpg",
    },
    {
      id: 13,
      name: "Tajine de poulet",
      Price: "30 dh",
      img: "photo/tajine/tajine de poulet.jpg",
    },
    {
      id: 14,
      name: "Tajine de viande",
      Price: "50 dh",
      img: "photo/tajine/tajine de viande.jpg",
    },
  ],
  tacos: [
    {
      id: 15,
      name: "Tacos viande",
      Price: "20 dh",
      img: "photo/tacos/download.jpg",
    },
    {
      id: 16,
      name: "Tacos poulet",
      Price: "25 dh",
      img: "photo/tacos/tacos dinde.jpg",
    },
    {
      id: 17,
      name: "Tacos mixte",
      Price: "25 dh",
      img: "photo/tacos/tacos mixte.jpg",
    },
  ],
};

function afficherProduit(categorie, element) {
  var container = document.createElement("div");
  container.classList.add("myDIV");
  // Récupère tous les éléments avec la classe 'menu'
  const old = document.getElementsByClassName("menu");

  // Parcourt tous les éléments de la collection et retire la classe 'selected'
  for (let i = 0; i < old.length; i++) {
    old[i].classList.remove("selected");
  }

  // Ajoute la classe 'selected' à un élément spécifique (par exemple, 'element')
  element.classList.add("selected");

  var produits = [];
  if (categorie === "all") {
    for (let key in data) {
      produits = produits.concat(data[key]);
    }
  } else {
    produits = data[categorie] || [];
  }

  if (produits.length === 0) {
    alert("Aucun produit trouvé pour cette catégorie");
    return;
  }

  produits.forEach((produit) => {
    var produitDiv = document.createElement("div");
    produitDiv.classList.add("produit"); // Ajout de la classe "produit"

    var img = document.createElement("img");
    img.src = produit.img;
    img.alt = produit.name;
    img.classList.add("myIMG");

    img.addEventListener("click", () => ajouterProduitFacture(produit));

    produitDiv.appendChild(img);

    var nom = document.createElement("h3");
    nom.textContent = produit.name;
    nom.classList.add("titre"); // Ajout de la classe "titre"
    produitDiv.appendChild(nom);

    var prix = document.createElement("p");
    prix.textContent = produit.Price + " DH";
    prix.style.color = "red";
    prix.style.fontWeight = "bold";
    produitDiv.appendChild(prix);

    container.appendChild(produitDiv);
  });

  var oldContainer = document.getElementById("produit-container");
  if (oldContainer) oldContainer.remove();

  container.id = "produit-container";
  var myDV = document.getElementById("dvPRODUITS");
  myDV.appendChild(container);
}

// Stocker les produits dans la facture sous forme de tableau d'objets
let facture = [];

function ajouterProduitFacture(produit) {
  // Vérifie si le produit est déjà dans la facture
  let produitTrouve = facture.find(p => p.name === produit.name);

  if (produitTrouve) {
    // Si le produit existe déjà, augmenter la quantité et mettre à jour le total
    produitTrouve.quantite++;
    produitTrouve.total = produitTrouve.quantite * parseFloat(produit.Price);

    // Mettre à jour la ligne correspondante dans le tableau
    updateLigneFacture(produitTrouve);
  } else {
    // Si le produit n'est pas dans la facture, on l'ajoute
    let newProduit = {
      name: produit.name,
      quantite: 1,
      price: parseFloat(produit.Price),
      total: parseFloat(produit.Price)
    };
    facture.push(newProduit);
    ajouterLigneFacture(newProduit);
  }

  // Mettre à jour le total de la facture
  updateTotalFacture();
}

function ajouterLigneFacture(produit) {
  var tableFacture = document.getElementById("tableFacture").getElementsByTagName("tbody")[0];
  var row = tableFacture.insertRow();

  row.innerHTML = `
    <td>${produit.name}</td>
    <td class="quantite">${produit.quantite}</td>
    <td>${produit.price.toFixed(2)} DH</td>
    <td>${produit.total.toFixed(2)} DH</td>
    <td><button onclick="removeProduit(this)">-</button></td>
  `;
}

function updateLigneFacture(produit) {
  var tableFacture = document.getElementById("tableFacture").getElementsByTagName("tbody")[0];
  var rows = tableFacture.getElementsByTagName("tr");

  // Cherche la ligne correspondante et met à jour la quantité et le total
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var nomProduit = row.cells[0].textContent;

    if (nomProduit === produit.name) {µ
      
      row.cells[1].textContent = produit.quantite; // Met à jour la quantité
      row.cells[3].textContent = produit.total.toFixed(2) + " DH"; // Met à jour le total
      break;
    }
  }
}

function removeProduit(btn) {
  var row = btn.parentNode.parentNode;
  var produitNom = row.cells[0].textContent;

  // Supprimer le produit de la facture
  facture = facture.filter(p => p.name !== produitNom);

  row.parentNode.removeChild(row);
  updateTotalFacture();
}

function updateTotalFacture() {
  var total = facture.reduce(function (sum, produit) {
    return sum + produit.total;
  }, 0);

  document.getElementById("totalFacture").textContent = total.toFixed(2) + " DH";
}
function searchProduit() {
  // Récupérer la valeur de la barre de recherche
  var input = document.getElementById("searchInput");
  var filter = input.value.toUpperCase(); // Convertir en majuscules pour une recherche insensible à la casse

  // Récupérer tous les produits affichés dans la liste des produits
  var produits = document.querySelectorAll(".produit"); // Sélectionner toutes les divs des produits

  // Boucler sur chaque produit pour le filtrer
  produits.forEach(function (produit) {
    var titre = produit.querySelector("h3.titre"); // Récupérer le titre du produit
    var txtValue = titre.textContent || titre.innerText; // Récupérer le texte du titre

    // Vérifier si le texte du titre contient le texte de recherche
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      produit.style.display = ""; // Afficher le produit s'il correspond
    } else {
      produit.style.display = "none"; // Cacher le produit s'il ne correspond pas
    }
  });
}
function resetFacture() {
  // Réinitialiser la liste des produits de la facture
  var tableFacture = document.getElementById("tableFacture");
  var tbody = tableFacture.getElementsByTagName("tbody")[0];

  // Supprimer toutes les lignes (sauf l'entête)
  while (tbody.rows.length > 0) {
    tbody.deleteRow(0);
  }

  // Réinitialiser le tableau 'facture' qui contient les produits de la commande
  facture = [];

  // Réinitialiser le total de la facture
  document.getElementById("totalFacture").textContent = "0.00 DH";

  // Optionnel : réinitialiser la barre de recherche
  document.getElementById("searchInput").value = "";

  // Réinitialiser la sélection de produit (si nécessaire)
  const old = document.getElementsByClassName("menu");
  for (let i = 0; i < old.length; i++) {
    old[i].classList.remove("selected");
  }
}


