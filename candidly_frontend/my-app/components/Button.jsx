"use client"
import React from 'react'
import {experimental_useFormStatus as useFormStatus} from "react-dom";

export const LoginButton = () => {
    const {pending} = useFormStatus();
    return (
    <button className="bg-[#000080] w-full mt-5 h-12 rounded-lg text-white font-semibold flex justify-center items-center">
        {pending ? (
        <div className="animate-spin rounded-full h-7 w-7 border-t-4 border-b-4 border-white"></div>
        ) : (
        "Log In"
        )}
    </button>
    );
}

export const SignupButton = () => {
    const {pending} = useFormStatus();
    return (
    <button className="bg-[#000080] w-full mt-5 h-12 rounded-lg text-white font-semibold flex justify-center items-center">
        {pending ? (
        <div className="animate-spin rounded-full h-7 w-7 border-t-4 border-b-4 border-white"></div>
        ) : (
        "Sign Up"
        )}
    </button>
    );
}

export const SubmitEmail = () => {
    const {pending} = useFormStatus();
    return (
    <button className="bg-[#000080] w-full mt-5 h-12 rounded-lg text-white font-semibold flex justify-center items-center">
        {pending ? (
        <div className="animate-spin rounded-full h-7 w-7 border-t-4 border-b-4 border-white"></div>
        ) : (
        "Submit Email"
        )}
    </button>
    );
}

export const SendMessage = () => {
    const {pending} = useFormStatus();
    return (
    <button className="flex justify-center items-center bg-[#000080] w-full px-3 h-12 rounded-lg text-white font-semibold">
        {pending ? (
        <div className="animate-spin rounded-full h-7 w-7 border-t-4 border-b-4 border-white"></div>
        ) : (
        "Send Message"
        )}
    </button>
    );
}

