// The Archivist
// Main server code

// publish set of projects
Meteor.publish("projects", function(){
	return Projects.find();
})

// publish set of documents
Meteor.publish("documents", function(){
	return Documents.find();
})
