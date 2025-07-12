"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import dogHappy from "@/animations/dog-happy.json";
import dogSad from "@/animations/dog-sad.json";
import dogThinking from "@/animations/dog-thinking.json";

// Add a simple spinner SVG for loading
const Spinner = () => (
  <svg className="animate-spin h-6 w-6 text-blue-500" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

export default function Home() {
  const [animationData, setAnimationData] = useState<any>(dogThinking as any);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("Your pet is waiting for your message!");
  const [loading, setLoading] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'neutral' | 'positive' | 'negative' | 'error'>('neutral');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCheer = async () => {
    if (!message.trim()) {
      setFeedback("Please type a message to your pet!");
      setFeedbackType('error');
      // Shake animation on error
      return;
    }
    setLoading(true);
    setShowConfetti(false);
    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });
      const result = await response.json();
      const sentiment = result[0][0].label;

      if (sentiment === "LABEL_2") {
        // Positive
        setAnimationData(dogHappy as any);
        setFeedback("Your pet thinks you sound cheerful!");
        setFeedbackType('positive');
        setShowConfetti(true);
      } else if (sentiment === "LABEL_0") {
        // Negative
        setAnimationData(dogSad as any);
        setFeedback("Your pet thinks you sound sad.");
        setFeedbackType('negative');
      } else {
        // Neutral
        setAnimationData(dogThinking as any);
        setFeedback("Your pet is thinking about what you said.");
        setFeedbackType('neutral');
      }
    } catch (error) {
      console.error("Error fetching sentiment:", error);
      setFeedback("Sorry, I couldn't understand that.");
      setFeedbackType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setAnimationData(dogThinking as any);
    setMessage("");
    setFeedback("Your pet is waiting for your message!");
    setFeedbackType('neutral');
    setShowConfetti(false);
  };

  // Confetti animation (simple emoji burst)
  const Confetti = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      <div className="text-5xl animate-bounce select-none">
        🎉 🥳 🎊
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-pink-100 p-4 sm:p-8">
      {/* Mascot header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-white/70 rounded-full shadow-lg flex items-center justify-center mb-2 border-4 border-blue-200">
          <Lottie animationData={dogHappy as any} style={{ width: 60, height: 60 }} loop={false} autoplay={true} />
        </div>
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow mb-1 tracking-tight text-center">
          Cheer My Pet!
        </h1>
        <p className="text-lg text-blue-500 font-medium text-center">Send a message and see how your pet reacts!</p>
      </div>

      <div className="relative w-full max-w-2xl rounded-3xl bg-white/60 backdrop-blur-md p-8 shadow-2xl border border-blue-100 transition-all duration-300">
        {showConfetti && <Confetti />}
        {/* Pet animation */}
        <div className="flex justify-center mb-6">
          <div className="w-80 h-80 border-4 border-blue-200 rounded-2xl flex items-center justify-center bg-white/70 shadow-inner">
            <Lottie
              animationData={animationData as any}
              style={{ width: 260, height: 260 }}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>

        {/* Feedback with animated transition */}
        <div
          className={`mb-4 text-center text-lg font-semibold transition-all duration-500 ${
            feedbackType === 'positive'
              ? 'text-green-600 animate-pulse'
              : feedbackType === 'negative'
              ? 'text-red-500 animate-shake'
              : feedbackType === 'error'
              ? 'text-orange-500 animate-shake'
              : 'text-blue-700'
          }`}
        >
          {feedback}
        </div>

        {/* Input and buttons */}
        <div className="flex flex-col gap-4 sm:flex-row items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            className="w-full rounded-2xl border border-blue-300 p-4 shadow focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white/80 text-gray-800 text-lg transition-all duration-200 disabled:opacity-60"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCheer();
            }}
          />
          <button
            onClick={handleCheer}
            disabled={loading}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 px-6 py-4 text-white font-bold shadow-lg hover:from-blue-600 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Spinner /> : <span className="material-symbols-outlined">pets</span>}
            Cheer
          </button>
          <button
            onClick={handleTryAgain}
            disabled={loading}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-100 px-6 py-4 text-gray-700 font-semibold shadow hover:from-gray-300 hover:to-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 disabled:opacity-60"
          >
            <span className="material-symbols-outlined">refresh</span>
            Try Again
          </button>
        </div>
      </div>

      {/* Add Google Material Icons font for button icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        rel="stylesheet"
      />

      {/* Custom shake animation */}
      <style>{`
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
      `}</style>
    </main>
  );
}
