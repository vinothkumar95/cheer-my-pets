import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      )
    }

    // Use the supported Hugging Face sentiment model
    const response = await fetch(
      'https://api-inference.huggingface.co/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      }
    )

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`)
    }

    const result = await response.json()

    // The model returns an array of predictions with labels and scores
    // Labels: POSITIVE, NEGATIVE
    if (Array.isArray(result) && result.length > 0) {
      const predictions = result[0]
      // Find the prediction with the highest score
      const bestPrediction = predictions.reduce((prev: any, current: any) =>
        prev.score > current.score ? prev : current
      )

      // If the scores are close (difference < 0.2), treat as neutral
      const [first, second] = predictions
      let sentiment: 'happy' | 'sad' | 'neutral'
      if (Math.abs(first.score - second.score) < 0.2) {
        sentiment = 'neutral'
      } else if (bestPrediction.label === 'POSITIVE') {
        sentiment = 'happy'
      } else if (bestPrediction.label === 'NEGATIVE') {
        sentiment = 'sad'
      } else {
        sentiment = 'neutral'
      }

      return NextResponse.json({
        sentiment,
        confidence: bestPrediction.score,
        predictions: predictions
      })
    }

    return NextResponse.json(
      { error: 'Invalid response from Hugging Face API' },
      { status: 500 }
    )

  } catch (error) {
    console.error('Sentiment analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze sentiment' },
      { status: 500 }
    )
  }
} 