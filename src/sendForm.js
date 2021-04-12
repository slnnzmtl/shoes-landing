function formSubmit() {
    let formFields = document.querySelector("#form").querySelectorAll("input");
    let formFieldParsed = {};
    let dataObject = {
        fields: getUtms()
    };
    
    formFields.forEach(item => {
        formFieldParsed[item.name] = item.value;    
    })

    dataObject.fields.PHONE = [
        {
            VALUE: formFieldParsed.PHONE,
            TYPE: "MOBILE"
        }
    ];
    dataObject.fields.NAME = formFieldParsed.NAME;
    dataObject.fields.TITLE = formFieldParsed.NAME;

    if (formValidation(dataObject.fields)) {
        sendForm(dataObject);
        onNavigate("/thank-you");
    }
}

window.formSubmit = formSubmit;

function formValidation(data) {
    let errors = 0;
    if (!validName(data.NAME)) {
        showErrors('NAME');
        errors = errors + 1;
    } 
    if (!validPhone(data.PHONE[0].VALUE)) {
        showErrors('PHONE');   
        errors = errors + 1;
    }

    if (errors > 0) {
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
    let url = "https://b24-doz3l2.bitrix24.ua/rest/6/a3ymjxc61iv6lres/crm.lead.add.json";
    let str = jQuery.param(data);

    fetch(url, {
        method: 'POST', 
        body: str
      })
      .then(response => {
            console.log(response);
      })
      .catch(error => {
          console.log(error);
      })
}
