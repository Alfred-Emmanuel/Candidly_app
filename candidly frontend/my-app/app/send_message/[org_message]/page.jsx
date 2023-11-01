import Link from "next/link";
import Image from "next/image";
import MessageForm from "@/components/MessageForm";
// import { NewPasswordForm } from "@/components/NewPasswordForm";

const page = ({params}) => {
  return (
    <section className=" px-10 ">
        <div>
            <h1>Welcome to candidly</h1>
            <p>Drop your anonymous messages below</p>
        </div>
        <div className="flex">
            <MessageForm userId={params} />
            <div>
                <h1>Tips for messages</h1>
                <div>
                    <div className="flex items-center gap-5">
                        <p>Avoid sharing personal information; even seemingly harmless information could be used to identify you</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default page;
