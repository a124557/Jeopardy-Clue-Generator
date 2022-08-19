var express = require('express');
var path = require('path');
var app = express();
var livereload = require('livereload');
var connectLiveReload = require('connect-livereload');

const public = path.join(__dirname + '/public');

//Telling our node app what directory to use
app.use(express.static(public));
//Telling our node app to use live-reload to auto-reload our page
app.use(connectLiveReload());

//Create livereload server
var liveReloadServer = livereload.createServer();

/*Telling livereload to watch for changes to the public directory which contains
our html, css, and js files*/
liveReloadServer.watch(public);

app.get('/', (req,res) => {
    res.sendFile(public + '/html/index.html');
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})