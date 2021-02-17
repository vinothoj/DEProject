const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
SECRET_KEY = "thisismysecretkey";
var dbconfig = require('../config/db')
const common = require('../controller/common-Controller')

//Users Master
router.get('/Users',(req,res,err)=>{
  let data=req.query
  let cond=""
  let param=[]
  if(req.query.id==undefined)
  {
    cond=" and id=?"
    param=[data.id]
  }
  if(req.query.email==undefined)
  {
    cond=" and Email=?"
    param=[data.email]
  }
  common.QueryExecute("select * from tblusers where isActive<>0"+cond,param).then(result=>{
    res.json(result);
  }).catch(err=>{
    res.json(err)
  })
});

router.post('/Users/Add',(req,res,err)=>{
  let val=req.body;
  let todate=common.todaydate();  
  let qry="INSERT INTO `tblusers` (`Name`, `Email`, `Password`, `isActive`, `Sdate`) VALUES (?, ?, ?, ?, ?);"
  let param=[val.username,val.email,val.password,1,todate]

  common.QueryExecute(qry,param).then(result=>{
    let id=result.data.insertId
    common.LogData(val.userid,'Users',id,'Add').then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

router.post('/Users/Update',(req,res,err)=>{
  let val=req.body;
  let qry="Update `tblusers` set `Name`=?, `Email`=?, `Password`=?, `Country`=?, `Fullname`=?, `Address1`=?, `Address2`=?, `Address3`=?, `City`=?, `State`=?, `Zipcode`=?, `Mobile`=?, `HearAbout`=?, `PrimaryReason`=?, `WorkerID`=? where id=?"
  let param=[val.username,val.email,val.password,val.country,val.fullname,val.address1,val.address2,val.address3,val.city,val.state,val.zipcode,val.mobile,val.hearabout,val.primaryreason,val.workerid,val.id]
  if(val.action==='worker') {
    qry ="Update `tblusers` set `Country`=?, `Fullname`=?, `Address1`=?, `Address2`=?, `Address3`=?, `City`=?, `State`=?, `Zipcode`=?, `Mobile`=?, `HearAbout`=?, `PrimaryReason`=? where id=?"
    param=[val.country,val.fullname,val.address1,val.address2,val.address3,val.city,val.state,val.zipcode,val.mobile,val.hearabout,val.primaryreason,val.id]
  }
  else if(val.action==='del') {
    qry ="Update Users set isActive=0 where id=?"
    param=[val.id]
  }
    
  common.QueryExecute(qry,param).then(result=>{
    common.LogData(val.userid,'Users',val.id,val.action).then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

router.post("/login", (req, res)=> {
  let val=req.body
  let cond=" and PASSWORD=? and (phoneno=? or email=?)"
  let param=[val.password,val.username,val.username]
  let resMsg={}
  common.QueryExecute("select * from tblemployees where isActive<>0"+cond,param).then(result=>{
    if(result.data.length>0)
    {
      let userdata=result.data[0]
      resMsg.userid=userdata.employeeserial
      resMsg.usertype=userdata.designation
      resMsg.username=userdata.employeename
      resMsg.usermobno=userdata.phoneno
      resMsg.useremail=userdata.email

      var token = jwt.sign({ data: resMsg }, SECRET_KEY, { expiresIn: "86400s" });
      res.json({status:'success',token:token, data:resMsg});
    } 
    else res.json({status:'failed',data:'Email/Password not exist..!!'})
  }).catch(err=>{
    console.log(err)
  })      
});

function EmployeeSerial(){
    let qry="select ifnull(max(employeeserial),0)+1 as id from tblemployees";
    return common.QueryExecuteWOT(qry).then(res=>{
        return res.data[0].id;
      }).catch(err=>{
        console.log(err)
      })
  }

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

function verifyToken(req,res,next) {
    const header=req.headers['auth'];
    if(typeof header!=='undefined')
    {
      req.token=header;
      next();
    }
    else
    {
      res.json({status:'failed',data:'Token failed'});
    }
  }
module.exports = router;
