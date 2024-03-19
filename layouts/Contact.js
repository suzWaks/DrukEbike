import React, { useState } from 'react';
import Banner from "./components/Banner";
import ImageFallback from "./components/ImageFallback";
import emailjs from '@emailjs/browser';

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState();

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email) {
      console.log("Enter email");
      return;
    }
    if (!message) {
      console.log("Enter message");
      return;
    }

    setIsSending(true);

    const templateParams = {
      from_name: name,
      subject: subject,
      message: message,
      email: email
    }

    emailjs.send(
      'service_ujvxzxf',
      'template_6k5ht48',
      templateParams, {
      publicKey: 'vPFh6ZIRKRkAtWoXA'
    }).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSending(false);
        setSendSuccess(true);
      },
      (err) => {
        console.log('FAILED...', err);
        setIsSending(false);
        setSendSuccess(false);
      }
    );

    // Clear form fields after submission if needed
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  return (
    <section className="section">
      <Banner title={title} />
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/vectors/contact.png"
              width={497}
              height={397}
              alt=""
            />
          </div>
          <div className="animate lg:col-5">
            <form
              onSubmit={sendEmail}
              className="contact-form rounded-xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
            >
              <h2 className="h4 mb-6">Send A Message</h2>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  placeholder="Full Name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className="form-input w-full"
                  name="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="form-textarea w-full"
                  rows="6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button className="btn btn-primary block w-full" type="submit" disabled={isSending}>
                {isSending ? 'Sending...' : 'Submit Now'}
              </button>
              {sendSuccess && (
                <p className="text-green-600 mt-2">Message sent successfully!</p>
              )}
              {sendSuccess === false && (
                <p className="text-red-600 mt-2">Failed to send message. Please try again later.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
