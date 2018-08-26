function StoryCard() {
	this.Remove = function(){

	}
	this.Create = function(){

	}
	this.GetFileName = function() {
		var textField = document.createElement("TextField");
		textField.type = "text";
		document.appendChild(input);
	}
	this.GetStoryDescription = function() {
		var storyText = document.createElement("StoryText");
		storyText.appendChild(document.createTextNode(produceMessage()));
		document.body.appendChild(storyText);
	}
	this.SetStoryDescription = function() {
		var storyText = document.getElementById("sc").value;
	}
}
