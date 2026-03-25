import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const analisisGejalaLuar = async (imageFile: File, deskripsi: string) => {
  try {
    // 🔄 Convert gambar ke base64
    const toBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const base64 = await toBase64(imageFile);

    // 🤖 Request ke Gemini (MODEL SUDAH FIX)
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // 🔥 MODEL TERBARU (INI KUNCI FIX)
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `WAJIB:
- Jawab hanya JSON
- Tanpa penjelasan tambahan

Format:
{"disease":"nama","accuracy":90,"advice":["saran1","saran2"]}

Keluhan: ${deskripsi}`,
            },
            {
              inlineData: {
                mimeType: imageFile.type,
                data: base64,
              },
            },
          ],
        },
      ],
    });

    // 📥 Ambil response
    const text = response.text();

    // 🧹 Bersihin hasil
    const clean = text.replace(/```json|```/g, "").trim();
    const jsonMatch = clean.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      console.error("Respon AI:", text);
      throw new Error("JSON tidak ditemukan dari AI");
    }

    return JSON.parse(jsonMatch[0]);

  } catch (err) {
    console.error("ERROR GEMINI:", err);
    throw err;
  }
};