import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Adminlogin from "../pages/adminlogin";
import Homepage from "../pages/homepage";
import StudentRegister from "../pages/studreg";
import Adminpanel from "../pages/adminpanel";

export default function Routing(){
    return(
        <Router>
<Routes>
    <Route path="/*" element={<Homepage/>}/>
    <Route path="adminlogin" element={<Adminlogin/>}/>
    <Route path="studreg" element={<StudentRegister/>}/>
    <Route path="adminpanel/*" element={<Adminpanel/>}/>
</Routes>
        </Router>
    )
}