import { Card, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
function PersonCard({ person, edit, save }) {

    const [newFName, setNewFName] = useState(null);
    const [newLName, setNewLName] = useState(null);
    const [newDOB, setNewDOB] = useState(null);
    /*
      const saveChanges = (()=>{
        fetch("http://localhost:8000/teachers", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({title,newAuthor})
        })
    
      })
      */



    const formatClasses = ((classes) => {
        if (classes) {
            let result = "";
            let x = 0;
            for (x = 0; x < classes.length; x++) {
                if (x === 0) {
                    result = classes[x];
                }
                else {
                    result = result + ", " + classes[x];
                }
            }
            return result;
        }
        else {
            return "No Classes Taught"

        }
    })

    return (<div style={{ padding: 2, justifyContent: "center" }}>
        <Card elevation="2" style={{ width: '90vw', height: '5vw' }}>
            <Grid container item xs={12} spacing={1}>
                <Grid item xs={2}>
                    {edit ? (
                        <div style={{ paddingTop: 12, paddingLeft: 10 }}>
                            <TextField id="outlined-basic" label="Last Name" size="small" variant="outlined" value={person.lastName} />
                        </div>) : <p style={{ textAlign: "center", fontSize: 18 }}>{person.lastName}</p>}
                </Grid>
                <Grid item xs={2}>
                    {edit ? (
                        <div style={{ paddingTop: 12, paddingLeft: 10 }}>
                            <TextField id="outlined-basic" label="First Name" size="small" variant="outlined" value={person.firstName} />
                        </div>) : <p style={{ textAlign: "center", fontSize: 18 }}>{person.firstName}</p>}
                </Grid>
                <Grid item xs={2}>
                    {edit ? (
                        <div style={{ paddingTop: 12, paddingLeft: 10 }}>
                            <TextField id="outlined-basic" label="Date of Birth" size="small" variant="outlined" value={person.birthday} />
                        </div>) : <p style={{ textAlign: "center", fontSize: 18 }}>{person.birthday}</p>}
                </Grid>
                <Grid item xs={6}>
                    <p style={{ textAlign: "center", fontSize: 18 }}>{formatClasses(person.classes)}</p>
                </Grid>
            </Grid>
        </Card>
    </div>)
}
export default PersonCard;