import {Route, Routes} from "react-router-dom";
import {AnonymousPage} from "./pages/Anonymous.tsx";
import Dashboard from "@/pages/Dashboard.tsx";


export default function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<AnonymousPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </>
  )
}

