import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import ResultView from "./components/ResultView";
import RecipeView from "./components/RecipeView";

// test test

function App() {
  return (
    <div className="App">
      <ResultView />
      {/* 
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/resultView" element={<ResultView />} />
        <Route path=":id" element={<RecipeView />} />
      </Routes> */}
    </div>
  );
}

export default App;
