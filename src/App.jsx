import { useState } from "react";
import 'regenerator-runtime/runtime';
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  const [transcript, setTranscript] = useState(''); // State to hold transcript

  const startListening = () => SpeechRecognition.startListening({
    continuous: true,
    language: "en-IN",
  });

  const stopListening = () => SpeechRecognition.stopListening();

  const { browserSupportsSpeechRecognition } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result); // Update transcript on each result
    }
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript); // Copy transcript to clipboard
    alert("Transcript copied to clipboard!");
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div className="container">
      <h2>Speech to Text Converter</h2>
      <br />
      <p>A React hook that converts speech from the microphone to text</p>
      <div className="main-content">
        <p>{transcript}</p> {/* Display transcript */}
      </div>
      <div className="btn-style">
        <button onClick={handleCopy}>Copy</button> {/* Button to copy transcript */}
        <button onClick={startListening}>Start Listening</button>
        <button onClick={stopListening}>Stop Listening</button>
      </div>
    </div>
  );
}

export default App;
