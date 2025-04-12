//  services/openaiService.js =>corrected

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,

  dangerouslyAllowBrowser: true});

// Generate a task from text
export const generateTaskFromText = async (text) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Convert the following text into a task: "${text}"`,
        },
      ],
      max_tokens: 50,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating task:", error);
    throw error;
  }
};
export const generateProductivityInsights = async (tasks) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Analyze the following tasks and provide productivity insights: ${JSON.stringify(
            tasks
          )}`,
        },
      ],
      max_tokens: 250,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating insights:", error);
    throw error;
  }
};
