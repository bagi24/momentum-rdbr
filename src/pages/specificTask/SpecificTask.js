import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import StatusIcon from '../../assets/icons/pie-chart.png';
import EmployeIcon from '../../assets/icons/Frame 1000005864.png';
import CalendarIcon from '../../assets/icons/calendar.png';
import Userphoto from '../../assets/images/Flag_of_Georgia.svg.png';
import CommentArrow from '../../assets/icons/Frame 1000005939.png';
import './SpecificTask.css';

function SpecificTask() {
  const [statuses, setStatuses] = useState([]);
  const [formData, setFormData] = useState({
    status: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch('https://momentum.redberryinternship.ge/api/statuses')
      .then(response => response.json())
      .then(data => setStatuses(data))
      .catch(error => console.error('Error fetching statuses:', error));
  }, []);

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
            <div className='task-title'>Redberry-ს საიტის ლენდინგის დიზაინი </div>
            <div className='task-description'>
              <p className='desc-text'>
                მიზანია რომ შეიქმნას თანამედროვე, სუფთა და ფუნქციონალური დიზაინი, რომელიც
                უზრუნველყოფს მარტივ ნავიგაციას და მკაფიო ინფორმაციის გადაცემას. დიზაინი უნდა იყოს
                ადაპტირებადი , გამორჩეული ვიზუალით, მინიმალისტური სტილით და ნათელი ტიპოგრაფიით.
              </p>
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
                    <option value=''>აირჩიეთ</option>
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
                  <img className='employe-avatar' src={Userphoto} alt='User' class='avatar' />
                  <div className='employe-name'>
                    <p className='dep'>დიზაინის დეპარტამენტი</p>
                    <p className='user-name'>ელაია ბაგრატიონი</p>
                  </div>
                </div>
              </div>
              <div className='deadline'>
                <div className='task-status-text'>
                  <img src={CalendarIcon} alt='' /> დავალების ვადა
                </div>
                <div className='deadline-result'>ორშ - 15/03/2025</div>
              </div>
            </div>
          </div>
        </div>
        <div class='comment-section'>
          <input type='text' placeholder='დაამატე კომენტარი' class='comment-input' />
          <button class='comment-btn'>დაკომენტარება</button>
          <div class='comments'>
            <div className='comment-title'>
              <span className='com-title'> კომენტარები</span>
              <span class='comment-count'>3</span>
            </div>
            <div class='comment'>
              <img
                src='https://s3-alpha-sig.figma.com/img/194d/b135/df3d44bdfa4f48df0eb8b24c0e29a485?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pCP6ofmaflocYbed9fnComdYH1qR9gRw8QVaXOnBpJyqWN7mviNjb23RI2kOagcbCA3aPn90Pkt8dg4dYevY~20Ug0Mh3Km-HGk0AHfdxE5O8LS4hsYVFserc9AXSvFRfCCJp1HpU9angAN7gr7VpW-GUxRDz-JN7po~rFxZLXDcHl-HjLcIDassNkiJJN5ftTLhigUzHXJLnvCJfiff1oDyj3x3gXo9cZ0zJPSSvqtA1Vwb96LHSJFJnUBH-UmXq6eRdgecl1JmgYPUUr~ecH7MG7myjOE7FvXLfLHRW0VXeXHGAfyMtkiv4q1UX3qqZPcaUtK55kfKHO02zvk9EA__'
                alt='User'
                class='avatar'
              />
              <div class='comment-content'>
                <p class='username'>ემილია მორაგინი</p>
                <p class='text'>
                  დინამიკურად სუფთა ჩათი, სადაც კომენტარებს მინიჭებული აქვთ უნიკალური
                  იდენტიფიკატორი.
                </p>
                <a href='#' class='reply'>
                  <img src={CommentArrow} alt='' />
                </a>
              </div>
            </div>
            <div class=' reply-comment'>
              <img
                src='https://s3-alpha-sig.figma.com/img/1c5e/c247/b896699df03f473ef6c1459dfc2e3453?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UH1TyCru1yBQRwXYcngwd5JodeMH~nu82VmZXEYWPkvgaD5J9eemEAsQCdd~GL9ZEHSqKt68fGJLzwWgLG4eI8SduBIIvDSehhlFWzy36QAAwtvCYVlniG9RpBje0MYOWgpMgW5DigTBdWVdeaDBOFxb1uSWNRPf~viycBGiIlNyPbFHPZg2d9RzarKUxqyS4i5OzxCeJ8YP4EgfdRCMP9KysNKfcsjc6l6sCD62cbTQcuerpcP4mAwGKJDwSERdFWE~OLCnssIf7oi6Qaf-ks5vO4hPyK3qmNFRiH~JyK-r7qKUwyptIBt1W9RP8z5gAIMhPoT~4NU3C3icPpwCog__'
                alt='User'
                class='avatar'
              />
              <div class='comment-content'>
                <p class='username'>ნატალია გოროგაძე</p>
                <p class='text'>
                  დინამიკურად სუფთა ჩათი, სადაც კომენტარებს მინიჭებული აქვთ უნიკალური
                  იდენტიფიკატორი.
                </p>
              </div>
            </div>
            <div class='comment'>
              <img
                src='https://s3-alpha-sig.figma.com/img/194d/b135/df3d44bdfa4f48df0eb8b24c0e29a485?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pCP6ofmaflocYbed9fnComdYH1qR9gRw8QVaXOnBpJyqWN7mviNjb23RI2kOagcbCA3aPn90Pkt8dg4dYevY~20Ug0Mh3Km-HGk0AHfdxE5O8LS4hsYVFserc9AXSvFRfCCJp1HpU9angAN7gr7VpW-GUxRDz-JN7po~rFxZLXDcHl-HjLcIDassNkiJJN5ftTLhigUzHXJLnvCJfiff1oDyj3x3gXo9cZ0zJPSSvqtA1Vwb96LHSJFJnUBH-UmXq6eRdgecl1JmgYPUUr~ecH7MG7myjOE7FvXLfLHRW0VXeXHGAfyMtkiv4q1UX3qqZPcaUtK55kfKHO02zvk9EA__'
                alt='User'
                class='avatar'
              />
              <div class='comment-content'>
                <p class='username'>ემილია მორაგინი</p>
                <p class='text'>
                  დინამიკურად სუფთა ჩათი, სადაც კომენტარებს მინიჭებული აქვთ უნიკალური
                  იდენტიფიკატორი.
                </p>
                <a href='#' class='reply'>
                  <img src={CommentArrow} alt='' />
                </a>
              </div>
            </div>
            <div class='comment'>
              <img
                src='https://s3-alpha-sig.figma.com/img/194d/b135/df3d44bdfa4f48df0eb8b24c0e29a485?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pCP6ofmaflocYbed9fnComdYH1qR9gRw8QVaXOnBpJyqWN7mviNjb23RI2kOagcbCA3aPn90Pkt8dg4dYevY~20Ug0Mh3Km-HGk0AHfdxE5O8LS4hsYVFserc9AXSvFRfCCJp1HpU9angAN7gr7VpW-GUxRDz-JN7po~rFxZLXDcHl-HjLcIDassNkiJJN5ftTLhigUzHXJLnvCJfiff1oDyj3x3gXo9cZ0zJPSSvqtA1Vwb96LHSJFJnUBH-UmXq6eRdgecl1JmgYPUUr~ecH7MG7myjOE7FvXLfLHRW0VXeXHGAfyMtkiv4q1UX3qqZPcaUtK55kfKHO02zvk9EA__'
                alt='User'
                class='avatar'
              />
              <div class='comment-content'>
                <p class='username'>ემილია მორაგინი</p>
                <p class='text'>
                  დინამიკურად სუფთა ჩათი, სადაც კომენტარებს მინიჭებული აქვთ უნიკალური
                  იდენტიფიკატორი.
                </p>
                <a href='#' class='reply'>
                  <img src={CommentArrow} alt='' />
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecificTask;
