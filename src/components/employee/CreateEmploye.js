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

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [avatarValid, setAvatarValid] = useState(false);
  const [department, setDepartment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateFirstName = value => {
    setName(value);
    setFirstNameValid(value.length >= 2 && value.length <= 255);
  };

  const validateLastName = value => {
    setSurname(value);
    setLastNameValid(value.length >= 2 && value.length <= 255);
  };

  const handleAvatarChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        setAvatarValid(true);
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

  const handleSubmit = async e => {
    e.preventDefault();
    setFormSubmitted(true);

    if (firstNameValid && lastNameValid && avatarValid && department) {
      // Prepare the form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('department_id', department);
      formData.append('avatar', fileInputRef.current.files[0]); // Append the file

      try {
        const response = await fetch('https://momentum.redberryinternship.ge/api/employees', {
          method: 'POST',
          headers: {
            Authorization: `Bearer 9e71b9d0-5849-4939-ae4d-2d4f0033bec3`,
            Accept: 'application/json', // Include your token
          },
          body: formData, // Send form data
        });

        if (response.ok) {
          console.log('Employee added successfully!');
          for (let [key, value] of formData.entries()) {
            console.log(key, value);
          }
          // Close the modal or reset the form
          setIsModalOpen(false);
        } else {
          console.error('Failed to add employee:', await response.text());
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.log('Form has errors.');
    }
  };

  useEffect(() => {
    // Fetch departments from the API
    fetch('https://momentum.redberryinternship.ge/api/departments')
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  return (
    <>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <div className='cancel-icon'>
              <img src={CenceleModal} alt='Cancel' className='cancel' onClick={closeModal} />
            </div>

            <h2 className='modal-title'>თანამშრომლის დამატება</h2>
            <form className='user-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <div className='label'>
                  <label>სახელი*</label>
                  <input
                    type='text'
                    placeholder=''
                    value={name}
                    onChange={e => validateFirstName(e.target.value)}
                    className={formSubmitted && !firstNameValid ? 'invalid-field' : ''}
                  />
                  <div className='validation'>
                    <div className={`min ${name.length >= 2 ? 'valid' : ''}`}>
                      <img src={Arrow} alt='' />
                      <p> მინიმუმ 2 სიმბოლო</p>
                    </div>
                    <div className={`max ${name.length <= 255 ? 'valid' : ''}`}>
                      <img src={Arrow} alt='' />
                      <p>მაქსიმუმ 255 სიმბოლო</p>
                    </div>
                  </div>
                </div>

                <div className='label'>
                  <label>გვარი*</label>
                  <input
                    type='text'
                    placeholder=''
                    value={surname}
                    onChange={e => validateLastName(e.target.value)}
                    className={formSubmitted && !lastNameValid ? 'invalid-field' : ''}
                  />
                  <div className='validation'>
                    <div className={`min ${surname.length >= 2 ? 'valid' : ''}`}>
                      <img src={Arrow} alt='' />
                      <p> მინიმუმ 2 სიმბოლო</p>
                    </div>
                    <div className={`max ${surname.length <= 255 ? 'valid' : ''}`}>
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
                    <div
                      className={`initial-state ${
                        formSubmitted && !avatarValid ? 'invalid-field' : ''
                      }`}
                      onClick={triggerFileSelect}>
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
                <select
                  className={`custom-select ${formSubmitted && !department ? 'invalid-field' : ''}`}
                  value={department}
                  onChange={e => setDepartment(e.target.value)}>
                  <option value=''>აირჩიეთ დეპარტამენტი</option>
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
                <button type='submit' className='submit-btn'>
                  დამატება თანამშრომლის
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEmploye;
