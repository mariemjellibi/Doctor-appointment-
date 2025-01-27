import {serAllAppointments,setUserAppointments,addAppointment,updateAppointment,deleteAppointment} from '../slices/appointmentSlice'
 //action for fetching all appoointments 
export const fetchAllAppointments = () => async (dispatch) => {
    try{
        const response=await fetch('http://localhost:5005/api/appointments')
    }
}