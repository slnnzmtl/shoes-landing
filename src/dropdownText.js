let toggleElements = document.querySelectorAll(".screen-6__list-item-text-toggle");
let textArray = [
    "Работая с нами, вы можете быть уверены, что мы найдем лучшее и самые новые модели именно под ваш запрос.",
    "Мы используем 6-летний опыт нашей профессиональной команды в работе над каждым заказом.",
    "Мы доставим ваш заказ за 14-15 дней. Также можем отправить заказ на ваш адрес в Китае.",
    "Наша команда - это первое звено в работе с китайской фабрикой-производителем. Наши цены приятно вас удивят.",
    "Мы всегда нацелены на то, чтобы выполнить ваш заказ в самые кратчайшие сроки, но никогда не жертвуем качеством.",
    "Мы предлагаем очень гибкие условия работы: вы можете заказать кроссовки любых размеров без привязки к размерной сетке; мы привезем ваш заказ без предоплаты; у нас есть система отсрочки платежей для постоянных клиентов."
]

toggleElements.forEach((item, index) => {
    item.addEventListener('click', event => {
        if (!event.target.classList.contains("screen-6__list-item-text-toggle")) {
            if (event.target.closest(".active")) {
                closeDropdown(event.target.closest(".active"), index);
            } else {
                showDropdown(event.target.parentNode, index);
            }
        } else {
            if (event.target.closest(".active")) {
                closeDropdown(event.target, index);
            }
            showDropdown(event.target, index);
        }
    })

})

function showDropdown(clickedElement, index) {
    
    let tempELement = document.createElement("span");
    let closeElement = document.createElement("div");
    let arrowLeftElement = document.createElement("img");
    arrowLeftElement.src = "/assets/icons/arrow_left.png";
    
    closeElement.appendChild(arrowLeftElement);
    closeElement.classList.add("screen-6__list-item-text-toggle-close");

    tempELement.innerText = textArray[index];
    tempELement.classList.add("screen-6__list-item-text-mobile");
    clickedElement.innerHTML = tempELement.outerHTML;
    clickedElement.appendChild(closeElement);

    if (index % 2 > 0) {
        clickedElement.style = "align-self: flex-end;";
    } else {
        clickedElement.style = "align-self: flex-start;";
    }
    
    clickedElement.classList.add("active");
}

function closeDropdown(element, index) {
    let defaultImg = document.createElement("img");
    defaultImg.src = "/assets/icons/arrow_down.png";
    
    element.classList.remove("active");
    element.innerText = "";
    element.appendChild(defaultImg);
    element.style = "";

}