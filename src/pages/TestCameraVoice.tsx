import { useRef } from "react";

export default function TestCameraVoice() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }

    const utter = new SpeechSynthesisUtterance(
      "Hello. This is a camera and voice test."
    );
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };

  return (
    <div style={{ padding: 40 }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: 300, height: 300, background: "black" }}
      />

      <br /><br />

      <button onClick={start}>
        Start Camera + Voice
      </button>
    </div>
  );
}
