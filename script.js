document.addEventListener("DOMContentLoaded", function () {
    let darkModeToggle = document.getElementById("darkModeToggle");
    let dropZone = document.getElementById("dropZone");
    let fileInput = document.getElementById("imageInput");

    // Hamburger Menu Toggle
    window.toggleMenu = function() {
        document.querySelector(".nav-links").classList.toggle("show");
    }

    // Open file picker when clicking on Drop Zone
    dropZone.addEventListener("click", () => fileInput.click());

    // Drag & Drop Upload
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("active");
    });

    dropZone.addEventListener("dragleave", () => dropZone.classList.remove("active"));

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("active");
        fileInput.files = e.dataTransfer.files;
        convertImage(); // Auto-convert after drop
    });

    // Detect file selection from gallery
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            convertImage();
        }
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
