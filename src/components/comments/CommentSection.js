import React, { useState, useEffect, useCallback } from 'react';
import CommentArrow from '../../assets/icons/Frame 1000005939.png';
import './CommentSection.css';
import { API_TOKEN } from '../../config/config';

const CommentSection = ({ taskId }) => {
  const [commentInput, setCommentInput] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error('Failed to fetch comments:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId) {
      fetchComments();
    }
  }, [taskId, fetchComments]);

  const handleCommentInputChange = e => {
    setCommentInput(e.target.value);
  };

  const handleReplyInputChange = e => {
    setReplyInput(e.target.value);
  };

  const handleAddComment = async () => {
    if (commentInput.trim() === '' || !taskId) return;

    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify({ text: commentInput }),
        }
      );

      if (response.ok) {
        console.log('Comment added successfully!');
        setCommentInput('');
        fetchComments();
      } else {
        console.error('Failed to add comment:', await response.text());
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddReply = async parentCommentId => {
    if (replyInput.trim() === '' || !taskId || !parentCommentId) return;

    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify({ text: replyInput, parent_id: parentCommentId }),
        }
      );

      if (response.ok) {
        console.log('Reply added successfully!');
        setReplyInput('');
        setReplyTo(null);
        fetchComments();
      } else {
        console.error('Failed to add reply:', await response.text());
      }
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const toggleReplyInput = commentId => {
    setReplyTo(prevReplyTo => (prevReplyTo === commentId ? null : commentId));
  };

  return (
    <div className='comment-section'>
      <input
        type='text'
        placeholder='დაამატე კომენტარი'
        className='comment-input'
        value={commentInput}
        onChange={handleCommentInputChange}
      />
      <button className='comment-btn' onClick={handleAddComment}>
        დაკომენტარება
      </button>

      <div className='comments'>
        <div className='comment-title'>
          <span className='com-title'> კომენტარები</span>
          <span className='comment-count'>{comments.length}</span>
        </div>
        {comments.map(comment => (
          <div className='comment' key={comment.id}>
            <img src={comment.author_avatar} alt='User' className='avatar' />
            <div className='comment-content'>
              <p className='username'>{comment.author_nickname || 'ანონიმური'}</p>
              <p className='text'>{comment.text}</p>

              <button
                className='reply'
                onClick={e => {
                  e.preventDefault();
                  toggleReplyInput(comment.id);
                }}>
                <img src={CommentArrow} alt='' />
              </button>

              {replyTo === comment.id && (
                <div className='reply-section'>
                  <input
                    type='text'
                    placeholder='დაამატე პასუხი'
                    className='reply-input'
                    value={replyInput}
                    onChange={handleReplyInputChange}
                  />
                  <button className='reply-btn' onClick={() => handleAddReply(comment.id)}>
                    პასუხის გაგზავნა
                  </button>
                </div>
              )}

              {comment.sub_comments &&
                comment.sub_comments.map(reply => (
                  <div className='reply-comment' key={reply.id}>
                    <img src={reply.author_avatar} alt='User' className='avatar' />
                    <div className='reply-content'>
                      <p className='username'>{reply.author_nickname || 'ანონიმური'}</p>
                      <p className='text'>{reply.text}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
