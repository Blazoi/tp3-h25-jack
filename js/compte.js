const nomelement = document.querySelector(".infos h1");
const idelement = document.querySelector(".numclient");

const apiclients = "http://localhost:8080/ords/tp3a/clients/";

document.addEventListener("DOMContentLoaded", () => {
  fetch(apiclients)
    .then((response) => {
      if (response) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((data) => {
      nomelement.innerHTML = `${data.items[0].nom_client}`;
      idelement.innerHTML = `Client #${data.items[0].id_client}`;
    });
});

const apipaniers = "http://localhost:8080/ords/tp3a/paniers/";
const numpanier = document.querySelector(".boutonpanier");
function actualiserpanier() {
  fetch(apipaniers)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      numpanier.innerHTML = `Items total dans le panier : ${data.items.length}`;
    });
}
actualiserpanier();