import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      message,
    };

    emailjs.send('service_q7xxh5q', 'template_r6rjjzj', templateParams, 'gm3I2napRA-5JRn08')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSent(true);
      }, (err) => {
        console.error('FAILED...', err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - My Blog</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        {sent ? (
          <p className="text-green-500">Thank you for your message! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Contact;
