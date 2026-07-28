"use client"

import {useRef, useState} from 'react';
import emailjs from 'emailjs-com';
import {TextField} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import {useTheme} from "@/context/theme_context";
import * as React from "react";
import Button from "@/components/Button/page";

type FormDataFieldsType = {
    name: string;
    company: string;
    email: string;
    message: string;
};

function Form() {
    const {theme} = useTheme()
    const formRef = useRef<HTMLFormElement>(null);

    const [sendLoading, setSendLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        company: '',
        email: '',
        message: ''
    });

    const resetErrors = () => {
        setErrors({name: '', company: '', email: '', message: ''});
    }

    const successNotify = () => toast.success('Your message went through successfully. Cheers!')
    const warnNotify = () => toast.error('something went wrong with your message. Try again?')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const { name, company, email, message } = Object.fromEntries(formData.entries()) as FormDataFieldsType;

            if (name.length >= 3 && company.length >= 3 && email.length >= 7 && message.length >= 15) {
                setSendLoading(true);

                emailjs.send(`${process.env.NEXT_PUBLIC_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`, { name, company, email, message }, `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`)
                    .then((result) => {
                        if (result.status === 200) {
                            successNotify()

                            formRef.current?.reset()
                            resetErrors()

                            setSendLoading(false);
                        }
                    }, () => {
                        resetErrors()
                        warnNotify()
                        setSendLoading(false);
                    });
            } else {
                const errorMessages = {name: '', company: '', email: '', message: ''};
                if (name.length === 0) {
                    errorMessages.name = 'Please enter your name.'
                } else if (name.length > 0 && name.length < 3) {
                    errorMessages.name = 'Name should be more than 3 letters.'
                }

                if (company.length === 0) {
                    errorMessages.company = 'Please enter your company.'
                } else if (company.length > 0 && company.length < 3) {
                    errorMessages.company = 'Company should be more than 3 letters.'
                }

                if (email.length === 0) {
                    errorMessages.email = 'Please enter your email address.'
                } else if (email.length < 7) {
                    errorMessages.email = 'Email Address should be more than 7 letters.'
                } else if (!email.includes('@')) {
                    errorMessages.email = 'Email Address is not valid.'
                }

                if (message.length === 0) {
                    errorMessages.message = 'Please enter your message.'
                } else if (message.length < 15) {
                    errorMessages.message = 'Message should be more than 15 letters.'
                }

                setErrors(errorMessages)
            }
        }
    };

    return (
        <>
            <form
                  className="z-[1] rounded-[20px] border border-solid border-[#6e6af499] bg-(--form-color) px-[35px] py-[30px] opacity-80 shadow-[0_2px_15px_0_#6e6af499] max-medium-desktop:grow max-medium-desktop:px-[30px] max-medium-desktop:py-[25px] max-small-desktop:p-5"
                  style={{'--form-color': theme === 'dark' ? '#9fa0bb99' : '#e2e2e7'} as React.CSSProperties}
                  onSubmit={handleSubmit} ref={formRef}>
                <h2 className="mb-[50px] text-[38px] max-medium-desktop:mb-[30px] max-medium-desktop:text-[30px]">
                    Let&#39;s get in touch!
                </h2>
                <fieldset className="flex flex-col gap-5 max-medium-desktop:gap-2.5">
                    <div className="flex gap-8 max-medium-desktop:flex-col max-medium-desktop:gap-2.5 max-small-desktop:flex-row">
                        <TextField
                            required
                            type='text'
                            size='small'
                            label='Full Name'
                            error={!!errors.name}
                            helperText={errors.name}
                            className="grow"
                            name="name"
                        />
                        <TextField
                            required
                            type='text'
                            size='small'
                            label='Company'
                            error={!!errors.company}
                            helperText={errors.company}
                            className="grow"
                            name="company"
                        />
                    </div>
                    <div className="flex gap-8 max-medium-desktop:flex-col max-medium-desktop:gap-2.5 max-small-desktop:flex-row">
                        <TextField
                            required
                            type='email'
                            size='small'
                            label='Email Address'
                            error={!!errors.email}
                            helperText={errors.email}
                            className="grow"
                            name="email"
                        />
                    </div>
                    <TextField error={!!errors.message} helperText={errors.message} required multiline rows={10}
                               placeholder='Write your message...'
                               name="message"/>
                    <Button loading={sendLoading} type='submit'>
                        Send Message
                    </Button>
                </fieldset>
            </form>
            <ToastContainer position="bottom-left" newestOnTop={true} closeOnClick={true} draggable={false} pauseOnHover={true} theme={theme}/>
        </>
    );
}

export default Form;
