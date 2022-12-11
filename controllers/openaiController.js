const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
      size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};
const generateTalk = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    // console.log(response.data.choices[0].text, "response");

    const resText = response.data.choices[0].text;

    res.status(200).json({
      success: true,
      data: resText,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};
module.exports = { generateImage, generateTalk };
