"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"
import { IMAGES } from "@/lib/constants"
import { ArrowRight, MapPin } from "lucide-react"
import ThreeDCarousel from "@/components/ThreeDCarousel"
import { GlowingCards, GlowingCard } from "@/components/ui/glowing-cards"
import { AnimatedText } from "@/components/ui/animated-text"
import { HoverButton } from "@/components/ui/hover-button"
import { RevealSection, StaggerContainer, StaggerItem } from "@/components/ui/reveal-section"

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = value / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return <span ref={ref}>{displayValue}{suffix}</span>
}

function CursorGlow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200)
      cursorY.set(e.clientY - 200)
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0 hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        background: "radial-gradient(circle, hsl(38 85% 55% / 0.06) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  )
}

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-100%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const aboutScale = useTransform(scrollYProgress, [0, 0.25], [0.65, 1])
  const aboutOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen">
      <CursorGlow />
      
      {/* Hero Section */}
      <motion.section
        id="home"
        style={{ y: heroY, opacity: heroOpacity }}
        className="fixed top-0 left-0 right-0 h-screen flex items-center justify-center overflow-hidden z-20 bg-background"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={IMAGES.hero}
            alt="Luxury Architecture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>

        <div className="relative z-30 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block text-primary/80 text-sm tracking-[0.3em] uppercase mb-6 font-medium"
            >
              Luxury Real Estate
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              <AnimatedText text="Redefining" delay={0.3} />
              {" "}
              <span className="text-primary">
                <AnimatedText text="Luxury" delay={0.5} />
              </span>
              {" "}
              <AnimatedText text="Living" delay={0.7} />
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              Experience the pinnacle of architectural excellence with ARKO.
              Where innovative design meets unparalleled craftsmanship.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <HoverButton variant="primary">
                Explore Properties
                <ArrowRight className="w-5 h-5" />
              </HoverButton>
              <HoverButton variant="glass">
                Watch Showreel
              </HoverButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-3 bg-white/60 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.section>

      <div className="h-screen" />

      {/* About Section */}
      <section id="about" className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            style={{ scale: aboutScale, opacity: aboutOpacity }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <RevealSection direction="left">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
                About ARKO
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                <AnimatedText text="Crafting Exceptional Living Spaces" />
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
              
              <StaggerContainer className="grid grid-cols-3 gap-6" staggerDelay={0.15}>
                <StaggerItem className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    <AnimatedCounter value={250} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Projects</div>
                </StaggerItem>
                <StaggerItem className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    <AnimatedCounter value={15} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Awards</div>
                </StaggerItem>
                <StaggerItem className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    <AnimatedCounter value={98} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
                </StaggerItem>
              </StaggerContainer>
            </RevealSection>
            
            <RevealSection direction="right" delay={0.2}>
              <div className="relative group">
                <motion.div 
                  className="glass-effect rounded-3xl p-4 relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={IMAGES.interior1}
                    alt="Luxury Interior"
                    width={600}
                    height={400}
                    className="rounded-2xl object-cover w-full h-[400px]"
                  />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-3xl -z-10"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-3xl -z-10"
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </RevealSection>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-card relative z-10">
        <div className="container mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
              Featured Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              <AnimatedText text="Signature Developments" />
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our portfolio of distinguished properties, each representing
              the pinnacle of luxury living and architectural innovation.
            </p>
          </RevealSection>

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
                  description: "Reaching for the clouds, this architectural marvel defines the new standard of vertical luxury in the heart of Dubai.",
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

          <RevealSection className="text-center mt-12 flex justify-center">
            <HoverButton variant="dark">
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </HoverButton>
          </RevealSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              <AnimatedText text="Comprehensive Excellence" />
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From concept to completion, we offer a full spectrum of services
              tailored to bring your vision to life.
            </p>
          </RevealSection>

          <GlowingCards gap="1.5rem" responsive={true}>
            {[
              { icon: "🏗️", title: "Architecture", desc: "Award-winning architectural design that pushes boundaries", color: "#d4af37" },
              { icon: "🎨", title: "Interior Design", desc: "Bespoke interior solutions tailored to your lifestyle", color: "#d4af37" },
              { icon: "🏡", title: "Development", desc: "Full-scale property development from vision to reality", color: "#d4af37" },
              { icon: "🔑", title: "Consultation", desc: "Expert real estate advisory for informed decisions", color: "#d4af37" },
            ].map((service) => (
              <GlowingCard key={service.title} glowColor={service.color}>
                <div className="flex flex-col items-center text-center">
                  <motion.span
                    className="text-5xl mb-6 block"
                    whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {service.icon}
                  </motion.span>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </GlowingCard>
            ))}
          </GlowingCards>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={IMAGES.architecture}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            background: [
              "radial-gradient(circle at 20% 50%, hsl(38 85% 55% / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, hsl(38 85% 55% / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, hsl(38 85% 55% / 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <RevealSection className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              <AnimatedText text="Ready to Find Your Dream Home?" />
            </h2>
            <p className="text-background/70 text-lg mb-10">
              Connect with our team of experts and begin your journey
              towards exceptional living today.
            </p>
            <HoverButton variant="primary" className="text-lg px-10">
              Schedule a Consultation
            </HoverButton>
          </RevealSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <RevealSection direction="left">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                <AnimatedText text="Let's Create Something Extraordinary" />
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Whether you&apos;re looking for your dream home or interested in our
                development services, we&apos;re here to help.
              </p>
              
              <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                {[
                  { icon: <MapPin className="w-5 h-5 text-primary" />, label: "Address", value: "123 Luxury Lane, Beverly Hills, CA" },
                  { icon: <span className="text-primary">📧</span>, label: "Email", value: "hello@arko-realty.com" },
                  { icon: <span className="text-primary">📞</span>, label: "Phone", value: "+1 (310) 555-0123" },
                ].map((item) => (
                  <StaggerItem key={item.label}>
                    <motion.div 
                      className="flex items-center gap-4 group cursor-pointer"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-muted-foreground">{item.value}</div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </RevealSection>
            
            <RevealSection direction="right" delay={0.2}>
              <motion.div 
                className="glass-effect rounded-3xl p-8"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                    />
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                  />
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none"
                  />
                  <HoverButton variant="primary" className="w-full rounded-xl">
                    Send Message
                  </HoverButton>
                </form>
              </motion.div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-2xl font-serif font-bold text-foreground"
              whileHover={{ scale: 1.05 }}
            >
              ARKO
            </motion.div>
            <div className="text-muted-foreground text-sm">
              © 2024 ARKO Real Estate. All rights reserved.
            </div>
            <div className="flex gap-4">
              {["Instagram", "LinkedIn", "Twitter"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
