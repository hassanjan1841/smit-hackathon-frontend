import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    title: "Empowering Dreams",
    description:
      "Providing financial support to turn your aspirations into reality.",
    image: "/hero-1.jpg",
  },
  {
    id: 2,
    title: "Building Futures",
    description: "Invest in your education and secure a brighter tomorrow.",
    image: "/hero-2.jpg",
  },
  {
    id: 3,
    title: "Supporting Businesses",
    description: "Fueling entrepreneurship with tailored financial solutions.",
    image: "/hero-3.jpg",
  },
];

const HeroSlider = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[60vh] w-full"
            >
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl">{slide.description}</p>
              </div>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HeroSlider;
