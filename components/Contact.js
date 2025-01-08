import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-base-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
        <form className="space-y-4 max-w-lg mx-auto">
          <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
          <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
          <textarea placeholder="Your Message" className="textarea textarea-bordered w-full"></textarea>
          <button className="btn btn-primary w-full">Send</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
