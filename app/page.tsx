"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Heart, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Pet {
  id: string
  name: string
  emoji: string
  color: string
  description: string
  neutralState: string
  happyState: string
  sadState: string
}

const pets: Pet[] = [
  {
    id: "dog",
    name: "Dog",
    emoji: "🐕",
    color: "from-amber-400 to-orange-500",
    description: "Loyal and playful companion",
    neutralState: "animate-dog-idle",
    happyState: "animate-dog-happy",
    sadState: "animate-dog-sad",
  },
  {
    id: "cat",
    name: "Cat",
    emoji: "🐱",
    color: "from-purple-400 to-pink-500",
    description: "Independent and graceful",
    neutralState: "animate-cat-idle",
    happyState: "animate-cat-happy",
    sadState: "animate-cat-sad",
  },
  {
    id: "bird",
    name: "Bird",
    emoji: "🐦",
    color: "from-blue-400 to-cyan-500",
    description: "Free-spirited and melodic",
    neutralState: "animate-bird-idle",
    happyState: "animate-bird-happy",
    sadState: "animate-bird-sad",
  },
  {
    id: "rabbit",
    name: "Rabbit",
    emoji: "🐰",
    color: "from-green-400 to-emerald-500",
    description: "Gentle and energetic hopper",
    neutralState: "animate-rabbit-idle",
    happyState: "animate-rabbit-happy",
    sadState: "animate-rabbit-sad",
  },
  {
    id: "hamster",
    name: "Hamster",
    emoji: "🐹",
    color: "from-yellow-400 to-amber-500",
    description: "Tiny and adorable explorer",
    neutralState: "animate-hamster-idle",
    happyState: "animate-hamster-happy",
    sadState: "animate-hamster-sad",
  },
  {
    id: "fish",
    name: "Fish",
    emoji: "🐠",
    color: "from-teal-400 to-blue-500",
    description: "Peaceful underwater friend",
    neutralState: "animate-fish-idle",
    happyState: "animate-fish-happy",
    sadState: "animate-fish-sad",
  },
  {
    id: "turtle",
    name: "Turtle",
    emoji: "🐢",
    color: "from-emerald-400 to-green-500",
    description: "Wise and patient companion",
    neutralState: "animate-turtle-idle",
    happyState: "animate-turtle-happy",
    sadState: "animate-turtle-sad",
  },
  {
    id: "panda",
    name: "Panda",
    emoji: "🐼",
    color: "from-gray-400 to-slate-500",
    description: "Cuddly bamboo lover",
    neutralState: "animate-panda-idle",
    happyState: "animate-panda-happy",
    sadState: "animate-panda-sad",
  },
]

const PetAvatar = ({ pet, isSelected }: { pet: Pet; isSelected: boolean }) => {
  return (
    <div
      className={`w-24 h-24 rounded-full bg-gradient-to-br ${pet.color} flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
        isSelected ? "animate-pulse" : ""
      }`}
    >
      <div className="text-4xl animate-bounce-gentle">{pet.emoji}</div>
      <div className="absolute inset-0 bg-white/20 rounded-full animate-shimmer"></div>
    </div>
  )
}

const AnimatedPet = ({ pet, sentiment, isAnalyzing }: { pet: Pet; sentiment: string; isAnalyzing: boolean }) => {
  const getAnimationClass = () => {
    if (isAnalyzing) return "animate-thinking"
    if (sentiment === "happy") return pet.happyState
    if (sentiment === "sad") return pet.sadState
    return pet.neutralState
  }

  const getExpressionEmoji = () => {
    if (isAnalyzing) return "🤔"
    if (sentiment === "happy") return "😊"
    if (sentiment === "sad") return "😢"
    return pet.emoji
  }

  return (
    <div className={`relative ${getAnimationClass()}`}>
      <div className="text-9xl transition-all duration-500 transform-gpu">{getExpressionEmoji()}</div>

      {/* Animated eyes overlay for more realistic expressions */}
      {/* <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        <div
          className={`w-3 h-3 bg-black rounded-full transition-all duration-300 ${
            sentiment === "happy" ? "animate-blink-happy" : sentiment === "sad" ? "animate-blink-sad" : "animate-blink"
          }`}
        ></div>
        <div
          className={`w-3 h-3 bg-black rounded-full transition-all duration-300 ${
            sentiment === "happy" ? "animate-blink-happy" : sentiment === "sad" ? "animate-blink-sad" : "animate-blink"
          }`}
        ></div>
      </div> */}

      {/* Breathing effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-breathe rounded-full"></div>

      {/* Happy particles */}
      {sentiment === "happy" && (
        <div className="absolute inset-0">
          <div className="absolute -top-4 -left-4 text-2xl animate-float-up">✨</div>
          <div className="absolute -top-6 right-2 text-xl animate-float-up-delayed">💖</div>
          <div className="absolute -top-2 -right-6 text-lg animate-float-up-slow">🌟</div>
        </div>
      )}

      {/* Sad effects */}
      {sentiment === "sad" && (
        <div className="absolute inset-0">
          <div className="absolute top-8 left-4 text-2xl animate-tear-drop">💧</div>
          <div className="absolute top-12 right-6 text-xl animate-tear-drop-delayed">💧</div>
        </div>
      )}
    </div>
  )
}

