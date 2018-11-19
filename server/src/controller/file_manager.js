const chokidar = require('chokidar');
const path_module = require('path');
const datetime = require('node-datetime');
const events = require('events');
const eventEmitter = new events.EventEmitter();

// Define the files path
const data_path = 'data/';




// Initialize watcher.
var watcher = chokidar.watch(data_path, {
  ignored: /(^|[\/\\])\../,
  ignoreInitial: false,
  persistent: true,
  followSymlinks: false,
  usePolling: true,
  depth: undefined,
  interval: 100,
  ignorePermissionErrors: false
});

// Add event listeners.
watcher
  .on('add', path => {
    console.log(`File ${path} has been added`)
  })
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`))
  .on('addDir', path => console.log(`Directory ${path} has been added`))
  .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
  .on('error', error => console.log(`Watcher error: ${error}`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes'));

// Watch add event
watcher.on('add', (path, stats) => {
  // TODO: check the file in the database before adding it
  file_name = path_module.basename(path);
  file_path = path_module.dirname(path);

  var dt = datetime.create();
  var current_date = dt.format('Y-m-d H:M:S');

  console.log(current_date + ' ' + file_path + ' has been added');
});

// Change event
watcher.on('change', (path, stats) => {
  console.log(`File ${path} has been changed`);
});

// Delete event
watcher.on('unlink', (path, stats) => {
  // TODO: delete the file from the database when it is changed
  file_name = path_module.basename(path);
  file_path = path_module.dirname(path);
});

// 'add', 'addDir' and 'change' events also receive stat() results as second
// argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
// watcher.on('change', (path, stats) => {
//   if (stats) console.log(`File ${path} changed size to ${stats.size}`);
// });

// Get list of actual paths being watched on the filesystem
var watchedPaths = watcher.getWatched();

// Stop watching.
//watcher.close();
