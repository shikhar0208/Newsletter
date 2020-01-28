const path = require('path')
const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
// b72947b6a5c7ac0c14d6a13b34fb437b-us4
// ea4bf39151
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html') 
})

app.post('/', (req, res) => {
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email

    const data = {
        members: [
          {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
          }
        ]
    }

    const jsonData = JSON.stringify(data)

    const options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/ea4bf39151',
        method: "POST",
        headers: {
            "Authorization": "shikhar0208 b72947b6a5c7ac0c14d6a13b34fb437b-us4"
        },
        body: jsonData
    }

    request(options,(error, response, body) => {
        if(error){
            res.sendFile(__dirname + '/failure.html')
        }
        else{
            if(response.statusCode===200){
                res.sendFile(__dirname + '/success.html')
            }
            else{
                res.sendFile(__dirname + '/failure.html')
            }
        }
    })

})

app.post('/failure', (req, res)=> {
    res.redirect('/')
})

app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})