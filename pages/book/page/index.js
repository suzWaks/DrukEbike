import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Banner from "@layouts/components/Banner";
import Cta from "@layouts/components/Cta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import Post from "@partials/Post";
import { useEffect, useRef } from "react";
import Link from 'next/link'
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const { blog_folder } = config.settings;

// blog pagination
const BlogPagination = ({
    postIndex,
    posts,
    authors,
    currentPage,
    pagination,
}) => {
    const indexOfLastPost = currentPage * pagination;
    const indexOfFirstPost = indexOfLastPost - pagination;
    const totalPages = Math.ceil(posts.length / pagination);
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const { frontmatter } = postIndex;
    const { title } = frontmatter;
    const postsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(postsRef.current, {
                opacity: 1,
                duration: 0.5,
            });
        });

        return () => ctx.revert();
    }, []);


    const [paymentMethod, setPaymentMethod] = useState('card');

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');

    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState();

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);

    };

    const sendEmail = (e) => {
        e.preventDefault();
        if (!email) {
            return;
        }
        if (!firstname) {
            return;
        }
        if (!lastname) {
            return;
        }
        if (!phonenumber) {
            return;
        }
        if (!email) {
            return;
        }
        if (!date) {
            return;
        }
        if (!time) {
            return;
        }
        if (!duration) {
            return;
        }


        setIsSending(true);

        const templateParams = {
            from_name: firstname,
            s_name: lastname,
            ph_no: phonenumber,
            email: email,
            date: date,
            time: time,
            duration: duration
        }

        emailjs.send(
            'service_ujvxzxf',
            'template_66imydj',
            templateParams, {
            publicKey: 'vPFh6ZIRKRkAtWoXA'
        }).then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsSending(false);
                setSendSuccess(true);
            },
            (err) => {
                console.log('FAILED...', err);
                setIsSending(false);
                setSendSuccess(false);
            }
        );

        // Clear form fields after submission if needed
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setDate('');
        setTime('');
        setDuration('');
    }

    return (
        <Base title={title}>
            <section className="section pt-0">
                <Banner title={title} />
                <form onSubmit={sendEmail}>
                    <div className="container mt-11 pt-11">
                        <div className="font-[sans-serif] bg-white p-4">
                            <div className="max-w-4xl mx-auto">
                                <div className="text-center">
                                    <h2 className="text-3xl font-extrabold text-[#333] inline-block border-b-4 border-[#333] pb-1">Kindly fill in to book</h2>
                                </div>
                                <div className="mt-12 pt-11">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#333]">01</h3>
                                            <h3 className="text-xl font-bold text-[#333]">Personal Details</h3>
                                        </div>
                                        <div className="md:col-span-2">
                                            <form>
                                                <div className="grid sm:grid-cols-2 gap-5">
                                                    <input type="text" placeholder="First name" required value={firstname} onChange={(e) => setFirstName(e.target.value)}
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                    <input type="text" placeholder="Last name" required value={lastname} onChange={(e) => setLastName(e.target.value)}
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                    <input type="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)}
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                    <input type="number" placeholder="Phone number" required value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#333]">02</h3>
                                            <h3 className="text-xl font-bold text-[#333]">Booking Details</h3>
                                        </div>
                                        <div className="md:col-span-2">
                                            <form>
                                                <div className="grid sm:grid-cols-2 gap-5">
                                                    <input type="date" placeholder="Date" required value={date} onChange={(e) => setDate(e.target.value)}
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                    <select value={time} onChange={handleTimeChange} required
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none">
                                                        <option >Choose time</option>
                                                        <option value="08:00">08:00 AM</option>
                                                        <option value="12:00">12:00 PM</option>
                                                        <option value="15:30">03:30 PM</option>
                                                    </select>
                                                    <select value={duration} onChange={handleDurationChange} required
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none">
                                                        <option >Choose duration</option>
                                                        <option value="1hr">1hr</option>
                                                        <option value="2hr">2hr</option>
                                                        <option value="3hr">3hr</option>
                                                        <option value="whole_day">Whole day</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#333]">03</h3>
                                            <h3 className="text-xl font-bold text-[#333]">Documents</h3>
                                        </div>
                                        <div className="md:col-span-2">
                                            <form>
                                                <div className="grid sm:grid-cols-2 gap-5">
                                                    <label for="uploadFile1"
                                                        className="bg-white  rounded w-full sm:w-[360px] min-h-[160px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 mx-auto font-[sans-serif] m-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mb-6 fill-gray-400" viewBox="0 0 24 24">
                                                            <path
                                                                d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z"
                                                                data-original="#000000" />
                                                            <path
                                                                d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z"
                                                                data-original="#000000" />
                                                        </svg>
                                                        <p className="text-gray-400 font-semibold text-sm">Drag & Drop or <span className="text-[#007bff]">Choose file</span> to
                                                            upload ID copy</p>
                                                        <input type="file" id='uploadFile1' className="hidden" />
                                                        <p className="text-xs text-gray-400 mt-2">PNG, JPG and PDF are Allowed.</p>
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#333]">04</h3>
                                            <h3 className="text-xl font-bold text-[#333]">Payment method</h3>
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <div className="flex items-center">
                                                    <input type="radio" className="w-5 h-5 cursor-pointer" id="card" name="paymentMethod" value="card"
                                                        checked={paymentMethod === 'card'}
                                                        onChange={handlePaymentMethodChange} />
                                                    <label for="card" className="ml-4 flex gap-2 cursor-pointer">
                                                        <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                                                        <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                                                        <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input type="radio" className="w-5 h-5 cursor-pointer" id="mbob" name="paymentMethod" value="mbob"
                                                        checked={paymentMethod === 'mbob'}
                                                        onChange={handlePaymentMethodChange} />
                                                    <label for="mbob" className="ml-4 flex gap-2 cursor-pointer">
                                                        <img src="https://thebhutanese.bt/wp-content/uploads/2020/11/86170542_4035856139774019_7366998609297932288_oS.jpg" className="w-20" alt="mbob" />
                                                        <img src="https://bnb.bt/wp-content/uploads/2023/02/MPay.svg" className="w-20" alt="mpay" />
                                                    </label>
                                                </div>
                                            </div>
                                            {paymentMethod === 'card' && (
                                                <div className="grid sm:grid-cols-4 gap-6 mt-6">
                                                    <div className="col-span-2">
                                                        <input
                                                            type="number"
                                                            placeholder="Card number"
                                                            className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                        />
                                                    </div>
                                                    <input
                                                        type="number"
                                                        placeholder="EXP."
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="CVV"
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                    />
                                                </div>
                                            )}
                                            {paymentMethod === 'mbob' && (
                                                <div className="grid sm:grid-cols-4 gap-6 mt-6">
                                                    <div className="col-span-2">
                                                        <input
                                                            type="number"
                                                            placeholder="Account number"
                                                            className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                        />
                                                    </div>
                                                    <input
                                                        type="number"
                                                        placeholder="Phone No."
                                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex items-center mt-10">
                                                <input id="checkbox1" type="checkbox"
                                                    className="w-4 h-4 mr-3 focus:ring-1 focus:ring-offset-2 focus:ring-[#007bff]" />
                                                <label for="checkbox1" className="text-black text-md">I agree to the <Link href='/terms-policy' className="text-primary">Terms and Conditions</Link></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-end gap-4 mt-12">
                                        <button type="reset" className="px-6 py-3.5 text-sm bg-transparent border-2 text-[#333] rounded-md hover:bg-gray-100">Reset</button>
                                        <button type="submit" className="px-6 py-3.5 text-sm btn btn-primary text-white rounded-md">{isSending ? 'Booking...' : 'Submit Now'}</button>
                                    </div>
                                    <div className="mt-2 text-right w-full pr-4">
                                        {sendSuccess && (
                                            <p className="text-green-600">Booking successful!</p>
                                        )}
                                        {sendSuccess === false && (
                                            <p className="text-red-600">Booking failed. Please try again later.</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <Cta />
        </Base>
    );
};

export default BlogPagination;



// get blog pagination content
export const getStaticProps = async ({ params }) => {
    const currentPage = parseInt((params && params.slug) || 1);
    const { pagination } = config.settings;
    const posts = getSinglePage(`content/${blog_folder}`);
    const postIndex = await getListPage(`content/${blog_folder}/_index.md`);

    return {
        props: {
            pagination: pagination,
            posts: posts,
            currentPage: currentPage,
            postIndex: postIndex,
        },
    };
};
