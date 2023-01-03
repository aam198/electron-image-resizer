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
  // Sends the file to the function below to validate that it is an image
  if (!isFileImage(file)) {
    console.log('Unknown file type, please select an image');
    return;
  }

  // Get original dimensions of image that is chosen by using Image constructor and URL object
  const image = new Image();
  image.src = URL.createObjectURL(file);
  // When loading, getting Image().width and setting the widthInput.value & heightInput.value
  image.onload = function() {
    widthInput.value = this.width;
    heightInput.value = this.height;
  }

  console.log('Success');
  // initally the Height/Width form is set to display: none;, if successful image is selected the width/height form will show.
  form.style.display = 'block';
  // Show file name in App
  filename.innerText = file.name;
}

// Make sure file is an accepted image file type
function isFileImage(file) {
  const acceptedImageTypes = ['image/gif', 'image/png', 'image/jpeg'];
  return file && acceptedImageTypes.includes(file['type']);
}

// event of image input
img.addEventListener('change', loadImage);