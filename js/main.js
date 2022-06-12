
function onLoad()
{
    createElements();

}

function createElements()
{

    const len = data.length

    let subcategory = document.getElementById("elements")
    for (let i = 0;i<len;i++)
    {
        let myElement = createElement(data[i], i)
        subcategory.appendChild(myElement)
    }



}

function createElement(oneData, index)
{

    let div = document.createElement("div");
    div.classList.add("subcategory__item");
    div.id = index

    let div2 = document.createElement("div");
    div2.classList.add("subcategory__content");

    let div3 = document.createElement("div");
    div3.classList.add("subcategory__image");

    let img = document.createElement("img");
    img.classList.add("subcategory__image-content");
    img.alt = "";
    img.src = oneData["img"];

    let span = document.createElement("span");
    span.classList.add("subcategory__title");
    span.innerText = oneData["name"]


    let div_price = document.createElement("div")

    let price = document.createElement("button");
    price.id = index + "." + index
    price.classList.add("subcategory__button");
    let text = "[Купить] "
    let text2 = "[В корзине] "
    if (localStorage.getItem(index)==null) {
        price.innerText = text + oneData["price"] + " ₽";
    }
    else
    {
        price.innerText = text2 + oneData["price"] + " ₽";
    }
    price.onclick = () => {addToBasket(index)}

    div3.appendChild(img);
    div2.appendChild(div3);
    div2.appendChild(span);
    div.appendChild(div2);

    div_price.appendChild(price)
    div.appendChild(div_price);

    return div;
}


