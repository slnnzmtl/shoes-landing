import "./styles/main.scss";
import "./components/gallery";
import "./dropdownText";
import "./sendForm";

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
    