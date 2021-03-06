import NavBar from "./NavBar"
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
        minHeight: "135vh",
        maxWidth:"100vw"
    },
    main: {
        display: "flex",
        flexDirection: "column",
        flex: 6,
        backgroundColor: "black",
        maxWidth:"100vw"

    },
    icon: {
        width: 57,
        paddingLeft: 50,
        paddingRight: 20,

    },
    image: {
        flex: 1.3,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        maxWidth:"100vw"

    },
    mission: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to top, #2E3B55, #6c7fa6);",
        maxWidth:"100vw"


    },
    value: {
        display: "flex",
        maxWidth:"100vw"
    }



}));

export default function HomePage() {
    document.body.style='background:#2E3B55;';
    const classes = useStyles();
    return (
        <div>
            <NavBar />
            <div className={classes.container} style={{marginTop:"-20px"}}>
                <div className={classes.main}>
                    <div className={classes.image}>
                        <h1 style={{ fontSize: 68, color: "#FDFD96", fontStyle: "italic", marginBottom:"-20px" }}>  Thomas Jefferson Elementary School</h1>
                        <h2 style={{ fontSize: 30, color: "white" }}> Home of the Banana Slugs</h2>
                    </div>
                    <div className={classes.mission}>

                        <div style={{ display: "flex", flexDirection: "column", flex: 1, margin:"auto ",alignItems:"center",fontSize: "1.8vw", color: "#FDFD96", paddingTop:"3vh"}}>

                            <h2 style={{ fontSize: "3vw", color: "white",textAlign:"center",fontWeight:"bold",marginBottom:"30px"}}>These Are Our Values.</h2>
                            <div className={classes.value}>
                               <img className={classes.icon} src={positivity} alt="Positivity" />
                                <mark style={{background:"none",fontWeight:"200",color:"#FDFD96",paddingTop:"12px"}}>Positivity</mark>
                                <img className={classes.icon} src={respect} alt="Respect" />
                                <mark style={{background:"none",fontWeight:"200",color:"#FDFD96",paddingTop:"12px"}}>Respect</mark>
                                <img className={classes.icon} src={diversity} alt="Diversity"/>
                                <mark style={{background:"none",fontWeight:"200",color:"#FDFD96",paddingTop:"12px"}}>Diversity</mark>
                                <img className={classes.icon} src={education} alt="Education"/>
                                <mark style={{background:"none",fontWeight:"200",color:"#FDFD96",paddingTop:"12px"}}>Education</mark>
                                <img className={classes.icon} src={comradery} alt="Comradery"/>
                                <mark style={{background:"none",fontWeight:"200",color:"#FDFD96",paddingTop:"12px"}}>Comradery</mark>
                            </div>
                        </div>
                        <div style={{ flex: 1, fontSize: "1.8vw", color: "#FDFD96", paddingLeft: 200, paddingRight: 200, textAlign:"center", fontWeight:"200"}} >
                            <h2 style={{ fontSize: "3vw", color: "white", fontStyle: "normal", textAlign:"center", fontWeight:"bold"}}>We're on a Mission.</h2>
                           "At Thomas Jefferson Elementary School, we are a diverse community of global citizens and lifelong learners that lead by example. We believe in the power of positivity, respect, and cooperation. We manifest our potential through confidence and work ethic."
                         </div>
                         <br/>
                         <h1 style={{marginBottom:"-100px",color:"white",fontFamily:"Times New Roman"}}>. . .</h1>
                    </div>
                </div>
            </div>
            <Footer />
    </div>
    );
}
