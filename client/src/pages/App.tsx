import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton"


function App() {
 
  const {isAuthenticated} = useAuth0()
  return (
    <>
     <h1>Startsidan</h1>
     {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
     
    </>
  )
}

export default App
