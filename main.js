const path = require('path');
const { app, BrowserWindow, Menu} = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

// Creates main window
function createMainWindow () {
  const mainWindow = new BrowserWindow ({
    title: 'Image Resizer',
    width: isDev ? 1000: 500,
    height: 800,
  });

// Open devtools if in dev env
if(isDev){
  mainWindow.webContents.openDevTools();
}

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
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
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click: () => app.quit(),
        accelerator: 'CmdOrCtrl+W'
      }
    ]
  }
]


app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
