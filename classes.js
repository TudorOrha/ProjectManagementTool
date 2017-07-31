// Change the format of a javascript date to hh:mm dd/MM/yyyy
function formatDate(date) {
	// Add a 0 in front and get the last 2 characters
	const mm = ("0" + date.getMinutes()).slice(-2);
	const hh = ("0" + date.getHours()).slice(-2);
	const dd = ("0" + date.getDate()).slice(-2);
	const MM = ("0" + date.getMonth()).slice(-2);
	const yyyy = date.getFullYear();
	return hh + ":" + mm + " " + dd + "/" + MM + "/" + yyyy; 
}

class User {
	constructor(name) {
		const nextUserID = localStorage.getItem("nextUserID");
		this.id = nextUserID;
		localStorage.setItem("nextUserID", +this.id + 1);
		this.name = name;
	}
}

class Issue {
	constructor(type, name, sprint, asignee, description, status, tasks, comments) {
		const nextIssueID = localStorage.getItem("nextIssueID");
		this.id = nextIssueID;
		localStorage.setItem("nextIssueID", +this.id + 1);
		this.type = type;
		this.name = name;
		this.sprint = sprint;
		this.createdBy = localStorage.getItem("currentUserID");
		this.asignee = asignee;
		this.description = description;
		this.status = status;
		this.tasks = tasks;
		this.comments = comments;
		const today = new Date();
		this.createdAt = formatDate(today);
		this.updatedAt = formatDate(today);
		this.parentID = -1;
	}
	
	setType(type) {
		this.type = type;
	}
	
	setName(name) {
		this.name = name;
	}
	
	setSprint(sprint) {
		this.sprint = sprint;
	}
	
	setAsignee(asignee) {
		this.asignee = asignee;
	}
	
	setDescription(description) {
		this.description = description;
	}
	
	setStatus(status) {
		this.status = status;
	}
	
}

class Project {
	constructor(sprints) {
		// TODO uniqueIDgeneration when working with multiple projects
		this.id = 0;
		this.sprints = sprints;
	}
}

class Sprint {
	constructor() {
		if (arguments[0] && !arguments[1]) {
			const nextSprintID = localStorage.getItem("nextSprintID");
			this.id = nextSprintID;
			localStorage.setItem("nextSprintID", +this.id + 1);
			this.name = arguments[0];
		}
		else if (arguments[0] && arguments[1]){
			this.id = arguments[0];
			this.name = arguments[1];
		}
	}
	
	/**
	 * Counts how many features/bugs a sprint has.
	 * Input: "Feature", "Bug" or "Task"
	 */
	countTypeOfIssue(type) {
		let nrOfFeatures = 0;
		const issues = JSON.parse(localStorage.getItem("issues"));
		for (let i = 0; i < issues.length; i++) {
			if (issues[i].type === type && issues[i].sprint === this.id) nrOfFeatures += 1;
		}
		return nrOfFeatures;
	}
	
}


class Comment {
	constructor(name) {
		const nextCommentID = localStorage.getItem("nextCommentID");
		this.id = nextCommentID;
		localStorage.setItem("nextCommentID", +this.id + 1);
		this.name = name;
	}
}
