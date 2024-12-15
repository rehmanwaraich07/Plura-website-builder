"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Plura has revolutionized how we manage projects, providing intuitive tools that make our work much more efficient.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/client/client-1.jpeg",
    },
    {
      quote:
        "The platform’s user-friendly design helped us get up and running quickly, and its features exceeded our expectations.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/client/client-2.jpeg",
    },
    {
      quote:
        "Plura’s seamless integration with our existing workflow has significantly boosted our productivity and collaboration.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/client/client-3.jpeg",
    },
    {
      quote:
        "Plura’s support team has been incredibly responsive. The robust features truly set it apart from other solutions.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/client/client-4.jpeg",
    },
    {
      quote:
        "The performance and scalability of Plura are unparalleled. It has been a game-changer for our business growth.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
