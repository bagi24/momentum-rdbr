import React, { useState, useEffect } from 'react';
import './CreateEmploye.css';
import Avatar from '../../assets/images/Flag_of_Georgia.svg.png';
import DelteAvatar from '../../assets/icons/delteAvatarBtn.png';
import CenceleModal from '../../assets/icons/Cancel.png';
import uploadIcon from '../../assets/icons/gallery-export.png';
import Arrow from '../../assets/icons/arrow.png';

const CreateEmploye = () => {
  const [avatar, setAvatar] = useState(Avatar);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [departments, setDepartments] = useState([]);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    // Fetch departments from the API
    fetch('https://momentum.redberryinternship.ge/api/departments')
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  const handleAvatarChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <div className='cancel-icon'>
              <img src={CenceleModal} alt='Cancel' className='cancel' onClick={closeModal} />
            </div>

            <h2 className='modal-title'>თანამშრომლის დამატება</h2>
            <form className='user-form'>
              <div className='form-group'>
                <div className='label'>
                  <label>სახელი*</label>
                  <input type='text' placeholder='' />
                  <div className='validation'>
                    <div className='min'>
                      <img src={Arrow} alt='' />
                      <p> მინიმუმ 2 სიმბოლო</p>
                    </div>
                    <div className='max'>
                      <img src={Arrow} alt='' />
                      <p>მაქსიმუმ 255 სიმბოლო</p>
                    </div>
                  </div>
                </div>

                <div className='label'>
                  <label>გვარი*</label>
                  <input type='text' placeholder='' />
                  <div className='validation'>
                    <div className='min'>
                      <img src={Arrow} alt='' />
                      <p> მინიმუმ 2 სიმბოლო</p>
                    </div>
                    <div className='max'>
                      <img src={Arrow} alt='' />
                      <p>მაქსიმუმ 255 სიმბოლო</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='avatar-group-con'>
                <p>ავატარი*</p>
                <div className='form-group avatar-group'>
                  {!avatar || avatar === Avatar ? (
                    <div className='initial-state' onClick={triggerFileSelect}>
                      <img src={uploadIcon} alt='Upload Avatar' />
                      <p>ატვირთეთ ფოტო</p>
                    </div>
                  ) : (
                    <>
                      <img
                        src={DelteAvatar}
                        alt='Delete Avatar'
                        className='delete-avatar-btn'
                        onClick={() => setAvatar(null)}
                      />
                      <div className='avatar' onClick={triggerFileSelect}>
                        <img src={avatar} alt='Avatar' />
                      </div>
                    </>
                  )}
                  <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className='hidden-file-input'
                  />
                </div>
              </div>

              <div className='form-group-2'>
                <label>დეპარტამენტი*</label>
                <select className='custom-select'>
                  <option>აირჩიეთ დეპარტამენტი</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-actions'>
                <button type='button' className='cancel-btn' onClick={closeModal}>
                  გაუქმება
                </button>
                <button className='submit-btn'>დამატება თანამშრომლის</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEmploye;
