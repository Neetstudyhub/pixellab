document.getElementById("convert").addEventListener("click", function() {
  const file = document.getElementById("uploadImage").files[0];
  const format = document.getElementById("format").value;
  
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Convert image to the selected format
      const convertedImg = canvas.toDataURL("image/" + format);

      const link = document.getElementById("downloadLink");
      link.href = convertedImg;
      link.style.display = "inline-block";
      link.download = "converted-image." + format;
    };
  };
});

document.getElementById("darkModeToggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});
