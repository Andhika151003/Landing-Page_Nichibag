import React from "react";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import { motion as Motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const Servis = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 bg-gradient-to-r from-[#800000] to-[#4a0000] text-white text-center">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <Motion.div
          className="relative z-10 max-w-3xl mx-auto px-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Elevate Your Gifting Experience</h1>
          <p className="mb-6 text-lg">
            Discover our bespoke gifting Serviss, tailored to make every gifting moment memorable.
          </p>
          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold">
            Explore Serviss
          </button>
        </Motion.div>
      </section>

      {/* Our Serviss */}
      <section className="text-center py-16 px-4">
        <Motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold mb-6">Our Serviss</h2>
          <p className="max-w-xl mx-auto mb-10 text-gray-600">
            We offer a range of selections to make your gifting experience seamless and special.
          </p>
        </Motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "🎁 Personalization",
              desc: "Add custom messages to your gift, choose wrapping styles, and more.",
            },
            {
              title: "📦 Curated Selections",
              desc: "Choose from specially designed gift boxes tailored for different occasions.",
            },
            {
              title: "📬 Special Orders",
              desc: "Get help sourcing unique gifts, our team can assist with finding the perfect item.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="border rounded-lg p-6 shadow-sm bg-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <Motion.div
          className="mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-medium">
            Get Started
          </button>
        </Motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 px-4">
        <Motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">
            Our process is simple and designed to make gifting effortless.
          </p>
        </Motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { image: hero1, title: "Select Your Items", desc: "Choose from our curated collection or request special products." },
            { image: hero3, title: "Customize Your Gift", desc: "Add messages, wrapping, and more to make your gift uniquely special." },
            { image: hero2, title: "Delivery", desc: "Enjoy fast, safe packaging and delivery, presented with care." },
          ].map((step, i) => (
            <Motion.div
              key={i}
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <img
                src={step.image}
                alt={step.title}
                className="mx-auto rounded-md mb-4 w-40 h-40 object-cover"
              />
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </Motion.div>
          ))}
        </div>
        <Motion.div
          className="text-center mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium">
            Start Gifting
          </button>
        </Motion.div>
      </section>

      {/* Contact Call to Action */}
      <section className="text-center py-16 px-4">
        <Motion.div
          className="max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Create Something Special?</h2>
          <p className="text-gray-600 mb-6">
            Contact us today to discuss your gifting needs and let us help you create a memorable experience.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium">
            Contact Us
          </button>
        </Motion.div>
      </section>
    </div>
  );
};

export default Servis;
