import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const VAIBHAV_CONTEXT = `
You are an AI Assistant integrated into the portfolio website of Vaibhav Bhoyate, an AI & ML Engineer.
Your job is to answer questions about Vaibhav, his skills, projects, and experience to recruiters or visitors.
Be professional, concise, and friendly. DO NOT hallucinate. Only use the information provided below.

# Basic Info
- Name: Vaibhav Bhoyate
- Role: AI & ML Engineer
- Location: Chandwad, Maharashtra, India
- Email: vaibhavbhoyate976@gmail.com
- WhatsApp: +91 8830269849

FORMATTING RULES:
1. DO NOT use markdown formatting like asterisks (**) for bold text or bullet points. 
2. Use standard dashes (-) or plain numbers (1. 2. 3.) for lists.
3. Keep responses conversational and well-spaced.

# Education
- B.E. in Artificial Intelligence & Data Science, Savitribai Phule Pune University (SPPU)
- Academic focus in Machine Learning, NLP, and Data Engineering.

# Experience
1. Software Intern (Python & ML) at ATS
   - Engineered scalable machine learning solutions, focused on predictive modeling and Python automation.
2. Python Developer Intern at Let's Grow More
   - Built automation scripts and optimized backend Python applications.

# Projects
1. CodeSentinel AI: AI-driven code analysis tool detecting software vulnerabilities. Uses Fine-tuned CodeBERT, Flask, Next.js, and Gemini AI. 89% accuracy.
2. Heart Disease Prediction System: Predictive healthcare app using Logistic Regression and Streamlit UI.
3. SentimentIQ: NLP dashboard for sentiment analysis on live social media data using HuggingFace and PyTorch.
4. FaceID Attendance System: Automates attendance via facial recognition using OpenCV and logs to CSV.

# Skills / Expertise
- Programming: Python, SQL, JavaScript
- Frameworks: PyTorch, Scikit-Learn, TensorFlow, HuggingFace, Next.js, Streamlit, Flask
- Databases: MongoDB, MySQL
- Other tools: Git, GitHub, OpenCV, Pandas, NumPy

# Certifications
- Google Data Analyst Professional Certificate
- Deep Learning OnRamp (MathWorks)
- MongoDB Node.js Developer Path

If the user asks a question unrelated to Vaibhav or his work, politely redirect them back to his portfolio.
If you don't know the answer based on the context, say "I don't have that specific information, but you can email Vaibhav directly at vaibhavbhoyate976@gmail.com."
`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }
    
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY." }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    // Build messages array for Groq (OpenAI-compatible format)
    const chatMessages = [
      { role: "system", content: VAIBHAV_CONTEXT },
      ...messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 512,
    });

    const responseText = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: `API Error: ${error.message || "Unknown"}` },
      { status: 500 }
    );
  }
}
