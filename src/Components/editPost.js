import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React, { useState,  } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const EditPostFields = ({specificId, allPosts, updatePost, modalStatusChange} ) => {
  let thePost = allPosts.find((post)=>post._id ===  specificId);

  const [title,setTitle ] = useState(thePost.title);
  const [body, setBody] = useState(thePost.body);

  const _id = specificId;  
  const thumbnailUrl = thePost.thumbnailUrl
  const userId = thePost.userId;
  const commentsInPost = {};

  const updatedPost = {_id, title, body, thumbnailUrl, userId, commentsInPost};
  
 // make request to backend
  const updateResource = (id, data) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  }

  updateResource(_id,updatedPost);
  
  // Function for button
  const handleSubmit = () => {
    updatePost(updatedPost);
    modalStatusChange();
}
  //Modal content

  return (
    <Box sx={style}>
      <TextField  label="the topic of the post" value={title} multiline={true}
        onChange={(newValue) => setTitle(newValue.target.value)}
        sx={{
          marginBottom: 1,
          width: 5 / 6,
        }}>
      </TextField>
      <TextField  label="content" multiline={true} value={body}
        onChange={(newValue) => setBody(newValue.target.value)}
        sx={{
          width: 1 / 1,
        }}>
      </TextField>
      <Button  disabled={(!title.replace(/\s/g, '').length) || (!body.replace(/\s/g, '').length)} onClick={()=>handleSubmit()}>Confirm</Button>
    </Box>
  )
}