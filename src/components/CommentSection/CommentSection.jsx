import React from 'react'
import styles from './commentSection.module.css'

const CommentSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>
        <div className={styles.textContainer}>
          <input className={styles.textInput} placeholder='Enter a comment' type="text" />
          <span className={styles.commentButton}>Comment</span>
        </div>
      </div>
    </div>
  )
}

export default CommentSection