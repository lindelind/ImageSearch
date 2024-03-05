import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import { useState } from "react";
import axios from "axios";

export interface User {
  isAuthenticated: boolean;
  user?: {
    name: string;
  }
}

export interface SearchResultData {
  title: string;
  snippet: string;
  link: string;
}

function App() {
  const { isAuthenticated, user } = useAuth0<User>();
  const [searchResults, setSearchResults] = useState<SearchResultData[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const apiKey = "AIzaSyC3EuUt2LVCkEpJwKvHd0RaQfTamuWhByA"; 
  const searchEngineId = "73c2ff171703f4f27"; 


  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${inputSearch}&key=${apiKey}&cx=${searchEngineId}`
      );

      if (response.status === 200) {
        setSearchResults(response.data.items || []);
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <h3> Välkommen {user?.name}!</h3>

          <div>
            <input
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Search the web"
            />
            <button onClick={handleSearch}>Search</button>

            {searchResults.map((result) => (
              <div key={result.link}>
                <h3>{result.title}</h3>
                <p>{result.snippet}</p>
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default App;
