document.addEventListener("DOMContentLoaded", function() {
    var applyButton = document.getElementById("applyButton");

    applyButton.addEventListener("click", function() {
        applyColors();
    });
});

function applyColors() {
    var colors = document.querySelectorAll(".color");
    colors.forEach(function(color) {
        color.style.color = getRandomColor();
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}