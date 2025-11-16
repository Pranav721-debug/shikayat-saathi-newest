export default async function handler(req, res) {
  try {
    const { text, lang } = req.query;

    if (!text || !lang) {
      return res.status(400).send("Missing text or lang");
    }

    const googleURL =
      "https://translate.google.com/translate_tts?" +
      new URLSearchParams({
        ie: "UTF-8",
        q: text,
        tl: lang,
        client: "tw-ob"
      }).toString();

    const response = await fetch(googleURL);

    if (!response.ok) {
      return res.status(500).send("Failed to fetch TTS audio");
    }

    const arrayBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    res.status(500).send("Server Error");
  }
}
