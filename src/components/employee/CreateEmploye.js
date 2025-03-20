import React, { useState, useEffect } from 'react';
import './CreateEmploye.css';
import DelteAvatar from '../../assets/icons/delteAvatarBtn.png';
import CenceleModal from '../../assets/icons/Cancel.png';
import uploadIcon from '../../assets/icons/gallery-export.png';
import Arrow from '../../assets/icons/arrow.png';
import { API_TOKEN } from '../../config/config';

const CreateEmploye = ({ onClose }) => {
  const [avatar, setAvatar] = useState('');
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

  const nameRegex = /^[A-Za-zა-ჰ\s]+$/;

  const validateFirstName = value => {
    setName(value);
    const isValidLength = value.length >= 2 && value.length <= 255;
    const isValidCharacters = nameRegex.test(value);
    setFirstNameValid(isValidLength && isValidCharacters);
  };

  const validateLastName = value => {
    setSurname(value);
    const isValidLength = value.length >= 2 && value.length <= 255;
    const isValidCharacters = nameRegex.test(value);
    setLastNameValid(isValidLength && isValidCharacters);
  };

  const handleAvatarChange = event => {
    const file = event.target.files[0];

    if (file) {
      const maxSizeKB = 600;
      const maxSizeBytes = maxSizeKB * 1024;

      if (!file.type.startsWith('image/')) {
        alert('ფაილი უნდა იყოს სურათის ტიპის (JPEG, PNG და სხვა)');
        return;
      }

      if (file.size > maxSizeBytes) {
        alert(`ფაილის ზომა არ უნდა აღემატებოდეს ${maxSizeKB}KB-ს.`);
        return;
      }

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

  const resetForm = () => {
    setName('');
    setSurname('');
    setFirstNameValid(false);
    setLastNameValid(false);
    setAvatar('');
    setAvatarValid(false);
    setDepartment('');
    setFormSubmitted(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormSubmitted(true);

    if (firstNameValid && lastNameValid && avatarValid && department) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('department_id', department);
      if (fileInputRef.current.files[0]) {
        formData.append('avatar', fileInputRef.current.files[0]);
      }

      try {
        const response = await fetch('https://momentum.redberryinternship.ge/api/employees', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            Accept: 'application/json',
          },
          body: formData,
        });

        if (response.ok) {
          console.log('Employee added successfully!');
          resetForm();
          setIsModalOpen(false);
          window.location.reload();
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
    fetch('https://momentum.redberryinternship.ge/api/departments')
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  const handleOutsideClick = event => {
    if (event.target.classList.contains('modal')) {
      onClose();
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className='modal' onClick={handleOutsideClick}>
          <div className='modal-content'>
            <div className='cancel-icon'>
              <img src={CenceleModal} alt='Cancel' className='cancel' onClick={onClose} />
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
                    <div className={`min ${name.length >= 2 ? 'valid' : 'invalid'}`}>
                      <img src={Arrow} alt='' />
                      <p> მინიმუმ 2 სიმბოლო</p>
                    </div>
                    <div
                      className={`max ${
                        name.length <= 255 && name.length > 0 ? 'valid' : 'invalid'
                      }`}>
                      <img src={Arrow} alt='' />
                      <p>მაქსიმუმ 255 სიმბოლო</p>
                    </div>
                    <div className={`characters ${nameRegex.test(name) ? 'valid' : 'invalid'}`}>
                      <img src={Arrow} alt='' />
                      <p>ლათინური და ქართული სიმბოლოები</p>
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
                    <div className={`min ${surname.length >= 2 ? 'valid' : 'invalid'}`}>
                      <img src={Arrow} alt='' />
                      <p> მინიმუმ 2 სიმბოლო</p>
                    </div>
                    <div
                      className={`max ${
                        surname.length <= 255 && surname.length > 0 ? 'valid' : 'invalid'
                      }`}>
                      <img src={Arrow} alt='' />
                      <p>მაქსიმუმ 255 სიმბოლო</p>
                    </div>
                    <div className={`characters ${nameRegex.test(surname) ? 'valid' : 'invalid'}`}>
                      <img src={Arrow} alt='' />
                      <p>ლათინური და ქართული სიმბოლოები</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='avatar-group-con'>
                <p>ავატარი*</p>
                <div className='form-group avatar-group'>
                  {!avatar || avatar === '' ? (
                    <div className={`initial-state `} onClick={triggerFileSelect}>
                      <img src={uploadIcon} alt='Upload Avatar' />
                      <p className={`${formSubmitted && !avatarValid ? 'invalid-field-p' : ''}`}>
                        ატვირთეთ ფოტო
                      </p>
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
                <button type='button' className='cancel-btn' onClick={onClose}>
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
