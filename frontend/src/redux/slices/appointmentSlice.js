import { createSlice } from "@reduxjs/toolkit";
const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
   allAppointments:[],//for the doctor dashboard
   userAppointments:[], //for the patient dashboard
  },
  reducers: {
    // get all appointments
    setAllAppointments(state,action) {
     state.allAppointments=action.payload;
    },
    setUserAppointments(state,action) {
     state.userAppointments=action.payload;
    },
    addAppointment(state,action) {
     state.userAppointments.push(action.payload);
     state.allAppointments.push(action.payload);
    },
    updateAppointment(state,action) {
    const {id,updatedData}=action.payload;
    const appointmentIndex = state.userAppointments.findIndex((appointment) => appointment._id === id);
    if(appointmentIndex !== -1) {
        //...state :this means we are copying the previous state
      state.userAppointments[appointmentIndex] = {...state.userAppointments[appointmentIndex], ...updatedData};
    }
    //update in userAppointments
    const appointmentIndex2 = state.allAppointments.findIndex((appointment) => appointment._id === id);         
    if(appointmentIndex2 !== -1) {
      state.allAppointments[appointmentIndex2] = {...state.allAppointments[appointmentIndex2], ...updatedData};
    }
    },
    deleteAppointment(state,action) {
     const {id}=action.payload;
     state.userAppointments=state.userAppointments.filter((appt)=>appt.id!==id);
     state.allAppointments=state.allAppointments.filter((appt)=>appt.id!==id );
    
    }
   
}});
export const { setAllAppointments, setUserAppointments, addAppointment, updateAppointment, deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
//le reducer qui contient tout les actions 