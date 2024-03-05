import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";



function App() {

  const { isAuthenticated, user} = useAuth0();
  return (
    <>
      {isAuthenticated ? (
        <div>
          <h3>Välkommen {user.name}!</h3>
        </div>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default App;
