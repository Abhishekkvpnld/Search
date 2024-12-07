import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";


const App = () => {


  return (
    <Router>
      <Routes>
        <Route element={<Search />} path="/" />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App;