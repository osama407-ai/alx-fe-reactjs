Inside the Search.jsx file enter this code 

import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div style={styles.userCard}>
          <img
            src={user.avatar_url}
            alt={user.login}
            style={styles.avatar}
          />
          <h2>{user.name || user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#24292f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  userCard: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "300px",
  },
  avatar: {
    width: "100px",
    borderRadius: "50%",
  },
};

export default Search;