const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config()
const app = express();
const port = 3001;

//config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//create route
app.post("/request", (req, res) => {
    let {title, description, contacts} = req.body;

    for(let i = 0; i < contacts.length; i++){
        const options = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + process.env.APIKEY
            },
            body: JSON.stringify({
              "message": {
                "to": {
                  "email": contacts[i].email,
                  "phone_number": contacts[i].phone
                },
                "content": {
                  "title": title,
                  "body": description
                },
                "routing":{
                  "method":"all",
                  "channels": ["sms", "email"]
                }
              }
            })
          };
          
          fetch('https://api.courier.com/send', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
})

app.listen(port, () => {
    console.log("Server started on port " + port);
})