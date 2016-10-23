// The Archivist
// Main client code

// Template helper functions

// Template helper displaying default project list
Template.projlist.helpers({
	projects:function(){
		return Projects.find({}, {sort: {jobno: -1}});
	}
});

// Template helper displaying document list for specific project
Template.doclist.helpers({
	docs:function(){
		var job = Session.get("selectedjob");
		return Documents.find({jobno: job}, {sort: {doctype: -1}});
	},
	job_no:function(){
		var job = Session.get("selectedjob");
		var job_details = Projects.findOne({jobno: job});
		var job_name = job_details.jobno + " - " + job_details.jobname;
		return job_name;
	}
});


// Event Handlers

// Set selected project no.
Template.projlist.events({
	"click .js-jobno":function(event){
		var job_id = this._id;
		var job = Projects.findOne({_id: job_id});
		Session.set("selectedjob", job.jobno);
	}
});

// selects specific document and return details
Template.doclist.events({
	"click .js-doctitle":function(event){
		var doc_id = this._id;
		var doc = Documents.findOne({_id: doc_id});
	}
});