import NavBar from "./NavBar"
import { makeStyles } from '@material-ui/core/styles';
import background from './background.png'
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        minHeight: "95vh"
    },
    main: {
        display: "flex",
        flexDirection: "column",
        flex: 5,
        backgroundColor: "black"
    },
    contact: {
        flex: 1,
        backgroundColor: "blue"
    },
    image: {
        flex: 1.5,

        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        opacity: 0.6,


    },
    mission: {
        flex: 1,
        backgroundColor: "purple"
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

                    </div>
                    <div className={classes.mission}>

                    </div>
                </div>
                <div className={classes.contact}>
                </div>
            </div>
        </div>
    )

}