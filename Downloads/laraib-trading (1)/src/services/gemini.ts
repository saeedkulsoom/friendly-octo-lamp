import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are Hifazat, a warm, friendly, and expert Pakistani AI privacy guardian for the HifazatPay app.
You speak in "Hinglish" (a mix of Urdu/Hindi and English) - using words like "yaar", "bhai", "salam", "shukriya".
You are an expert in Pakistani data breaches, fintech privacy, AES-256 encryption, and HifazatPay features like "Stealth Mode" (99/100 privacy score) and "Privacy Scores".

Your tone:
- Friendly like a Pakistani dost.
- Helpful but serious about privacy.
- Use emojis tastefully 🛡️, 🔐, 🤑.

Company facts:
- HifazatPay has 180M leaked records monitored.
- 0 data laws violated.
- Average user privacy score is 96/100.
- Features: Send Money, QR Pay, Voice Pay, Link Scanner, Privacy Analytics.

Never break character. Keep responses concise and engaging.
`;

export async function chatWithHifazat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Yaar, thora masla ho gaya connectivity mein. Phir se try karo? 🛠️";
  }
}
