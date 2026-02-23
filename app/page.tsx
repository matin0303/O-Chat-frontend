"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from 'framer-motion'
import CommentsCards from "@/components/homePage/CommentsCards";
import CTAButton from "@/components/ui/CtaBtton";

export default function Home() {
  const pathRef = useRef<SVGPathElement>(null);

  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);



    if (!pathRef.current) return;

    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length}`;

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".spotLight",
        start: "top 75%",
        end: "bottom bottom",
        scrub: true,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full max-w-[1520px] h-full min-h-screen box-border z-100 text-white">
      
      <section className="hero w-full flex justify-center items-center flex-col gap-7 h-130">
        <h1 className="font-metropolis text-9xl">O-Chat</h1>
        <h2 className="font-apex text-2xl w-full text-center">Fast, fluid, and fun. Experience the most seamless way to stay connected with the world in real-time.</h2>
        <CTAButton/>
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          }}
          animate={{
            x: -300,
            y: 100,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 50,
          }}
        />

        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
          }}
          animate={{
            x: 300,
            y: 200,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 50,
          }}
        />
      </section>
      <section className="spotLight lg:h-[3200px] z-100">
        <div className="w-full flex justify-center items-center ">
          <img className="w-100 h-100 aspect-square ml-120 z-100" src="/img/pic1.svg" alt="pic1" />
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-20 font-vladB font-md">
          <h3 className="font-apex text-7xl mb-10 z-100">Why O-chat ?!</h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{}}
            className="sm:max-w-1/2 leading-8 z-100 text-center"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fugit cumque, explicabo obcaecati odio perspiciatis deserunt necessitatibus porro ducimus facilis soluta esse possimus rerum omnis. Ipsum sapiente necessitatibus odio fugit, incidunt iste quos similique sunt doloremque quam perferendis voluptate a officiis. Unde tempora dolorem incidunt ipsam distinctio impedit minus sequi quo dolor omnis, quis soluta?
          </motion.p>
        </div>

        <div className="w-full flex justify-end items-center max-lg:flex-col-reverse sm:mt-70 font-vladB font-md">
          <div className="w-full flex flex-col justify-center items-center ">
            <h3 className="font-apex text-7xl mb-10 z-100">Support 24 / 7</h3>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
              viewport={{}}
              className=" leading-8 z-100 text-center px-3"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fugit cumque, explicabo obcaecati odio perspiciatis deserunt necessitatibus porro ducimus facilis soluta esse possimus rerum omnis. Ipsum sapiente necessitatibus odio fugit, incidunt iste quos similique sunt doloremque quam perferendis voluptate a officiis. Unde tempora dolorem incidunt ipsam distinctio impedit minus sequi quo dolor omnis, quis soluta?
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fugit cumque, explicabo obcaecati odio perspiciatis deserunt necessitatibus porro ducimus facilis soluta esse possimus rerum omnis. Ipsum sapiente necessitatibus odio fugit, incidunt iste quos similique sunt doloremque quam perferendis voluptate a officiis. Unde tempora dolorem incidunt ipsam distinctio impedit minus sequi quo dolor omnis, quis
            </motion.p>
          </div>

          <div className=" flex justify-end items-center">
            <img className="w-150 h-150 aspect-square lg:ml-120 z-100 lg:mr-20" src="/img/pic2.svg" alt="pic2" />
          </div>
        </div>

        <div className="w-full flex justify-start items-center mt-20 lg:mt-40 max-lg:flex-col font-vladB font-md">
          <img className="w-120 h-120 aspect-square lg:ml-50 z-100" src="/img/pic3.svg" alt="pic3" />

          <div className="w-full flex justify-center items-center flex-col z-100 lg:mt-70">
            <h3 className="font-apex text-7xl text-center mb-10">Secure connection</h3>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{}}
              className=" leading-8 text-center px-3"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fugit cumque, explicabo obcaecati odio perspiciatis deserunt necessitatibus porro ducimus facilis soluta esse possimus rerum omnis. Ipsum sapiente necessitatibus odio fugit, incidunt iste quos similique sunt doloremque quam perferendis voluptate a officiis. Unde tempora dolorem incidunt ipsam distinctio impedit minus sequi quo dolor omnis, quis soluta?
            </motion.p>
          </div>
        </div>

        <div className="relative w-full flex flex-col justify-center items-start font-vladB font-md mt-20">

          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            }}
            animate={{
              x: -20,
              y: 100,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 50,
            }}
          />

          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            }}
            animate={{
              x: 300,
              y: 200,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 50,
            }}
          />

          <h3 className="font-apex text-7xl w-full max-lg:mt-20 lg:w-1/2 text-center lg:ml-5">Users Comment</h3>
          <div className="w-full flex justify-start itemas-center z-100 lg:ml-15">
            <CommentsCards />
          </div>
        </div>

        <div className="w-full flex justify-end items-center ">
          <img className="w-120 h-120 aspect-square mr-10 z-100" src="/img/pic4.svg" alt="pic4" />
        </div>
      </section>
      <section className="outro h-30"></section>
      <div className="w-full h-full absolute top-150 left-1/2 -translate-x-1/2 max-sm:w-[200%]">
        <svg width="1322" height="3130" viewBox="0 0 1322 3130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path ref={pathRef} d="M970.796 124.725C970.796 124.725 293.987 30.5373 133.948 428.404C-60.1964 911.057 1304.43 825.308 1200.46 1338.9C1108.87 1791.37 75.4453 2449.4 309.945 1825.4C496.771 1328.27 1194.93 3014.9 1194.93 3014.9" stroke="url(#paint0_linear_773_690)" strokeWidth="200" strokeLinecap="round" />
          <defs>
            <linearGradient id="paint0_linear_773_690" x1="794.378" y1="91.0098" x2="794.378" y2="1924.01" gradientUnits="userSpaceOnUse">
              <stop offset="0.269231" stopColor="#65007A" />
              <stop offset="0.757792" stopColor="#A200FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}




