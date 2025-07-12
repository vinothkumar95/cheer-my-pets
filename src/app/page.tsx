"use client";
import { useState } from "react";
import Lottie from "lottie-react";
import dogHappy from "@/animations/dog-happy.json";
import dogSad from "@/animations/dog-sad.json";
import dogThinking from "@/animations/dog-thinking.json";

export default function Home() {
  const [animationData, setAnimationData] = useState(dogThinking);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState(
    "Your pet is waiting for your message!"
  );

  const handleCheer = async () => {
    if (!message.trim()) {
      setFeedback("Please type a message to your pet!");
      return;
    }
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
        setAnimationData(dogHappy);
        setFeedback("Your pet thinks you sound cheerful!");
      } else if (sentiment === "LABEL_0") {
        // Negative
        setAnimationData(dogSad);
        setFeedback("Your pet thinks you sound sad.");
      } else {
        // Neutral
        setAnimationData(dogThinking);
        setFeedback("Your pet is thinking about what you said.");
      }
    } catch (error) {
      console.error("Error fetching sentiment:", error);
      setFeedback("Sorry, I couldn't understand that.");
    }
  };

  const handleTryAgain = () => {
    setAnimationData(dogThinking);
    setMessage("");
    setFeedback("Your pet is waiting for your message!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-100 p-8">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">
          Cheer My Pet!
        </h1>

        <div className="flex justify-center">
          <Lottie
            animationData={animationData}
            style={{ width: 300, height: 300 }}
          />
        </div>

        <p className="mb-4 text-center text-lg text-gray-600">{feedback}</p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCheer}
            className="rounded-lg bg-blue-500 px-6 py-4 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cheer
          </button>
          <button
            onClick={handleTryAgain}
            className="rounded-lg bg-gray-300 px-6 py-4 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}
