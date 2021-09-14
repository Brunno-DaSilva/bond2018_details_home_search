document.addEventListener("DOMContentLoaded", () => {
  /*===================
==>  Variables
===================*/

  const progress = document.querySelector(".progress-bar__completed");
  const percentage_completion = document.getElementById(
    "percentage_completion"
  );

  const dataSet = [];
  const baseURL =
    "https://res.friscoisd.org/services/Bond/Project?filterType=test&filter=test&refresh=true";

  /***************************************************
[X] The data(from const data = 55; ) can be Fetched 
        so the page percentage can be 
        altered dynamically 
***************************************************/

  function getData() {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        dataSet.push(...data);
        getPercentage();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Assigned value from BASEURL TO PERCENTAGE VARIABLE
  // called getPercentage in the .then() to output the value
  function getPercentage() {
    const info = dataSet.slice(0, 1).map((data) => {
      return data.PercentComplete;
    });

    let percentageCompletion = info;

    const percentage_span = `${percentageCompletion}% Completion`;

    // percentage_completion.innerHTML = `${percentage_span}`;
    document.getElementById("progressBar").innerHTML = `${percentage_span}`;
    progress.style.width = `${percentageCompletion}%`;
    progress.style.opacity = 1;

    return info;
  }

  /*=====================
==>  DOM Manipulation
=====================*/

  window.onload = () => {
    getData();
  };
});
