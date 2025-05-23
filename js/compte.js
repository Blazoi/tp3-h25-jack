const nomelement = document.querySelector(".infos h1");
const idelement = document.querySelector(".infos p");

const apiclients = "http://localhost:8080/ords/tp3a/clients/";

document.addEventListener("DOMContentLoaded", () => {
  fetch(apiclients)
    .then((response) => {
      if (response) {
        return response;
      }
      throw new Error(response.status);
    })
    .then((data) => {
      nomelement.innerHTML = `${data.items[0].nom_client}`;
      idelement.innerHTML = `Client #${data.items[0].id_client}`;
    });
});
