// The Archivist
// Routes definition

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('landing');
});

Router.route('/browse', function () {
  this.render('browse');
});

Router.route('/:_id', function () {
  this.render('doclist');
});
