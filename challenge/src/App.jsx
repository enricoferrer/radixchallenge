import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";

function App(){
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/Cadastro' element={<Cadastro/>}/>

      <Route path='/Dashboard' element={
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <Dashboard />
          </div>
        }/>

      <Route path='*' element={<h1>Not Found</h1>}/>
    </Routes>
   </BrowserRouter>
  )

}

export default App;