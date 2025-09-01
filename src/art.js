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

    let target = document.getElementById("SLIDE_DIV_DRAWING");
    button_pressed = true;

    if (reverse) drawing_index--;
    else drawing_index++;

    if (drawing_index >= drawing_images.length) drawing_index = 0;
    if (drawing_index < 0) drawing_index = drawing_images.length-1;

    target.style.backgroundImage = "url(" + drawing_images[drawing_index] + ")";
    document.getElementById("CONTENT_DRAWING_23-24").style.display = "block";
}