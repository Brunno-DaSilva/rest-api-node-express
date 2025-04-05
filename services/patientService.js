// Extract the business logic and turn them into service functions

import {readData, generateUniqueId, writeData} from '../helpers.js'
 

const getPatientById = async (patientID) => {

    const patients =  await readData()
    const patient = patients.find(patient => patient.id === patientID)
    if(!patient) throw new Error(`Patiant ID Not Found: ${patientID}`)
    return patient;
}

const getAllPatients = async () =>{
    const results =  await readData()
    return results
}

const createNewPatient = async (patient)=>{
    const patients = await readData(); 
    const newID = await generateUniqueId()

    const newPatient = { id: newID, ...patient   }

    patients.push(newPatient)
    await writeData(patients)
    return newPatient
}

const updatePatient = async (id, newPatientData) =>{
    let patients = await readData();
    const index = patients.findIndex(patient => patient.id === id);

    if(index !== -1){
        patients[index] = {id: patients[index].id, ...newPatientData};
        await writeData(patients);
        return patients[index]
    }else{
        throw new Error('notfound')
    }
}


const deletePatient = async (id) =>{
    let patients = await readData();
    const originalLength = patients.length; 

    patients = patients.filter(patiend => patiend.id !== id);

    if(originalLength === patients.length){
        throw new Error('notfound')
        
    }
    await writeData(patients)
}

export {
    getPatientById,
    getAllPatients,
    createNewPatient,
    updatePatient,
    deletePatient
}