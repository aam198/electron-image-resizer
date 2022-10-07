const form = document.getElementById('img-form')
const img = document.getElementById('img')
const filename = document.getElementById('filename')
const outputPath = document.getElementById('output-path')
const heightInput = document.getElementById('height')
const widthInput = document.getElementById('width')

function loadImage(e) {
  // Get the image, when uploading with event it gets added to an array of Files
  // Getting first image
  const file = e.target.files[0]
  // Send file to Function to Check to make sure it is an image
  if (!isFileImage(file)) {
    console.log('Please select an image');
    return;
  }
  console.log('Success');
}

// Make sure file is an accepted image file type
function isFileImage(file) {
  const acceptedImageTypes = ['image/gif', 'image/png', 'image/jpeg'];
  return file && acceptedImageTypes.includes(file['type']);
}

// event of image input
img.addEventListener('change', loadImage);