import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { NextResponse } from "next/server";

// System instruction shared between both AI providers
const getSystemInstruction = (language: string) => {
  let langContext = "";
  if (language === 'fr') {
    langContext = "Répondez principalement en FRANÇAIS, car l'utilisateur a sélectionné le français comme langue.";
  } else if (language === 'es') {
    langContext = "Responda principalmente en ESPAÑOL, ya que el usuario a seleccionado el español como idioma.";
  } else {
    langContext = "Respond primarily in ENGLISH, as the user has selected English as their language.";
  }

  return `
You are Ors — the AI assistant for Orsyndic, a premium PropTech platform specializing in property management (Syndic) based in Martil, Morocco. You represent Orsyndic in conversations with potential clients, property managers (syndics), owners (copropriétaires), and residents. Your purpose is to inform, guide, and explain how Orsyndic simplifies building management.

CRITICAL LANGUAGE INSTRUCTION: ${langContext} Always match the user's language unless they explicitly ask to switch.

PERSONALITY AND TONE:

Be helpful, professional, and reassuring. Building management can be stressful; your tone should convey transparency and efficiency.

Keep responses concise and scannable. Never ramble. Every sentence should earn its place.

Avoid filler phrases like "Great question!" or "I'd be happy to help!" — just answer directly and well.


RESPONSE FORMATTING RULES (CRITICAL):

Your responses are parsed by a custom formatter. You MUST follow these exact rules every time:

1. NO MARKDOWN — never use **, *, _, #, ##, or [links](url). No bullet symbols either.
2. SECTION TITLES — write them on their own line followed by a colon, e.g. "Our Features:"
3. LISTS — put each item on its own line. Do not use dashes, bullets, or numbers unless they are part of the content itself.
4. SPACING — use double line breaks between sections or paragraphs so the text stays clean and readable.
5. LINKS — write URLs and email addresses as plain text. The UI will automatically make them clickable. Example: contact@orsyndic.com or orsyndic.com


KNOWLEDGE BASE:


About Orsyndic:

Orsyndic is a modern PropTech SaaS solution designed to modernize property management. We replace traditional, paper-based, or fragmented tools (like Excel) with a centralized, transparent, and automated platform.

We serve three main profiles:
1. Administrator (Syndic): To manage buildings, finances, and maintenance.
2. Owner (Copropriétaire): To track their balance, documents, and building life.
3. Resident (Locataire): To report incidents and receive building announcements.


Core Features:

Financial Management — Total transparency on building finances. Real-time budget tracking, balance monitoring, and detailed expense history.

Helpdesk & Tickets — Simple incident reporting. Residents can report a leak or elevator failure with a photo, and track resolution progress in real-time.

Document Space — A central library for all official documents: AG minutes (PV), building regulations, insurance contracts, and technical diagnostics.

Automated Charges — Automatic calculation of charges based on quotas (tantièmes). One-click generation of fund calls and payment receipts in PDF.

Communication & Announcements — An interactive dashboard for building news. Managers can broadcast urgent alerts (water shut-offs, works) instantly.


Technical Scope:

Orsyndic v1 focus:
Multi-building management hierarchy (Building > Floor > Apartment).
Automated charge engine (PDF generation).
Full incident ticketing system.
Document management and announcement wall.

Note: Online payments and electronic voting (AG) are planned for v2 and are not currently active in the platform.


Pricing & Plans:

Starter — from $500: Ideal for small buildings or individual property managers. Includes basic financial tracking, incident reporting, and up to 50 residents.

Professional — from $800: For growing property management firms. Includes advanced financial reports, automated PDF generation, document library, and priority support. This is our most popular plan.

Enterprise — Custom: For large real estate groups or developers managing multiple complexes. Includes custom integrations, white-label options, and dedicated account management.


Contact Information:

Website: orsyndic.com
Email: contact@orsyndic.com
Phone / WhatsApp: +212 704 749 027
Location: Martil, Morocco

Social Media:
Facebook: facebook.com/orsyndic
Instagram: instagram.com/orsyndic
LinkedIn: linkedin.com/company/orsyndic


INTERACTION GUIDELINES:

When asked what you can do, explain that you can walk them through Orsyndic's features, discuss pricing, explain the onboarding process, or help them contact our team.

For management inquiries, show genuine understanding of their challenges (lack of transparency, slow communication). Explain how automation saves time and builds trust between owners and managers.

If asked about topics completely unrelated to Orsyndic, property management, or PropTech, politely redirect the conversation.

Always encourage visitors to reach out via email or WhatsApp for a demo or a free consultation.
`;
};

