let selectedLang = "hi";
let recognition = null;

// MAP YOUR LANGUAGE CODES TO GOOGLE TTS VOICES
const voiceMap = {
  hi: "hi-IN",
  kn: "kn-IN",
  ta: "ta-IN",
  ur: "ur-IN",
  gu: "gu-IN",
  bn: "bn-IN",
  or: "or-IN",
  raj: "hi-IN" // fallback
};

// SELECTED LANGUAGE
window.selectLanguage = function (lang) {
  selectedLang = lang;
  speakText("भाषा चुनी गई", selectedLang);
};

// START SPEECH RECOGNITION
window.startRecognition = function () {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported on this browser.");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = selectedLang;
  recognition.interimResults = false;

  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript;
    document.getElementById("resultText").textContent = text;
    speakText("संदेश प्राप्त हुआ", selectedLang);
  };

  recognition.start();
};

// GENERATE GOOGLE TRANSLATE TTS AUDIO URL
function getTTSUrl(text, lang) {
  const googleLang = voiceMap[lang] || "hi-IN";

  return (
    "https://translate.google.com/translate_tts?" +
    new URLSearchParams({
      ie: "UTF-8",
      q: text,
      tl: googleLang,
      client: "tw-ob"
    })
  );
}

// SPEAK TEXT
function speakText(text, lang) {
  const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}&lang=${voiceMap[lang]}`;

  const audio = new Audio(ttsUrl);
  audio.play().catch(err => console.log("TTS Error:", err));
}


// TRACK COMPLAINT
window.trackComplaint = function () {
  const id = document.getElementById("trackId").value.trim();

  if (!id) {
    speakText("कृपया शिकायत आईडी दर्ज करें", selectedLang);
    document.getElementById("trackResult").textContent =
      "Please enter a complaint ID.";
    return;
  }

  document.getElementById("trackResult").textContent =
    "Your complaint ID " + id + " is being processed.";

  speakText("आपकी शिकायत प्रक्रिया में है", selectedLang);
};

