import './App.css';
import './bootstrap.min.css';
import NavBar from "./NavBar";
import EditNote from "./EditNote";
import {Route, Routes} from "react-router-dom";

export const mockNotes = [
  {
    id: 1,
    title: 'Note 1',
    content: 'Content 1',
    lastChanged: new Date(),
    userId: 1
  }
];

export const mockUsers = [
  {
    id: 1,
    name: 'User 1',
    email: 'mock@email.com',
    password: '123456',
    isAdmin: true
  }
];

function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route index element={<EditNote note={mockNotes[0]} />} />
          <Route path="/favorites" element={<h1>Hello world</h1>} />
        </Routes>
    </div>
  );
}

export default App;
