export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { message } = req.body;
  
  // Dòng này tự động lấy API Key bạn đã lưu trong Vercel (bảo mật tuyệt đối)
  const apiKey = process.env.GEMINI_API_KEY; 

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
  });

  const data = await response.json();
  res.status(200).json(data);
}
