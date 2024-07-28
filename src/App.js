import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Template from "./pages/template";

function App() {
  return <>

    <Routes>
      <Route element={<Template />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>

  </>
}

export default App;