export default function CheerMyPets() {
  const [selectedPet, setSelectedPet] = useState<Pet>(pets[0])
  const [inputText, setInputText] = useState("")
  const [sentiment, setSentiment] = useState<"happy" | "sad" | "neutral">("neutral")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [api, setApi] = useState<any>(null)

  // Listen for carousel selection changes
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap()
      handleCarouselSelect(selectedIndex)
    }

    api.on('select', onSelect)
    return () => api.off('select', onSelect)
  }, [api])

  const handleAnalyze = async () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      })


      if (!response.ok) {
        throw new Error('Failed to analyze sentiment')
      }

      const result = await response.json()

      console.log(result)

      
      if (result.error) {
        throw new Error(result.error)
      }

      setSentiment(result.sentiment)
      
      if (result.sentiment === "happy") {
        setShowParticles(true)
        setTimeout(() => setShowParticles(false), 3000)
      }
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
      setSentiment("neutral")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getPetContainerClass = () => {
    if (isAnalyzing) return "animate-pulse scale-105"
    if (sentiment === "happy") return "animate-bounce-happy scale-110"
    if (sentiment === "sad") return "scale-95 opacity-80 animate-sway"
    return "hover:scale-105 transition-transform duration-300"
  }

  // Handle carousel selection change
  const handleCarouselSelect = (index: number) => {
    setSelectedPet(pets[index])
    // Scroll to input field after selection
    // setTimeout(() => {
    //   const inputSection = document.getElementById('input-section')
    //   if (inputSection) {
    //     inputSection.scrollIntoView({ 
    //       behavior: 'smooth', 
    //       block: 'center' 
    //     })
    //   }
    // }, 300)
  }

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = pets.findIndex(pet => pet.id === selectedPet.id)
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : pets.length - 1
        if (api) {
          api.scrollTo(prevIndex)
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        const nextIndex = currentIndex < pets.length - 1 ? currentIndex + 1 : 0
        if (api) {
          api.scrollTo(nextIndex)
        }
        break
    }
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 relative overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Cheer My Pet",
            "description": "Interactive pet emotion analysis and animation platform where users can choose pets and talk to them and see realistic emotional reactions.",
            "url": process.env.NEXT_PUBLIC_SITE_URL,
            "applicationCategory": "EntertainmentApplication",
            "operatingSystem": "Web Browser",
            "author": {
              "@type": "Organization",
              "name": "Vinoth kumar Chellapandi"
            },
            "featureList": [
              "Interactive pet selection",
              "Emotion analysis",
              "Realistic pet animations",
              "Multiple pet types",
              "Keyboard navigation",
              "Mobile responsive"
            ],
            "screenshot": `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
            "softwareVersion": "1.0.0"
          })
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-18 h-18 bg-yellow-200 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Floating particles for happy state */}
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: "3s",
              }}
            >
              {["✨", "💖", "🌟", "💫", "🎉"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-5">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-pulse">
          Choose Your Virtual Pet Companion
          </h1>
          <h2 className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Make Your Pets Smile with Cheer My Pet
            🐾✨
          </h2>
        </div>

        {/* Enhanced Pet Selector with Carousel */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">Slide Through pets: Track Pets Emotions Instantly</h2>
          
          {/* Scroll indicator */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Navigate to center and select your pet
              <ChevronRight className="w-4 h-4" />
            </p>
            {/* <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="bg-gray-200 px-2 py-1 rounded">← →</span>
              <span>Navigate pets</span>
              <span className="bg-gray-200 px-2 py-1 rounded">Enter</span>
              <span>Select centered pet</span>
              <span className="bg-gray-200 px-2 py-1 rounded">Click</span>
              <span>Select any pet</span>
            </div> */}
          </div>

          <div className="relative max-w-6xl mx-auto focus-within:rounded-lg">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                dragFree: true,
                containScroll: false,
                skipSnaps: false,
              }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {pets.map((pet) => (
                  <CarouselItem key={pet.id} className="pl-4 md:pl-6 basis-auto">
                    <Card
                      className={`p-6 cursor-pointer transition-all duration-500 hover:scale-90 hover:shadow-xl min-w-[220px] carousel-card border-t-4 border-b-4 ${
                        selectedPet.id === pet.id
                          ? "ring-1 ring-purple-400 shadow-xl scale-90 bg-gradient-to-br from-white to-purple-50 border-purple-400"
                          : "hover:shadow-lg bg-white/80 backdrop-blur-sm border-gray-300 hover:border-purple-300"
                      }`}
                      onClick={() => {
                        const petIndex = pets.findIndex(p => p.id === pet.id)
                        if (api) {
                          api.scrollTo(petIndex)
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          const petIndex = pets.findIndex(p => p.id === pet.id)
                          if (api) {
                            api.scrollTo(petIndex)
                          }
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${pet.name} pet`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <PetAvatar pet={pet} isSelected={selectedPet.id === pet.id} />
                        <div className="text-center mt-3">
                          <p className="text-lg font-bold text-gray-800 mb-1">{pet.name}</p>
                          <p className="text-xs text-gray-500 leading-tight">{pet.description}</p>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation arrows with better positioning */}
              <CarouselPrevious className="left-2 md:left-4 bg-white/90 hover:bg-white border-2 border-purple-300 hover:border-purple-500 shadow-lg z-10" />
              <CarouselNext className="right-2 md:right-4 bg-white/90 hover:bg-white border-2 border-purple-300 hover:border-purple-500 shadow-lg z-10" />
            </Carousel>
          </div>

          {/* Selected pet indicator with better styling */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full border-2 border-purple-300 shadow-lg">
              <span className="text-3xl">{selectedPet.emoji}</span>
              <span className="font-semibold text-purple-700 text-lg">Selected: {selectedPet.name}</span>
            </div>
          </div>
        </div>

        {/* Main Pet Display */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className={`transition-all duration-700 ${getPetContainerClass()}`}>
              <div className="w-80 h-80 mx-auto mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                <AnimatedPet pet={selectedPet} sentiment={sentiment} isAnalyzing={isAnalyzing} />
              </div>
            </div>

            {/* Enhanced mood indicator */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              {sentiment === "happy" && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-2 rounded-full text-lg font-bold shadow-lg animate-bounce min-w-[240px] justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                  So Happy! 🎉
                </div>
              )}
              {sentiment === "sad" && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-2 rounded-full text-lg font-medium shadow-lg min-w-[240px] justify-center">
                  💙 Needs Love & Care
                </div>
              )}
              {sentiment === "neutral" && !isAnalyzing && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 px-6 py-2 rounded-full text-lg font-medium shadow-lg min-w-[250px] justify-center">
                  <Star className="w-5 h-5" />
                  I'am Ready to Listen
                </div>
              )}
              {isAnalyzing && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-6 py-2 rounded-full text-lg font-medium shadow-lg animate-pulse min-w-[240px] justify-center">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Reading Emotions...
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-3xl font-bold text-gray-700 mb-3">
              How is your {selectedPet.name.toLowerCase()} feeling today?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {isAnalyzing
                ? "Analyzing your pet's mood with AI magic..."
                : sentiment === "happy"
                  ? "Your pet is absolutely thrilled! Look at those happy movements! Keep spreading the joy! 🌟"
                  : sentiment === "sad"
                    ? "Your pet seems to need some extra love and attention today. Give them some comfort! 💕"
                    : "Tell Your Pet a Story & Watch It React"}
            </p>
          </div>
        </div>

        {/* Enhanced Input Section */}
        <div className="max-w-3xl mx-auto" id="input-section">
          <Card className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-md">
            <div className="space-y-6">
              <Textarea
                placeholder={`Tell us about your ${selectedPet.name.toLowerCase()}'s day in detail... Are they playing energetically, sleeping peacefully, or maybe they had their favorite treat? The more descriptive, the better the animation!`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-40 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-xl resize-none bg-white/80 backdrop-blur-sm"
                disabled={isAnalyzing}
              />

              <Button
                onClick={handleAnalyze}
                disabled={!inputText.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 animate-spin" />
                    Analyzing Pet's Emotions...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6" />
                    Know how your pet feels ? click here
                  </div>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
