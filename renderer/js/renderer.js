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
  // Sends the file to a function below to validate that it is a valid image file
  if (!isFileImage(file)) {
    alertError('Unknown file type, please select an image');
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

  alertSuccess('Success!')
  console.log('Success');
  // initally the Height/Width form is set to display: none;, if successful image is selected the width/height form will show.
  form.style.display = 'block';
  // Show file name and output path 
  filename.innerText = file.name;
  outputPath.innerText = path.join(os.homedir(), 'imageResizer')
}

// Send image data to main
function sendImage(e) {
  e.preventDefault();

  const width = widthInput.value;
  const height = heightInput.value;

  if(!img.files[0]){
    alertError('Please upload an image');
    return;
  }

  if(width === '' || height === '') {
    alertError('Please fill in a height and width');
    return;
  }
}

// Make sure file is an accepted image file type
function isFileImage(file) {
  const acceptedImageTypes = ['image/gif', 'image/png', 'image/jpeg'];
  return file && acceptedImageTypes.includes(file['type']);
}

function alertError(message){
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "linear-gradient(to right, #501616, #C93C3C)",
      color: 'white',
      textAlign: 'center',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
  })
}

function alertSuccess(message){
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    gravity: 'top',
    style: {
      background: "linear-gradient(to right, #597821, #96c93d)",
      color: 'white',
      textAlign: 'center',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    }
  })
}


// event of image input and form submit
img.addEventListener('change', loadImage);
form.addEventListener('submit', sendImage);