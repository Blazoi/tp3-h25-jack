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
  root.style.setProperty("--couleur1", "#090909");
  root.style.setProperty("--couleur2", "#262626");
  root.style.setProperty("--couleur3", "#f6f6f6");
  root.style.setProperty("--couleur4", "#c0d3fa");
  root.style.setProperty("--couleur5", "#444454");
  clair = false;
  console.log(clair);
  btnmode.innerHTML = '<i class="bx bxs-sun"></i>';
  localStorage.setItem("sombreclair", "sombre");
}
function modeclair() {
  root.style.setProperty("--couleur1", "#e0e0e0");
  root.style.setProperty("--couleur2", "#f8f8f8");
  root.style.setProperty("--couleur3", "#000000");
  root.style.setProperty("--couleur4", "#152f5b");
  clair = true;
  console.log(clair);
  btnmode.innerHTML = '<i class="bx bxs-moon"></i>';
  localStorage.setItem("sombreclair", "clair");
}

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

// Categories

const cat1 = document.querySelector(".cat1");
const cat2 = document.querySelector(".cat2");
const cat3 = document.querySelector(".cat3");

cat1.addEventListener("mouseenter", function () {
  cat1.style.backgroundImage = "url(../images/categorie-romansado.png)";
});
cat1.addEventListener("mouseleave", function () {
  cat1.style.backgroundImage = "url(../images/categorie-romansadov2.png)";
});

cat2.addEventListener("mouseenter", function () {
  cat2.style.backgroundImage = "url(../images/categorie-romansado.png)";
});
cat2.addEventListener("mouseleave", function () {
  cat2.style.backgroundImage = "url(../images/categorie-romansadov2.png)";
});

cat3.addEventListener("mouseenter", function () {
  cat3.style.backgroundImage = "url(../images/categorie-romansado.png)";
});
cat3.addEventListener("mouseleave", function () {
  cat3.style.backgroundImage = "url(../images/categorie-romansadov2.png)";
});
const apipaniers = "http://localhost:8080/ords/tp3a/paniers/";
const numpanier = document.querySelector(".boutonpanier");
function actualiserpanier() {
  fetch(apipaniers)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      numpanier.innerHTML = `Panier <i class="bx bx-cart-alt"></i> (${data.items.length})`;
    });
}
actualiserpanier();
