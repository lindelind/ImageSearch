import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FavoriteImage } from "../models/types";
import { NotFound } from "./NotFound";

export const Favorites = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userFavorites, setUserFavorites] = useState<FavoriteImage[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/favorites/${user?.sub}`
        );
        setUserFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

  
  if (user?.nickname) {
    fetchFavorites();
  }
}, [user?.nickname]);

return (
  <>
    {isAuthenticated ? (
      <div>
        <h1 className="h1-favorite">{user?.nickname}'s favorites</h1>
        <div className="favorite-container">
          {userFavorites.length > 0 ? (
            userFavorites.map((favorite, index) => (
              <div key={index}>
                  <a
                    href={favorite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="favorite-image"
                      src={favorite.url}
                      alt={favorite.title}
                    />
                  </a>
                </div>
            ))
          ) : (
            <p>No favorites found.</p>
          )}
        </div>
      </div>
    ) : (
      <NotFound />
    )}
  </>
);
}