import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Button, Card, CardContent, Typography, TextField } from "@mui/material";

const DM_Dashboard = () => {
  // const [posts, setPosts] = useState([]);
  // const [newPost, setNewPost] = useState("");
  // const [duties, setDuties] = useState([]);
  // const token = localStorage.getItem("DM_TOKEN");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("DM_TOKEN");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return <h1>Welcome to DM Dashboard</h1>;
  
  // Fetch posts
  // useEffect(() => {
  //   fetch("https://edms-node.onrender.com/api/posts", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setPosts(data))
  //     .catch((err) => console.error("Error fetching posts:", err));
  // }, [token]);

  // // Fetch duty assignments
  // const handleInitiateDuties = () => {
  //   fetch("https://edms-node.onrender.com/api/duty/initiates", {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setDuties(data.assignments || []))
  //     .catch((err) => console.error("Error assigning duties:", err));
  // };

  // // Create a new post
  // const handleCreatePost = () => {
  //   fetch("https://edms-node.onrender.com/api/posts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ content: newPost, visibility: "public" }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPosts([...posts, data]);
  //       setNewPost("");
  //     })
  //     .catch((err) => console.error("Error creating post:", err));
  // };

  // return (
  //   <div style={{ padding: "2rem" }}>
  //     <Typography variant="h4" gutterBottom>
  //       District Magistrate Dashboard
  //     </Typography>

  //     {/* Create Post */}
  //     <Card style={{ marginBottom: "1rem" }}>
  //       <CardContent>
  //         <Typography variant="h6">Create Announcement</Typography>
  //         <TextField
  //           fullWidth
  //           variant="outlined"
  //           label="Write something..."
  //           value={newPost}
  //           onChange={(e) => setNewPost(e.target.value)}
  //           style={{ marginTop: "1rem", marginBottom: "1rem" }}
  //         />
  //         <Button variant="contained" onClick={handleCreatePost}>
  //           Post
  //         </Button>
  //       </CardContent>
  //     </Card>

  //     {/* Posts */}
  //     <Typography variant="h6">All Posts</Typography>
  //     {posts.map((post, idx) => (
  //       <Card key={idx} style={{ marginBottom: "1rem" }}>
  //         <CardContent>
  //           <Typography>{post.content}</Typography>
  //         </CardContent>
  //       </Card>
  //     ))}

  //     {/* Duty Assignment */}
  //     <Card>
  //       <CardContent>
  //         <Typography variant="h6">Duty Assignment</Typography>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={handleInitiateDuties}
  //           style={{ marginTop: "1rem" }}
  //         >
  //           Initiate New Duty Cycle
  //         </Button>

  //         {duties.length > 0 && (
  //           <div style={{ marginTop: "1rem" }}>
  //             <Typography variant="subtitle1">Assignments:</Typography>
  //             {duties.map((duty, idx) => (
  //               <Typography key={idx}>
  //                 Employee {duty.emp_id} → Station {duty.station_id}
  //               </Typography>
  //             ))}
  //           </div>
  //         )}
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
};

export default DM_Dashboard;
