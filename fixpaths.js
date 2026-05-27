const fs = require("fs");
const path = require("path");

const htmlPath = path.join(
	__dirname,
	"nuxt-app",
	".output",
	"public",
	"index.html",
);

if (!fs.existsSync(htmlPath)) {
	console.error("❌ index.html not found at:", htmlPath);
	process.exit(1);
}

let html = fs.readFileSync(htmlPath, "utf-8");

html = html.replace(/"\/_nuxt\//g, '"./_nuxt/');
html = html.replace(/'\/_nuxt\//g, "'./_nuxt/");
html = html.replace(/"baseURL":"\/"/g, '"baseURL":"./"');
html = html.replace(
	/"buildAssetsDir":"\/_nuxt\/"/g,
	'"buildAssetsDir":"./_nuxt/"',
);

html = html.replace(/ crossorigin="[^"]*"/g, "");
html = html.replace(/ crossorigin/g, "");

fs.writeFileSync(htmlPath, html);
console.log("✅ index.html patched successfully");
console.log("📄 Path:", htmlPath);
