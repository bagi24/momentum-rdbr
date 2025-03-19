import React, { useState } from 'react';
import CommentArrow from '../../assets/icons/Frame 1000005939.png';
import './CommentSection.css';

const CommentSection = () => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentInputChange = e => {
    setCommentInput(e.target.value);
  };

  const handleAddComment = () => {
    if (commentInput.trim() === '') return;
    const newComment = {
      id: comments.length + 1,
      text: commentInput,
      username: 'თქვენი სახელი',
    };
    setComments([...comments, newComment]);
    setCommentInput('');
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
            <img
              src='https://s3-alpha-sig.figma.com/img/194d/b135/df3d44bdfa4f48df0eb8b24c0e29a485?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pCP6ofmaflocYbed9fnComdYH1qR9gRw8QVaXOnBpJyqWN7mviNjb23RI2kOagcbCA3aPn90Pkt8dg4dYevY~20Ug0Mh3Km-HGk0AHfdxE5O8LS4hsYVFserc9AXSvFRfCCJp1HpU9angAN7gr7VpW-GUxRDz-JN7po~rFxZLXDcHl-HjLcIDassNkiJJN5ftTLhigUzHXJLnvCJfiff1oDyj3x3gXo9cZ0zJPSSvqtA1Vwb96LHSJFJnUBH-UmXq6eRdgecl1JmgYPUUr~ecH7MG7myjOE7FvXLfLHRW0VXeXHGAfyMtkiv4q1UX3qqZPcaUtK55kfKHO02zvk9EA__'
              alt='User'
              className='avatar'
            />
            <div className='comment-content'>
              <p className='username'>{comment.username}</p>
              <p className='text'>{comment.text}</p>
              <a href='#' className='reply'>
                <img src={CommentArrow} alt='' />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
