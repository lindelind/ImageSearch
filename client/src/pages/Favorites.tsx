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
          `http://localhost:3001/api/favorites/${user?.nickname}`
        );
        setUserFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (user?.nickname) {
      fetchFavorites();
    }
  });

return (
  <>
    {isAuthenticated ? (
      <div>
        <h2>{user?.nickname}'s favorites</h2>
        <div className="favorite-container">
          {userFavorites.length > 0 ? (
            userFavorites.map((favorite, index) => (
              <div key={index} className="favorite-item">
                <img
                  src={favorite.url}
                  alt={favorite.title}
                  className="favorite-image"
                />
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