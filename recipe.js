const request = require("request");
const fs = require("fs");

//Parse secrets file into JSON
const secretsFile = JSON.parse(fs.readFileSync("secrets.json"));

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

    //Request and callback function to return url of recipe
    request(options, ((error, response, body) => {
        if (error) throw new Error(error);

        return(JSON.parse(body)["recipes"][0]["sourceUrl"]);
    }));
}

module.exports = {getRecipe};