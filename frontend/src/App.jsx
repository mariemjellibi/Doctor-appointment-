import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppointmentForm from './components/patient/AppointmentForm'
import PatientPage from "./pages/PatientPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/rendez-vous' element={<AppointmentForm />} />
        <Route path="/profile/:patientId" element={<PatientPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
