import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizHome from "./pages/QuizHome";
import CCNATransportQuiz from "./pages/CCNATransportQuiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizHome />} />
        <Route path="/ccna-transport" element={<CCNATransportQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
