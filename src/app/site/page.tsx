import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="pb-16 md:pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="h-full w-full pt-20 md:pt-40 mt-[-10px] relative flex items-center justify-center flex-col">
        {/* grid */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

        <p className="text-center text-sm sm:text-base md:text-lg mb-4 animate-fade-in">
          Run your agency, in one place
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-8xl sm:text-9xl font-bold text-center md:text-[300px] leading-none animate-fade-in-up">
            Plura
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-130px] w-full max-w-[1200px] mx-auto">
          <div className="w-full animate-fade-in-up">
            <Image
              src={"/assets/preview.png"}
              alt="banner image"
              height={1200}
              width={1200}
              className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted relative z-10 w-full h-auto"
              priority
            />
          </div>
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-20" />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="flex justify-center items-center flex-col gap-4 mt-20 md:mt-40 px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <h2 className="text-center text-3xl sm:text-4xl font-bold">
            Choose what fits you right
          </h2>
          <p className="text-muted-foreground text-center text-sm sm:text-base max-w-2xl mt-4">
            Our straightforward pricing plans are tailored to meet your needs.
            If you're not ready to commit, you can get started for free.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
          {pricingCards.map((card, index) => (
            <div
              key={card.title}
              className={clsx(
                "w-full sm:w-[300px] flex flex-col justify-between animate-fade-in-up",
                `animation-delay-${index + 1}`
              )}
            >
              <Card
                className={clsx("h-full", {
                  "border-2 border-primary": card.title === "Unlimited Saas",
                })}
              >
                <CardHeader>
                  <CardTitle
                    className={clsx("", {
                      "text-muted-foreground": card.title !== "Unlimited Saas",
                    })}
                  >
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">{card.price}</span>
                  <span className="text-muted-foreground">/m</span>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="w-full">
                    {card.features.map((feature) => (
                      <div key={feature} className="flex gap-2 items-center">
                        <Check className="text-muted-foreground" />
                        <p className="text-sm">{feature}</p>
                      </div>
                    ))}
                    <div className="mt-8 w-full">
                      <Button
                        className={clsx(
                          "w-full text-center bg-primary p-2 rounded-md",
                          {
                            "!bg-muted-foreground":
                              card.title !== "Unlimited Saas",
                          }
                        )}
                      >
                        <Link href={`/agency?plan=${card.priceId}`}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
