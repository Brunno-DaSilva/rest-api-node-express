import express from 'express';
import patienRouter from "./routes/patientRouter.js"


const app = express();  
const PORT = 3000;

app.use(express.json()); 

app.use('/patients', patienRouter);


app.use((error, req, res,next)=>{
    console.error(error); 
    if(error.message === 'notfound'){
        res.status(400).json({error: "No patient found with the provided ID."})
    }else{
        res.status(500).json({error: "An internal server error occured."})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});