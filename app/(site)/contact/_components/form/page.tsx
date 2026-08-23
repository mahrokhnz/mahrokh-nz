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
    const isDark = theme === "dark";

    const [sendLoading, setSendLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        company: '',
        email: '',
        message: ''
    });

    const fieldSx = isDark
        ? {
              "& .MuiInputBase-root": {
                  color: "#fdf2f8",
                  backgroundColor: "rgba(15, 10, 15, 0.55)",
              },
              "& .MuiInputLabel-root": {
                  color: "#d4b3c8",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                  color: "#f472b6",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(244, 114, 182, 0.45)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f472b6",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f472b6",
              },
              "& .MuiFormHelperText-root": {
                  color: "#e8b4cb",
              },
              "& .MuiFormHelperText-root.Mui-error": {
                  color: "#fb7185",
              },
              "& .MuiInputBase-input::placeholder": {
                  color: "rgba(253, 242, 248, 0.45)",
                  opacity: 1,
              },
          }
        : {
              "& .MuiInputBase-root": {
                  color: "#1a0a14",
                  backgroundColor: "rgba(255, 255, 255, 0.72)",
              },
              "& .MuiInputLabel-root": {
                  color: "#9d6b8a",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                  color: "#be185d",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(190, 24, 93, 0.35)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#be185d",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#be185d",
              },
          };

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
                  className="z-[1] rounded-[20px] border border-solid border-[color-mix(in_srgb,var(--firstWaveColor)_55%,transparent)] bg-(--form-color) px-[35px] py-[30px] text-(--textColor) shadow-[0_8px_28px_0_color-mix(in_srgb,var(--firstWaveColor)_28%,transparent)] max-medium-desktop:grow max-medium-desktop:px-[30px] max-medium-desktop:py-[25px] max-small-desktop:p-5"
                  style={{'--form-color': isDark ? '#3a2236' : '#fff7fb'} as React.CSSProperties}
                  onSubmit={handleSubmit} ref={formRef}>
                <h2 className="mb-[50px] text-[38px] text-(--textColor) max-medium-desktop:mb-[30px] max-medium-desktop:text-[30px]">
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
                            sx={fieldSx}
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
                            sx={fieldSx}
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
                            sx={fieldSx}
                        />
                    </div>
                    <TextField
                        error={!!errors.message}
                        helperText={errors.message}
                        required
                        multiline
                        rows={10}
                        placeholder='Write your message...'
                        name="message"
                        sx={fieldSx}
                    />
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
