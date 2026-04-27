const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function bedömSvar({ fråga, elevensSvar, modelSvar }) {
  const response = await fetch(`${PROXY_URL}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system:
        'Du är en tålmodig mattelärare för åk 6 i Sverige. Eleven har fått en uppgift och skrivit sitt svar och resonemang. Bedöm om resonemanget är matematiskt korrekt. Ge kort, uppmuntrande feedback på svenska anpassad för en 11-åring. Svara ENDAST med giltig JSON utan markdown: {"correct": boolean, "feedback": string, "hint": string}',
      messages: [
        {
          role: 'user',
          content: `Uppgift: ${fråga}\n\nElevens svar: ${elevensSvar}\n\nFacitsvar (för din bedömning): ${modelSvar}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API-fel ${response.status}: ${text}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? '';
  return JSON.parse(text);
}
