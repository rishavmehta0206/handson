import React, { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './commentsection.module.css';

const CommentSection = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);


  function getLatestComment(comment, comments, parentId) {
    for (let comm of comments) {
      if (comm.id === parentId) {
        let newComment = {
          id: crypto.randomUUID(),
          comment: comment,
          replies: [],
        };
        comm.replies.push(newComment);
        return comments;
      }
      if (comm.replies.length > 0) {
        let result = getLatestComment(comment, comm.replies, parentId);
        if (result) return comments;
      }
    }
    return null;
  }

  function addComment(text, id = null) {
    if (id) {
      let updatedListOfComments = getLatestComment(text, comments, id);
      setComments([...updatedListOfComments]);
    } else {
      let newComment = {
        id: new Date().getSeconds().toString(),
        comment: text,
        replies: [],
      };
      setComments((prev) => [newComment, ...prev]);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.commentSection}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter Comment"
            className={styles.textarea}
          />
          <button 
            className={styles.button}
          >
            <span onClick={()=>addComment(comment)}>Post</span>
          </button>
        </div>
        <Comments comments={comments}/>
      </div>
    </div>
  );
};

export default CommentSection;

function Comments({comments}){
    <div className="">
        
    </div>
}