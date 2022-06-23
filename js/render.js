fetch("https://restcountries.com/v3.1/all")
.then(response => response.json())
.then(data => {
    renderList(data.slice(0, 20), elList)
    renderRegions(data.slice(0, 20), elRegion)
})

// -----functions
function renderList(arr, el) {
    arr.forEach((item, index) => {
        const template = document.querySelector(".template")
        const elTemplate = template.cloneNode(true).content
        elTemplate.querySelector(".site-main__item").setAttribute("data-index", index)
        elTemplate.querySelector(".site-main__item-img").src = item.flags.png
        elTemplate.querySelector(".site-main__item-img").alt = item.name.common
        elTemplate.querySelector(".site-main__item-title").textContent = item.name.common
        item.population?
            elTemplate.querySelectorAll(".site-main__item-subtitle")[0].innerHTML = 
            `Population: <span>${item.population}</span></p>`:
            elTemplate.querySelectorAll(".site-main__item-subtitle")[0].innerHTML = 
            `Population: <span>none</span></p>`

        item.region?
            elTemplate.querySelectorAll(".site-main__item-subtitle")[1].innerHTML = 
            `Region: <span>${item.region}</span></p>`:
            elTemplate.querySelectorAll(".site-main__item-subtitle")[1].innerHTML = 
            `Region: <span>none</span></p>`

        item.capital?
            elTemplate.querySelectorAll(".site-main__item-subtitle")[2].innerHTML = 
            `Capital: <span>${item.capital}</span></p>`:
            elTemplate.querySelectorAll(".site-main__item-subtitle")[2].innerHTML = 
            `Capital: <span>none</span></p>`
        el.append(elTemplate)
        // console.log(item.region);
    });
}

function renderRegions(arr, el) {
    let filterArr = []
    el.innerHTML = null
    // -----Филтрование масссива регионов и отсечение повторяющихся регионов и представление в виде массива
    arr.forEach((item, index) => {
        if (index == 0) filterArr.push(item.region)
        else {
            let bool = true, itemM
            filterArr.forEach(itemFilter => {
                if(itemFilter != item.region && bool) {bool = true; itemM = item.region}
                else  bool = false;
            })
            if(bool) filterArr.push(itemM)
        }
    })
    // -----Render regions
    const option = document.createElement("option")
    option.value = 0; option.textContent = "Filter by Region"
    option.setAttribute("disabled", "")
    option.setAttribute("selected", "")
    el.append(option)
    filterArr.forEach((item, index) => {
        const option = document.createElement("option")
        option.value = index + 1; option.textContent = item
        el.append(option)
    })
}

const elList = document.querySelector(".site-main__list")
const elRegion = document.querySelector(".site-main__form-select")
function modeToggler() {
    const elModeBtn = document.querySelector(".site-header__button")
    const elPage = document.querySelector(".page")
    elModeBtn.addEventListener("click", ()=> {
        elPage.classList.toggle("page--dark")
    })
}
modeToggler()

const elInput = document.querySelector(".site-main__form-input")
function filter() {
    const elSelect = document.querySelector(".site-main__form-select")
}

elInput.addEventListener("change", ()=> {
    console.log("Hello");
})