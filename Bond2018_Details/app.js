document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const app = document.getElementById("app");
    const container__top = document.getElementById("container__top");
    const container__middle = document.getElementById("container__middle");
    const container__bottom = document.getElementById("container__bottom");
  
    const project_ID = getParameterByName("projectId");
    const baseURL = `https://res.friscoisd.org/services/Bond/Project?filterType=id&filter=${project_ID}&refresh=true`;
    const updateURL = `https://www.friscoisd.org/jsonHandler/bondUpdate.ashx?projectId=${project_ID}&refresh=true`;
    const photoURL = `https://www.friscoisd.org/jsonHandler/bondPhotos.ashx?projectId=${project_ID}&refresh=true`;
  
    const dataSet = [];
    const dataSetUPDATE = [];
    const dataSetPHOTO = [];
  
    const DATA_NOT_FOUND = `<div class="notFound animated fadeInUp">
    <div class="notFound__text">
      <h3>No results containing all your search terms were found.</h3>
      <p>Try searching for project title, category, or campus type</p>
    </div>
  </div>`;
  
    // Get All fetched data
    function getData() {
      fetch(baseURL)
        .then((response) => response.json())
        .then((data) => {
          dataSet.push(...data);
          init();
        })
        .catch((error) => {
          container__top.innerHTML = `${NO_DATA_FOUND} ${error}`;
        });
      getData2();
      getData3();
    }
  
    const getData2 = () => {
      fetch(updateURL)
        .then((response) => response.json())
        .then((data) => {
          dataSetUPDATE.push(...data);
          init();
        })
        .catch((error) => {
          updateURL.innerHTML = `${DATA_NOT_FOUND} ${error}`;
        });
    };
  
    const getData3 = () => {
      fetch(photoURL)
        .then((response) => response.json())
        .then((data) => {
          dataSetPHOTO.push(...data);
          init();
        })
        .catch((error) => {
          container__bottom.innerHTML = `${DATA_NOT_FOUND} ${error}`;
        });
    };
  
    // Display all fetched data
    function init() {
      const middleContainerHTML = ({
        Update,
        UpdateDate,
        UpdateImage,
        ProjectId,
      }) => {
        return `
          <div class="middle__news">
            <div class="news__top">
              <img
                src="${UpdateImage}"
                alt="Updates and news"
              />
            </div>
            <div class="news__bottom">
              <div class="bottom__title">
                <h2>${UpdateDate}</h2>
              </div>
              <div class="bottom__description">
                <p>
                  ${
                    Update != null
                      ? Update
                      : "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year."
                  }
                </p>
              </div>
            </div>
          </div>
          
          `;
      };
  
      const topContainerHTML = ({
        ThumbnailImg,
        ProjectTitle,
        ProjectedCompletionString,
        ProjectedBudget,
        PercentComplete,
        Description,
        IsComplete,
        ProjectId,
        Category,
        CampusType,
      }) => {
        return `
          <div>
            <div class="top__info-isComplete">
              <div class="top__title">
                <h1>${ProjectTitle}</h1>
                <p>
                  <em class="fa fa-graduation-cap" aria-hidden="true"></em> ${CampusType}
                </p>
              </div>
    
              <div class="isComplete">
              ${
                IsComplete
                  ? `<div class="isComplete__label">
                        <p>Completed</p>
                    </div>`
                  : ``
              }              
              </div>
            </div>
          
          <div class="top__img">
            <img
              src="${ThumbnailImg}"
              alt="${ProjectTitle}"
            />
          </div>
          <div class="top__info">
            <!-- Estimated Completion Date -->
            <div class="top__info-extra">
              <div class="info-extra__icon">
                <em class="fa fa-calendar-check-o" aria-hidden="true"></em>
              </div>
              <div class="info-extra__title">
                <span>Estimated Completion Date</span>
                <p>${
                  ProjectedCompletionString == ""
                    ? "12/12/2022"
                    : ProjectedCompletionString
                }</p>
              </div>
            </div>
    
            <!-- Projected Budget -->
            <div class="top__info-extra">
              <div class="info-extra__icon">
                <em class="fa fa-usd" aria-hidden="true"></em>
              </div>
              <div class="info-extra__title">
                <span>Projected Budget</span>
                <p>$${
                  ProjectedBudget >= 1000000
                    ? ProjectedBudget.toFixed(2).slice(0, 2)
                    : ProjectedBudget.toFixed(2).slice(0, 3)
                } 
                ${ProjectedBudget >= 1000000 ? "M" : "K"}</p>
              </div>
            </div>
            <!-- Percentage Completed -->
            <div class="top__info-extra">
              <div class="info-extra__icon">
                <em class="fa fa-tasks" aria-hidden="true"></em>
              </div>
              <div class="info-extra__title">
                <span>Percentage Completed</span>
                <p class="percentage">${PercentComplete}%</p>
              </div>
            </div>
            <!-- Category -->
            <div class="top__info-extra">
              <div class="info-extra__icon">
                <em class="fa fa-briefcase" aria-hidden="true"></em>
              </div>
              <div class="info-extra__title">
                <span>Category</span>
                <p>${Category}</p>
              </div>
            </div>
          </div>
          <div class="top__description">
            <p>
            ${Description}
            </p>
          </div>
        </div>
    
        
        </div>`;
      };
  
      const bottomContainerHTML = ({
        PhotoCollection,
        TitleId,
        PhotoDescription,
      }) => {
        console.log(PhotoCollection);
        return `
            <li>
              <img
                src="${PhotoCollection}"
                alt="${PhotoDescription}"
                loading="lazy"
              />
            </li>
          `;
      };
  
      function displayMatchesUpdate() {
        const html = dataSetUPDATE
          .map((data) => {
            return middleContainerHTML(data);
          })
          .join("");
  
        if (html.length > 0) {
          container__middle.innerHTML = html;
        } else {
          container__middle.innerHTML = `${DATA_NOT_FOUND}`;
        }
      }
  
      function displayMatchesPhotos() {
        const html = dataSetPHOTO
          .map((data) => {
            return bottomContainerHTML(data);
          })
          .join("");
  
        if (html.length > 0) {
          container__bottom.innerHTML = html;
        } else {
          container__bottom.innerHTML = `${DATA_NOT_FOUND}`;
        }
      }
  
      function displayMatches() {
        const html = dataSet
          .map((data) => {
            return topContainerHTML(data);
          })
          .join("");
  
        if (html.length > 0) {
          container__top.innerHTML = html;
        } else {
          container__top.innerHTML = `${DATA_NOT_FOUND}`;
        }
      }
  
      displayMatchesPhotos();
      displayMatchesUpdate();
      displayMatches();
    }
  
    let mySwiper = new Swiper(".swiper-container", {
      // Optional parameters
      direction: "horizontal",
      loop: true,
  
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  
    window.onload = () => {
      getData();
    };
  
    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  });