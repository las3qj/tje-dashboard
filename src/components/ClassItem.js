import {Card, CardContent, Button, Typography, makeStyles, Tooltip} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "100%",
      paddingLeft: 25,
    },
    classPageButton: {
      margin: '0 20px',
    },
  });

function ClassItem ({myClass, teacherMap}) {
    const history = useHistory();
    const classes = useStyles();
    const { role, id } = useContext(UserContext);

    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {myClass.name}
                    <Tooltip 
                        title={"Only "+teacherMap[myClass.teacherID].firstName+" "+teacherMap[myClass.teacherID].lastName+
                            " and administrators can see this class page."} 
                        disableFocusListener={role==="admin" || (role==="teacher" && id===myClass.teacherID)} 
                        disableHoverListener={role==="admin" || (role==="teacher" && id===myClass.teacherID)} 
                        disableTouchListener={role==="admin" || (role==="teacher" && id===myClass.teacherID)} arrow>
                        <span>
                            <Button className={classes.classPageButton} 
                                disabled={role === "none" || (role !== "admin" && id!==myClass.teacherID)}
                                onClick={(e)=>{
                                    history.push("/class-page/"+myClass.id);
                                    e.stopPropagation();
                                }} variant="contained">Class Page</Button>
                        </span>
                    </Tooltip>
                </Typography>
                <Typography variant="h6" component="h3">
                    {teacherMap[myClass.teacherID].lastName}, {teacherMap[myClass.teacherID].firstName}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ClassItem;