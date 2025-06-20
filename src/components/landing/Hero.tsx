import { Button } from "@/components/ui/shadcn/button";
import { Link } from "@/navigation";
import { Cross } from "lucide-react";
import React from "react";

interface Hero115Props {
  icon?: React.ReactNode;
  heading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const Hero = ({
  icon = <Cross className="size-6" />,
  heading = "Reslan Alnaal Health Care & Medical Center",
  description = "Manage your center appointments , patients , employees & doctors , payrolls , attendance  , vacations and holidays all in one place. Crafted with ❤️ By Khaldoun Alhalabi",
  imageSrc = "/hero.png",
  imageAlt = "placeholder",
}: Hero115Props) => {
  return (
    <section className="py-32 h-fit w-fit">
      <div className="container">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
              {icon}
            </span>
            <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium text-balance md:text-6xl">
              {heading}
            </h2>
            <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
              {description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <Link href={"/doctor"}>
                <Button size="lg">Continue as a doctor</Button>
              </Link>
              <Link href={"/secretary"}>
                <Button size="lg" variant={"secondary"}>
                  Continue as a secretary
                </Button>
              </Link>
            </div>
          </div>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="mx-auto h-full max-h-[524px] w-full max-w-5xl rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
