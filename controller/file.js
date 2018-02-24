const chokidar = require('chokidar');
const model = require('../model/model.js');
const path_module = require('path');
const datetime = require('node-datetime');

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

// Something to use when events are received.
var log = console.log.bind(console);
log(req.connection.remoteAddress);
// Add event listeners.
watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'));

// Watch add event
watcher.on('add', (path, stats) => {
  // TODO: check the file in the database before adding it
  file_name = path_module.basename(path);
  file_path = path_module.dirname(path);

  var dt = datetime.create();
  var current_date = dt.format('Y-m-d H:M:S');
  // Check if the file is already exists in the database



  model.selectFiles(file_name, file_path, function(file_name, file_path) {
    return function(result) {
      if (typeof(result) == 'undefined') {
        model.addFile(file_name, file_path, current_date);
        log(`File ${path} added size to ${stats.size}`);
      }
    }
  }(file_name, file_path));
});

// Change event
watcher.on('change', (path, stats) => {
  // TODO: modify the file in the database when it is changed
  log(`File ${path} has been changed`);
});

// Delete event
watcher.on('unlink', (path, stats) => {
  // TODO: delete the file from the database when it is changed
  file_name = path_module.basename(path);
  file_path = path_module.dirname(path);
  model.selectFiles(file_name, file_path, function(result) {
    if (result != null) {
      log(result.id);
      model.deleteFile(result.id);
    }
  });

  // model.addFile(file_name, file_path, current_date);
  // log(`File ${path} has been removed`);

  // TODO: when changing any file we should broadcast this change
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
