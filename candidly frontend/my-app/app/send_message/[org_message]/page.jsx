import Link from "next/link";
import Image from "next/image";
import MessageForm from "@/components/MessageForm";

const page = ({params}) => {
  return (
    <section className=" px-10 ">
        <div className="pt-10 pb-10">
            <h1 className="text-[1.3rem] font-semibold mb-3">Welcome to candidly</h1>
            <p className="text-[0.9rem] text-textColor">Drop your anonymous messages below</p>
        </div>
        <div className="flex">
            <MessageForm userId={params} />
            <div className=" pt-24 text-center">
                <h1 className="text-[1.1rem] font-semibold md:mb-5">Tips for messages</h1>
                <div >
                    <div className="flex items-start md:w-[60%] mx-auto gap-5 text-left mb-4">
                        <Image src={`/vector.png`} width={20} height={20}/>
                        <p className="text-[0.9rem] text-textColor">Avoid sharing personal information; even seemingly harmless
                         information could be used to identify you</p>
                    </div>
                    <div className="flex items-start md:w-[60%] mx-auto gap-5 text-left mb-4">
                        <Image src={`/vector.png`} width={20} height={20}/>
                        <p className="text-[0.9rem] text-textColor">Avoid sharing personal photos or images that can be reverse-searched to
                            identify you. Stick to generic avatars if possible.
                        </p>
                    </div>
                    <div className="flex items-start md:w-[60%] mx-auto gap-5 text-left mb-4">
                        <Image src={`/vector.png`} width={20} height={20}/>
                        <p className="text-[0.9rem] text-textColor">
                            (OPTIONAL) Consider using a VPN to hide your IP address and location,
                            This adds an extra layer of privacy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default page;
