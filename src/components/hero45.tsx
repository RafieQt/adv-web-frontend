import {
  Cpu,
  ShieldCheck,
  Truck,
  BadgeDollarSign,
} from "lucide-react";
import React, { ElementType } from "react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroFeatureImage {
  src: string;
  alt: string;
  label?: string;
}

interface Feature {
  title: string;
  description: string;
  icon: ElementType<{ className?: string }>;
}

interface HeroFeatureIconsProps {
  badge?: string;
  heading: string;
  subheading?: string;
  features?: Feature[];
  images: [HeroFeatureImage, ...HeroFeatureImage[]];
  className?: string;
}

type Props = Partial<HeroFeatureIconsProps>;

const defaultProps: HeroFeatureIconsProps = {
  badge: "E-commerce Platform",
  heading: "Welcome to E-commerce Management Web",
  subheading:
    "Discover latest gadgets, smart devices, and high-quality electronics at unbeatable prices.",
  features: [
    {
      title: "Latest Technology",
      description: "Explore modern gadgets and cutting-edge electronics.",
      icon: Cpu,
    },
    {
      title: "Secure Payments",
      description: "100% safe and secure transactions with trusted systems.",
      icon: ShieldCheck,
    },
    {
      title: "Fast Delivery",
      description: "Quick and reliable delivery across the country.",
      icon: Truck,
    },
    {
      title: "Best Prices",
      description: "Affordable pricing with exciting deals and offers.",
      icon: BadgeDollarSign,
    },
  ],
  images: [
    {
      src: "https://images.ctfassets.net/wowgx05xsdrr/FuyuOgIBjnHyehF0IR8zY/8109414c34065431d14886a5aad2f60a/Article-Header_Ecommerce_Website.jpg?fm=webp&w=3840&q=75",
      alt: "Electronics banner",
      label: "Tech Banner",
    },
  ],
};

const MAX_FEATURES = 4;

const Hero45 = (props: Props) => {
  const { badge, heading, subheading, features, images, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleFeatures = (features ?? []).slice(0, MAX_FEATURES);

  return (
    <section className={cn("py-4 md:py-8", className)}>
      <div className="container mx-auto overflow-hidden ">

        {/* HERO TEXT */}
        <div className="mb-12 flex flex-col items-center gap-6 text-center">
          <Badge variant="outline">{badge}</Badge>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight lg:text-5xl">
            {heading}
          </h1>

          <p className="max-w-xl mx-4 md:mx-0 text-muted-foreground">
            {subheading}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-red-500 px-6 py-3 text-white font-medium hover:bg-red-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative mx-4 md:mx-auto max-w-6xl">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="aspect-video max-h-[400px] w-full rounded-2xl object-cover shadow-xl"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
        </div>

        {/* FEATURES */}
        <div className="mx-4 md:mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-2">
          {visibleFeatures.map((feature, index) => (
            <React.Fragment key={feature.title}>
              {index > 0 && index % 2 === 0 && (
                <Separator className="hidden lg:block col-span-4" />
              )}

              <div className="flex flex-col dark:bg-slate-900 items-start rounded-xl border bg-background p-5 shadow-sm hover:shadow-md transition">
                <div className="mb-4 flex dark:bg-gray-800 size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <feature.icon className="w-5 h-5" />
                </div>

                <h3 className="font-semibold">{feature.title}</h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export { Hero45 };