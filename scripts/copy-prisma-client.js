const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "..", "generated/.prisma");
const targetDir = path.join(
  __dirname,
  "..",
  "node_modules",
  "@rs-tech-hub",
  "nestjs-prisma",
  "src",
  "lib",
  "generated"
);

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory does not exist: ${src}`);
    process.exit(1);
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("Copying Prisma client...");
console.log(`From: ${sourceDir}`);
console.log(`To: ${targetDir}`);

copyRecursive(sourceDir, targetDir);

console.log("Prisma client copied successfully!");
