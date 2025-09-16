import {Route, Routes} from "react-router-dom";
import {AnonymousPage} from "./pages/Anonymous.tsx";


export default function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<AnonymousPage />} />
        </Routes>
    </>
  )
}

