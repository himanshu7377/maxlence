import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import './index.css'
import './App.css'
function App() {
  return (
    <BrowserRouter>

<Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/verifyemail/:token" element={<VerifyEmail/>} />
      {/* Other routes */}
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
