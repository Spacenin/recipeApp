const msgFile = require("./sendMsg.js");
const recipeFile = require("./recipe.js");

//Get recipe from RapidAPI 
let dailyRecipe = recipeFile.getRecipe();
//Send via Twilio message
msgFile.sendMsg(dailyRecipe);