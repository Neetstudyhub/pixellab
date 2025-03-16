const API_PROXY = "https://broken-hall-68ac.earnmoney100a.workers.dev/";
let nextPageToken = "";
let prevPageToken = "";

// Fetch and Display Posts with Pagination
async function fetchPosts(pageToken = "") {
    try {
        let url = `${API_PROXY}/posts?maxResults=6`; // Fetch 6 posts per page
        if (pageToken) url += `&pageToken=${pageToken}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
            displayPosts(data.items);
            nextPageToken = data.nextPageToken || "";
            prevPageToken = pageToken; // Save previous page token
            updatePaginationButtons();
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

// Render Posts as Cards
function displayPosts(posts) {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    posts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        // Extract Thumbnail
        let thumbnail = "https://placehold.co/600x400";
        const imgMatch = post.content.match(/<img.*?src=["'](.*?)["']/);
        if (imgMatch) {
            thumbnail = imgMatch[1];
        }

        postCard.innerHTML = `
            <img class="post-thumbnail" src="${thumbnail}" alt="${post.title}">
            <h3 class="post-title">${post.title}</h3>
        `;

        // Click Event to Open Post Page
        postCard.addEventListener("click", () => {
            window.location.href = `post.html?id=${post.id}`;
        });

        container.appendChild(postCard);
    });
}

// Update Pagination Buttons
function updatePaginationButtons() {
    document.getElementById("prev-page").style.display = prevPageToken ? "inline-block" : "none";
    document.getElementById("next-page").style.display = nextPageToken ? "inline-block" : "none";
}

// Pagination Button Events
document.getElementById("prev-page").addEventListener("click", () => fetchPosts(prevPageToken));
document.getElementById("next-page").addEventListener("click", () => fetchPosts(nextPageToken));

// Load Posts on Home Page
document.addEventListener("DOMContentLoaded", () => fetchPosts());
