import React from 'react';
import Header from '../../components/header/Header';
import './SpecificTask.css';

function SpecificTask() {
  return (
    <>
      <Header />
      <div className='specificTask-content'>
        <div className='task-info'>
          <div className='filteredIcons'>
            <img src='' alt='' />
            <img src='' alt='' />
          </div>
          <div className='info-con'>
            <div className='task-title'>Title</div>
            <div className='task-description'>Description</div>
            <div className='task-detalies'>
              <span className='task-detalies-title'>Title</span>
              <div className='task-status'>
                <span className='task-status-text'>სტატუსი</span>
                <span className='task-status-icon'>Icon</span>
              </div>
              <div className='employee'>
                <span className='employee-text'>თანამშრომელი</span>
                <span className='employee-icon'>ფოტო</span>
              </div>
              <div className='deadline'>
                <span className='deadline-text'>დავალების ვადა</span>
                <span className='deadline-result'>ორშ 15/03/2025</span>
              </div>
            </div>
          </div>
        </div>
        <div class='comment-section'>
          <input type='text' placeholder='დაამატე კომენტარი' class='comment-input' />
          <button class='comment-btn'>დაკომენტარება</button>
          <div class='comments'>
            <h3>
              კომენტარები <span class='comment-count'>3</span>
            </h3>
            <div class='comment'>
              <img src='user1.jpg' alt='User' class='avatar' />
              <div class='comment-content'>
                <p class='username'>ემილია მორაგინი</p>
                <p class='text'>
                  დინამიკურად სუფთა ჩათი, სადაც კომენტარებს მინიჭებული აქვთ უნიკალური
                  იდენტიფიკატორი.
                </p>
                <a href='#' class='reply'>
                  პასუხი
                </a>
              </div>
            </div>
            <div class='comment reply-comment'>
              <img src='user2.jpg' alt='User' class='avatar' />
              <div class='comment-content'>
                <p class='username'>ნატალია გოროგაძე</p>
                <p class='text'>
                  დინამიკურად სუფთა ჩათი, სადაც კომენტარებს მინიჭებული აქვთ უნიკალური
                  იდენტიფიკატორი.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecificTask;
