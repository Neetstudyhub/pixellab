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

            // Resize if too large
            let maxWidth = 1200;  // Resize large images to 1200px width (for optimization)
            let scaleFactor = img.width > maxWidth ? maxWidth / img.width : 1;
            canvas.width = img.width * scaleFactor;
            canvas.height = img.height * scaleFactor;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Adjust quality for JPG & WEBP
            let quality = (format === "jpeg" || format === "webp") ? 0.7 : 1.0;
            let convertedImage = canvas.toDataURL(`image/${format}`, quality);

            // Show preview
            imagePreview.src = convertedImage;
            imagePreview.style.display = "block";

            // Get original file name without extension
            let originalFileName = file.name.split('.').slice(0, -1).join('.');
            let finalFileName = originalFileName + "." + format;

            // Set download link
            downloadLink.href = convertedImage;
            downloadLink.download = finalFileName;
            downloadLink.style.display = "block";
        }
    };
    reader.readAsDataURL(file);
}
