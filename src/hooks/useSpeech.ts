import { useEffect, useRef, useState } from "react";

export function useSpeech() {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognitionRef.current = recognition;
  }, []);

  const start = (onResult: (text: string) => void) => {
    if (!recognitionRef.current) return;

    recognitionRef.current.onresult = (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript;
      onResult(transcript);
    };

    recognitionRef.current.start();
    setListening(true);
  };

  const stop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return { start, stop, listening };
}
