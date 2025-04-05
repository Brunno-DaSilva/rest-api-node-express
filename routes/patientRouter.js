import express from "express"
import { getPatientById, getAllPatients, createNewPatient, updatePatient, deletePatient } from '../services/patientService.js';

const router = express.Router()


router.get('/', async (req, res, next)=>{
    try{
        const patients =  await getAllPatients()
        res.json(patients);
        res.status(200).json(patients)

    }catch(error){
        console.log(`App failed with the ERROR: ${error} `);
        next(error)
    }
});


router.get('/:id', async (req, res, next)=>{
    try{
        const patientID = req.params.id;
        const patient =  await getPatientById(patientID)

        if(!patient){
            console.error(`Patient ID not found: ${patientID}`)
            return res.status(404).json({error:"404 Patient not Found"})  
        } 
        res.status(200).json(patient);
    }catch(error){
        console.log(`App failed with the ERROR: ${error} `);
        next(error)
    }
});


router.post('/', async (req, res, next)=>{
    try{
        const patient = await createNewPatient(req.body)
        res.status(201).json(patient)

        if(!patient){
            console.error(`Patient ID not found: ${patientID}`)
            return res.status(404).json({error:"404 Patient not Found"})  
        } 
    }catch(error){
        next(error)
    }
})


router.put('/:id', async (req, res,next)=>{
    try{
        const patientID = req.params.id;
        const body = req.body;
        const updatePatientById =  await updatePatient(patientID, body)
        res.status(200).json(updatePatientById)

    }catch(error){
        next(error)
    }
});


router.delete("/:id", async(req,res,next)=>{
try{
    const patientID = req.params.id;
    await deletePatient(patientID)
    // 204 Update successfull, no content to post back to the client. 
    res.status(204).end()
}catch(error){
    next(error);
} 
    
})

export default router;