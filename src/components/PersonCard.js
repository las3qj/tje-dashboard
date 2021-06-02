import {Card, Grid, TextField, IconButton, Button} from '@material-ui/core' 
import { CodeSharp, PinDropSharp } from '@material-ui/icons';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React,{useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
function PersonCard({personType,person,edit,save,setEdit,setSave,reload}){

  const [fName,setFName] = useState(null);
  const [lName,setLName] = useState(null);
  const [dob,setDOB] = useState(null);
  const [addr,setAddr] = useState(null);
  const [number,setNumber] = useState(null);
  const [classList,setClassList] = useState([]);

  useEffect(()=>{
    setFName(person.firstName)
    setLName(person.lastName)
    setDOB(person.birthday)
    setAddr(person.address)
    setNumber(person.phone)
  })


  const saveChanges = (()=>{
    const firstName = fName;
    const lastName = lName;
    const birthday = dob;
    const id=person.id;
    const classes = person.classes;
    const address = addr;
    const phone = number;

    if(personType==="teacher"){
      fetch("http://localhost:8000/teachers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id,firstName,lastName,birthday,classes,address,phone})
      })
    }
    else{
      fetch("http://localhost:8000/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id,firstName,lastName,birthday,classes})
      })
    }
    return true;
  })

  const removePerson=(()=>{
    if(personType==="teacher"){
      fetch("http://localhost:8000/teachers?"+"id="+person.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(()=>{reload()})
    }
    else{
      fetch("http://localhost:8000/students?"+"id="+person.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(()=>{reload()})
    }
  })

  useEffect(()=>{
    fetch("http://localhost:8000/classes")
      .then((resp) => {
          return resp.json();
          })
          .then((obj) => {
              setClassList(obj);
          })

  },[])
  

  useEffect(()=>{
      if(save===true){
        console.log("here")
        saveChanges();
        console.log("here2")
        setEdit(false);
        setSave(false);
        console.log("here3")
      }
  })

    const formatClasses = ((classes)=>{
            if(classes){
              let result = "";
              let x = 0;
              for(x=0;x<classes.length;x++){
                if(x===0){
                  for(let y=0;y<classList.length;y++){
                    if(classList[y].id===classes[x]){
                      result=classList[y].name
                    }  
                  }
                }
                else{
                  for(let y=0;y<classList.length;y++){
                    if(classList[y].id===classes[x]){
                      result = result+", "+classList[y].name;
                    }  
                  }
                }
              }
              return result;
            }
            else{
              return "No Classes"
      
            }
        })

    return(<div style={{padding:2,justifyContent:"center"}}>
            <Card elevation="2" style={{width: '90vw',height: '5vw'}}>
            <Grid container item xs={12} spacing={1}>
            <Grid item xs={2}>
              {edit?(
              <div style={{paddingTop:12,paddingLeft:10}}>
              <TextField  onChange={(evt)=>{
              setLName(evt.target.value)
              }} 
              id="outlined-basic" label="Last Name" size="small" variant="outlined" defaultValue={lName}/>
              </div>):<p style={{textAlign:"center",fontSize:18}}>{lName}</p>}
            </Grid>
            <Grid item xs={2}>
              {edit?(
              <div style={{paddingTop:12,paddingLeft:10}}>
              <TextField onChange={(evt)=>{
              setFName(evt.target.value)
              }} id="outlined-basic" label="First Name" size="small" variant="outlined" defaultValue={fName}/>
              </div>):<p style={{textAlign:"center",fontSize:18}}>{fName}</p>}
            </Grid>
            <Grid item xs={2}>
              {edit?(
              <div style={{paddingTop:12,paddingLeft:10}}>
              <TextField onChange={(evt)=>{
          setDOB(evt.target.value)
          }} id="outlined-basic" label="Date of Birth" size="small" variant="outlined" defaultValue={dob}/>
              </div>):<p style={{textAlign:"center",fontSize:18}}>{dob}</p>}
            </Grid>
            <Grid item xs={1}>
              <Popup contentStyle={edit?{height: "17%",width: "30%"}:{height: "15%",width: "30%"}} trigger={<Button>Contact Info</Button>} position="right center">
                <div style={{padding:5}}>
          {edit?(<TextField onChange={(evt)=>{
          setNumber(evt.target.value)
          }} id="outlined-basic" label="Phone Number" size="small" variant="outlined" defaultValue={number}/>):<p>{person.phone===undefined?"Phone Number Unavailable":("Phone Number: "+number)}</p>}
          {edit&&<br/>}
          {edit&&<br/>}
          {edit?(<TextField onChange={(evt)=>{
          setAddr(evt.target.value)
          }} id="outlined-basic" label="Address" size="small" variant="outlined" defaultValue={addr}/>):<p>{person.address===undefined?"Address Unavailable":("Address: "+addr)}</p>}
                </div>
              </Popup>
            </Grid>
            <Grid item xs={edit?4:5}>
              <p style={{textAlign:"center",fontSize:18}}>{formatClasses(person.classes)}</p>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={(e)=>{
                e.preventDefault();
                removePerson();
              }}>
                <HighlightOffIcon/>
              </IconButton>
            </Grid>
            </Grid>
            </Card>
        </div>)
}
export default PersonCard;
