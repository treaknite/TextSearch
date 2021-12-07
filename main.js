// Modules to control application life and create native browser window
const { app, BrowserWindow, clipboard, globalShortcut } = require('electron')
const path = require('path')
const {Menu, nativeImage, Tray } = require('electron')


let tray = null
function createTray () {
  const icon = path.join(__dirname, 'assets/icons/png/64x64.png') // required.
  const trayicon = nativeImage.createFromPath(icon)
  tray = new Tray(trayicon.resize({ width: 16 }))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        createWindow()
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.quit() // actually quit the app.
      }
    },
  ])

  tray.setContextMenu(contextMenu)
}

let win
function createWindow () {
  if (!tray) { // if tray hasn't been created already.
    createTray()
  }
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 800,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
  win.on('closed', function () {
    win = null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  const ret = globalShortcut.register('CommandOrControl+T', () => {
    console.log('CommandOrControl+T is pressed');
  })

  if (!ret) {
    console.log('Shortcut registration failed')
  } else {
    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered('CommandOrControl+T'))
    clipboardText = clipboard.readText([String])
    /* Code to send server call... */
    console.log(clipboardText)
  }

  

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // app.quit()
    win = null
  }
})
