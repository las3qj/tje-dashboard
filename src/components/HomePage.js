import NavBar from "./NavBar"
import { makeStyles } from '@material-ui/core/styles';
import background from './background.png'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import slug from "./slug.png"

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
        flex: 1.3,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",

    },
    mission: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
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
                        <h1 style={{ fontSize: 68, color: "gold", }}>  Thomas Jefferson Elementary School</h1>
                        <h2 style={{ fontSize: 30, color: "white" }}> Home of the Banana Slugs</h2>
                    </div>
                    <div className={classes.mission}>
                        <div>
                            values
                         </div>
                        <div>
                            mission statement/ about us
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}