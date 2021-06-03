import NavBar from "./NavBar"
import AppBar from '@material-ui/core/AppBar';
import Footer from "./Footer.js"
import { makeStyles } from '@material-ui/core/styles';
import background from './background.png'
import respect from "./homePageIcons/respect.png"
import positivity from "./homePageIcons/positivity.png"
import diversity from "./homePageIcons/diversity.png"
import education from "./homePageIcons/education.png"
import comradery from "./homePageIcons/comradery.png"


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
    icon: {
        width: 57,
        paddingLeft: 75,
        paddingRight: 20,

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
        background: "linear-gradient(to top, #172136, #505f7d);"


    },
    value: {
        display: "flex"
    }



}));

export default function HomePage() {
    const classes = useStyles();
    return (
        <div>
            <NavBar />
            <div className={classes.container}>
                <div className={classes.main}>
                    <div className={classes.image}>
                        <h1 style={{ fontSize: 68, color: "gold", fontStyle: "italic", }}>  Thomas Jefferson Elementary School</h1>
                        <h2 style={{ fontSize: 30, color: "white", fontStyle: "italic", }}> Home of the Banana Slugs</h2>
                    </div>
                    <div className={classes.mission}>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, fontSize: 40, color: "gold" }}>

                            <h2 style={{ fontSize: 30, color: "white" }}> Our Values</h2>
                            <div className={classes.value}>
                                <img className={classes.icon} src={positivity} />
                                     Positivity
                                <img className={classes.icon} src={respect} />
                                     Respect
                                <img className={classes.icon} src={diversity} />
                                     Diversity
                                <img className={classes.icon} src={education} />
                                     Education
                                <img className={classes.icon} src={comradery} />
                                     Comradery

                            </div>
                        </div>
                        <div style={{ flex: 1, fontSize: 30, color: "gold", paddingLeft: 50, paddingRight: 50, fontStyle: "italic", }} >
                            <h2 style={{ fontSize: 30, color: "white", fontStyle: "normal", }}> Our Mission</h2>
                           At Thomas Jefferson Elementary School, we are a diverse community of global citizens and lifelong learners that lead by example. We believe in the power of positivity, respect, and cooperation. We manifest our potential through confidence and work ethic.

                         </div>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )

}