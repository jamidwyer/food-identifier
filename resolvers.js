require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const resolvers = {
  Mutation: {
    recognizeImage: async (_, { image }) => {
      try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "What is the name, brand, quantity, and unit of the food in this image, in the format {\"name\": \"name\", \"unit\": \"unit\", \"quantity\": \"quantity\"}?" },
                  {
                    type: "image_url",
                    image_url: {
                      "url": image
                    },
                  },
                ],
              },
            ],
        });
        const messageContent = response.choices[0].message.content;
        const formattedContent = messageContent.replace(/[']/g, "");
        const { name, unit, quantity } = JSON.parse(formattedContent);

        return {
          name, 
          unit,
          quantity
        };
      } catch (error) {
        console.log(error);
        console.error("Error calling OpenAI Vision API:", error);
        throw new Error("Failed to recognize image.");
      }
    },
  },
};

module.exports = resolvers;

