import './App.css';
import './bootstrap.min.css';
import NavBar from "./NavBar";
import EditNote from "./EditNote";
import {Route, Routes, useNavigate} from "react-router-dom";
import NotesContainer from "./NotesContainer";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {useState} from "react";

export const notes = [
  {
    id: 1,
    title: 'Note 1',
    content: 'Content 1',
    lastChanged: new Date(),
    userId: 1
  }
];

export let setUserId;

let userId;

function App() {
    [userId, setUserId] = useState(null);
    if (!userId && document.location.pathname !== '/login' && document.location.pathname !== '/signup') {
        document.location.href = '/login';
    }
  return (
    <div className="App">
        {userId && <NavBar logOut={() => setUserId(null)}/>}
        <Routes>
          <Route index element={<NotesContainer notes={notes} />} />
          <Route path="/favorites" element={<h1>Hello world</h1>} />
          <Route path={"/notes/:id"} element={<EditNote notes={notes} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
        </Routes>
    </div>
  );
}

export default App;
