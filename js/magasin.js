
const root = document.querySelector(":root");
const cs = getComputedStyle(root);
const btnmode = document.querySelector(".boutonmode");
const btncompte = document.querySelector(".boutoncompte");

let clair = localStorage.getItem("mode") === "false";

// Bouton mode sombre hover
btnmode.addEventListener("mouseenter", function () {
  btnmode.style.color = cs.getPropertyValue("--couleur4");
});
btnmode.addEventListener("mouseleave", function () {
  btnmode.style.color = cs.getPropertyValue("--couleur3");
});
// Bouton compte hover
btncompte.addEventListener("mouseenter", function () {
  btncompte.style.color = cs.getPropertyValue("--couleur4");
});
btncompte.addEventListener("mouseleave", function () {
  btncompte.style.color = cs.getPropertyValue("--couleur3");
});

// Logo
const logo = document.querySelector(".logo");
const h1 = document.querySelector(".logo h1");
const h3 = document.querySelector(".logo h3");

logo.addEventListener("mouseenter", function () {
  h1.style.color = cs.getPropertyValue("--couleur4");
  h3.style.color = cs.getPropertyValue("--couleur4");
  h3.style.borderBlock = `${cs.getPropertyValue("--couleur4")} solid 2px`;
});

logo.addEventListener("mouseleave", function () {
  h1.style.color = cs.getPropertyValue("--couleur3");
  h3.style.color = cs.getPropertyValue("--couleur3");
  h3.style.borderBlock = `${cs.getPropertyValue("--couleur3")} solid 2px`;
});

if (localStorage.getItem("sombreclair") == "clair") {
  modeclair();
} else {
  modesombre();
}

btnmode.onclick = () => {
  if (btnmode.innerHTML == `<i class="bx bxs-moon"></i>`) {
    modesombre();
  } else {
    modeclair();
  }
};

function modesombre() {
  root.style.setProperty("--couleur1", "#090909");
  root.style.setProperty("--couleur2", "#262626");
  root.style.setProperty("--couleur3", "#f6f6f6");
  root.style.setProperty("--couleur4", "#c0d3fa");
  root.style.setProperty("--couleur5", "#444454");
  root.style.setProperty("--couleurbordure", "#8c8c8c");
  clair = false;
  console.log(clair);
  btnmode.innerHTML = '<i class="bx bxs-sun"></i>';
  localStorage.setItem("sombreclair", "sombre");
}
function modeclair() {
  root.style.setProperty("--couleur1", "#e4e4e4");
  root.style.setProperty("--couleur2", "#fff");
  root.style.setProperty("--couleur3", "#000");
  root.style.setProperty("--couleur4", "#6c82a1");
  root.style.setProperty("--couleur5", "#c0d3fa");
  root.style.setProperty("--couleurbordure", "#c6c6c6");
  clair = true;
  console.log(clair);
  btnmode.innerHTML = '<i class="bx bxs-moon"></i>';
  localStorage.setItem("sombreclair", "clair");
}

// Produits

document.addEventListener("DOMContentLoaded", function () {
  const apiproduits = "http://localhost:8080/ords/tp3a/produits/";
  const listeDeProduits = document.querySelector(".produits");
  
  fetch(apiproduits)
  .then((response) => {
      if (response) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((produits) => {
      afficherProduits(produits.items);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
    
    function afficherProduits(produits) {
      listeDeProduits.innerHTML = "";
      
      produits.forEach((produit) => {
        const arriere = document.createElement("a");
        arriere.className = "produit";
      arriere.href = "produit.html";
      arriere.innerHTML = `
      <img src="${produit.image}" alt="">
      <div class="titrediv">
      <h3 class="titre">${produit.nom_produit}</h3>
      </div>
      <div class="desc">
      <p class="lang">${produit.langue}</p>
      <p class="prix">${produit.prix}$</p>
      </div>
      `;
      
      arriere.onclick = () => {
        localStorage.setItem("produit", JSON.stringify(produit));
      };
      
      listeDeProduits.appendChild(arriere);
    });
    document.querySelectorAll(".titre").forEach((texte) => {
      if (texte.textContent.length > 15) {
        texte.style.animation = "translation 15s ease-in-out infinite";
      }
    });
  }
  
  const apipaniers = "http://localhost:8080/ords/tp3a/paniers/"
  const numpanier = document.querySelector(".boutonpanier");
  function actualiserpanier() {
    fetch(apipaniers)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        numpanier.innerHTML = `Panier <i class="bx bx-cart-alt"></i> (${data.items.length})`
      })
  }
  actualiserpanier()
});
