const request = require("request");
const fs = require("fs");
const msgFile = require("./sendMsg.js");

//Parse secrets file into JSON
const secretsFile = JSON.parse(fs.readFileSync("/home/pi/Code/js/recipeApp/secrets.json"));

//Callable function to get daily recipe
function getRecipe() {
    //Query options
    const options = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
        qs: {number: "1"},
        headers: {
            "X-RapidAPI-Key": secretsFile["food"]["key"],
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            useQueryString: true
        }
    };

    //Request and callback function to send message
    request(options, ((error, response, body) => {
        if (error) throw new Error(error);

        msgFile.sendMsg(JSON.parse(body)["recipes"][0]["sourceUrl"]);
    }));
}

module.exports = {getRecipe};
