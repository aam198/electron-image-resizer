const path = require('path');
const os = require('os');
const fs = require('fs');
const resizeImg = require('resize-img');
const { app, BrowserWindow, Menu, ipcMain, shell} = require('electron');
const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

// Reminder: npx electronmon . 

// Create Main Window/BrowserWindow
function createMainWindow () {
  const mainWindow = new BrowserWindow ({
    title: 'Image Resizer',
    width: isDev ? 1000: 500,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  // Open devtools if in dev env
  if(isDev){
    mainWindow.webContents.openDevTools();
  }
  // Loads index.html in mainWindow
  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

// Create About Window that is selected from menu 30:30
function createAboutWindow() {
  const aboutWindow = new BrowserWindow ({
    title: 'About Image Resizer',
    width: 300,
    height: 300,
  });
  // Loads about.html in aboutWindow
  aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}


// App is ready
app.whenReady().then(() => {
  createMainWindow();

  // Implement menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

// Menu Template
const menu = [
  // Checking if user is on a Mac and adding About under software name
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: () => createAboutWindow()
      }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click: () => app.quit(),
        accelerator: 'CmdOrCtrl+W'
      }
    ]
  },
  // If Running on Windows, add a Help option with About
  ...(!isMac ? [{
    label: 'Help',
    submenu: [
      {
        label: 'About',
        click: () => createAboutWindow()
      }
    ]
  }] : []),
]

// Respond to ipcRenderer resize request
ipcMain.on('image:resize', (e, options) => {
  // Assigning destination of image
  options.dest = path.join(os.homedir(), 'imageresizer');
  // Should see imgPath, width, height
  console.log(options); 
  // Send the options and destination to resizeImage function
  resizeImage(options);
});

// Resize the image function called above and using resize-img package
async function resizeImage ({ imgPath, width, height, dest }){
  try{
    const newPath = await resizeImg(fs.readFileSync(imgPath), {
      // Since it comes in as a string the +width changes it to a number
      width: +width,
      height: +height
    });
    
    // Create filename, will override original image, 
    // TODO: should add a confirmation to overwrite?
    const filename = path.basename(imgPath);

    // Create dest folder if one does not exist
    if (!fs.existsSync(dest)){
      fs.mkdirSync(dest);
    }

    // Then Write file to dest 
    fs.writeFileSync(path.join(dest, filename), newPath);
    
    // Send success to renderer.js for Alert on frontend, sending an event
    mainWindow.webContents.send('image:done');

    // Open destination folder so you can see the image
    shell.openPath(dest);
  }
  catch (error){
    console.log(error);
  }
}


app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
