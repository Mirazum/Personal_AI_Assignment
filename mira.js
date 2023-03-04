
// All Data Loads
const loadData = async () => {
  document.getElementById("loader").classList.remove("d-none");
  const url = `https://openapi.programming-hero.com/api/ai/tools`;

  const res = await fetch(url)
  const data = await res.json()

  // See More Button Enable & Disable functionality;
  const seeMoreBtn = document.getElementById('seeMoreBtn');
  document.getElementById("loader").classList.add("d-none");
  if (data.data.tools.length > 6) {
    seeMoreBtn.classList.remove('d-none')
    displayTools(data.data.tools.slice(0, 6))
  }
}

// display all the data

const displayTools = (data) => {
  // console.log(tools)
  const toolsContainer = document.getElementById('divContainer')
  toolsContainer.innerHTML = '';

  data.forEach(tool => {
    //  console.log(tool)
    // Destructuring the array;
    const { description, id, image, name, published_in, features, links } = tool;

    const tooldiv = document.createElement('div');
    tooldiv.classList.add('col');
    let featureList = "";
    tool.features.map((feature, index) => {
      featureList += `<p class="feature-list"> ${
        index + 1 + ". " + feature
      }</p>`;
      return feature;
    });
    tooldiv.innerHTML = `
                   <div class="card p-3 h-100">
                    <img class=' h-75' src="${image ? image : 'https://picsum.photos/500/300?random=3'}" class="card-img-top rounded" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        ${featureList}
                        <hr size="2" width="100%" />
                        <h5>${name}</h5>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex gap-2 justify-content-start">
                            <div class="publish-data"><p><i class="fa-regular fa-calendar-days"></i> ${published_in}</p>
                            </div>
                    
                        </div>
                        <div>
                        <i class="fas fa-arrow-right" style="background-color: #fef7f7; color: #eb5757"onclick="cardDetails('${id}')"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                        </div>
                    </div>
                </div>
        `


    toolsContainer.appendChild(tooldiv);
  });


}



// See More button Functionality;
document.getElementById('seeMore').addEventListener('click', function () {
  const seeMore = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;

    const res = await fetch(url)
    const data = await res.json()
    displayTools(data.data.tools)

  }
  seeMore();
});

// Sort by Date;
document.getElementById('sortByDate').addEventListener('click', function () {
  const sortByDate = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;

    const res = await fetch(url)
    const data = await res.json()
    const aidata = data.data.tools.slice(0,6);
    aidata.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
       displayTools(aidata)
    }
  sortByDate()
})

// Details of a Card;
const cardDetails = (id) => {

  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => modalData(data.data))
}
  
// Showing the data to the Modal;
      const modalData = (modaldata) => {
        console.log(modaldata)
        const { description, image_link, pricing, tool_name, use_cases, integrations, input_output_examples, features, accuracy } = modaldata;
        document.getElementById('leftCardTitle').innerText = description;

        document.getElementById('right-div').innerHTML = `
                <img src="${image_link[0] ? image_link[0] : 'No Image Found'}" class="card-img-top rounded" alt="...">
            <div class="accuracy">
                      ${accuracy.score * 100 > 85 ? '<button class="btn btn-danger">Accuracy: ' + accuracy.score * 100 + '%</button>' : '<button class="btn btn-danger d-none"> Low Accuracy</button>'}
                        
              </div>
                <div class="card-body">
                    <h5 class="card-title text-center">${input_output_examples[0].input}</h5>
                    <p class="card-text text-center">${input_output_examples[0].output}</p>
                    
                </div>
        `;

        const divPricing = document.getElementById('pricing');
          divPricing.innerHTML = `
                <div class="col">
                <div class="card py-3">
                  <div class="card-body p-4  p-lg-1 text-center">
                    <h5 class="card-title text-success">${pricing[0].price}</h5>
                    <h5 class="card-title text-success">${pricing[0].plan}</h5>
                  </div>
                </div>
              </div> 

              <div class="col">
              <div class="card py-3">
                <div class="card-body p-4  p-lg-1 text-center">
                <h5 class="card-title text-warning">${pricing[1].price}</h5>
                <h5 class="card-title text-warning">${pricing[1].plan}</h5>
                </div>
              </div>
              </div> 

              <div class="col">
              <div class="card py-1">
              <div class="card-body p-4 p-lg-1 text-center">
                <h5 class="card-title text-danger">${pricing[2].price}</h5>
                <h5 class="card-title text-danger">${pricing[2].plan}</h5>
              </div>
              </div>
              </div> 
                `

              // Feature and Integration;
              const featureIntegration = document.getElementById('featureItegration');
              featureIntegration.innerHTML = `
              <div class="col">
              <div class="card">
                <div class="card-body p-1">
                  <h3 class="card-title fw-bold">Feature</h3>
                  <ul>
                  <li>${features[1].feature_name} </li>
                  <li>${features[2].feature_name} </li>
                  <li>${features[3].feature_name} </li>
                  </ul>
                </div>
              </div>
            </div> 

            <div class="col">
            <div class="card">
              <div class="card-body p-1 ">
              <h3 class="card-title fw-bold">Integration</h3>
                  <ul>
                  <li>${integrations[0] ? integrations[0] : '<b class="text-danger">No Data Found</b>'} </li>
                  <li>${integrations[1] ? integrations[1] : '<b class="text-danger">No Data Found</b>'} </li>
                  <li>${integrations[2] ? integrations[2] : '<b class="text-danger">No Data Found</b>'} </li>
                  </ul>
              </div>
            </div>
            </div> 
              `
            }

    

  loadData()