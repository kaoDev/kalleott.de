import Image from "next/image";
import { SauceRecipe } from "./sauces";
import { Prose } from "@/components/prose";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { parseMarkdown } from "@/lib/parseMarkdown";

export namespace Sauce {
  export interface Props {
    recipe: SauceRecipe;
  }
}

export async function Sauce({ recipe }: Sauce.Props) {
  const description = await parseMarkdown(recipe.description);
  const aiDescription = await parseMarkdown(recipe.aiImagesDescription);

  return (
    <Prose>
      <h2 className="text-3xl font-bold">{recipe.name}</h2>
      <p>{recipe.tagline}</p>

      <Image
        src={recipe.image}
        alt={recipe.name}
        sizes="(max-width: 42rem) 100vw, 42rem"
      />
      {description}
      {aiDescription}
      <Carousel>
        <CarouselContent>
          {recipe.aiImages.map((image, index) => (
            <CarouselItem key={index} className="flex items-center">
              <Image
                src={image}
                alt={recipe.name}
                sizes="(max-width: 42rem) 100vw, 42rem"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Prose>
  );
}
