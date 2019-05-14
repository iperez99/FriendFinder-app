var friends = require("../data/friends")

module.exports = function (app) {

    //API GET request
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    app.post("/api/friends", function (req, res) {
        var userScore = req.body.scores;
        var scoresArr = [];
        var bestMatch = 0;


        for (var i = 0; i < friends.length; i++) {
            var scoreDiff = 0;
            for (var j = 0; j < userScore.length; j++) {
                scoreDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(userScore[j])))
            }
            scoresArr.push(scoreDiff);
        }

        // loop through ours scoresArr
        for (var i = 0; i < scoresArr.length; i++) {
            if (scoresArr[i] <= scoresArr[bestMatch]) {
                bestMatch = i;
            }
        }

        // return the best match
        var bestMate = friends[bestMatch];
        res.json(bestMate);
        friends.push(req.body)

    });


    app.post("/api/clear", (req, res) => {
        // clear out the arrays of data
        friends.length = [];
        res.json({
            ok: true
        });
    });
};
