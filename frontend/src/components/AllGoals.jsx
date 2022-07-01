import React, { useState, useEffect } from "react";
import axios from 'axios'

const AllGoals = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/goals/all")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPosts]);

  return (
    <div>
      <section className="dash__allGoals">
       <h3>What's everybody thinking ?</h3>
        {posts?.map((post) => (
          <ul key={post._id} className="goal">
          <div>{new Date(post.createdAt).toLocaleString('en-US')}</div>
            <li>{post.text}</li>
            <p>{post.name}</p>
          </ul>
        ))}
      </section>
    </div>
  );
};

export default AllGoals;
