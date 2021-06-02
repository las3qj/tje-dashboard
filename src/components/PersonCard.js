import {Card, Grid, TextField, IconButton, Button} from '@material-ui/core' 
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React,{useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
function PersonCard({personType,person,edit,save,setSave}){

  const [fName,setFName] = useState(person.firstName);
  const [lName,setLName] = useState(person.lastName);
  const [dob,setDOB] = useState(person.birthday);
  const [addr,setAddr] = useState(person.address);
  const [number,setNumber] = useState(person.phone);
  const [classList,setClassList] = useState([]);
  

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
  })

  const removePerson=(()=>{
    if(personType==="teacher"){
      fetch("http://localhost:8000/teachers?"+"id="+person.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(()=>{window.location.reload();})
    }
    else{
      fetch("http://localhost:8000/students?"+"id="+person.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(()=>{window.location.reload();})
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
        saveChanges();
        setSave(false);
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
              console.log(result)
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
              <Popup contentStyle={{height: "100px",width: "300px"}} trigger={<Button>Contact Info</Button>} position="right center">
                <div>
          {edit?(<TextField onChange={(evt)=>{
          setNumber(evt.target.value)
          }} id="outlined-basic" label="Phone Number" size="small" variant="outlined" defaultValue={number}/>):<p>{person.phone===undefined?"Phone Number Unavailable":("Phone Number: "+number)}</p>}
          {edit&&<br/>}
          {edit&&<br/>}
          {edit?(<TextField onChange={(evt)=>{
          setAddr(evt.target.value)
          }} id="outlined-basic" label="Addressr" size="small" variant="outlined" defaultValue={addr}/>):<p>{person.address===undefined?"Address Unavailable":("Address: "+addr)}</p>}
                </div>
              </Popup>
            </Grid>
            <Grid item xs={edit?4:5}>
              <p style={{textAlign:"center",fontSize:18}}>{formatClasses(person.classes)}</p>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={()=>{
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