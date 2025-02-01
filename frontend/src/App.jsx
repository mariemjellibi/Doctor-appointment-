import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppointmentForm from './components/patient/AppointmentForm'
import PatientPage from "./pages/PatientPage"
import ProtectedDoctorRoute from './components/ProtectedDoctorRoute';
import DoctorPage from './pages/DoctorPage';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/rendez-vous' element={<AppointmentForm />} />
        <Route path="/profile/:patientId" element={<PatientPage />} />
        <Route element={<ProtectedDoctorRoute />}>
          <Route path="/doctor/" element={<DoctorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
