"use client"
import toast from "react-hot-toast"
import { verifyMail } from "@/actions/actions"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

function Page({params}) {
    // router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    console.log(successMessage)
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params.verify) {
                    const data = await verifyMail(params.verify);
                    if (data.error) {
                        setErrorMessage(data.error)
                    } else {
                        setSuccessMessage(data.message)
                        // router.push("/login")
                        // console.log(data)
                    }
                } else {
                    toast.error("Invalid verification link")
                }
            } catch (error) {
            console.error("Error:", error);
            }
        };

        fetchData();
        }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full">
        {
            errorMessage ? (
                <div className="text-center">
                    <h1 className=" text-2xl mb-2">{errorMessage}</h1>
                    <h1 className=" text-xl">Please try again</h1>
                </div>
            ) : successMessage && (
                <div className="text-center">
                    <h1 className="text-2xl mb-2">{successMessage}</h1>
                    <h1 className=" text-xl">
                        Proceed to {" "}{" "}
                        <Link href="/login" className="text-primaryColor rounded-full text-[1rem] ">Login</Link>
                    </h1>
                    {/* <p>{params}</p> */}
                </div>
            )
        }
    </div>
  )
}

export default Page