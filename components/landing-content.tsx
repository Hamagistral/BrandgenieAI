"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "David Miller",
    avatar: "D",
    title: "Co-Founder, SparkleJewels Boutique",
    description: "Partnering with this AI assistant was like having a branding expert on speed dial. The brand name suggestions were so appealing that we had a tough time choosing just one. A fantastic resource for crafting a strong brand identity.",
    stars: 5
  },
  {
    name: "Sarah Lee",
    avatar: "S",
    title: "Owner, BlossomBakery Delights",
    description: "The brand name ideas provided by this AI branding assistant were nothing short of creative genius. The video and music generated helped us connect with our audience more effectively. A must-have tool for anyone in the world of e-commerce!",
    stars: 4
  },
  {
    name: "Mark",
    avatar: "M",
    title: "Founder, TrendSpark Apparel",
    description: "As a startup, finding the right brand identity was crucial for us. The branding suggestions we received from this AI assistant were beyond our expectations. Our brand's success story wouldn't be complete without this assistant's valuable input!",
    stars: 5
  },
  {
    name: "Jane Smith",
    avatar: "J",
    title: "CEO, TechGlobe Solutions",
    description: "Using this AI branding assistant was a game-changer for our e-commerce store. The brand name suggestions were spot-on, and the slogans were both catchy and unique. Highly recommended for any business looking to enhance their brand!",
    stars: 4
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: item.stars }, (_, index) => (
                    <Star key={index} fill="white"/>
                  ))}
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}