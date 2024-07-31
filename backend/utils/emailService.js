// utils/emailService.js

import mailgun from 'mailgun-js';
import dotenv from 'dotenv';

dotenv.config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

export const sendEmail = (to, subject, text, html) => {
  return new Promise((resolve, reject) => {
    const data = {
      from: `Your App Name <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: to,
      subject: subject,
      text: text,
      html: html
    };

    mg.messages().send(data, (error, body) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', body);
        resolve(body);
      }
    });
  });
};

// Funzione per inviare email di benvenuto
export const sendWelcomeEmail = async (user) => {
  const subject = 'Benvenuto nella nostra app!';
  const text = `Ciao ${user.name},\n\nBenvenuto nella nostra applicazione. Siamo felici di averti con noi!`;
  const html = `<h1>Benvenuto, ${user.name}!</h1><p>Siamo felici di averti con noi nella nostra applicazione.</p>`;

  try {
    await sendEmail(user.email, subject, text, html);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

// Funzione per inviare email di conferma donazione
export const sendDonationConfirmationEmail = async (user, donation) => {
  const subject = 'Grazie per la tua donazione!';
  const text = `Ciao ${user.name},\n\nGrazie per la tua generosa donazione di €${donation.amount}. Il tuo supporto è molto apprezzato!`;
  const html = `<h1>Grazie, ${user.name}!</h1><p>La tua generosa donazione di €${donation.amount} è molto apprezzata. Grazie per il tuo supporto!</p>`;

  try {
    await sendEmail(user.email, subject, text, html);
    console.log('Donation confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending donation confirmation email:', error);
  }
};

// Funzione per inviare email di conferma registrazione evento
export const sendEventRegistrationEmail = async (user, event) => {
  const subject = 'Conferma registrazione evento';
  const text = `Ciao ${user.name},\n\nLa tua registrazione per l'evento "${event.title}" è stata confermata. Ti aspettiamo il ${event.date} a ${event.location}.`;
  const html = `<h1>Registrazione Confermata</h1><p>Ciao ${user.name},</p><p>La tua registrazione per l'evento "${event.title}" è stata confermata.</p><p>Ti aspettiamo il ${event.date} a ${event.location}.</p>`;

  try {
    await sendEmail(user.email, subject, text, html);
    console.log('Event registration email sent successfully');
  } catch (error) {
    console.error('Error sending event registration email:', error);
  }
};

// Funzione per inviare email di notifica per un nuovo post
export const sendNewPostNotificationEmail = async (subscribers, post) => {
    const subject = `Nuovo post: ${post.title}`;
    const text = `È stato pubblicato un nuovo post sul nostro blog: "${post.title}"\n\nLeggi di più: ${process.env.FRONTEND_URL}/blog/${post._id}`;
    const html = `
      <h1>Nuovo post sul blog</h1>
      <h2>${post.title}</h2>
      <p>${post.content.substring(0, 150)}...</p>
      <a href="${process.env.FRONTEND_URL}/blog/${post._id}">Leggi di più</a>
    `;
  
    const emailPromises = subscribers.map(subscriber => 
      sendEmail(subscriber.email, subject, text, html)
    );
  
    try {
      await Promise.all(emailPromises);
      console.log('New post notification emails sent successfully');
    } catch (error) {
      console.error('Error sending new post notification emails:', error);
    }
  };