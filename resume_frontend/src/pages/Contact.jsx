import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        toast.success('Your message has been sent successfully!');
        reset();
    };

    return (
        <div className="min-h-screen bg-base-100 text-gray-200 flex items-center justify-center">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">Get in Touch</h1>
                    <p className="text-lg text-gray-400 mt-2">We'd love to hear from you. Send us a message!</p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="card bg-neutral/80 backdrop-blur-md shadow-2xl border border-primary/20">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4 text-white">Send a Message</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        {...register("name", { required: "Name is required" })}
                                        className={`input input-bordered w-full bg-base-100/50 ${errors.name ? 'input-error' : ''}`}
                                    />
                                    {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                        className={`input input-bordered w-full bg-base-100/50 ${errors.email ? 'input-error' : ''}`}
                                    />
                                    {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                  <textarea
                      placeholder="Your Message"
                      {...register("message", { required: "Message is required" })}
                      className={`textarea textarea-bordered h-32 w-full bg-base-100/50 ${errors.message ? 'textarea-error' : ''}`}
                  ></textarea>
                                    {errors.message && <p className="text-error text-xs mt-1">{errors.message.message}</p>}
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Submit</button>
                            </form>
                        </div>
                    </div>

                    {/* Map and Info */}
                    <div className="space-y-4 flex flex-col justify-between">
                        <div className="card bg-neutral/80 backdrop-blur-md shadow-2xl border border-primary/20">
                            <div className="card-body">
                                <h2 className="card-title text-white">Contact Information</h2>
                                <p className="text-gray-300"><strong>Email:</strong> support@airesumemaker.com</p>
                                <p className="text-gray-300"><strong>Phone:</strong> +(91) 95999-99959</p>
                            </div>
                        </div>
                        <div className="h-64 rounded-lg overflow-hidden shadow-2xl border border-primary/20">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9801477367646!2d77.36951897495666!3d28.630357084180527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce551491b3ce7%3A0x7335d9fcfd4d9db0!2sJAYPEE%20INSTITUTE%20OF%20INFORMATION%20TECHNOLOGY!5e0!3m2!1sen!2sin!4v1759503266538!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;