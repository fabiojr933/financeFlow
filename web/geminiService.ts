
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "./types";

export async function getFinancialInsights(transactions: Transaction[]) {
  // Always use process.env.API_KEY directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const dataSummary = transactions.map(t => ({
    desc: t.description,
    val: t.value,
    type: t.type,
    cat: t.category
  }));

  const prompt = `Analise os seguintes dados financeiros e forneça insights práticos: ${JSON.stringify(dataSummary)}. 
  Retorne um JSON com:
  - financialScore: (número de 0 a 100)
  - healthStatus: (string descrevendo o estado)
  - recommendations: (array de strings com 2 ou 3 recomendações curtas)`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            financialScore: { type: Type.NUMBER },
            healthStatus: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["financialScore", "healthStatus", "recommendations"]
        }
      }
    });

    // Directly access the .text property from GenerateContentResponse.
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Erro ao obter insights da Gemini:", error);
    return {
      financialScore: 0,
      healthStatus: "Não foi possível analisar seus dados no momento.",
      recommendations: ["Verifique sua conexão", "Tente novamente mais tarde"]
    };
  }
}
