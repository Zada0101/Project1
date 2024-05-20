


const fs =require("fs");
const inputText = fs.readFileSync("input.txt", "utf8");
const words = inputText.split(/\s+/);
const wordMap = new Map();
let code = 0;
words.forEach((word) => {
  if (!wordMap.has(word)) {
    wordMap.set(word, code++);
  }
});

//identify words and assign codes
const compressedText = words.map((word) => wordMap.get(word)).join(" ");
fs.writeFileSync("output.sc", compressedText);
const compressedDate = fs.readFileSync("output.sc", "utf8");
const codes = compressedDate.split(" ");
const decompressedText = codes
  .map((code) => {
    return [...wordMap.keys()][code];
  })
  .join(" ");

fs.writeFileSync("readable.txt", decompressedText);
//Read both input and decompressed files
const inputBuffer = fs.readFileSync("input.txt");
const decompressedBuffer = fs.readFileSync("readable.txt");

// Check if both files have the same byte length
const isEqualLength = inputBuffer.length === decompressedBuffer.length;

// Compare each byte of both files
let isIdentical = true;
if (isEqualLength) {
  for (let i = 0; i < inputBuffer.length; i++) {
    if (inputBuffer[i] !== decompressedBuffer[i]) {
      isIdentical = false;
      break;
    }
  }
} else {
  isIdentical = false;
}

if (isIdentical) {
  console.log("Files are identical.");
} else {
  console.log("Files are not identical.");
}
