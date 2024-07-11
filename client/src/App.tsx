import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import Page from "./components/Page.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
