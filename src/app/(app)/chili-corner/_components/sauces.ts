import { StaticImageData } from "next/image";

import painapplePhoto from "../_assets/painapple/_DSC8626.jpg";
import painappleAI1 from "../_assets/painapple/DALL-E 2024-07-13 16.21.34.webp";
import painappleAI2 from "../_assets/painapple/DALL-E 2024-07-13 17.11.54.webp";
import painappleAI3 from "../_assets/painapple/DALL-E 2024-07-13 17.37.13.webp";
import painappleAI4 from "../_assets/painapple/DALL-E 2024-07-13 18.06.16.webp";
import painappleAI5 from "../_assets/painapple/DALL-E 2024-07-13 18.32.25.webp";

import blueberryBlazePhoto from "../_assets/blueberry-blaze/_DSC8619.jpg";
import blueberryBlazeAI1 from "../_assets/blueberry-blaze/DALL-E 2024-07-26 22.08.20.webp";
import blueberryBlazeAI2 from "../_assets/blueberry-blaze/DALL-E 2024-07-26 23.04.56.webp";
import blueberryBlazeAI3 from "../_assets/blueberry-blaze/DALL-E 2024-07-26 23.06.02.webp";
import blueberryBlazeAI4 from "../_assets/blueberry-blaze/DALL-E 2024-07-26 23.06.10.webp";
import blueberryBlazeAI5 from "../_assets/blueberry-blaze/DALL-E 2024-07-26 23.06.17.webp";

export interface SauceRecipe {
  name: string;
  tagline: string;
  image: StaticImageData;
  description: string;
  aiImagesDescription: string;
  aiImages: StaticImageData[];
}

export const sauces: SauceRecipe[] = [
  {
    name: "Painapple",
    tagline:
      "Carolina Reaper and Ghost Pepper fermented with pineapple and spices",
    image: painapplePhoto,
    description: `
This sauce started as my first fermenting project. For the first batch I used Bhut Jolokia White and Fatalii White chilies, 
but for the second batch I switched to Carolina Reaper and Ghost pepper.

For the fermentation step I left the chilies with pineapple, garlic, onions, cloves and anise sit in a saline solution for a few weeks.
After the fermentation I cooked the mixture with some vinegar, honey and more spices like cumin, turmeric, coriander seeds and allspice.

The result is a spicy sauce with the fruity base of pineapple, savory notes from the spices and a lingering heat from the chilies.
It goes very well with everything curry related, but also with grilled meats and vegetables.

### Ingredients fermentation step:
- Carolina Reaper
- Ghost pepper
- Pineapple
- Garlic
- Onion
- Cloves
- Star anise
- Salt
- Water

### Ingredients cooking step:
- Fermented chilies and pineapple
- Vinegar
- Honey
- Cumin
- Turmeric
- Coriander seeds
- Allspice
- Cloves
- Fenugreek
- (extra pineapple as the sauce was too hot)
`,
    aiImagesDescription: `
## AI Interpretation

As I’m no designer, I had fun with the ChatGPT 4o language model and the
embedded DALL-E model to generate some AI images of the sauce. 
I started with just the sauce name "Painapple" and got the cute pineapple character.
After adding more details like that it is a hot sauce and the base ingredients I got 
actual images from a hot sauce bottle. Getting something printable or just the label 
needed more work, and especially with text the limits of current AI models get obvious.
`,
    aiImages: [
      painappleAI1,
      painappleAI2,
      painappleAI3,
      painappleAI4,
      painappleAI5,
    ],
  },
  {
    name: "Blueberry Blaze BBQ Sauce",
    tagline: "Smoking hot barbecue sauce with the fruitiness of blueberries",
    image: blueberryBlazePhoto,
    description: `
My goal was to create a barbecue sauce with a twist, so I decided to use blueberries as the base. And as I'm still cooking hot sauces 
I added Carolina Reaper and Ghost pepper chilies for heat. The result is a sweet and spicy barbecue sauce that goes well with grilled meats.

When the sauce hits your tongue, in the first moment you get the sweetness and fruitiness of the blueberries, accompanied by a note of smokiness.
Then the heat kicks in and the general taste moves towards a more savory profile.

### Ingredients:
- Blueberries
- Balsamic vinegar
- Honey
- Carolina Reaper
- Ghost pepper
- Maple syrup
- Cane sugar
- Onion
- Garlic
- Salt
- Allspice
- Juniper berries
- Liquid Smoke
- Cloves
- Star anise
`,
    aiImagesDescription: `
## AI Interpretation

The name "Blueberry Blaze BBQ Sauce" already includes all necessary details for the AI, so 
I directly got an image of a barbecue sauce bottle. The problems are again visible with the 
text parts, especially when I added all ingredients to the context.
`,
    aiImages: [
      blueberryBlazeAI1,
      blueberryBlazeAI2,
      blueberryBlazeAI3,
      blueberryBlazeAI4,
      blueberryBlazeAI5,
    ],
  },
];