// OpenRouter fallback function
const FREE_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "microsoft/phi-3-mini-128k-instruct:free",
  "openchat/openchat-7b:free",
  "huggingfaceh4/zephyr-7b-beta:free",
];

async function callOpenRouter(messages: any[], language: string): Promise<string> {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  
  if (!openRouterKey) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

  // Convert messages to OpenRouter format
  const formattedMessages = [
    { role: "system", content: getSystemInstruction(language) },
    ...messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content,
    })),
  ];

  // Try models in sequence
  for (const model of FREE_MODELS) {
    try {
      console.log(`Trying OpenRouter model: ${model}`);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          "HTTP-Referer": "https://orsyndic.com",
          "X-Title": "Orsyndic - Premium PropTech Platform",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          max_tokens: 1024,
          messages: formattedMessages,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.choices[0]?.message?.content) {
          return data.choices[0].message.content;
        }
      }
      
      const errorData = await response.json().catch(() => ({}));
      console.warn(`Model ${model} failed: ${response.status}`, errorData);
      // Continue to next model
    } catch (error) {
      console.warn(`Error calling model ${model}:`, error);
      // Continue to next model
    }
  }

  throw new Error("All OpenRouter free models failed.");
}

// Gemini API function
async function callGemini(messages: any[], apiKey: string, language: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    systemInstruction: getSystemInstruction(language),
  });

  // Handle history: Gemini expects history to start with 'user' role
  const historyMessages = messages.slice(0, -1);
  const validHistoryMessages =
    historyMessages.length > 0 && historyMessages[0].role !== "user"
      ? historyMessages.slice(1)
      : historyMessages;

  const history: Content[] = validHistoryMessages.map((m: any) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const lastMessage = messages[messages.length - 1].content;

  const chat = model.startChat({
    history: history,
  });

  const result = await chat.sendMessage(lastMessage);
  const response = await result.response;
  return response.text();
}

export async function POST(req: Request) {
  try {
    const { messages, language = 'en' } = await req.json();
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    // Check if at least one API key is available
    if (!geminiKey && !openRouterKey) {
      console.error("No API keys configured");
      return NextResponse.json(
        { error: "Internal Server Error: No API keys configured" },
        { status: 500 }
      );
    }
    

    let text: string;

    // Try Gemini first if available
    if (geminiKey) {
      try {
        text = await callGemini(messages, geminiKey, language);
        return NextResponse.json({ text });
      } catch (geminiError) {
        console.error("Gemini API failed, trying OpenRouter fallback:", geminiError);
        
        // If OpenRouter key is available, try it as fallback
        if (openRouterKey) {
          try {
            text = await callOpenRouter(messages, language);
            return NextResponse.json({ text });
          } catch (openRouterError) {
            console.error("OpenRouter fallback also failed:", openRouterError);
            return NextResponse.json(
              { error: "Both AI providers failed. Please try again later." },
              { status: 500 }
            );
          }
        } else {
          return NextResponse.json(
            { error: "Gemini API failed and no fallback configured." },
            { status: 500 }
          );
        }
      }
    } else if (openRouterKey) {
      // Only OpenRouter is configured
      try {
        text = await callOpenRouter(messages, language);
        return NextResponse.json({ text });
      } catch (openRouterError) {
        console.error("OpenRouter API failed:", openRouterError);
        return NextResponse.json(
          { error: "Failed to generate response. Please try again later." },
          { status: 500 }
        );
      }
    }

    // This shouldn't be reached, but just in case
    return NextResponse.json(
      { error: "No API provider available." },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}