"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { IMAGES } from "@/lib/constants"
import { ArrowRight, MapPin, Bed, Bath, Square } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={IMAGES.hero}
            alt="Luxury Architecture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Redefining <span className="text-primary">Luxury</span> Living
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Experience the pinnacle of architectural excellence with ARKO.
              Where innovative design meets unparalleled craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold flex items-center justify-center gap-2 group">
                Explore Properties
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="btn-glass px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold">
                Watch Showreel
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
                About ARKO
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Crafting Exceptional Living Spaces
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                With over two decades of experience, ARKO has established itself as a leader
                in luxury real estate development. We believe that a home should be more than
                just a structure – it should be a sanctuary that reflects your aspirations.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our commitment to excellence drives us to push the boundaries of architecture,
                creating spaces that seamlessly blend aesthetics with functionality.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">250+</div>
                  <div className="text-sm text-muted-foreground mt-1">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground mt-1">Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass-effect rounded-3xl p-4 relative z-10">
                <Image
                  src={IMAGES.interior1}
                  alt="Luxury Interior"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover w-full h-[400px]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
              Featured Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Signature Developments
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our portfolio of distinguished properties, each representing
              the pinnacle of luxury living and architectural innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: IMAGES.project1,
                title: "The Meridian",
                location: "Beverly Hills, CA",
                beds: 5,
                baths: 6,
                sqft: "8,500"
              },
              {
                img: IMAGES.project2,
                title: "Azure Heights",
                location: "Miami Beach, FL",
                beds: 4,
                baths: 5,
                sqft: "6,200"
              },
              {
                img: IMAGES.project3,
                title: "Skyline Vista",
                location: "Manhattan, NY",
                beds: 3,
                baths: 4,
                sqft: "4,800"
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer relative z-10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 rounded-2xl p-2 -m-2"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <Image
                    src={project.img}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-[300px] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="btn-white w-full py-3 bg-white/90 backdrop-blur-md rounded-full text-black font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4" /> {project.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-4 h-4" /> {project.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="w-4 h-4" /> {project.sqft} sqft
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-foreground px-8 py-4 bg-foreground text-background rounded-full font-semibold flex items-center justify-center gap-2 mx-auto group">
              View All Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Comprehensive Excellence
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From concept to completion, we offer a full spectrum of services
              tailored to bring your vision to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🏗️", title: "Architecture", desc: "Award-winning architectural design" },
              { icon: "🎨", title: "Interior Design", desc: "Bespoke interior solutions" },
              { icon: "🏡", title: "Development", desc: "Full-scale property development" },
              { icon: "🔑", title: "Consultation", desc: "Expert real estate advisory" },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={IMAGES.architecture}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-background/70 text-lg mb-10">
              Connect with our team of experts and begin your journey
              towards exceptional living today.
            </p>
            <button className="btn-primary px-10 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg">
              Schedule a Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16"
          >
            <div>
              <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Let&apos;s Create Something Extraordinary
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Whether you&apos;re looking for your dream home or interested in our
                development services, we&apos;re here to help.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-muted-foreground">123 Luxury Lane, Beverly Hills, CA</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">hello@arko-realty.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">📞</span>
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-muted-foreground">+1 (310) 555-0123</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-effect rounded-3xl p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="btn-primary btn-submit w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-serif font-bold text-foreground">ARKO</div>
            <div className="text-muted-foreground text-sm">
              © 2024 ARKO Real Estate. All rights reserved.
            </div>
            <div className="flex gap-4">
              {["Instagram", "LinkedIn", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 text-sm font-medium"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
