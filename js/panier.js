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
  const apipanier = "http://localhost:8080/ords/tp3a/paniers";

  const liste = document.querySelector(".droite");
  fetch(apipanier)
    .then((response) => {
      if (response) {
        return response.json();
      }
      throw new Error("erreur " + response.status);
    })
    .then((data) => {
      liste.innerHTML = "";
      data.items.forEach((element) => {
        const produit = document.createElement("div");
        produit.className = "produit";

        produit.innerHTML = `
          <img src="$" />
            <h3 class="titre">$</h3>
            <div class="desc">
              <p class="lang">$</p>
              <p class="prix">$</p>
            </div>
        `;
      });
    });
});
