// The Archivist
// Routes definition

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('landing');
});

Router.route('/main', function () {
  this.render('main');
});

