import {Box, Grid} from '@material-ui/core'
function Footer(){

    return(
        <footer style={{marginTop: "180px"}}>
        <Box style={{backgroundColor:'#2E3B55'}}>
            <Grid style={{paddingTop:"1%",paddingBottom:"2%"}}container item xs={12} spacing={1}>
            <Grid item xs={4} style={{paddingTop:"1.5%"}}>
            <div style={{paddingLeft:"8%"}}>
            <h1 style={{color:"white",textAlign:"left",marginBottom:"-20px"}}>We are</h1>
            <h1 style={{color:"#FDFD96",textAlign:"left",marginBottom:"-5px"}}>Thomas Jefferson Elementary School.</h1>
            <p style={{color:"white",fontSize:"1vw",textAlign:"left"}}>Home of the <mark style={{fontWeight:"bold",background: "none",color:"white"}}>Banana Slugs.</mark></p>
            </div>
            </Grid>
            <Grid item xs={4}>
                <div style={{paddingLeft:40}}>
                <h1 style={{marginBottom:"-10px"}}>🌎 📖 🏆</h1>
                <h4 style={{color:"#FDFD96",marginBottom:"-3px",fontSize:15.2}}>Positivity. Respect. Diversity. Education. Comradery.</h4>
                <p style={{color:"white",fontSize:"0.8vw",textAlign:"justify"}}>At Thomas Jefferson Elementary School, we are a diverse community of global citizens and lifelong learners that lead by example. We believe in the power of positivity, respect, and cooperation. We manifest our potential through confidence and work ethic.</p>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div style={{textAlign:"right",paddingRight:"8%"}}>
                    <h4 style={{color:"#FDFD96",marginBottom:"-8px"}}>Contact the Principal ☎️</h4>
                    <p style={{color:"white",fontSize:"1vw",marginBottom:"-5px",fontWeight:"600"}}>Camille Cooper</p>
                    <p style={{color:"white",fontSize:"0.8vw"}}>camillecooper@tjes.edu <br/>(434)-293-4402 ext 100</p>
                    <h4 style={{color:"#FDFD96",marginBottom:"-3px"}}>Address 🗺</h4>
                    <p style={{color:"white",fontSize:"0.8vw"}}>1609 University Ave <br/>Charlottesville, VA 22903 <br/>(434)-293-4402</p>
                </div>
            </Grid>
            </Grid>
        </Box>
        </footer>
    )

}
export default Footer;