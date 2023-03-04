let viewableCardDatas = [];
const allCardDatas = [];
let sortByHigerDate = true;

const loadData = () => {
  document.getElementById("loader").classList.remove("d-none");
  const url =` https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("loader").classList.add("d-none");
      allCardDatas.push(...data.data.tools);
      viewableCardDatas = allCardDatas.slice(0, 6);
      displayTools(viewableCardDatas);
    });

  //
};

const displayTools = (data) => {
  document.getElementById("loader").classList.add("d-none");
  const toolsContainer = document.getElementById("tools-container");
  toolsContainer.innerText = "";
  data.forEach((tool) => {
    console.log(tool);
    const tooldiv = document.createElement("div");
    let featureList = "";
    tool.features.map((feature, index) => {
      featureList += `<p class="feature-list"> ${
        index + 1 + ". " + feature
      }</p>`;
      return feature;
    });
    tooldiv.innerHTML = `
    <div class="card p-3">
      <img src="${tool.image}" class="card-img-top image-fluid" alt="..." />
      <div class="body">
        <h5 class="card-title mt-3">Features</h5>
        ${featureList}
        <hr size="2" width="100%" />
        <h5 class="card-title mt-3">${tool.name}</h5>

        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <i class="fa fa-calendar"></i>
            <p style="color: #585858; margin:5px">
              ${tool.published_in}
            </p>
          </div>
          <button class="btn" style="background-color: #fef7f7; color: #eb5757">
            <i class="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>              
        `;
    toolsContainer.appendChild(tooldiv);
  });
};

// get all data and pass all data using slice to show in the UI when click See All button
const showAllDataTogether = () => {
  document.getElementById("loader").classList.remove("d-none");
  viewableCardDatas = allCardDatas;
  displayTools(viewableCardDatas);
};

const sortByDate = () => {
  viewableCardDatas.sort((a, b) => {
    //convert dateString to js date object and compare to get a value that is either negative, positive, or zero.
    return (
      new Date(sortByHigerDate ? b.published_in : a.published_in) -
      new Date(sortByHigerDate ? a.published_in : b.published_in)
    );
  });
  sortByHigerDate = !sortByHigerDate;
  displayTools(viewableCardDatas);
};

loadData();