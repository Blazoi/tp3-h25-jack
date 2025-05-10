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
  root.style.setProperty("--couleur1", "#101017");
  root.style.setProperty("--couleur2", "#080810");
  root.style.setProperty("--couleur3", "#f5f5f5");
  root.style.setProperty("--couleur4", "#1b3d76");
  clair = false;
  console.log(clair);
  btnmode.innerHTML = '<i class="bx bxs-sun"></i>';
  localStorage.setItem("sombreclair", "sombre");
}
function modeclair() {
  root.style.setProperty("--couleur1", "#f5f5f5");
  root.style.setProperty("--couleur2", "#f8f8f8");
  root.style.setProperty("--couleur3", "#000000");
  root.style.setProperty("--couleur4", "#1b3d76");
  clair = true;
  console.log(clair);
  btnmode.innerHTML = '<i class="bx bxs-moon"></i>';
  localStorage.setItem("sombreclair", "clair");
}

// Produits

document.addEventListener("DOMContentLoaded", function () {
  const api = "http://localhost:8080/ords/tp3/produits/";
  const listeDeProduits = document.querySelector(".produits");

  fetch(api).then((response) => {
    if (response) {
      return response.json();
    }
  });

  function afficherProduits(produits) {
    listeDeProduits.innerHTML = "";

    produits.forEach((produit) => {
      const arriere = document.createElement("div");
      arriere.className = "produit";
      arriere.innerHTML = `
          <img src="${produit.image}" alt="">
          <h3 class="titre">${produit.titre}</h3>
          <div class="desc">
            <p class="lang">${produit.lang}</p>
            <p class="prix">${produit.prix}$</p>
          </div>
        `;
    });
  }
});
