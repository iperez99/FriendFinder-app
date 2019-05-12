var friends = require("../data/friends")

module.exports = function (app) {

    //API GET request
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    //API POST request
    app.post("/api/friends", function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        //capture the users input
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        //compute the difference of each question

        var totalDifference = 0;

        //nested for loop to get the best match//

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;

            //loop to check the scores of friend from array
            for (var j = 0; j < friends[j].scores; j++) {

                //using math absolute function to make sure there are no negative scores.

                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                //If the sum of differences is less than the differeces of the current best match//

                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;

                }
            }

        }
        //save the users data to database
        friends.push(userData);
        
        //return the best match back to HTML in JSON
        res.json(bestMatch);
    });


}