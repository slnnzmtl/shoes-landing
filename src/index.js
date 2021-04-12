import "./styles/main.scss";
import DropdownText from "./dropdownText";
import "./sendForm";
import "./router.js";

//scroll to form
$(document).ready(function(){
    $("#app").on("click", "a", function (event) {
        var id  = $(this).attr('href'),
        top = $(id).offset().top;
        if (id === "#form"){
            event.preventDefault();
            console.log(id)
            $('body,html').animate({scrollTop: top}, 1500);
        } 
    });
});

setTimeout(() => {
    new DropdownText();
}, 500)

    


