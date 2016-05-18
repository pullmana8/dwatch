const app = require('app');
const BrowserWindow = require('browser-window');
const path = require('path');
const spawn = require('child_process').spawn;

let mainWindow = null;

if (process.platform === 'win32') {
  const cmd = process.argv[ 1 ];
  const target = path.basename(process.execPath);
  if (cmd === '--squirrel-install' || cmd === '--squirrel-updated') {
    run([ '--createShortcut=' + target + '' ], app.quit);
  } else if (cmd === '--squirrel-uninstall') {
    run([ '--removeShortcut=' + target + '' ], app.quit);
  }
  else if (cmd === '--squirrel-obsolete') {
    app.quit();
  }
}

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL('file://' + __dirname + '/generated/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

function run(args, done) {
  const updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
  spawn(updateExe, args, {
    detached: true
  })
  .on('close', done)
}
