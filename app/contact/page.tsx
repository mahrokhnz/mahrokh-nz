"use client"

import { useState} from 'react';
import emailjs from 'emailjs-com';
import styles from './page.module.sass';
import Container from "@/app/_ui/container/page";
import {MdEmail} from "react-icons/md";
import {Button, TextField} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Canvas from "@/app/_ui/constellation/page";
import {toast, ToastContainer} from "react-toastify";
import {useTheme} from "@/context/theme_context";
import MetadataComponent from "@/utils/client-metadata";
import * as React from "react";
import SectionTitle from "@/app/_ui/section_title/page";

interface ITextFieldEventType {
    target: { name: string; value: string; };
}

interface ISubmitEventType {
    preventDefault: () => void;
}

function ContactMe(){
    const {theme} = useTheme()

    const [sendLoading, setSendLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        company: '',
        email: '',
        message: ''
    });

    const successNotify = () => toast.success('Your message went through successfully. Cheers!')
    const warnNotify = () => toast.error('something went wrong with your message. Try again?')

    const isMobile = useMediaQuery('(max-width: 600px)');

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        message: ''
    });

    const handleChangeTextField = (event: ITextFieldEventType ) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: ISubmitEventType) => {
        event.preventDefault();

        if (formData.name.length >= 3 && formData.company.length >= 3 && formData.email.length >= 7 && formData.message.length >= 15) {
            setSendLoading(true);

            emailjs.send(`${process.env.NEXT_PUBLIC_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`, formData, `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`)
                .then((result) => {
                    if (result.status === 200) {
                        successNotify()

                        setFormData({ name: '', company: '', email: '', message: '' });
                        setErrors({ name: '', company: '', email: '', message: '' });

                        setSendLoading(false);
                    }
                }, () => {
                    setErrors({ name: '', company: '', email: '', message: '' });
                    warnNotify()
                    setSendLoading(false);
                });
        } else {
            const errorMessages = {name: '', company: '', email: '', message: ''};
            if (formData.name.length === 0) {
                errorMessages.name = 'Please enter your name.'
            } else if (formData.name.length > 0 && formData.name.length < 3) {
                errorMessages.name = 'Name should be more than 3 letters.'
            }

            if (formData.company.length === 0) {
                errorMessages.company = 'Please enter your company.'
            } else if (formData.company.length > 0 && formData.company.length < 3) {
                errorMessages.company = 'Company should be more than 3 letters.'
            }

            if (formData.email.length === 0) {
                errorMessages.email = 'Please enter your email address.'
            } else if (formData.email.length < 7) {
                errorMessages.email = 'Email Address should be more than 7 letters.'
            } else if (!formData.email.includes('@')) {
                errorMessages.email = 'Email Address is not valid.'
            }

            if (formData.message.length === 0) {
                errorMessages.message = 'Please enter your message.'
            } else if (formData.message.length < 15) {
                errorMessages.message = 'Message should be more than 15 letters.'
            }

            setErrors(errorMessages)
        }
    };

    return (
        <>
            <MetadataComponent title='Contact' description={'Get in touch with MAHrokh, a skilled Front-End Developer. Contact me for inquiries about projects, collaborations, or any questions regarding web development.'} />
            <main className={styles.main}>
                <Canvas onlyStarts={true}/>
                <section className={styles.contactWrapper}>
                    <Container className={styles.contact}>
                        <div className={styles.rowWrapper}>
                            <div className={styles.content}>
                                <SectionTitle text='Contact Me' alignment='flex-start' className={styles.title} />
                                <p className={styles.description}>
                                    Feel free to reach out to me for any inquiries, collaborations, or just to say hi! Whether you have a question, a project idea, or simply want to connect, I&#39;m always eager to hear from you.
                                </p>
                                <div className={styles.email}>
                                    <MdEmail className={styles.emailIcon}/>
                                    <a href="mailto:mahrokh.nz@gmail.com">Mahrokh.nz@gmail.com</a>
                                </div>
                            </div>
                            <form className={styles.contactForm} style={{'--form-color': theme === 'dark' ? '#9fa0bb99' : '#e2e2e7' } as object} onSubmit={handleSubmit}>
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
                                            onChange={handleChangeTextField}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            className={styles.textField}
                                            name="name"
                                        />
                                        <TextField
                                            required
                                            type='company'
                                            size='small'
                                            label='Company'
                                            value={formData.company}
                                            onChange={handleChangeTextField}
                                            error={!!errors.company}
                                            helperText={errors.company}
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
                                            onChange={handleChangeTextField}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            className={styles.textField}
                                            name="email"
                                        />
                                    </div>
                                    <TextField error={!!errors.message} helperText={errors.message} required multiline rows={10} placeholder='Write your message...' value={formData.message} onChange={handleChangeTextField} name="message" />
                                    <Button loading={sendLoading} onClick={handleSubmit} size={isMobile ? 'small' : 'medium'} variant='contained' type='submit' color='primary'>
                                        Send Message
                                    </Button>
                                </fieldset>
                            </form>
                        </div>
                    </Container>
                </section>
                <ToastContainer position="bottom-left" newestOnTop={true} closeOnClick={true} draggable={false} pauseOnHover={true} theme={theme} />
            </main>
        </>
    );
}

export default ContactMe;
