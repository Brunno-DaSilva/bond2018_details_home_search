/*===================
==>  Variables
===================*/

const progress = document.querySelector(".progress-bar__completed");
const percentage_completion = document.getElementById("percentage_completion");
const data = 70;
const percentage_span = `<span>${data}% Completion</span>`;

/***************************************************
[X] The data(ON LINE 7) can be Fetched 
        so the page percentage can be 
        altered dynamically 
***************************************************/

/*=====================
==>  DOM Manipulation
=====================*/

percentage_completion.innerHTML = `${percentage_span}`;
progress.style.width = `${data}%`;
progress.style.opacity = 1;