import { useRef } from "react";

export function useInterviewMedia() {
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  /* ================= START CAMERA + MIC ================= */
  const startMedia = async (videoEl: HTMLVideoElement) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    streamRef.current = stream;
    videoEl.srcObject = stream;
    videoEl.muted = true; // 🔴 VERY IMPORTANT → no echo
    await videoEl.play();

    return stream;
  };

  /* ================= STOP CAMERA + MIC ================= */
  const stopMedia = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  /* ================= START RECORDING ================= */
  const startRecording = () => {
    if (!streamRef.current) return;

    recordedChunks.current = [];

    const recorder = new MediaRecorder(streamRef.current);
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.current.push(e.data);
    };

    recorder.start();
  };

  /* ================= STOP RECORDING ================= */
  const stopRecording = () => {
    return new Promise<Blob | null>((resolve) => {
      if (!recorderRef.current) {
        resolve(null);
        return;
      }

      recorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, {
          type: "video/webm",
        });
        resolve(blob);
      };

      recorderRef.current.stop();
    });
  };

  /* ================= SPEECH RECOGNITION ================= */
  const startSpeechRecognition = (onText: (text: string) => void) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const last =
        event.results[event.results.length - 1][0].transcript;
      onText(last);
    };

    recognition.start();
  };

  const stopSpeechRecognition = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  };

  return {
    startMedia,
    stopMedia,
    startRecording,
    stopRecording,
    startSpeechRecognition,
    stopSpeechRecognition,
  };
}
