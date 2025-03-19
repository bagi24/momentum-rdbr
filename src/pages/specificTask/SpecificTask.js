import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import StatusIcon from '../../assets/icons/pie-chart.png';
import EmployeIcon from '../../assets/icons/Frame 1000005864.png';
import CalendarIcon from '../../assets/icons/calendar.png';
import CommentArrow from '../../assets/icons/Frame 1000005939.png';
import './SpecificTask.css';

function SpecificTask() {
  const location = useLocation();
  const task = location.state?.task;

  const [statuses, setStatuses] = useState([]);
  const [formData, setFormData] = useState({
    status: '',
  });
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  useEffect(() => {
    fetch('https://momentum.redberryinternship.ge/api/statuses')
      .then(response => response.json())
      .then(data => setStatuses(data))
      .catch(error => console.error('Error fetching statuses:', error));
  }, []);

  if (!task) {
    return <div>Task not found</div>;
  }

  const getShortenedWord = (text, length = 5) => {
    const firstWord = text.trim().split(/\s+/)[0];
    return firstWord.length > length ? firstWord.slice(0, length) + '…' : firstWord;
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const weekdays = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];
    const weekdayIndex = date.getDay();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${weekdays[weekdayIndex]} - ${day}/${month}/${year}`;
  };

  return (
    <>
      <Header />
      <div className='specificTask-content'>
        <div className='task-info'>
          <div className='filteredIcons'>
            <div
              className='filterStatus'
              style={{
                color:
                  task.priority.name === 'დაბალი'
                    ? '#08A508'
                    : task.priority.name === 'საშუალო'
                    ? '#FFBE0B'
                    : task.priority.name === 'მაღალი'
                    ? '#FA4D4D'
                    : '#FFBE0B',
                border:
                  task.priority.name === 'დაბალი'
                    ? '0.5px solid #08A508'
                    : task.priority.name === 'საშუალო'
                    ? '0.5px solid #FFBE0B'
                    : task.priority.name === 'მაღალი'
                    ? '0.5px solid #FA4D4D'
                    : '0.5px solid #FFBE0B',
              }}>
              <img src={task.priority.icon} alt='Priority Icon' />
              {task.priority.name}
            </div>
            <div className='filteredDepart'> {getShortenedWord(task.department.name, 7)}</div>
          </div>
          <div className='info-con'>
            <div className='task-title'>{task.name}</div>
            <div className='task-description'>
              <p className='desc-text'>{task.description}</p>
            </div>
            <div className='task-detalies'>
              <span className='task-detalies-title'>დავალების დეტალები</span>
              <div className='task-detalie-info'>
                <div className='task-status-text'>
                  <img src={StatusIcon} alt='' /> სტატუსი
                </div>
                <div className='task-status-api'>
                  <select
                    name='status-get'
                    value={formData.status}
                    onChange={handleChange}
                    required>
                    <option value=''>{task.status.name}</option>
                    {statuses.map(status => (
                      <option key={status.id} value={status.name}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='employee'>
                <div className='task-status-text'>
                  <img src={EmployeIcon} alt='' /> თანამშრომელი
                </div>
                <div className='employee-profile'>
                  <img className='employe-avatar' src={task.employee.avatar} alt='User' />
                  <div className='employe-name'>
                    <p className='dep'>{task.department.name}</p>
                    <p className='user-name'>
                      {task.employee.name} {task.employee.surname}
                    </p>
                  </div>
                </div>
              </div>
              <div className='deadline'>
                <div className='task-status-text'>
                  <img src={CalendarIcon} alt='' /> დავალების ვადა
                </div>
                <div className='deadline-result'>{formatDate(task.due_date)}</div>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </>
  );
}

export default SpecificTask;
