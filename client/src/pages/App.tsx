import { User, useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import { useEffect, useState } from "react";
import axios from "axios";
import searchimg from "../img/search.png"
import heartimg from "../img/heart.png"
import { UserAuthentication, searchInformation, spelling, items } from "../models/types";


function App() {
  const { isAuthenticated} = useAuth0<UserAuthentication>();
  const { user } = useAuth0<User>();
  const {isLoading} = useAuth0();
  const [searchTime, setSearchTime] = useState<searchInformation>();
  const [didYouMean, setDidYouMean] = useState<spelling>();
  const [searchResults, setSearchResults] = useState<items[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [searchCorrectedQuery, setSearchCorrectedQuery] = useState(false);
  
   
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
  const searchEngineId = import.meta.env.VITE_SEARCH_ENGINE_ID


   const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${inputSearch}&searchType=image&key=${apiKey}&cx=${searchEngineId}`
      );

      if (response.status === 200) {
        setSearchResults(response.data.items || []);
        console.log(response.data.items)
        setSearchTime(response.data.searchInformation)
        console.log(response.data.searchInformation)
        setDidYouMean(response.data.spelling)
        console.log(response.data.spelling)
        setInputSearch("");
        
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  
  };


    useEffect(() => {
      if (searchCorrectedQuery) {
        handleSearch();
        setSearchCorrectedQuery(false);
      }
    }, [searchCorrectedQuery]);

  const showDidYouMean = () => {
    if (didYouMean === undefined) {
      return "";
    } else {
      return (
        <p>
          Did you mean{" "}
          <a
            href="#"
            onClick={() => {
              setInputSearch(didYouMean.correctedQuery);
              setSearchCorrectedQuery(true);
            }}
          >
            {didYouMean.correctedQuery}
          </a>
        </p>
      );
    }
  };
  
  const showSearchTime = () => {
    if (searchTime === undefined) {
      return "";
    } else {
      return <p>SearchTime: {searchTime.formattedSearchTime}</p>;
    }
  };

    const addtofavorites = async (imageResult: items) => {
        try {
           await axios.post(
            "http://localhost:3001/api/addtofavorites",
            {
                userName: user?.nickname,
                imageResult: imageResult,
              
            }
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };


  return (
    <>
      {isAuthenticated ? (
        <div>
          <h3> Välkommen {user?.name}!</h3>
          <h1 className="color-h1">
            Image Search <img className="search-img" src={searchimg} alt="" />
          </h1>

          <div>
            <input
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search image"
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
            <h3>{showDidYouMean()}</h3>
            <p>{showSearchTime()}</p>
            <section id="images">
              {searchResults.map((result) => (
                <div key={result.link}>
                  <div className="img-container">
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="image"
                        src={result.link}
                        alt={result.title}
                      />
                    </a>
                  </div>
                  <img
                    className="favorite-btn"
                    src={heartimg}
                    onClick={() => {
                      addtofavorites(result);
                    }}
                  />
                </div>
              ))}
            </section>
          </div>
        </div>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default App;
