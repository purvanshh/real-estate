"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { IMAGES } from "@/lib/constants"
import { ArrowRight, MapPin, Bed, Bath, Square } from "lucide-react"
import ThreeDCarousel from "@/components/ThreeDCarousel"
import { GlowingCards, GlowingCard } from "@/components/ui/glowing-cards"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Hero Parallax - moves up slower for a more deliberate shutter effect
  const heroY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-100%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // About Section Reveal - Scales up more dramatically and takes longer
  const aboutScale = useTransform(scrollYProgress, [0, 0.25], [0.65, 1])
  const aboutOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section with Shutter Effect */}
      <motion.section
        id="home"
        style={{ y: heroY, opacity: heroOpacity }}
        className="fixed top-0 left-0 right-0 h-screen flex items-center justify-center overflow-hidden z-20 bg-background"
      >
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
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Spacer for Fixed Hero */}
      <div className="h-screen" />

      {/* About Section with Reveal Effect */}
      <section id="about" className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            style={{ scale: aboutScale, opacity: aboutOpacity }}
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


          <div className="relative w-full py-10">
            <ThreeDCarousel
              items={[
                {
                  id: 1,
                  title: "The Meridian",
                  brand: "Beverly Hills, CA",
                  description: "An ultra-modern estate featuring panoramic city views, infinity pools, and state-of-the-art smart home integration.",
                  tags: ["Estate", "Smart Home", "Panoramic Views"],
                  imageUrl: IMAGES.project1,
                  link: "#"
                },
                {
                  id: 2,
                  title: "Azure Heights",
                  brand: "Miami Beach, FL",
                  description: "Oceanfront luxury living redefined with floor-to-ceiling glass, private beach access, and resort-style amenities.",
                  tags: ["Oceanfront", "Resort Style", "Miami Modern"],
                  imageUrl: IMAGES.project2,
                  link: "#"
                },
                {
                  id: 3,
                  title: "Skyline Vista",
                  brand: "Manhattan, NY",
                  description: "A penthouse masterpiece offering 360-degree views of the skyline, private elevator access, and rooftop gardens.",
                  tags: ["Penthouse", "City Views", "Rooftop Garden"],
                  imageUrl: IMAGES.project3,
                  link: "#"
                },
                {
                  id: 4,
                  title: "The Pinnacle",
                  brand: "Dubai, UAE",
                  description: "Reaching for the clouds, this architectural marvel defines the new standard of vertical luxury in the heart of Dubia.",
                  tags: ["Skyscraper", "Luxury", "Innovation"],
                  imageUrl: IMAGES.architecture,
                  link: "#"
                },
                {
                  id: 5,
                  title: "Serenity Bay",
                  brand: "Malibu, CA",
                  description: "A secluded coastal retreat blending organic architecture with the raw beauty of the Pacific coastline.",
                  tags: ["Coastal", "Secluded", "Organic Design"],
                  imageUrl: IMAGES.hero,
                  link: "#"
                },
                {
                  id: 6,
                  title: "Urban Oasis",
                  brand: "Tokyo, Japan",
                  description: "A zen-inspired sanctuary in the midst of the bustling metropolis, featuring minimalist design and indoor gardens.",
                  tags: ["Minimalist", "Zen", "Urban Retreat"],
                  imageUrl: IMAGES.interior1,
                  link: "#"
                }
              ]}
              autoRotate={true}
              rotateInterval={5000}
            />
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

          <GlowingCards
            gap="2rem"
            glowRadius={20}
            glowOpacity={0.6}
            animationDuration={300}
            responsive={true}
          >
            {[
              { icon: "🏗️", title: "Architecture", desc: "Award-winning architectural design", color: "#d4af37" },
              { icon: "🎨", title: "Interior Design", desc: "Bespoke interior solutions", color: "#e5e7eb" },
              { icon: "🏡", title: "Development", desc: "Full-scale property development", color: "#d4af37" },
              { icon: "🔑", title: "Consultation", desc: "Expert real estate advisory", color: "#e5e7eb" },
            ].map((service, index) => (
              <GlowingCard
                key={service.title}
                glowColor={service.color}
                className="flex flex-col items-center text-center p-8 cursor-pointer h-full"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              </GlowingCard>
            ))}
          </GlowingCards>
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
