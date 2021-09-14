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
  
      //sorting Ascending Order
  
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
  
    /*===========================
    ==> Code WITH hardcoded data
    ============================*/
  
    // const dataSet = [
    //   {
    //     projectId: "ABC1230",
    //     title: "Prosper Middle School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "Technology",
    //     campus: "N/A",
    //     campusType: "Middle School",
    //     projectBudget: 56632000,
    //     isCompleted: false,
    //     projectCompletion: "03/26/2022",
    //     completionPercent: 35,
    //     finalCost: 56652000,
    //     actualCompletion: "05/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1598505291/neonbrand-zFSo6bnZJTw-unsplash_1_q3dvgg.jpg",
    //   },
    //   {
    //     projectId: "ABC1231",
    //     title: "Frisco SomeWhat Middle School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "Playground",
    //     campus: "N/A",
    //     campusType: "Middle School",
    //     projectBudget: 26632000,
    //     isCompleted: true,
    //     projectCompletion: "05/26/2022",
    //     completionPercent: 13,
    //     finalCost: 26652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1602436709/small-libra_p0at5d.jpg",
    //   },
    //   {
    //     projectId: "ABC1232",
    //     title: "Independence W. Elementary School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "Security",
    //     campus: "N/A",
    //     campusType: "Elementary School",
    //     projectBudget: 35632000,
    //     isCompleted: false,
    //     projectCompletion: "05/21/2021",
    //     completionPercent: 45,
    //     finalCost: 37652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1598505164/deleece-cook-zzjLGF_6dx4-unsplash_1_hjkqeh.jpg",
    //   },
    //   {
    //     projectId: "ABC1233",
    //     title: "Independence W. Middle School",
    //     description:
    //       "The new school will be located on donated land on the western side of the Texas Medical Center. In November 2018, Frisco ISD voters approved a $691 million bond package to provide funding to build four new schools and maintain and repair existing facilities.",
    //     category: "Refresh/Renew",
    //     campus: "N/A",
    //     campusType: "Middle School",
    //     projectBudget: 150000,
    //     isCompleted: false,
    //     projectCompletion: "05/21/2021",
    //     completionPercent: 8,
    //     finalCost: 37652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1598505085/tim-mossholder-WE_Kv_ZB1l0-unsplash_1_x8iqrj.jpg",
    //   },
    //   {
    //     projectId: "ABC1234",
    //     title: "Custer W. High School",
    //     description:
    //       "The new school will be located on donated land on the western side of the Texas Medical Center. In November 2018, Frisco ISD voters approved a $691 million bond package to provide funding to build four new schools and maintain and repair existing facilities.",
    //     category: "Repair & Maintenance",
    //     campus: "N/A",
    //     campusType: "High School",
    //     projectBudget: 36632000,
    //     isCompleted: true,
    //     projectCompletion: "05/10/2021",
    //     completionPercent: 10,
    //     finalCost: 36652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1598505052/cdc-GDokEYnOfnE-unsplash_1_fmcyhc.jpg",
    //   },
    //   {
    //     projectId: "ABC1235",
    //     title: "Frisco Elementary School",
    //     description:
    //       "Maintain regular preventative maintenance, repair, and replacement cycles for buildings. In November 2018, Frisco ISD voters approved a $691 million bond package to provide funding to build four new schools and maintain and repair existing facilities.",
    //     category: "Renovation",
    //     campus: "N/A",
    //     campusType: "Elementary School",
    //     projectBudget: 16632000,
    //     isCompleted: true,
    //     projectCompletion: "12/21/2021",
    //     completionPercent: 74,
    //     finalCost: 19652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1598505021/ben-mullins-je240KkJIuA-unsplash_1_svdhzv.jpg",
    //   },
    //   {
    //     projectId: "ABC1236",
    //     title: "Main ST Middle School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "New Schools",
    //     campus: "N/A",
    //     campusType: "Middle School",
    //     projectBudget: 50632000,
    //     isCompleted: false,
    //     projectCompletion: "01/21/2021",
    //     completionPercent: 88,
    //     finalCost: 50652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1598504075/friscoISD_sezpau.png",
    //   },
    //   {
    //     projectId: "ABC1237",
    //     title: "Abraham Lincoln Frisco High School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "Other",
    //     campus: "N/A",
    //     campusType: "High School",
    //     projectBudget: 21632000,
    //     isCompleted: false,
    //     projectCompletion: "12/02/2021",
    //     completionPercent: 70,
    //     finalCost: 27652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1598502460/pencil_sl098k.jpg",
    //   },
    //   {
    //     projectId: "ABC1238",
    //     title: "Navy Frisco High School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "Athletics",
    //     campus: "N/A",
    //     campusType: "High School",
    //     projectBudget: 29632000,
    //     isCompleted: true,
    //     projectCompletion: "03/26/2022",
    //     completionPercent: 26,
    //     finalCost: 29652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1602433185/hamilton-hs_siuobu.jpg",
    //   },
    //   {
    //     projectId: "ABC1239",
    //     title: "Military Frisco High School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "FF&E",
    //     campus: "N/A",
    //     campusType: "High School",
    //     projectBudget: 23632000,
    //     isCompleted: false,
    //     projectCompletion: "03/26/2023",
    //     completionPercent: 99,
    //     finalCost: 24652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1602433230/hc-const_vxrkcn.jpg",
    //   },
    //   {
    //     projectId: "ABC1240",
    //     title: "Waren Universal Middle School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "Transportation",
    //     campus: "N/A",
    //     campusType: "Middle School",
    //     projectBudget: 30632000,
    //     isCompleted: false,
    //     projectCompletion: "01/03/2022",
    //     completionPercent: 90,
    //     finalCost: 30652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1602433275/hc-bus_znhbco.jpg",
    //   },
    //   {
    //     projectId: "ABC1241",
    //     title: "Land for Future School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "Fine Arts",
    //     campus: "N/A",
    //     campusType: "Other",
    //     projectBudget: 40632000,
    //     isCompleted: false,
    //     projectCompletion: "03/10/2022",
    //     completionPercent: 70,
    //     finalCost: 45652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1602436864/small-hs-plano_x3hktu.jpg",
    //   },
    //   {
    //     projectId: "ABC1242",
    //     title: "Land for Future School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "Transportation",
    //     campus: "N/A",
    //     campusType: "Other",
    //     projectBudget: 40632000,
    //     isCompleted: true,
    //     projectCompletion: "03/13/2022",
    //     completionPercent: 98,
    //     finalCost: 45652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1602436864/small-hs-plano_x3hktu.jpg",
    //   },
    //   {
    //     projectId: "ABC1249",
    //     title: "Low Frisco Middle School",
    //     description:
    //       "This project is part of the bond approved by Frisco ISD voters in November 2018. The bond package will provide funding for new schools and maintenance for existing facilities through an enrollment of 72,000 students or the 2025-26 school year.",
    //     category: "Playground",
    //     campus: "N/A",
    //     campusType: "Middle School",
    //     projectBudget: 10002000,
    //     isCompleted: true,
    //     projectCompletion: "03/01/2022",
    //     completionPercent: 15,
    //     finalCost: 26652000,
    //     actualCompletion: "03/26/2022",
    //     img:
    //       "https://res.cloudinary.com/duprwuo4j/image/upload/v1602436709/small-libra_p0at5d.jpg",
    //   },
    // ];
  
    // const htmlData = ({
    //   img,
    //   title,
    //   projectCompletion,
    //   projectBudget,
    //   completionPercent,
    //   description,
    //   isCompleted,
    //   category,
    // }) => {
    //   let rawDate = projectCompletion;
    //   let newDate = rawDate.split(""); // or newStr = [...str];
    //   newDate.splice(6, 2);
    //   newDate = newDate.join("").replace(/\//g, ".");
  
    //   return `
    //   <div class="searched-items animated fadeInUp delay-1s">
    //     <div class="items-head ">
    //       <div class="img-container">
    //         <img src=${img} alt=${title} />
    //         ${
    //           isCompleted
    //             ? `<div class="img-container__label">
    //                   <p>Completed</p>
    //                </div>`
    //             : `""`
    //         }
    //       </div>
    //       <div class="item-wrapper ">
    //         <div class="items-short-info">
    //           <div class="short-info-holder">
    //             <span class="FISD_orange">
    //               <em class="fa fa-calendar-check-o" aria-hidden="true"></em>
    //             </span>
  
    //             <span class="newDate">
    //               ${newDate}
    //             </span>
    //           </div>
    //           <div class="short-info-holders">
    //           <span class="FISD_orange"> <em class="fa fa-usd" aria-hidden="true"></em></span>
    //             <span>${
    //               projectBudget >= 1000000
    //                 ? projectBudget.toFixed(2).slice(0, 2)
    //                 : projectBudget.toFixed(2).slice(0, 3)
    //             }
    //             ${projectBudget >= 1000000 ? "M" : "K"}
    //             </span>
    //           </div>
  
    //           <div class="short-info-holders">
    //             <div class="progress-bar-value">
    //               <p>
    //               <span class="FISD_orange"><em class="fa fa-tasks" aria-hidden="true"></em></span>
    //               ${completionPercent}%</p>
    //             </div>
    //             <div class="progress-bar-fill"></div>
    //           </div>
    //         </div>
  
    //         <h2 class="item-wrapper-title">
    //           ${title}
    //         </h2>
    //         <p class="item-wrapper-subtitle">
    //           ${category}
    //         </p>
  
    //       </div>
    //     </div>
    //     <div class="items__body ">
    //       <div class="item__text-wrapper">
    //         <p class="item__text">${description}</p>
    //       </div>
    //       <div class="item__btn-container">
    //         <button type="button">
    //           <a class="anchor-override" href="https://brunno-dasilva.github.io/bond-page-details/index.html">
    //           Details
    //           </a>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   `;
    // };
  
    // //Search
    // const findMatches = (wordToMatch, dataSet) => {
    //   return dataSet.filter((data) => {
    //     //regex
    //     const regex = new RegExp(wordToMatch, "gi");
    //     return (
    //       data.title.match(regex) ||
    //       data.campusType.match(regex) ||
    //       data.category.match(regex)
    //     );
    //   });
    // };
  
    // function displayMatches() {
    //   const matchArray = findMatches(this.value, dataSet);
  
    //   const html = matchArray
    //     .map((data) => {
    //       return htmlData(data);
    //     })
    //     .join("");
  
    //   if (html.length > 0) {
    //     cardsContainer.innerHTML = html;
    //   } else {
    //     cardsContainer.innerHTML = `
  
    //       <div class="notFound">
    //         <div class="notFound__text">
    //           <h3>No results containing all your search terms were found.</h3>
    //           <p>Your search: <span>${this.value}</span></p>
    //           <p>Try searching for title, category, or campus type</p>
    //         </div>
    //       </div>`;
    //   }
    // }
  
    // // DropDownFilter
    // function selectDropdown() {
    //   const dataType = document.getElementById("dataType");
    //   const projectCategory = document.getElementById("projectCategory");
  
    //   const projectValue =
    //     projectCategory.options[projectCategory.selectedIndex].value;
    //   const selectedValue = dataType.options[dataType.selectedIndex].value;
  
    //   if (selectedValue == "selectAll") {
    //     if (projectValue == "selectAll") {
    //       const html2 = dataSet
    //         .map((data) => {
    //           return htmlData(data);
    //         })
    //         .join("");
    //       cardsContainer.innerHTML = html2;
    //       return;
    //     } else if (projectValue == "newBuildings") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*New\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "athletics") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*Ath\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "fineArts") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*Fine\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "transportation") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*Transport\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "repairMaintenance") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*Repair\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "refreshRenew") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*Refresh\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "playground") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*Playground\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "FF&E") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*FF&E\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "security") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*Security\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "technology") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*Technology\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else if (projectValue == "other") {
    //       const html6 = dataSet
    //         .map((data) => {
    //           if (data.category.match(/\b(\w*Other\w*)\b/g)) {
    //             return htmlData(data);
    //           }
    //         })
    //         .join("");
  
    //       cardsContainer.innerHTML = html6;
    //       return;
    //     } else {
    //       const msg = `<div>
    //       <h1>Search Not found here are some results</h1>
    //       </div>`;
    //       const html2 = dataSet
    //         .map((data) => {
    //           return htmlData(data);
    //         })
    //         .join("");
    //       cardsContainer.innerHTML = msg + html2;
    //     }
    //   } else if (selectedValue == "highSchool") {
    //     const html3 = dataSet
    //       .map((data) => {
    //         if (data.campusType.match(/\b(\w*High\w*)\b/g)) {
    //           return htmlData(data);
    //         }
    //       })
    //       .join("");
  
    //     cardsContainer.innerHTML = html3;
    //   } else if (selectedValue == "elementarySchool") {
    //     const html4 = dataSet
    //       .map((data) => {
    //         if (data.campusType.match(/\b(\w*Elementary\w*)\b/g)) {
    //           return htmlData(data);
    //         }
    //       })
    //       .join("");
    //     cardsContainer.innerHTML = html4;
    //   } else if (selectedValue == "middleSchool") {
    //     const html5 = dataSet
    //       .map((data) => {
    //         if (data.campusType.match(/\b(\w*Middle\w*)\b/gi)) {
    //           return htmlData(data);
    //         }
    //       })
    //       .join("");
    //     cardsContainer.innerHTML = html5;
    //   } else if (selectedValue == "other") {
    //     const html6 = dataSet
    //       .map((data) => {
    //         if (data.campusType.match(/\b(\w*Other\w*)\b/gi)) {
    //           return htmlData(data);
    //         }
    //       })
    //       .join("");
    //     cardsContainer.innerHTML = html6;
    //   }
    // }
  
    // const showMoreFilters = () => {
    //   if (filtersToShow.style.display === "flex") {
    //     filtersToShow.style.display = "none";
    //     arrow.style.display = "none";
    //   } else {
    //     filtersToShow.style.display = "flex";
    //     arrow.style.display = "block";
    //   }
    // };
  
    // //sorting Ascending Order
  
    // btnBudget.addEventListener("click", function () {
    //   let sortedArr = dataSet.sort((a, b) => {
    //     return a.projectBudget - b.projectBudget;
    //   });
    //   const html2 = sortedArr
    //     .map((data) => {
    //       return htmlData(data);
    //     })
    //     .join("");
    //   cardsContainer.innerHTML = html2;
    // });
  
    // btnCategory.addEventListener("click", function () {
    //   let sortedArr = dataSet.sort((a, b) => {
    //     if (a.category < b.category) {
    //       return -1;
    //     }
    //     if (a.category > b.category) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    //   const html2 = sortedArr
    //     .map((data) => {
    //       return htmlData(data);
    //     })
    //     .join("");
    //   cardsContainer.innerHTML = html2;
    // });
  
    // btnSchool.addEventListener("click", function () {
    //   let sortedArr = dataSet.sort((a, b) => {
    //     if (a.title < b.title) {
    //       return -1;
    //     }
    //     if (a.title > b.title) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    //   const html2 = sortedArr
    //     .map((data) => {
    //       return htmlData(data);
    //     })
    //     .join("");
    //   cardsContainer.innerHTML = html2;
    // });
  
    // btnProject.addEventListener("click", function () {
    //   let sortedArr = dataSet.sort((a, b) => {
    //     if (a.campusType < b.campusType) {
    //       return -1;
    //     }
    //     if (a.campusType > b.campusType) {
    //       return 1;
    //     }
    //     return 0;
    //   });
  
    //   const html2 = sortedArr
    //     .map((data) => {
    //       return htmlData(data);
    //     })
    //     .join("");
    //   cardsContainer.innerHTML = html2;
    // });
  
    // btnDate.addEventListener("click", function () {
    //   let sortedArr = dataSet.sort((a, b) => {
    //     if (a.projectCompletion < b.projectCompletion) {
    //       return -1;
    //     }
    //     if (a.projectCompletion > b.projectCompletion) {
    //       return 1;
    //     }
    //     return 0;
    //   });
  
    //   const html2 = sortedArr
    //     .map((data) => {
    //       return htmlData(data);
    //     })
    //     .join("");
    //   cardsContainer.innerHTML = html2;
    // });
  
    // btnCompletion.addEventListener("click", function () {
    //   let sortedArr = dataSet.sort((a, b) => {
    //     if (a.completionPercent < b.completionPercent) {
    //       return -1;
    //     }
    //     if (a.completionPercent > b.completionPercent) {
    //       return 1;
    //     }
    //     return 0;
    //   });
  
    //   const html2 = sortedArr
    //     .map((data) => {
    //       return htmlData(data);
    //     })
    //     .join("");
    //   cardsContainer.innerHTML = html2;
    // });
  
    // btnPlus.addEventListener("click", showMoreFilters);
    // btnForm.addEventListener("click", selectDropdown);
  
    // schoolFilter.addEventListener("change", selectDropdown);
    // categoryFilter.addEventListener("change", selectDropdown);
  
    // searchInput.addEventListener("keyup", displayMatches);
  
    // window.onload = () => {
    //   displayMatches();
    // };
  });