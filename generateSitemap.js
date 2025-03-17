// generateSitemap.js
const fs = require('fs');

// For Node 18+ the global fetch is available.
// If you are using an older Node version, you may need to install node-fetch.
const apiUrl = 'https://broken-hall-68ac.earnmoney100a.workers.dev';
const baseUrl = 'https://neetstudyhub.github.io/pixellab/post?postId=';

async function generateSitemap() {
  try {
    const response = await fetch(apiUrl);
    const posts = await response.json();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    posts.forEach(post => {
      const postId = post.id || post.postId;
      if (postId) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}${postId}</loc>\n`;
        xml += `  </url>\n`;
      }
    });

    xml += `</urlset>`;

    fs.writeFileSync('sitemap.xml', xml);
    console.log('sitemap.xml generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
