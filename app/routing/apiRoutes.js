var friends = require("../data/friends.js");
module.exports = function (app) {
	app.get("/api/friends", function (request, response){
		console.log("api is working");
		response.json(friends);
	});

	app.post("/api/friends", function(request, response){
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};
		console.log(request.body);
		var userData =request.body;
		var userScores = userData.scores;

		console.log(userScores);

		var totalDifference= 0;

		for (var i=0; i<friends.length; i++){
			console.log(friends[i]);
			totalDifference=0;

			//loop through all scores of each friend
			for (var j=0; j<friends[i].scores[j]; j++) {
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

			if (totalDifference<= bestMatch.friendDifference) {
				bestMatch.name = friends[i].name;
				bestMatch.photo = friends[i].photo;
				bestMatch.friendDifference =totalDifference;
			} 
		} //end inner for loop
	} //end for loop

  	friends.push(userData);
  	response.json(bestMatch);
});

};// end module.exports





