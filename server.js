import express from 'express';
import OpenAI from 'openai';

const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

app.use(express.json());

app.post('/generate-description', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.completions.create({
      model: 'meta/llama-3.3-70b-instruct',
      prompt: `Provide a detailed description about ${prompt}.`,
      max_tokens: 200,
    });

    res.json({ description: response.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
