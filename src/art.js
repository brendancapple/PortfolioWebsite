var button_pressed = false;

function toggleVisibility(targetID) {
    let target = document.getElementById(targetID);
    
    if (target.style.display === "none" || button_pressed) {
        target.style.display = "block";
        button_pressed = false;
    } else {
        target.style.display = "none";
    }
}

function imagePopout(imgURL) {
    if(button_pressed) return;
    button_pressed = true;

    let popupTarget = document.getElementById('BIG_POPUP_DIV');
    let imageTarget = popupTarget.getElementsByTagName('img')[0];
    
    imageTarget.src = imgURL;
    popupTarget.style.display = "block";
}



// Drawing 23-24 Slideshow
let drawing_index = 0;
let drawing_images = [ 
    "img/art/drawing23-24/Vase_Contour.jpg",
    "img/art/drawing23-24/Muhammad_Ali.jpg",
    "img/art/drawing23-24/Keys.jpg",
    "img/art/drawing23-24/Dragon.jpg",
    "img/art/drawing23-24/Hill_House.jpg",
    "img/art/drawing23-24/Staring.jpg"
];

function rotateDrawingSlide(reverse) {
    if (button_pressed) return;
    button_pressed = true;

    let target = document.getElementById("SLIDE_DIV_DRAWING");

    if (reverse) drawing_index--;
    else drawing_index++;

    if (drawing_index >= drawing_images.length) drawing_index = 0;
    if (drawing_index < 0) drawing_index = drawing_images.length-1;

    target.style.backgroundImage = "url(" + drawing_images[drawing_index] + ")";
    document.getElementById("CONTENT_DRAWING_23-24").style.display = "block";
}