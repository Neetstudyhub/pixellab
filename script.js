// Functionality for Image Upload and Display
document.getElementById('fileInput')?.addEventListener('change', function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = new Image();
            img.onload = function() {
                let canvas = document.getElementById('imageCanvas');
                let ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Functionality for Text Overlay Tool
let textCanvas = document.getElementById('textCanvas');
let textCtx = textCanvas?.getContext('2d');
let textInput = document.getElementById('textInput');
let fontSize = document.getElementById('fontSize');
let fontColor = document.getElementById('fontColor');

if (textCanvas) {
    textCanvas.width = 500;
    textCanvas.height = 500;
}

function updateText() {
    if (textCanvas) {
        textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        textCtx.font = fontSize.value + "px Arial";
        textCtx.fillStyle = fontColor.value;
        textCtx.fillText(textInput.value, 50, 100);
    }
}

textInput?.addEventListener('input', updateText);
fontSize?.addEventListener('input', updateText);
fontColor?.addEventListener('input', updateText);
