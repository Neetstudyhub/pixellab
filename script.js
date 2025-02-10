document.addEventListener("DOMContentLoaded", function () {
  const uploadImage = document.getElementById("uploadImage");
  const preview = document.getElementById("preview");
  const previewContainer = document.getElementById("preview-container");
  const uploadStatus = document.getElementById("uploadStatus");
  const formatSelect = document.getElementById("format");
  const convertButton = document.getElementById("convert");
  const downloadLink = document.getElementById("downloadLink");
  const canvas = document.getElementById("canvas");
  const darkModeToggle = document.getElementById("darkModeToggle");
  
  // Image Preview Functionality
  uploadImage.addEventListener("change", function () {
    const file = uploadImage.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        previewContainer.style.display = "block";
        uploadStatus.textContent = "Image Uploaded Successfully!";
      };
      reader.readAsDataURL(file);
    }
  });

  // Image Conversion
  convertButton.addEventListener("click", function () {
    const format = formatSelect.value;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = preview.src;

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const convertedImage = canvas.toDataURL("image/" + format);
      downloadLink.href = convertedImage;
      downloadLink.download = "converted-image." + format;
      downloadLink.style.display = "block";
    };
  });

  // Dark Mode Toggle
  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
});
