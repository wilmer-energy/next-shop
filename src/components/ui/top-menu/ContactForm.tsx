"use client";
import * as React from 'react';
import { FormProvider, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../inputs/Input';
import SaveCancelBtn from './SaveCancelBtn';
import Message from '../message/Message';
import MultilineInput from '../inputs/MultilineInput';

type Inputs = {
    name: string
    lastname: string,
    email: string,
    message?: string
}
interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Form({ setOpen }: Props) {
    const methods = useCreateForm();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = methods;
    const [message, setMessage] = React.useState<{ message: string, errors: string }>({ errors: '', message: '' });
    const [loading, setLoading] = React.useState<boolean>(false);
    const sendEmail: SubmitHandler<Inputs> = (formData) => {
        setLoading(true);
        emailjs
            .send("service_646xlqq", "template_gncaazk", formData, "efrLhO8wR3qhZKff3")
            .then(
                (result) => {
                    setMessage({ errors: '', message: 'Email sent successfully' });
                    setLoading(false);
                },
                (error) => {
                    setMessage({ errors: 'Error sending email', message: '' });
                    setLoading(false);
                }
            );
        reset({ name: '', lastname: '', email: '', message: '' });
    };
    return (
        <>
            <FormProvider {...methods}>
                <Input inputName="name" label="Name" />
                <Input inputName="lastname" label="Lastname" />
                <Input inputName="email" label="Email" />
                <MultilineInput inputName="message" label="Message" />
                <SaveCancelBtn closeFn={() => { setOpen(false) }} saveFn={handleSubmit(sendEmail)} saveLabel="Send email" loading={loading} disabled={!isValid} />
            </FormProvider>
            <Message message={message} setMessage={setMessage} />
        </>
    );
}
function useCreateForm(): UseFormReturn<Inputs, any, undefined> {
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Required"),
        lastname: yup
            .string()
            .required("Required"),
        email: yup
            .string()
            .email("Not valid email")
            .required("Required")
    });
    return useForm<Inputs>({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    });
}