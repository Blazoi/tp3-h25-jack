console.log(localStorage.getItem("produit"))


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

document.addEventListener("DOMContentLoaded", () => {
  const apipaniers = "http://localhost:8080/ords/tp3a/paniers/";
  const apiitems = "http://localhost:8080/ords/tp3a/items/";
  actualiserpanier()
  const produitelement = document.querySelector(".produit");
  
  function afficherproduit(produit) {
    produitelement.innerHTML = `
    <div class="gauche">
    <img src="${produit.image}" alt="">
    </div>
    <div class="droite">
    <h1 class="titre">${produit.nom_produit}</h1>
    <div class="info">
    <p>${produit.prix}$</p>
    <button class="ajouterpanier">Ajouter au panier</button>
    </div>
    <div class="para">
    <p>
    ${produit.description}
    </p>
    </div>
    </div>
    `;
  }
  afficherproduit(JSON.parse(localStorage.getItem("produit")));
  
  const btnajouter = document.querySelector(".ajouterpanier");
  

  async function ajouterpanier() {
    const iditem = String(Date.now()).slice(-5);
    const idproduit = JSON.parse(localStorage.getItem("produit")).id_produit;

    const item_panier = {
      client_id_client: 89521,
      item_id_item: Number(iditem),
      id_panier: Number(iditem) + 10,
    };
    const produit_item = {
      id_item: Number(iditem),
      qte: 1,
      produit_id_produit: idproduit,
      panier_id_panier: Number(iditem) + 10,
    };

    const nouveaupanier = await fetch(apipaniers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item_panier),
    });

    const text = await nouveaupanier.text();
    console.log(text);

    const nouvelitem = await fetch(apiitems, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produit_item),
    });

    const text2 = await nouvelitem.text();
    console.log(text2);
    actualiserpanier();
  }

  btnajouter.onclick = ajouterpanier;
  const numpanier = document.querySelector(".boutonpanier");
  async function actualiserpanier() {
    await fetch(apipaniers)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        numpanier.innerHTML = `Panier <i class="bx bx-cart-alt"></i> (${data.items.length})`
      })
  }
});
