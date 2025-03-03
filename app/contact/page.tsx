"use client"

import { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './page.module.sass';
import Container from "@/app/_ui/container/page";
import { MdEmail } from "react-icons/md";
import {Button, TextareaAutosize, TextField} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiPhoneNumber from "mui-phone-number";
import SvgBackground from "@/app/_ui/svg_background/page";

const ContactMe = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        country: '',
        phone: '',
        message: ''
    });

    function setFormDataValue(obj) {
        setFormData({ ...formData, ...obj });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        emailjs.send(`${process.env.NEXT_PUBLIC_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`, formData, `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`)
            .then((result) => {
                console.log(result.text);
                alert('پیام شما با موفقیت ارسال شد!');
            }, (error) => {
                console.log(error.text);
                alert('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
            });

        setFormData({ name: '', company: '', email: '', country: '', phone: '', message: '' });
    };

    const onPhoneNumberChanged = (phoneNumber, country) => {
        setFormDataValue({country: country.name, phone: phoneNumber});
    };

    return (
        <main className={styles.main}>
            <SvgBackground className={styles.svg} />
            <section className={styles.contactWrapper}>
                <Container className={styles.contact}>
                    <div className={styles.rowWrapper}>
                        <div className={styles.content}>
                            <h1 className={styles.title}>Contact Me</h1>
                            <p className={styles.description}>
                                Feel free to reach out to me for any inquiries, collaborations, or just to say hi! Whether you have a question, a project idea, or simply want to connect, I&#39;m always eager to hear from you.
                            </p>
                            <div className={styles.email}>
                                <MdEmail className={styles.emailIcon}/>
                                <a href="mailto:mahrokh.nz@gmail.com">Mahrokh.nz@gmail.com</a>
                            </div>
                        </div>

                        <form className={styles.contactForm} onSubmit={handleSubmit}>
                            <h2 className={styles.subTitle}>
                                Let&#39;s get in touch!
                            </h2>
                            <fieldset>
                                <div className={styles.row}>
                                    <TextField
                                        required
                                        type='text'
                                        size='small'
                                        label='Full Name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        // error={errors.firstname}
                                        className={styles.textField}
                                        name="name"
                                    />
                                    <TextField
                                        required
                                        type='company'
                                        size='small'
                                        label='Company'
                                        value={formData.company}
                                        onChange={handleChange}
                                        // error={errors.firstname}
                                        className={styles.textField}
                                        name="company"
                                    />
                                </div>
                                <div className={styles.row}>
                                    <TextField
                                        required
                                        type='email'
                                        size='small'
                                        label='Email Address'
                                        value={formData.email}
                                        onChange={handleChange}
                                        // error={errors.firstname}
                                        className={styles.textField}
                                        name="email"
                                    />
                                    <MuiPhoneNumber defaultCountry="ir" onChange={onPhoneNumberChanged} value={formData.phone} inputClass={styles.phoneTextField}/>
                                </div>
                                <TextareaAutosize required value={formData.message} onChange={handleChange} name='message' maxRows='28' minRows='28'/>
                                <Button size={isMobile ? 'small' : 'medium'} variant='contained' type='submit' color='primary'>
                                    Send
                                </Button>
                            </fieldset>
                            {/*<label htmlFor="name">نام:</label>*/}
                            {/*<input type="text" id="name" name="name" value={formData.name} onChange={handleChange}*/}
                            {/*       required/>*/}

                            {/*<label htmlFor="email">ایمیل:</label>*/}
                            {/*<input type="email" id="email" name="email" value={formData.email} onChange={handleChange}*/}
                            {/*       required/>*/}

                            {/*<label htmlFor="message">پیام:</label>*/}
                            {/*<textarea id="message" name="message" rows="4" value={formData.message}*/}
                            {/*          onChange={handleChange} required></textarea>*/}

                            {/*<button type="submit">ارسال</button>*/}
                        </form>
                    </div>
                </Container>
            </section>
        </main>
    );
}

export default ContactMe;
