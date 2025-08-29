import axios from "axios";

export async function generateDescription(
  title: string,
  type: string,
  bathrooms: string,
  bedrooms: string,
  price: string
) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-4-maverick:free",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that generates a short, engaging description for a house property. The description should sound like something an agent would say — professional, inviting, and clear.It should highlight the property’s key features without sounding like a hard sell. Use the provided title and details (bedrooms, bathrooms, title and price) naturally in the description. Return only the description, no additioner texts",
          },
          {
            role: "user",
            content: `Title: ${title}, Type: ${type}, Bathroom: ${bathrooms}, Rooms: ${bedrooms}, Price: ${price} naira /year`,
          },
        ],
        max_tokens: 60,
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
      }
    );
    //console.log(response.data);
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error(
      "Error generating description:",
      error.response?.data || error.message
    );
    return null;
  }
}
