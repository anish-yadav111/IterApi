const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

var cookie,registerationid;
app.post('/', (req,res) => {
      axios.post('https://136.233.14.3:8282/CampusPortalSOA/login',req.body,{withCredentials: true}).then((response) => {
        console.log(response)
        // console.log(response.headers['set-cookie'][0])
        cookie = response.headers['set-cookie'][0];
        
        if(response.data.status != "error")
              getRegistration(res)
        else 
            res.send(response.data)
        
      }).catch(err => {throw err} ) 

      
     
    
})


const getRegistration = (res) => {
   axios.post('http://136.233.14.3:8282/CampusPortalSOA/studentSemester/lov',{
    withCredentials: true
  },{headers : {
    Cookie :cookie
  }})
   .then(function (response) {
     
      registerationid = response.data.studentdata[0].REGISTRATIONID

      getAttendance(res)
      
      // res.send(response.data.studentdata)
    
  })
  .catch(function (error) {
  });
}

const getAttendance = (res) => {
     axios.post('http://136.233.14.3:8282/CampusPortalSOA/attendanceinfo/',{
      "registerationid":registerationid
      },{headers : {
        Cookie :cookie
      }}).then((response) => {
      // console.log(response.data.griddata)
      res.send(response.data)
    }) .catch(function (error) {
    });
}





app.get('/', (req,res) => {
    res.json("Hello World");
})

var PORT =  process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server Started")
})

module.exports =app