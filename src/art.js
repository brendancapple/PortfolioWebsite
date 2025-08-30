function toggleVisibility(targetID) {
    let target = document.getElementById(targetID);
    
    if (target.style.display === "none") {
        target.style.display = "block";
    } else {
        target.style.display = "none";
    }
}