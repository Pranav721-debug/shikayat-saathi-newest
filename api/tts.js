export default async function handler(req, res) {
  try {
    const { text, lang } = req.query;

    if (!text || !lang) {
      return res.status(400).send("Missing params");
    }

    const googleURL =
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;

    const googleRes = await fetch(googleURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"
      }
    });

    const arrayBuffer = await googleRes.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");

    return res.send(Buffer.from(arrayBuffer));
  } catch (e) {
    console.error(e);
    res.status(500).send("TTS error");
  }
}
