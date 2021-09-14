document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search");
  const cardsContainer = document.querySelector(".cards-container");
  const btnForm = document.getElementById("btn-form");
  const btnPlus = document.getElementById("btn-plus");
  const filtersToShow = document.getElementById("filtersToShow");
  const arrow = document.getElementById("arrow");
  const btnCategory = document.getElementById("btn-category");
  const btnBudget = document.getElementById("btn-budget");
  const btnSchool = document.getElementById("btn-school");
  const btnProject = document.getElementById("btn-project");
  const btnDate = document.getElementById("btn-date");
  const btnCompletion = document.getElementById("btn-completion");
  const schoolFilter = document.getElementById("dataType");
  const categoryFilter = document.getElementById("projectCategory");

  //API
  const baseURL =
    "https://res.friscoisd.org/services/Bond/Project?filterType=test&filter=test&refresh=true";

  const dataSet = [];

  const DATA_NOT_FOUND = `<div class="notFound animated fadeInUp">
    <div class="notFound__text">
      <h3>No results containing all your search terms were found.</h3>
      <p>Try searching for project title, category, or campus type</p>
    </div>
  </div>`;

  function getData() {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        dataSet.push(...data);
        init();
      })
      .catch((error) => {
        cardsContainer.innerHTML = `${DATA_NOT_FOUND} ${error}`;
      });
  }

  function init() {
    // Display data
    const htmlData = ({
      ThumbnailImg,
      ProjectTitle,
      ProjectedCompletionString,
      ProjectedBudget,
      PercentComplete,
      Description,
      IsComplete,
      ProjectId,
      Category,
    }) => {
      return ` <div class="searched-items animated fadeInUp">
            <div class="items-head ">
              <div class="img-container">
                <img src=${ThumbnailImg} alt=${ProjectTitle} />
                ${
                  IsComplete
                    ? `<div class="img-container__label">
                          <p>Completed</p>
                       </div>`
                    : `""`
                }
              </div>
              <div class="item-wrapper ">
                <div class="items-short-info">
                  <div class="short-info-holder">
                    <span class="FISD_orange">
                      <em class="fa fa-calendar-check-o" aria-hidden="true"></em>
                    </span>
      
                    <span class="newDate">
                      ${
                        ProjectedCompletionString == ""
                          ? "12.12.23"
                          : ProjectedCompletionString
                      }
                    </span>
                  </div>
                  <div class="short-info-holders">
                  <span class="FISD_orange"> <em class="fa fa-usd" aria-hidden="true"></em></span>
                    <span>${
                      ProjectedBudget >= 1000000
                        ? ProjectedBudget.toFixed(2).slice(0, 2)
                        : ProjectedBudget.toFixed(2).slice(0, 3)
                    }
                    ${ProjectedBudget >= 1000000 ? "M" : "K"}
                    </span>
                  </div>
      
                  <div class="short-info-holders">
                    <div class="progress-bar-value">
                      <p>
                      <span class="FISD_orange"><em class="fa fa-tasks" aria-hidden="true"></em></span>
                      ${PercentComplete}%</p>
                    </div>
                    <div class="progress-bar-fill"></div>
                  </div>
                </div>
      
                <h2 class="item-wrapper-title">
                  ${ProjectTitle}
                </h2>
                <p class="item-wrapper-subtitle">
                  ${Category}
                </p>
      
              </div>
            </div>
            <div class="items__body ">
              <div class="item__text-wrapper">
                <p class="item__text">${Description}</p>
              </div>
              <div class="item__btn-container">
                <button type="button">
                  <a 
                  class="anchor-override" 
                  href="http://dev.friscoisd.org/about/2018-bond-program/new-bond-project---detail-view?projectId=${ProjectId}"
                  >
                  Details
                  </a>
                </button>
              </div>
            </div>
          </div>`;
    };

    //Search
    const findMatches = (wordToMatch, dataSet) => {
      return dataSet.filter((data) => {
        //regex
        const regex = new RegExp(wordToMatch, "gi");

        return (
          data.ProjectTitle.match(regex) ||
          data.CampusType.match(regex) ||
          data.Category.match(regex)
        );
      });
    };

    function displayMatches() {
      const matchArray = findMatches(this.value, dataSet);

      const html = matchArray
        .map((data) => {
          return htmlData(data);
        })
        .join("");

      if (html.length > 0) {
        cardsContainer.innerHTML = html;
      } else {
        cardsContainer.innerHTML = `${DATA_NOT_FOUND}`;
      }
    }

    // DropDownFilter
    function selectDropdown() {
      const dataType = document.getElementById("dataType");
      const projectCategory = document.getElementById("projectCategory");

      const projectValue =
        projectCategory.options[projectCategory.selectedIndex].value;
      const selectedValue = dataType.options[dataType.selectedIndex].value;

      if (selectedValue == "selectAll") {
        if (projectValue == "selectAll") {
          const html2 = dataSet
            .map((data) => {
              return htmlData(data);
            })
            .join("");

          if (html2.length > 0) {
            cardsContainer.innerHTML = html2;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "newBuildings") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*New\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "athletics") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*Ath\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "fineArts") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*Fine\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "transportation") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*Transport\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "repairMaintenance") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*Repair\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "refreshRenew") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*Refresh\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "playground") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*Playground\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "FF&E") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*FF&E\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "security") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*Security\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else if (projectValue == "technology") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*Technology\w*)\b/g) != null) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }

          return;
        } else if (projectValue == "other") {
          const html6 = dataSet
            .map((data) => {
              if (data.Category.match(/\b(\w*Other\w*)\b/g)) {
                return htmlData(data);
              }
            })
            .join("");

          if (html6.length > 0) {
            cardsContainer.innerHTML = html6;
          } else {
            cardsContainer.innerHTML = DATA_NOT_FOUND;
          }
        } else {
          const msg = `<div><h1>Search Not found here are some results</h1></div>`;
          const html2 = dataSet
            .map((data) => {
              return htmlData(data);
            })
            .join("");
          cardsContainer.innerHTML = msg + html2;
        }
      } else if (selectedValue == "highSchool") {
        const html3 = dataSet
          .map((data) => {
            if (data.CampusType.match(/\b(\w*High\w*)\b/g)) {
              return htmlData(data);
            }
          })
          .join("");

        if (html3.length > 0) {
          cardsContainer.innerHTML = html3;
        } else {
          cardsContainer.innerHTML = DATA_NOT_FOUND;
        }
      } else if (selectedValue == "elementarySchool") {
        const html3 = dataSet
          .map((data) => {
            if (data.CampusType.match(/\b(\w*Elementary\w*)\b/g)) {
              return htmlData(data);
            }
          })
          .join("");

        if (html3.length > 0) {
          cardsContainer.innerHTML = html3;
        } else {
          cardsContainer.innerHTML = DATA_NOT_FOUND;
        }
      } else if (selectedValue == "middleSchool") {
        const html3 = dataSet
          .map((data) => {
            if (data.CampusType.match(/\b(\w*Middle\w*)\b/gi)) {
              return htmlData(data);
            }
          })
          .join("");

        if (html3.length > 0) {
          cardsContainer.innerHTML = html3;
        } else {
          cardsContainer.innerHTML = DATA_NOT_FOUND;
        }
      } else if (selectedValue == "other") {
        const html3 = dataSet
          .map((data) => {
            if (data.CampusType.match(/\b(\w*Other\w*)\b/gi)) {
              return htmlData(data);
            }
          })
          .join("");
        if (html3.length > 0) {
          cardsContainer.innerHTML = html3;
        } else {
          cardsContainer.innerHTML = DATA_NOT_FOUND;
        }
      } else {
        return DATA_NOT_FOUND;
      }
    }

    const showMoreFilters = () => {
      if (filtersToShow.style.display === "flex") {
        filtersToShow.style.display = "none";
        arrow.style.display = "none";
      } else {
        filtersToShow.style.display = "flex";
        arrow.style.display = "block";
      }
    };

    //Sorting Ascending Order

    btnBudget.addEventListener("click", function () {
      let sortedArr = dataSet.sort((a, b) => {
        return a.ProjectedBudget - b.ProjectedBudget;
      });
      const html2 = sortedArr
        .map((data) => {
          return htmlData(data);
        })
        .join("");
      cardsContainer.innerHTML = html2;
    });

    btnCategory.addEventListener("click", function () {
      let sortedArr = dataSet.sort((a, b) => {
        if (a.Category < b.Category) {
          return -1;
        }
        if (a.Category > b.Category) {
          return 1;
        }
        return 0;
      });
      const html2 = sortedArr
        .map((data) => {
          return htmlData(data);
        })
        .join("");
      cardsContainer.innerHTML = html2;
    });

    btnSchool.addEventListener("click", function () {
      let sortedArr = dataSet.sort((a, b) => {
        if (a.ProjectTitle < b.ProjectTitle) {
          return -1;
        }
        if (a.ProjectTitle > b.ProjectTitle) {
          return 1;
        }
        return 0;
      });
      const html2 = sortedArr
        .map((data) => {
          return htmlData(data);
        })
        .join("");
      cardsContainer.innerHTML = html2;
    });

    btnProject.addEventListener("click", function () {
      let sortedArr = dataSet.sort((a, b) => {
        if (a.CampusType < b.CampusType) {
          return -1;
        }
        if (a.CampusType > b.CampusType) {
          return 1;
        }
        return 0;
      });

      const html2 = sortedArr
        .map((data) => {
          return htmlData(data);
        })
        .join("");
      cardsContainer.innerHTML = html2;
    });

    btnDate.addEventListener("click", function () {
      let sortedArr = dataSet.sort((a, b) => {
        if (a.ProjectedCompletionString < b.ProjectedCompletionString) {
          return -1;
        }
        if (a.ProjectedCompletionString > b.ProjectedCompletionString) {
          return 1;
        }
        return 0;
      });

      const html2 = sortedArr
        .map((data) => {
          return htmlData(data);
        })
        .join("");
      cardsContainer.innerHTML = html2;
    });

    btnCompletion.addEventListener("click", function () {
      let sortedArr = dataSet.sort((a, b) => {
        if (a.PercentComplete < b.PercentComplete) {
          return -1;
        }
        if (a.PercentComplete > b.PercentComplete) {
          return 1;
        }
        return 0;
      });

      const html2 = sortedArr
        .map((data) => {
          return htmlData(data);
        })
        .join("");
      cardsContainer.innerHTML = html2;
    });

    btnPlus.addEventListener("click", showMoreFilters);
    btnForm.addEventListener("click", selectDropdown);

    categoryFilter.addEventListener("change", selectDropdown);
    schoolFilter.addEventListener("change", selectDropdown);

    searchInput.addEventListener("keyup", displayMatches);
  }

  window.onload = () => {
    getData();
  };
});
