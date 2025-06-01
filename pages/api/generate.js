import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { notes } = req.body;

  const systemPrompt = `
You are a journalistic writing assistant. Follow these exact rules:
- Use only real, verifiable quotes. Never fabricate.
- Write for a general reader on a regional news site.
- Target a 9th-grade reading level.
- Use active voice, strong word choice.
- Short sentences (< 40 words). 1–2 sentences per paragraph.
- Avoid commas, em-dashes, adjectives, adverbs, and editorializing.
- Structure: headline, lead, nut graph, body, subheads, 3–5 sources at end.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Here are my notes:\n${notes}` },
    ],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content;
  res.status(200).json({ result: content });
}