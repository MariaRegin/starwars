const button = document.querySelector(".button");
const container = document.querySelector(".content-container");
const infoContainer = document.querySelector(".info-container");
const loader = document.querySelector(".loader");

function getInfo() {
  const select = document.querySelector(".select").value;
  const number = document.querySelector(".number").value;
  const ApiUrl = `https://swapi.dev/api/${select}/${number}/`;

  loader.style.display = "block";

  if (!select || !number) {
    container.textContent = "Заполни все поля";
  }

  fetch(ApiUrl)
    .then((res) => {
      if (res.status === 404) {
        throw new Error("Произошла ошибка, попробуй еще раз");
      }
      return res.json();
    })
    .then((data) => {
      loader.style.display = "none";
      if (select == "people" || select == "planets") {
        container.textContent = data.name;
      } else if (select == "films") {
        container.textContent = data.title;
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      container.textContent = error.message;
    })
    .finally(() => {
      infoContainer.textContent = "Введи следующий запрос!";
    });
}

button.addEventListener("click", getInfo);
