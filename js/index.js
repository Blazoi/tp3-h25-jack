const root = document.querySelector(":root");
const cs = getComputedStyle(root);
const btnmode = document.querySelector(".boutonmode");

let clair = localStorage.getItem("mode") === "false";

btnmode.addEventListener("mouseenter", function () {
  btnmode.style.color = cs.getPropertyValue("--couleur4");
});
btnmode.addEventListener("mouseleave", function () {
  btnmode.style.color = cs.getPropertyValue("--couleur3");
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
