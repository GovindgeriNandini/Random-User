import React, { useEffect } from "react";
import { useState } from "react";

const RandomMultipleUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://randomuser.me/api/?results=20");
      if (!res.ok) {
        if (res.status === 404) throw new Error("User not found");
        throw new Error("Unable to fetch data");
      }
      const data = await res.json();

      setUsers(
        data.results.map((person) => ({
          first: person.name.first,
          last: person.name.last,
          email: person.email,
          country: person.location.country,
          gender: person.gender,
          image: person.picture.large,
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("use effect rendered")
    fetchData();
  }, []);

  const handleClick = () => {
    fetchData();
  };
 {loading && <p>Loading User Data...</p>};
  if (error) return <p>{error}</p>;

  const filteredUsers = users.filter((user) =>
    user.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by country"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Get User"}
      </button>
      {!loading && users.length > 0 && filteredUsers.length === 0 && (<p>No users found</p>)}
      {filteredUsers.map((user) => (
        <div key={user.email}>
          <h3>
            {user.first} {user.last}
          </h3>
          <img src={user.image} alt="Profile-photo" />

          <p>Gender: {user.gender}</p>
          <p>Email:{user.email}</p>
          <p>Country: {user.country}</p>
        </div>
      ))}
    </div>
  );
};

export default RandomMultipleUsers;
