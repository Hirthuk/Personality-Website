import express from "express"; //Importing necessary modules
import ejs from "ejs";
import axios from "axios";
import path from "path"

const app = express();
const port = 3000;
const __dirname = process.cwd(); //In the new version of node to get the current working directory path
app.use(express.static("public")); //Declaring the static files content using express



app.get("/", (req,res) => { //Root route to get the index.html file
    res.sendFile(__dirname+ "/views/index.html")
})
console.log(__dirname);

// API Call code to get random meme from reddit using Meme API and render it in getMeme.js

    app.get("/getMeme", async(req,res) => {
        try{
            const jsonResponse = await axios.get("https://meme-api.com/gimme");
            
            // console.log(jsonResponse)
            const result = jsonResponse.data.postLink;
            res.render(__dirname+ "/views/getMeme.ejs",{
            content: result
            });
            console.log(result);
        }
        catch(error){
            console.log(error);
        }
        
    })

    // Api call to get inspirational/or motivational course.
    app.get("/getQuote", async(req,res) => {
        try {
            const jsonResponse = await axios.get("https://quote-garden.onrender.com/api/v3/quotes");
            const randomNumber = Math.floor(Math.random()*(10)+ 1);
            let result = jsonResponse.data.data[randomNumber].quoteText;

            res.render(__dirname+ "/views/getQuotes.ejs",{
                content: result
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    })
    // API Call to getAdvice from the public api
    app.get("/getAdvice", async(req,res) => {
        try {
            const jsonResponse = await axios.get("https://api.adviceslip.com/advice");
            let result = jsonResponse.data.slip.advice; 
            //Note down when fecthing particular data from a json object jsonreponse.data.path
            // Here data must to get through the data
            res.render(__dirname+ "/views/getAdvice.ejs",{
                content: result
            }
            )
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    })

    // API Call to get programming quotes
    app.get("/getProgrammingQuote",async(req,res) => {
        try {
            const jsonResponse = await axios.get("https://programming-quotesapi.vercel.app/api/random");
            const result = jsonResponse.data.quote;
            res.render(__dirname+"/views/getProgrammingquotes.ejs",{
                content: result
            })
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    })


app.listen(port, () => { //Server listening in port 3000
    console.log("server running in port 3000");
})