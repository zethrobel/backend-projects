

const express= require("express")
const bodyParser=require("body-parser")
const request= require("request")
const https=require("https")

const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("LocalFol"))
app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html")
})
app.post("/",function(req,res){
    let FirstName= req.body.firstName
    let LastName= req.body.lastName
    let Email=req.body.email 
    let data={
        members:[
            {
                email_address: Email,
                status: "subscribed",
                merge_fields:{
                    FNAME:FirstName,
                    LNAME:LastName
                }

            }
        ]
    }
    let jasonData= JSON.stringify(data)
    const url="  https://us18.api.mailchimp.com/3.0/lists/ec8ea9c575"
    const option={
        method:"POST",
        auth:"Roba:af05e5d2f2c8fa2182722fce51ba41be2-us18"
    }
    let requests=https.request(url,option,function(response){
        response.on("data",function(data){
          if(response.statusCode===200){
           
           res.sendFile(__dirname+"/success.html")
            
          }
          else{
            res.sendFile(__dirname+"/failure.html")
          }
        })
    })
    requests.write(jasonData)
    requests.end() 
})
app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(3000,function(){
    console.log("port 3000 is ready to take the stage.")
})
