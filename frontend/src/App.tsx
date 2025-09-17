import {Route, Routes} from "react-router-dom";
import {AnonymousPage} from "./pages/Anonymous.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import UserProfile from "@/pages/UserProfile.tsx";


export default function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<AnonymousPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-settings" element={<UserProfile />} />
        </Routes>
    </>
  )
}

