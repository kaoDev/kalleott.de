import { NestedPage } from "@/components/nested-page";
import { SubscribeToUpdatesFormWithoutText } from "../../components/subscribe-to-updates-form";
import { Sauce } from "./_components/sauce";
import { sauces } from "./_components/sauces";
import { Prose } from "@/components/prose";
import chiliCorderHeroImage from "./_assets/chili-corner.webp";
import Image from "next/image";

export default async function ChiliCorner() {
  return (
    <NestedPage>
      <article className="mb-32">
        <h1 className="blog-title mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
          Kalle’s Chili 🌶️ Corner
        </h1>

        <div className="mb-8 sm:mx-0 md:mb-16">
          <Image
            src={chiliCorderHeroImage}
            alt={`AI generated image for the term "Kalle's Chili Corner"`}
            className="blog-cover-image w-full shadow-sm"
            sizes="(max-width: 1500px) 100vw, 1500px"
          />
        </div>
        <Prose>
          <p>
            A few years ago I started growing my own chilies and it kind of got
            out of hand. I had too many chilies to eat fresh, so I started
            looking for recipes to get an understanding of the composition of
            hot sauces and started experimenting.
          </p>
          <p>
            I started giving away bottles to friends and family, if you are
            interested in trying some, let me know!
          </p>
          <p>
            If you don’t want to miss the next batch of hot sauce, leave your
            email below.
          </p>
          <div className="mb-20">
            <SubscribeToUpdatesFormWithoutText />
          </div>

          <div className="mb-32">
            {sauces.map((sauce) => (
              <Sauce key={sauce.name} recipe={sauce} />
            ))}
          </div>
        </Prose>
      </article>
    </NestedPage>
  );
}
