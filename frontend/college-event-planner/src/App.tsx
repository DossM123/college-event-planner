import './App.css'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import MyEvents from './components/EventPage/MyEvents'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from './pages/Events'
import Logout from './components/LoginPage/Logout'
import Reminder from './components/EventPage/Reminder'
import EventList from './components/EventPage/EventList';

function App() {
  const storedUserId = localStorage.getItem('user_id');
  const userId = storedUserId ? parseInt(storedUserId) : null;
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/events' element={<Events/>} />
            <Route path='/myevents' element={<MyEvents userId={userId}/>} />
            <Route path="/logout" element={<Logout />} />
            <Route path='/event/reminder' element={<Reminder/>} />
            <Route path='/event-list' element={<EventList/>} />
          </Routes>
        </Router>

        </div>
  )
};

export default App;
