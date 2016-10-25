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
		if(Session.get("selectedjob")){
			var job = Session.get("selectedjob");
			var job_details = Projects.findOne({jobno: job});
			var job_name = job_details.jobno + " - " + job_details.jobname;
			return job_name;
		}
		else{
			return false;
		}
	},
	isAdmin:function(){
		var curr_user = Meteor.userId();
		//console.log(curr_user);
		if (curr_user){
			//if (doc.owner == Meteor.userId()){
			//	return true;
			//}
			return true;
		}
		return false;
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
		$("#new_proj_panel").hide();
		$("#new_doc_panel").hide();
	},
	
	// toggle projects on/off
	"click .js-toggle-projects": function (event) {
		$("#search_panel").hide();
		$("#project_list").toggle('slow');
		$("#doc_list").hide();
		$("#new_proj_panel").hide();
		$("#new_doc_panel").hide();
	},
	
	// toggle new projects on/off
	"click .js-toggle-new-project": function (event) {
		$("#search_panel").hide();
		$("#project_list").hide();
		$("#doc_list").hide();
		$("#new_proj_panel").toggle('slow');
		$("#new_doc_panel").hide();
	},
	
	// toggle new documents on/off
	"click .js-toggle-new-doc": function (event) {
		$("#search_panel").hide();
		$("#project_list").hide();
		$("#doc_list").hide();
		$("#new_proj_panel").hide();
		$("#new_doc_panel").toggle('slow');
	},
	
	// Set selected project no.
	"click .js-jobno":function(event){
		var job_id = this._id;
		var job = Projects.findOne({_id: job_id});
		Session.set("selectedjob", job.jobno);
		
		$("#search_panel").hide();
		$("#project_list").hide();
		$("#doc_list").toggle('slow');
		$("#new_proj_panel").hide();
	},
	
	// Set search criteria
	"submit .js-search-panel": function(event){
		// to be completed
		
		return false;
	},
	
	// Insert new project into database
	"submit .js-new-proj-panel":function(event){
		var jobno = event.target.new_job_no.value;
		var jobtitle = event.target.new_job_title.value;
		var pm = event.target.new_project_manager.value;
		var jobdate = event.target.new_project_date.value;
		
		var project = {
			jobno: jobno,
			jobname: jobtitle,
			jobmanager: pm,
			jobcreated: jobdate
		};
		
		// Update Projects Database
		Projects.insert(project);
		
		// Hide new project panel & display updated list of projects
		$("#new_proj_panel").hide();
		$("#project_list").toggle('slow');
		
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
		$("#new_proj_panel").hide();
		$("#new_doc_panel").hide();
    }
};
