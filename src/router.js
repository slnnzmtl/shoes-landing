import homePage from "./pages/home.html";
import thankPage from "./pages/thank-page.html";

const routes = {
    '' : homePage,
    '#/thank-you' : thankPage
};

window.onload  = () => {
    let hash = window.location.hash;
    if (hash in routes) {
        getPage(routes[hash]);
    } else {
        getPage(routes['']);
    }
};

function getPage(route) {
    $("#app").html(route);
}

const onNavigate = (pathname) => {
    if (`#${pathname}` in routes) {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + `#${pathname}`
    )
        getPage(routes[`#${pathname}`]);
    }
}

window.onNavigate = onNavigate;

window.onpopstate = () => { 
    let hash = window.location.hash;
    if (hash in routes) {
        getPage(routes[hash]);
    } else {
        getPage(routes['']);
    }
  }