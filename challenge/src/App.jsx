import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";


function App(){
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/Cadastro' element={<Cadastro/>}/>
      <Route path='/Dashboard' element={<h1>Dashboard</h1>}/>
      <Route path='*' element={<h1>Not Found</h1>}/>
    </Routes>
   </BrowserRouter>
  )

}

export default App;