document.addEventListener("DOMContentLoaded", function () {
    let darkModeToggle = document.getElementById("darkModeToggle");
    let dropZone = document.getElementById("dropZone");

    // Dark Mode Toggle
    darkModeToggle.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Drag & Drop Upload
    dropZone.addEventListener("click", () => document.getElementById("imageInput").click());
    dropZone.addEventListener("dragover", (e) => e.preventDefault());
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        document.getElementById("imageInput").files = e.dataTransfer.files;
    });
});

function convertImage() {
    let fileInput = document.getElementById('imageInput');
    let format = document.getElementById('formatSelect').value;
    let downloadLink = document.getElementById('downloadLink');
    let imagePreview = document.getElementById('imagePreview');

    if (fileInput.files.length === 0) {
        alert("Please upload an image first.");
        return;
    }

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        let img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            canvas.width = img.width > 1200 ? 1200 : img.width;
            canvas.height = img.height > 1200 ? (img.height * 1200 / img.width) : img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let convertedImage = canvas.toDataURL(`image/${format}`, 0.7);

            imagePreview.src = convertedImage;
            imagePreview.style.display = "block";
            downloadLink.href = convertedImage;
            downloadLink.download = `converted.${format}`;
            downloadLink.style.display = "block";
        }
    };
    reader.readAsDataURL(file);
}
