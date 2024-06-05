import React, { useState } from 'react';
import './contactpage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const createMailtoLink = () => {
    const { fullName, email, subject, phoneNumber, message } = formData;
    const body = `Nom complet: ${fullName}%0D%0AEmail: ${email}%0D%0ASujet: ${subject}%0D%0ANuméro de téléphone: ${phoneNumber}%0D%0ACommentaire: ${message}`;
    return `mailto:VotreAdresseGmail@gmail.com?subject=${encodeURIComponent('Formulaire de contact')}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <h2>Contactez-nous</h2>
      <form action={createMailtoLink()} method="post" encType="text/plain">
        <div>
          <label htmlFor="fullName">Nom:</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="subject">Objet de votre demande:</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="phoneNumber">Numéro de téléphone:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="message">Commentaire:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <button type="submit">Envoyer message</button>
      </form>
    </div>
  );
}

export default ContactPage;
