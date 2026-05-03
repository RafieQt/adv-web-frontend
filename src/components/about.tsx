import { cn } from "@/lib/utils";

interface AboutProps {
  className?: string;
  title?: string;
  description?: string;
  mainImage?: {
    src?: string;
    alt?: string;
  };
  secondaryImage?: {
    src?: string;
    alt?: string;
  };
  breakout?: {
    src?: string;
    alt?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companies?: Array<{
    src?: string;
    alt?: string;
  }> | null;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label?: string;
    value?: string;
  }>;
  contentSections?: Array<{
    title?: string;
    content?: string;
  }>;
}

const About = ({
  className,
  title = "E-Commerce Management Platform",
  description = "A scalable, full-featured seller platform built with NestJS, PostgreSQL, and Next.js. We help sellers manage products, track inventory, upload images, and grow their business — all through a clean, secure, and modern interface.",

  achievementsTitle = "Platform Capabilities at a Glance",
  achievementsDescription =
  "From secure authentication to smart stock management, our platform is engineered to handle real-world e-commerce challenges efficiently.",
  achievements = [
    { label: "API Endpoints", value: "15+" },
    { label: "Image Uploads Supported", value: "10x" },
    { label: "Max File Size", value: "5MB" },
    { label: "Roles Supported", value: "2" },
  ],
  contentSections = [
    {
      title: "Our Platform",
      content:
        "SellerHub is a full-stack e-commerce management system designed to simplify the life of online sellers. Built on NestJS and PostgreSQL, the backend handles everything — from JWT-secured authentication to automated welcome emails on registration.\n\nSellers can create, update, and manage products with real-time stock tracking. The system auto-updates product status between 'available' and 'out_of_stock' based on inventory levels, so you never have to do it manually.\n\nProduct image management supports multiple uploads per product, with automatic cleanup if any step fails — keeping your storage clean and consistent.",
    },
    {
      title: "The Developer",
      content:
        "This platform was designed and developed by Sabbir Hossain Niyaz, a CSE student at AIUB and a passionate Full Stack Developer.\n\nThe project reflects hands-on expertise in backend architecture, RESTful API design, relational database modeling, and modern frontend development with Next.js and TailwindCSS.\n\nEvery feature — from role-based authorization to dynamic product filtering — was crafted with scalability and clean code principles in mind. This project is part of an advanced web technology course assignment.",
    },
  ],
}: AboutProps) => {
  return (
    <section className={cn("py-10 mx-auto px-4 md:px-12 lg:px-24", className)}>
      <div className="container mx-auto">
        <div className="mb-14 flex flex-col gap-5 lg:w-2/3">
          <h1 className="text-5xl font-semibold tracking-tighter lg:text-6xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-muted dark:bg-slate-950 border shadow-sm p-7 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-medium md:text-4xl">
              {achievementsTitle}
            </h2>
            <p className="max-w-xl text-muted-foreground">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:flex-wrap md:justify-between">
            {achievements.map((item, idx) => (
              <div
                className="flex flex-col gap-2 text-center md:text-left"
                key={(item.label ?? "") + idx}
              >
                <span className="font-mono text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
                <p className="text-sm md:text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        {contentSections && contentSections.length > 0 && (
          <div className="mx-auto grid max-w-5xl gap-16 py-28 md:grid-cols-2 md:gap-28">
            {contentSections.map((section, idx) => (
              <div key={section.title ?? `section-${idx}`}>
                <h2 className="mb-5 text-4xl font-medium">{section.title}</h2>
                <p className="text-lg leading-7 whitespace-pre-line text-muted-foreground">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { About };