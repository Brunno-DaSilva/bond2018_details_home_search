document.addEventListener("DOMContentLoaded", () => {
  /*===================
==>  Variables
===================*/

  const progress = document.querySelector(".progress-bar__completed");
  const percentage_completion = document.getElementById(
    "percentage_completion"
  );
  const BASE_URL = `https://res.friscoisd.org/services/Bond/ProjectCompletion?refresh=true`;

  /*=====================
==>  DOM Manipulation
=====================*/

  function getData(url) {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        displayPercentage(jsonData);
      })
      .catch((error) => {
        console.log("This is an error", error);
      });
  }

  function displayPercentage(data) {
    const percentage_result =
      data.CompletionPercentage < 30
        ? `${data.CompletionPercentage}%`
        : `${data.CompletionPercentage}% Completion`;

    percentage_completion.innerHTML = `${percentage_result}`;
    progress.style.width = `${data.CompletionPercentage}%`;
    progress.style.opacity = 1;
  }

  getData(BASE_URL);
});
