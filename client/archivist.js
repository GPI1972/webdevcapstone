// The Archivist
// Main client code

//////
// Template helper functions
//////

// Template helper displaying default project list
Template.main.helpers({
	projects:function(){
		return Projects.find({}, {sort: {jobno: -1}});
	},
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


/////
// Event handlers
//////

Template.main.events({
	// toggle search panel on/off
	"click .js-toggle-search-panel": function (event) {
		$("#project_list").hide();
		$("#search_panel").toggle('slow');
		$("#doc_list").hide();
	},
	
	// toggle projects on/off
	"click .js-toggle-projects": function (event) {
		$("#search_panel").hide();
		$("#project_list").toggle('slow');
		$("#doc_list").hide();
	},
	
	// Set selected project no.
	"click .js-jobno":function(event){
		var job_id = this._id;
		var job = Projects.findOne({_id: job_id});
		Session.set("selectedjob", job.jobno);
		
		$("#search_panel").hide();
		$("#project_list").hide();
		$("#doc_list").toggle('slow');
	},
	
	// Set search criteria
	"submit .js-search-panel": function(event){
		var criteria = event.target.search_job_no.value;
		console.log(criteria);
		
		return false;
	},
	
});



//////
// Misc Functions
//////

// Hide search panel on page load
Template.main.rendered = function() {
    if(!this._rendered) {
		$("#project_list").hide();
		$("#search_panel").hide();
		$("#doc_list").hide();
    }
};
