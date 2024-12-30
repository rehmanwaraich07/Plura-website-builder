import Image from "next/image";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export function About() {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {/* CEO Testimonial Card 2 */}
      <CardSpotlight className="h-96 w-96 relative">
        <div className="relative z-20 flex flex-col items-center text-center">
          {/* Photo */}
          <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
            <Image
              src="/assets/umair.jpg"
              alt="CEO 2"
              width={140}
              height={140}
              className="object-cover object-center w-full h-full"
            />
          </div>
          {/* Name */}
          <p className="text-xl font-bold text-white">Umair Waraich</p>
          {/* Description */}
          <p className="text-neutral-200 mt-2">
            “Plura combines innovation and reliability, helping businesses
            transform challenges into opportunities effortlessly.”
          </p>
        </div>
      </CardSpotlight>

      {/* CEO Testimonial Card 1 */}
      <CardSpotlight className="h-96 w-96 relative">
        <div className="relative z-20 flex flex-col items-center text-center">
          {/* Photo */}
          <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
            <Image
              src="/assets/rehman.jpg"
              alt="CEO 1"
              width={120}
              height={120}
              className="object-cover object-center w-full h-fit"
            />
          </div>
          {/* Name */}
          <p className="text-xl font-bold text-white">M.Rehman Waraich</p>
          {/* Description */}
          <p className="text-neutral-200 mt-2">
            “At Plura, we are committed to creating solutions that simplify
            operations, boost productivity, and drive lasting success.”
          </p>
        </div>
      </CardSpotlight>

      {/* CEO Testimonial Card 3 */}
      <CardSpotlight className="h-96 w-96 relative">
        <div className="relative z-20 flex flex-col items-center text-center">
          {/* Photo */}
          <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
            <Image
              src="/assets/jhon.jpg"
              alt="CEO 2"
              width={140}
              height={140}
              className="object-cover object-center w-full h-full"
            />
          </div>
          {/* Name */}
          <p className="text-xl font-bold text-white">Jhon Jones</p>
          {/* Description */}
          <p className="text-neutral-200 mt-2">
            “Leading with vision, I’ve seen Plura streamline processes and
            empower teams to achieve unmatched efficiency and growth.”
          </p>
        </div>
      </CardSpotlight>
    </div>
  );
}
