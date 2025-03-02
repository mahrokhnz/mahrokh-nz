"use client"

import { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './page.module.css';

const ContactMe = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        emailjs.send(`${process.env.SERVICE_ID}`, `${process.env.TEMPLATE_ID}`, formData, `${process.env.PUBLIC_KEY}`)
            .then((result) => {
                console.log(result.text);
                alert('پیام شما با موفقیت ارسال شد!');
            }, (error) => {
                console.log(error.text);
                alert('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
            });

        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className={styles.contactContainer}>
            <h2>تماس با من</h2>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
                <label htmlFor="name">نام:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="email">ایمیل:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="message">پیام:</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>

                <button type="submit">ارسال</button>
            </form>
        </div>
    );
}

export default ContactMe;
