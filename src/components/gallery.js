let galleryElement = document.querySelector(".screen-2__gallery");
let rootClassName = "screen-2__gallery";

function galleryRender(gallery) {
    let container = document.createElement("div");
    let imagesFolder = './assets/gallery/';
    let images = [
        `${imagesFolder}1.jpg`,
        `${imagesFolder}2.jpg`,
        `${imagesFolder}3.jpg`,
        `${imagesFolder}4.jpg`,
        `${imagesFolder}5.jpg`,
    ];
    container.classList.add(`${rootClassName}-wrapper`);

    let width = 40;
    let reverse = false;

    images.forEach(element => {
        let image = document.createElement("img");
        
        if (!reverse) {
            image.style = `width: ${width}%;`;
            width = width + 20;
            if (width === 80) {
                reverse = true;
            }
        } else {
            image.style = `width: ${width}%;`;
            width = width - 20;
        }

        image.src = element;
        image.classList.add(`${rootClassName}-wrapper-item`);
        container.appendChild(image);
    });

    
    gallery.appendChild(container);
    
}

galleryRender(galleryElement)