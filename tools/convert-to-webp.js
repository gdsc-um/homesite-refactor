const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

/**
 * Directory containing the images to be converted.
 * Adjust this path to point to your input directory.
 */
const inputDir = path.resolve(__dirname, "../assets");

/**
 * Directory where the converted WebP images will be saved.
 * Adjust this path to point to your desired output directory.
 */
const outputDir = path.resolve(__dirname, "../assets");

/**
 * Supported image formats for conversion.
 * Only files with these extensions will be processed.
 */
const supportedFormats = [
  ".jpg",
  ".jpeg",
  ".png",
  ".tiff",
  ".gif",
  ".svg",
  ".avif",
  ".heif",
];

/**
 * Create the output directory if it doesn't exist.
 */
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

/**
 * Function to convert an image to WebP format.
 * @param {string} inputPath - The path to the input image file.
 * @param {string} outputPath - The path to save the converted WebP file.
 */
const convertToWebP = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
  }
};

/**
 * Read all files in the input directory and process each supported image file.
 */
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading input directory:", err);
    return;
  }

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (supportedFormats.includes(ext)) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

      // Convert each image to WebP
      convertToWebP(inputPath, outputPath);
    } else {
      console.log(`Skipping unsupported file: ${file}`);
    }
  });
});

/**
 * How to run this script:
 * 1. Ensure you have Node.js installed on your machine.
 * 2. Install the required dependencies by running: npm install sharp
 * 3. Adjust the inputDir and outputDir variables to point to your directories.
 * 4. Save this script to a file, e.g., convert-to-webp.js.
 * 5. Run the script using the command: node convert-to-webp.js
 */
