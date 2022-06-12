function addToBasket(index)
{
    let a = localStorage.getItem(index)

    if (a==null)
    {
        localStorage.setItem(index, 1);
        let element = document.getElementById(index+"."+index)
        element.innerText = "[В корзине] "+ data[index]["price"] + " ₽";

    }
    else
    {
        a = Number(a) + 1
        localStorage.setItem(index, a)
    }
    AddToMiniBasket(index)

}


function UpdateTotal()
{
    let count = 0;
    let totalPrice = 0;
    for (let key in localStorage)
    {
        let countKey = localStorage.getItem(key)
        if (countKey !=null)
        {
            console.log(data[key]["price"])
            totalPrice+= countKey*Number(data[key]["price"])
            count+=Number(countKey)
        }
    }

    let elem = document.getElementById("total")
    let price = document.getElementById("price")
    elem.innerText = "Товаров: " + count
    price.innerText = totalPrice
}

function BasketLoad()
{
    createBasketElementsForBasket()
    UpdateTotal()

}



function createBasketElementsForBasket()
{
    let products = document.getElementsByClassName("cart-items__products")[0]
    for (let key in localStorage)
    {
        if (localStorage.getItem(key) != null)
        {
            let newElement = createBasketElement(key)
            products.appendChild(newElement)

        }
    }
    UpdateTotal()
}

function deleteElement(index)
{
    let parent = document.getElementsByClassName("cart-items__products")[0]
    let for_delete = document.getElementById(String(index))
    parent.removeChild(for_delete)
    localStorage.removeItem(index)
    UpdateTotal()
}

function butPlus(count, index)
{
    let element = document.getElementById("myInput"+index)


    element.value = Number(element.value)+count
    localStorage.setItem(index, element.value)
    if (element.value<=0)
    {
        element.value= 0
        localStorage.removeItem(index)
    }

    UpdateTotal()
}

function createBasketElement(key)
{
    key = Number(key);
    let oneData = data[key];



    let newProduct = document.createElement("div");
    newProduct.classList.add("cart-items__product");
    newProduct.id  = key;

    let newProduct2 = document.createElement("div");
    newProduct2.classList.add("cart-items__content-container")

    let newProduct3 = document.createElement("div");
    newProduct3.classList.add("cart-items__wrapper")

    let newProduct4 = document.createElement("div")
    newProduct4.classList.add("cart-items__product-thumbnail")

    let newProduct5 = document.createElement("div")
    newProduct5.classList.add("cart-items__product-image-wrap")

    let a = document.createElement("a")
    a.classList.add()

    let img = document.createElement("img")
    img.classList.add("cart-items__product-image-img")
    img.src = oneData["img"]

    newProduct5.appendChild(img)
    newProduct4.appendChild(newProduct5)
    newProduct3.appendChild(newProduct4)
    newProduct2.appendChild(newProduct3)
    newProduct.appendChild(newProduct2)


    let newProduct5_1 = document.createElement("div")
    newProduct5_1.classList.add("cart-items__product-caption")

    let newProduct5_2 = document.createElement("div")
    newProduct5_2.classList.add("cart-items__product-info")


    let newProduct6_2 = document.createElement("div")
    newProduct6_2.classList.add("cart-items__product-name")
    newProduct6_2.innerText = oneData["name"].split("[")[0]

    newProduct5_1.appendChild(newProduct5_2)
    newProduct5_2.appendChild(newProduct6_2)
    newProduct4.appendChild(newProduct5_1)



    let del = document.createElement("button")
    del.classList.add("menu-control-button")
    del.innerText = "Удалить"
    newProduct5_1.appendChild(del);
    del.onclick = () => {deleteElement(key)}


    let myCount = document.createElement("div")
    myCount.classList.add("count-buttons")

    let buttonMinus = document.createElement("button")
    buttonMinus.classList.add("count-buttons__button_minus")
    buttonMinus.classList.add("count-buttons__button")
    buttonMinus.innerText = "-"
    buttonMinus.onclick = () => {butPlus(-1, key)}

    let myInput = document.createElement("input")
    myInput.innerText = localStorage.getItem(key)
    myInput.value = localStorage.getItem(key)
    myInput.classList.add("count-buttons__input")
    myInput.id = "myInput"+key

    let buttonPlus = document.createElement("button")
    buttonPlus.classList.add("count-buttons__button_plus")
    buttonPlus.classList.add("count-buttons__button")
    buttonPlus.innerText = "+"
    buttonPlus.onclick = () => {butPlus(1, key)}

    myCount.appendChild(buttonMinus)
    myCount.appendChild(myInput)
    myCount.appendChild(buttonPlus)
    newProduct3.appendChild(myCount)

    let price = document.createElement("div")
    price.classList.add("cart-items__product-block-amount")

    let price2 = document.createElement("div")
    price2.classList.add("cart-items__product-price")

    let priceSpan = document.createElement("span")
    priceSpan.classList.add("price__current")
    priceSpan.innerText = oneData["price"] + " ₽"

    let price3 = document.createElement("div")
    price3.classList.add("price__block")
    price3.appendChild(priceSpan)

    price2.appendChild(price3)
    price.appendChild(price2)

    newProduct3.appendChild(price)
    return newProduct
}



