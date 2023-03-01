import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import StyledContactForm from "../assets/Wrappers/StyledContactForm";

const Result = () => {
  return (
    <p>
      Your request has been sent successfully, we'll get back to you very soon.
    </p>
  );
};

export default function ContactUs() {
  const [showResult, setShowResult] = useState(false);

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_9vxnjlo',
        'template_39o7c5l',
        e.target,
        'mvFKgfdK_hI1Vb-Fo'
      )
      .then(
        (result) => {
          console.log(result.text);
          setShowResult(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
   
      <div className='container'>
        <form onSubmit={sendEmail}>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='subject'>Subject:</label>
            <input
              type='text'
              className='form-control'
              id='subject'
              name='subject'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message:</label>
            <textarea
              className='form-control'
              id='message'
              name='message'
              rows='6'
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            Send
          </button>
          {showResult ? <Result /> : null}
        </form>
      </div>

  );
}
