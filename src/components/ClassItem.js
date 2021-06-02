import {Card, CardContent, Button, Typography, makeStyles} from '@material-ui/core';
import { useHistory } from "react-router-dom";

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

function ClassItem ({myClass, teacherMap, user}) {
    const history = useHistory();
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {myClass.name}
                    <Button className={classes.classPageButton} disabled={!user.admin && user.teacherID!==myClass.teacherID}
                        onClick={(e)=>{
                            history.push("/class-page/"+myClass.id);
                            e.stopPropagation();
                        }} variant="contained">Class Page</Button>
                </Typography>
                <Typography variant="h6" component="h3">
                    {teacherMap[myClass.teacherID].lastName}, {teacherMap[myClass.teacherID].firstName}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ClassItem;