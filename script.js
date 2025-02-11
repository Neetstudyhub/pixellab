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

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let convertedImage = canvas.toDataURL(`image/${format}`, 0.8);

            // Show preview
            imagePreview.src = convertedImage;
            imagePreview.style.display = "block";

            // Get original file name without extension
            let originalFileName = file.name.split('.').slice(0, -1).join('.');
            
            // Set correct download name
            let finalFileName = originalFileName + "." + format;

            // Set download link
            downloadLink.href = convertedImage;
            downloadLink.download = finalFileName;
            downloadLink.style.display = "block";
        }
    };
    reader.readAsDataURL(file);
}
