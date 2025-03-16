// Open Sidebar Menu
function openMenu() {
    document.getElementById("side-menu").style.left = "0";
    document.getElementById("overlay").style.display = "block";
}

// Close Sidebar Menu
function closeMenu() {
    document.getElementById("side-menu").style.left = "-100%";
    document.getElementById("overlay").style.display = "none";
}

// Navigate to Home when Clicking Logo
function goHome() {
    window.location.href = "index.html";
}
