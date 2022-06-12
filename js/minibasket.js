var timeoutHolder = {}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createMiniBasketElement(index) {
    console.log(document.pageX)
    let oneData = data[index]

    let element = document.createElement("div")
    element.classList.add("minibasket_element")
    element.id = "minibasket" + index

    let img = document.createElement("img")
    img.classList.add("minibasket_img")
    img.src = oneData["img"]
    element.appendChild(img)


    let caption = document.createElement("div")
    caption.classList.add("minibasket_caption")
    element.appendChild(caption)

    let name = document.createElement("div")
    name.innerText = oneData["name"].split("[")[0]
    caption.appendChild(name)
    let price = document.createElement("div")
    price.innerText = oneData["price"]
    price.classList.add("minibasket_price")
    caption.appendChild(price)


    let Buttondelete = document.createElement("button")
    Buttondelete.onclick = () => {
        miniBasketDelete(element.id, index)
    }
    Buttondelete.classList.add("minibasket_button")
    Buttondelete.innerText = "Удалить"
    element.appendChild(Buttondelete)

    return element

}

function createMiniBasketElements() {
    let parent = document.getElementsByClassName("minibasket_elements")[0]

    for (let key in localStorage) {
        if (localStorage.getItem(key) != null) {
            for(let i = 0;i< Number(localStorage.getItem(key));i++) {
                AddToMiniBasket(key, false)
            }
        }
    }

}

function miniBasketDelete(id, shortId) {
    let parent = document.getElementsByClassName("minibasket_elements")[0]
    let element = document.getElementById(id)
    parent.removeChild(element)
    localStorage.removeItem(shortId)

    document.getElementById(shortId + "." + shortId).innerText = "[Купить] " + data[Number(shortId)]["price"] + " ₽"

    let much = document.getElementById("minibasketmuch")
    much.innerText = Number(much.innerText) - 1
    let price = document.getElementsByClassName("minibasket_result_price")[0]
    price.innerHTML = String(Number(price.innerHTML.slice(0,-2)) - Number(data[Number(shortId)]["price"])) + " ₽"
}

function miniBasketDeleteAll() {
    for (let key in localStorage) {
        if (localStorage.getItem(key) != null) {
            miniBasketDelete("minibasket" + key, key)
        }
    }
}

function AddToMiniBasket(index, show=true) {

    let parent = document.getElementsByClassName("minibasket_elements")[0]
    let price = document.getElementsByClassName("minibasket_result_price")[0]
    price.innerHTML = String(Number(price.innerHTML.slice(0,-2)) + Number(data[Number(index)]["price"])) + " ₽"

    let newElement = createMiniBasketElement(index)
    parent.appendChild(newElement)

    let much = document.getElementById("minibasketmuch")
    much.innerText = Number(much.innerText) + 1
    if(show) {
        showMiniBasket()
    }

}

function showMiniBasket() {

    let minibasket = document.getElementsByClassName("minibasket")[0]
    minibasket.classList.add("minibasketshow")
    otmenaHidden()

}


function hiddenBasket(e) {
    let minibasket = document.getElementsByClassName("minibasket")[0]

    if (timeoutHolder.handle==null && minibasket.classList.length===2) {
        timeoutHolder.handle = setTimeout(() => {


            minibasket.classList.remove("minibasketshow")
            timeoutHolder.handle = null
        }, 1000)

    }
}

function otmenaHidden() {

    clearTimeout(timeoutHolder.handle);
    timeoutHolder.handle = null

}

