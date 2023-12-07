const {app,BrowserWindow} =require('electron')
const windowStateKeeper = require('electron-window-state');
let win;
function createWindow() {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });

    win = new BrowserWindow(
        {
            //x and y axis to manage position of previously opened window
            x: mainWindowState.x,
            y: mainWindowState.y,
            width: mainWindowState.width,
            height: mainWindowState.height,
            // frame:false    ----to hide window frame
            backgroundColor: "#dba2a6",
            // alwaysOnTop:true,
            title: "Electron",
            //resizable property
            // resizable:
        }
    );
    let childMain = new BrowserWindow({parent: win})
    childMain.loadFile('childMain.html');
    childMain.show();
    win.loadFile('index.html')
    mainWindowState.manage(win);
    let wc = win.WebContents;
    console.warn(wc)
}

app.whenReady().then(createWindow)
// console.warn("simple app starting to display window ")
app.on('ready',()=>{
    console.warn(app.isReady())

    console.warn("app is ready . running from app life cycle  event")
})

app.on('before-quit',(e)=>{
    console.warn("before quitting app event")
})

app.on('browser-window-focus',()=>{
    console.warn("focusing on browser window or app")
})
app.on('browser-window-blur',()=>{
    console.warn("not focusing on browser window or app")
})