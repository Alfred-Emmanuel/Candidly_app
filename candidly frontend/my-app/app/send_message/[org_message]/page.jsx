import Link from "next/link";
import Image from "next/image";
import MessageForm from "@/components/MessageForm";

const page = ({params}) => {
  return (
    <section className=" px-3 md:px-10 ">
        <div className="pt-16 pb-10 md:py-10 text-center md:text-left">
            <h1 className="text-[1.2rem] mb-1 md:text-[1.3rem] font-semibold md:mb-3">Welcome to candidly</h1>
            <p className="w-[50%] mx-auto md:mx-0 md:w-full md:text-[0.9rem] text-textColor">Drop your anonymous messages below</p>
        </div>
        <div className="md:flex">
            <div className=" md:pt-24 text-center order-2">
                <h1 className="text-[1.2rem] md:text-[1.1rem] mb-4 font-semibold md:mb-5">Tips for messages</h1>
                <div className="px-2 md:px-0" >
                    <div className="flex items-start md:w-[60%] mx-auto gap-5 text-left mb-4">
                        <Image src={`/vector.png`} width={20} height={20} className="hidden md:block"/>
                        <p className=" md:text-[0.9rem] text-textColor">Avoid sharing personal information; even seemingly harmless
                         information could be used to identify you</p>
                    </div>
                    <div className="flex items-start md:w-[60%] mx-auto gap-5 text-left mb-4">
                        <Image src={`/vector.png`} width={20} height={20} className="hidden md:block"/>
                        <p className="md:text-[0.9rem] text-textColor">Avoid sharing personal photos or images that can be reverse-searched to
                            identify you. Stick to generic avatars if possible.
                        </p>
                    </div>
                    <div className="flex items-start md:w-[60%] mx-auto gap-5 text-left mb-4">
                        <Image src={`/vector.png`} width={20} height={20} className="hidden md:block"/>
                        <p className="md:text-[0.9rem] text-textColor">
                            (OPTIONAL) Consider using a VPN to hide your IP address and location,
                            This adds an extra layer of privacy.
                        </p>
                    </div>
                </div>
            </div>
            <MessageForm userId={params} />
        </div>
    </section>
  );
};

export default page;
