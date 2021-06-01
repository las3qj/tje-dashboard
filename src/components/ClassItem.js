import {Card, CardActions, CardContent, Button, Typography, makeStyles} from '@material-ui/core';

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
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {myClass.name}
                    <Button className={classes.classPageButton} onClick={(e)=>e.stopPropagation()} variant="contained">Class Page</Button>
                </Typography>
                <Typography variant="h6" component="h3">
                    {teacherMap[myClass.teacherID].lastName}, {teacherMap[myClass.teacherID].firstName}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ClassItem;