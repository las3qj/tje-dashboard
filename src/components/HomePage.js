import NavBar from "./NavBar"
import { makeStyles } from '@material-ui/core/styles';
import background from './background.png'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        minHeight: "95vh"
    },
    main: {
        display: "flex",
        flexDirection: "column",
        flex: 5,
        backgroundColor: "black",

    },
    contact: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "lightgrey",
        alignItems: "center",


    },
    image: {
        flex: 1.5,

        backgroundImage: `url(${background})`,
        backgroundSize: "cover",



    },
    mission: {
        flex: 1,

        background: "linear-gradient(to top, #050f5c, #4853ab);"
    },
    card: {
        width: "90%",
        maxHeight: "30vh",
        marginBottom: 20
    },


}));

export default function HomePage() {
    const classes = useStyles();
    return (
        <div>
            <NavBar />
            <div className={classes.container}>
                <div className={classes.main}>
                    <div className={classes.image}>
                        <h1 style={{ fontSize: 68, color: "gold", }}>  Welcome to <br />Thomas Jefferson Elementary School</h1>
                        <h2 style={{ fontSize: 30, color: "white" }}> Home of the Banana Slugs</h2>
                    </div>
                    <div className={classes.mission}>
                        mission statement/ about us
                    </div>
                </div>
                <div className={classes.contact}>
                    <h1> Contact Us</h1>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Location
                            </Typography>
                            <Typography variant="body2" component="p">
                                Thomas Jefferson Elementary School <br />
                                1234 Thomas Jefferson Drive <br />
                                Charlottesville, VA 22901 <br />
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Principal
                            </Typography>
                            <Typography variant="body2" component="p">
                                Camille Cooper <br />
                                camille@joinforge.co <br />
                                555-555-5555 <br />
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Main Office
                            </Typography>
                            <Typography variant="body2" component="p">
                                John Smith <br />
                                john@joinforge.co <br />
                                555-555-5555 <br />
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )

}