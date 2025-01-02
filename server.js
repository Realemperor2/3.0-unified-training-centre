import express from 'express';
import OpenAI from 'openai';

const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

app.use(express.json());

app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      model: 'meta/llama-3.3-70b-instruct',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    let result = '';
    for await (const chunk of completion) {
      result += chunk.choices[0]?.delta?.content || '';
    }
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
