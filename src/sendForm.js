let buttons = document.querySelectorAll(".form-button");
buttons.forEach(item => {
    item.addEventListener("click", function () {
        formSubmit();
        thankyouPageShow();
    })
})

function formSubmit() {
    let formFields = document.querySelector(".screen-7__form").querySelectorAll("input");
    let formFieldParsed = {};
    let dataObject = {
        fields: getUtms()
    };
    
    formFields.forEach(item => {
        formFieldParsed[item.name] = item.value;    
    })

    dataObject.fields.NAME = formFieldParsed.NAME;
    dataObject.fields.TITLE = formFieldParsed.NAME;
    dataObject.fields.PHONE = formFieldParsed.PHONE;

    if (formValidation(dataObject.fields)) {
        sendForm(dataObject);
    }
}

function formValidation(data) {
    let errors;
    if (!validName(data.NAME)) {
        showErrors('NAME');
        errors = errors + 1;
    } 
    if (!validPhone(data.PHONE)) {
        showErrors('PHONE');   
        errors = errors + 1;
    }

    if (errors) {
        return false;
    } else {
        return true;
    }
}

function validName(email) {
    var reg = /[a-zA-ZА-я]{2,5}/
    return reg.test(email);
}

function validPhone(phone) {
    var reg = /^\+?\d{10,13}$/
    return reg.test(phone);
}

function showErrors(name) {
    let errorMessage = document.createElement("span");
    let form = document.querySelector("#form");
    let input = form.querySelector(`input[name='${name}']`);

    input.classList.add("error");

    if(!form.querySelector(".error-message")) {
        errorMessage.classList.add("error-message");
        errorMessage.innerText = "Пожалуйста, введите корректные данные";
        form.insertAdjacentElement("afterbegin", errorMessage);
    }

    setTimeout(() => {
        document.querySelector(`input[name='${name}']`).classList.remove("error");
        errorMessage.remove();
    }, 2000);
}

function getUtms() {
    let params = {};
    const d = decodeURIComponent;

    window.location.search
        .slice(1)
        .split('&')
        .forEach(item => {
            if (item === '') return;
            let splitted = item.split('=');
            params[d(splitted[0].toUpperCase())] = (splitted.length >= 2 ? d(splitted[1]) : true);
    });

    return params;
}

function sendForm(data) {
    let url = "https://b24-doz3l2.bitrix24.ua/rest/1/0see6m0vvihc8f00/crm.lead.add.json";
    let str = jQuery.param(data);

    fetch(url, {
        method: 'POST', 
        body: str
      })
      .then(response => {
            console.log('response');
          console.log(response);
      })
      .catch(error => {
          console.log('error');
          console.log(error);
      })
}

function thankyouPageShow() {
    let appElement = document.querySelector("#app");
    let thankyouPage = thankyouPageRender();
    appElement.innerHTML = thankyouPage.outerHTML;
}

function thankyouPageRender() {
    let page = document.createElement("div");
    let container = document.createElement("div");
    let title = document.createElement("span");
    let text = document.createElement("span");
    let buttonsWrapper = document.createElement("div");
    let telegramButton = document.createElement("a");
    let viberButton = document.createElement("a");
    let telegramImg = document.createElement("img");
    let viberImg = document.createElement("img");

    title.innerText = "Спасибо!";
    text.innerText = "Ваши данные отправлены. В ближайшее время с вами свяжется наш менеджер. \n\n Подпишитесь на наши каналы в Telegram и Viber и получите ежедневно обновляющийся каталог кроссовок!";
    telegramImg.src = "/assets/icons/telegram.png";
    telegramButton.appendChild(telegramImg);
    telegramButton.href = "https://invite.viber.com/?g2=AQApUke4YzZLeksqzcJ%2Fo8hqSPmYiW4DNmBBtOqcLaE5F6Z0hM2S80rael8Ptzp9";
    telegramButton.target = "_blank";
    viberImg.src = "/assets/icons/viber.png";
    viberButton.appendChild(viberImg);
    viberButton.href = "https://t.me/hype_ua_wholesale";
    viberButton.target = "_blank";
    
    page.classList.add("thank-you-page");
    container.classList.add("thank-you-page__container");
    title.classList.add("thank-you-page__title");
    text.classList.add("thank-you-page__text");
    buttonsWrapper.classList.add("thank-you-page__buttons-wrapper");
    telegramButton.classList.add("thank-you-page__button");
    viberButton.classList.add("thank-you-page__button");
    
    buttonsWrapper.appendChild(telegramButton);
    buttonsWrapper.appendChild(viberButton);
    
    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(buttonsWrapper);
    
    page.appendChild(container);
    
    return page;
}
