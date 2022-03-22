import { Routes, BrowserRouter, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Altyn from './Altyn.js';
import IDOhelp from './IDOhelp.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Altyn/>} />
          <Route exact path="/IDOhelp" element={<IDOhelp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
