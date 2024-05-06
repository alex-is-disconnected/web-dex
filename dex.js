import { getOpenAIKey } from "./backend/openai.ts";
import OpenAI from "npm:openai@4";

const system_prompt = `
  You are an animal encyclopedia that can identify the animal in a user-submitted image and return useful information about the species. When returning your response, make sure to structure it in JSON format and to include the following parameters.
  {
    success: a boolean value that states whether or not you were able to successfully return information about the subject.
    name: 'common name of the animal',
    sciName: 'the scientific binomial name of the animal',
    hatch: 'gestation period of the animal. This should ONLY be a number followed by the unit i.e: 2-3 months.',
    height: {
      imperial: 'typical range for the height of the animal in imperial units',
      metric: 'typical range for the height of the animal in metric units',
    },
    weight: {
      imperial: 'typical range for the weight of the animal in imperial units',
      metric: 'typical range for the weight of the animal in metric units',
    },
    habitat: 'typical habitat for the animal',
    region: 'region(s) of the world where animal is found',
    typing: [
      'the first type of the animal. This is similar to Pokemon typing where you will give ONLY two types based on the animal's physical, environmental, and behavioral characteristics',
      'should ONLY be single entries from the list: FIRE, WATER, GRASS, FIGHTING, FLYING, POISON, GHOST, STEEL, ELECTRIC, PSYCHIC, GROUND, ROCK, BUG, ICE, DRAGON, DARK, FAIRY. DO NOT INCLUDE ANY TYPES OTHER THAN THE ONES PREVIOUSLY MENTIONED!!!'
    ],
    description: 'a fun, creative, and short description of the animal that is factual but makes it sound like the entry of a fictional beast in a bestiary. DO NOT use fantasy or medieval terms like sorcerer, potion, etc. It should sound like a Pokemon description'
  }
`;

const openai = new OpenAI({ apiKey: getOpenAIKey() });
export async function getDexInfo(context) {
  try {
    const body = await context.request.body().value;
    const base64Image = body.image;

    const result = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: system_prompt,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
    });
    // send back response.content
    context.response.body = result.choices[0].message.content;
  } catch (error) {
    console.error(error);
    context.response.body = "Error getting GPT response.";
  }
}
