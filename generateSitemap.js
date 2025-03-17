// generateSitemap.js
const fs = require('fs');

// For Node 18+ the global fetch is available.
// For older Node versions, install node-fetch and uncomment the next line:
// const fetch = require('node-fetch');

// API endpoint that returns your blog posts.
const apiUrl = 'https://broken-hall-68ac.earnmoney100a.workers.dev';
// Base URL for each post.
const baseUrl = 'https://neetstudyhub.github.io/pixellab/post?postId=';

async function generateSitemap() {
  try {
    const response = await fetch(apiUrl);
    const posts = await response.json();

    // Begin building the XML content.
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Loop through the posts and add an entry for each.
    posts.forEach(post => {
      // Adjust the property if your API uses a different key than "id" or "postId"
      const postId = post.id || post.postId;
      if (postId) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}${postId}</loc>\n`;
        xml += `  </url>\n`;
      }
    });

    xml += `</urlset>`;

    // Write the XML content to sitemap.xml
    fs.writeFileSync('sitemap.xml', xml);
    console.log('sitemap.xml generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
