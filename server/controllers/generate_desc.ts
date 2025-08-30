import axios from "axios";
import { Request, Response } from "express";

interface CustomeReq extends Request {
  body: {
    title: string;
    type: string;
    bathrooms: string;
    bedrooms: string;
    price: string;
  };
}

const generateDescription = async (req: CustomeReq, res: Response) => {
  const { title, type, bathrooms, bedrooms, price } = req.body;
  if (!(title || type || bathrooms || bedrooms || price)) {
    res.status(400).json({
      success: false,
      message:
        "Please provide title, type etc to generate a better description",
    });
    return;
  }

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
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Descrption generated succesfully",
      result: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating description",
    });
  }
};

export default generateDescription;
