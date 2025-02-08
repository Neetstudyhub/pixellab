document.getElementById('pickGalleryBtn').addEventListener('click', function () {
    document.getElementById('imageInput').click();
});

// Handle image upload and generate a temporary local link
document.getElementById('generateLocalLinkBtn').addEventListener('click', function () {
    let imageInput = document.getElementById('imageInput');
    let generatedLink = document.getElementById('generatedLink');
    let resultContainer = document.getElementById('resultContainer');
    let previewImage = document.getElementById('previewImage');
    let previewContainer = document.getElementById('previewContainer');

    if (imageInput.files.length > 0) {
        let file = imageInput.files[0];
        let objectURL = URL.createObjectURL(file);

        // Display the temporary link
        generatedLink.href = objectURL;
        generatedLink.innerText = objectURL;
        resultContainer.style.display = "block";

        // Show image preview
        previewImage.src = objectURL;
        previewContainer.style.display = "block";
    } else {
        alert("Please select an image first.");
    }
});

// Handle Google Drive link input and generate a permanent direct link
document.getElementById('generateDriveLinkBtn').addEventListener('click', function () {
    let driveLink = document.getElementById('driveLink').value.trim();
    let generatedLink = document.getElementById('generatedLink');
    let resultContainer = document.getElementById('resultContainer');
    let previewImage = document.getElementById('previewImage');
    let previewContainer = document.getElementById('previewContainer');

    let fileIdMatch = driveLink.match(/\/d\/(.*)\/view/);

    if (fileIdMatch) {
        let fileId = fileIdMatch[1];
        let directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;

        // Display the permanent Google Drive link
        generatedLink.href = directLink;
        generatedLink.innerText = directLink;
        resultContainer.style.display = "block";

        // Show image preview
        previewImage.src = directLink;
        previewContainer.style.display = "block";
    } else {
        alert("Invalid Google Drive link. Make sure it's a shared file.");
    }
});

// Copy the generated link
document.getElementById('copyBtn').addEventListener('click', function () {
    let generatedLink = document.getElementById('generatedLink').href;

    navigator.clipboard.writeText(generatedLink).then(() => {
        alert("Link copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
});
