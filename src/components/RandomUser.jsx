import React, { useEffect } from "react";
import {useState} from 'react';

const RandomUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                "https://randomuser.me/api/"
            );
            if(!res.ok){
                if(res.status === 404) throw new Error("User not found");
                throw new Error("Unable to fetch data");
            }
            const data =  await res.json();
            setUser({
                first : data.results[0].name.first,
                last : data.results[0].name.last,
                email: data.results[0].email,
                country: data.results[0].location.country,
                gender: data.results[0].gender,
                image : data.results[0].picture.large,

            });

        }
        catch (err){
            setError(err.message)
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchData();
    },[]);


    const handleClick = () => {
        fetchData();

    }
    if(loading) return <p>Loading User Data...</p>;
    if(error) return <p>{error}</p>
    

    return(
        <div>
            <button onClick = {handleClick} disabled={loading}>{loading ? "Loading..." : "Get User"}</button>
            {user && (
                <div>
                    <h2>Full Name : {user ? `${user.first} ${user.last}` : 'No Data Found'}</h2>
                    <img src = {user?.image} alt = "Profile-Photo" width = '150' />
                    <p>Gender: {user?.gender}</p>
                    <p>Email: {user?.email  || "No data"}</p>
                    <p>Country: {user?.country || "Not mentioned"}</p>
                </div>

            )}
        </div>
    );
}

export default RandomUser;