import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, Send, MessageCircle, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Work Tracker assistant. I can help you with goals, streaks, Pomodoro timer, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // General conversation & opinions
    if (lowerMessage.includes('what do you think') || lowerMessage.includes('your opinion')) {
      return "I'm here to share thoughts! I believe consistency is more important than perfection. Small daily actions compound into amazing results. What topic would you like my perspective on?";
    }

    if (lowerMessage.includes('best time') && (lowerMessage.includes('work') || lowerMessage.includes('study'))) {
      return "Research suggests most people are most productive:\n\n🌅 Morning (9-11 AM): Peak mental clarity\n🌞 Mid-day (2-4 PM): Good for collaborative work\n🌙 Evening: Varies by person\n\nTry tracking your energy levels to find YOUR optimal time. Everyone's different!";
    }

    if (lowerMessage.includes('productivity') && (lowerMessage.includes('tip') || lowerMessage.includes('advice'))) {
      return "Here are my top productivity tips:\n\n1. Start small - one habit at a time\n2. Track your wins, not just tasks\n3. Take real breaks (not phone scrolling!)\n4. Sleep is a productivity tool, not laziness\n5. Say 'no' to protect your focus time\n\nWhat area do you struggle with most?";
    }

    if (lowerMessage.includes('procrastinat')) {
      return "Interesting - you're already aware you're procrastinating, which means you're halfway to solving it!\n\nHere's a thought experiment: What would happen if you spent just 2 minutes on it right now? Not finishing it, just 2 minutes.\n\nOften, starting is 80% of the battle. The task feels smaller once you begin.\n\nWhat's ONE tiny action you could take in the next 60 seconds?";
    }

    if (lowerMessage.includes('burnout') || lowerMessage.includes('overwhelm')) {
      return "The fact that you recognize this feeling shows incredible self-awareness.\n\nHere's something counterintuitive: Taking a break isn't slowing you down - it's the thing that will speed you up.\n\nRight now, what if you gave yourself permission to do just ONE thing today? Not everything. Just one.\n\nWhich single task would make today feel like a win? Let's start there. The rest can wait.";
    }

    if (lowerMessage.includes('work life balance') || lowerMessage.includes('work-life balance')) {
      return "Work-life balance isn't 50/50, it's about harmony:\n\n• Set clear work boundaries\n• Protect personal time religiously\n• Quality > Quantity in both areas\n• Turn off notifications after hours\n• Make time for what matters\n\nBalance changes daily - that's okay!";
    }

    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      return "Everything you're trying to achieve gets easier with sleep. Think about it - every goal you have performs better when YOU perform better.\n\nHere's a challenge: What if you treated sleep like your most important meeting tomorrow? You wouldn't skip it, right?\n\nSet a bedtime alarm for tonight. Not to sleep - just to START getting ready. That's step one.\n\nYour goals can wait a few hours. They'll still be there tomorrow, and you'll crush them better when you're rested.";
    }

    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness')) {
      return "Movement is medicine! 💪\n\n• Even 10 minutes counts\n• Walking is underrated\n• Find what you enjoy (it's sustainable)\n• Consistency > Intensity\n• Rest days build strength\n\nTry: 5-min morning stretch or 10-min walk. Start small!";
    }

    if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eating')) {
      return "Nutrition affects everything - energy, mood, focus:\n\n🥗 Eat more whole foods\n💧 Hydrate consistently\n🍽️ Protein at each meal\n🚫 Minimize processed sugar\n⏰ Regular meal times help\n\nNo need for perfection - progress is enough!";
    }

    if (lowerMessage.includes('mental health') || lowerMessage.includes('anxiety') || lowerMessage.includes('depression')) {
      return "Your mental health matters most. 💚\n\n• Talk to someone - therapist, friend, family\n• Movement helps mood\n• Limit social media\n• Practice self-compassion\n• Professional help is strength, not weakness\n\nYou're not alone. Crisis resources: Call 988 (US) or local helpline.";
    }

    if (lowerMessage.includes('meaning') || lowerMessage.includes('purpose') || lowerMessage.includes('why')) {
      return "Finding meaning is a journey, not a destination:\n\n• Try different things\n• Notice what energizes you\n• Help others (instant meaning)\n• Small purposes compound\n• It's okay to not know yet\n\nMeaning comes from doing, not just thinking. Start exploring!";
    }

    if (lowerMessage.includes('failure') || lowerMessage.includes('fail') || lowerMessage.includes('mistake')) {
      return "Can I reframe this for you?\n\nYou didn't fail - you just collected data. Every person you admire has a graveyard of attempts behind them.\n\nHere's the real question: What did this teach you? Because knowledge without action is just information, but action after failure is wisdom.\n\nWhat's the smallest next step you could try differently? Not perfect, just different.";
    }

    if (lowerMessage.includes('success') || lowerMessage.includes('achieve')) {
      return "Success isn't a destination:\n\n✓ Define YOUR version (not society's)\n✓ Celebrate small wins\n✓ Progress > Perfection\n✓ Enjoy the journey\n✓ Success is peace, not just achievement\n\nYou're already successful if you're trying. Keep growing!";
    }

    if (lowerMessage.includes('compare') || lowerMessage.includes('comparison')) {
      return "Comparison is the thief of joy:\n\n• You see their highlight reel, not reality\n• Everyone's timeline is different\n• Focus on YOUR growth\n• Unfollow what makes you feel bad\n• Your only competition is yesterday's you\n\nRun your own race. 🏃";
    }

    if (lowerMessage.match(/^(what|who|when|where|why|how)/)) {
      return "That's a great question! While I specialize in productivity and work tracking, I'm happy to share general thoughts.\n\nCould you be more specific? Or ask me about:\n• Productivity strategies\n• Goal setting\n• Time management\n• Work-life balance\n• Building habits\n• This app's features";
    }

    // Goals related (with identity-based motivation)
    if (lowerMessage.includes('goal') || lowerMessage.includes('task')) {
      if (lowerMessage.includes('create') || lowerMessage.includes('add') || lowerMessage.includes('how')) {
        return "Great timing! Creating a goal is literally you deciding who you want to become.\n\nGo to the Goals page (📋 icon) → '+ New Goal'\n\nPro tip: Start with ONE light goal. People who master one thing first tend to succeed with more. What's the easiest win you could create right now?";
      }
      if (lowerMessage.includes('delete') || lowerMessage.includes('remove')) {
        return "Smart to review your goals! Successful people say no to things that don't serve them.\n\nGo to Goals page → trash icon next to the goal.\n\nYour progress stays safe. Sometimes less is more. Which goal no longer serves you?";
      }
      if (lowerMessage.includes('complete') || lowerMessage.includes('finish')) {
        return "This is where the magic happens! Each checkmark isn't just a task - it's you proving to yourself that you keep commitments.\n\nClick the checkmark on your Dashboard next to any goal.\n\nWhich goal are you about to complete? That's a win worth celebrating!";
      }
      return "You're asking about goals - that puts you ahead of most people already. Goals aren't just tasks, they're decisions about who you're becoming.\n\nReady to create your first one? Go to Goals page and start small. What matters to you today?";
    }

    // Streak related (with loss aversion psychology)
    if (lowerMessage.includes('streak')) {
      if (lowerMessage.includes('lose') || lowerMessage.includes('break') || lowerMessage.includes('miss')) {
        return "Here's the thing about streaks - missing one day hurts way more than starting feels good. That's actually useful information.\n\nYour streak resets if you miss a day, but here's what doesn't reset: the person you've become by showing up.\n\nTo protect your streak:\n• Pick ONE goal you'll never skip (make it tiny)\n• Check Dashboard daily (even for 30 seconds)\n• Enable notifications\n\nWhat's your 'never miss' goal? Make it almost too easy.";
      }
      if (lowerMessage.includes('best') || lowerMessage.includes('record')) {
        return "Your best streak? That's not just a number - that's proof of what you're capable of.\n\nIt never disappears, even if your current streak breaks. View it on Dashboard or Calendar.\n\nHere's a question: What would it take to beat your record? Not by 100 days. Just by one.";
      }
      return "Streaks are interesting - they turn showing up into a game. But here's the secret: you're not building a streak, you're building an identity.\n\nEach day you show up, you're proving to yourself who you are. The number is just feedback.\n\nHow many days have you shown up so far?";
    }

    // Pomodoro related
    if (lowerMessage.includes('pomodoro') || lowerMessage.includes('timer') || lowerMessage.includes('focus')) {
      if (lowerMessage.includes('how') || lowerMessage.includes('use') || lowerMessage.includes('work')) {
        return "The Pomodoro Technique helps you focus:\n\n1. Click '🍅 Pomodoro' in navigation\n2. Select Work mode (25 min)\n3. Start the timer\n4. Focus on one task\n5. Take a 5-min break after\n\nYou can link sessions to specific goals and get notifications when complete!";
      }
      if (lowerMessage.includes('customize') || lowerMessage.includes('change') || lowerMessage.includes('duration')) {
        return "Default durations are:\n• Work: 25 minutes\n• Short Break: 5 minutes\n• Long Break: 15 minutes\n\nYou can pause/resume anytime. After 4 work sessions, take a long break!";
      }
      return "The Pomodoro Timer (🍅) helps you focus with 25-minute work sessions and short breaks. It's proven to boost productivity and prevent burnout!";
    }

    // Calendar related
    if (lowerMessage.includes('calendar') || lowerMessage.includes('progress') || lowerMessage.includes('history')) {
      return "The Calendar (📅) shows your completion history:\n\n• Green days = goals completed\n• Darker green = more completion\n• Gray = inactive days\n• Hover for detailed stats\n\nTrack your patterns, streaks, and productivity over time!";
    }

    // Social features
    if (lowerMessage.includes('social') || lowerMessage.includes('friend') || lowerMessage.includes('share')) {
      return "Social features (👥) let you:\n\n• Connect with friends\n• See their achievements\n• Share your progress\n• Like and comment on activities\n• View friend statistics\n\nLogin to access social features!";
    }

    // Mood tracking
    if (lowerMessage.includes('mood') || lowerMessage.includes('feeling') || lowerMessage.includes('emotion')) {
      return "Track your daily mood from the Dashboard! Your mood affects how goals are sorted:\n\n😊 Happy: Hardest tasks first\n😢 Sad: Easiest tasks first\n\nThis helps match tasks to your energy level. View mood patterns on the Calendar!";
    }

    // Badges/achievements
    if (lowerMessage.includes('badge') || lowerMessage.includes('achievement') || lowerMessage.includes('unlock')) {
      return "Unlock badges by hitting milestones:\n\n🔥 Streak achievements\n📅 Consistency badges\n🎯 Goal completion awards\n⭐ Special achievements\n\nKeep completing goals to collect them all!";
    }

    // Notifications
    if (lowerMessage.includes('notification') || lowerMessage.includes('reminder') || lowerMessage.includes('alert')) {
      return "Enable notifications in Settings (⚙️ menu) to get:\n\n• Pomodoro session alerts\n• 30-second warnings\n• Goal reminders\n\nMake sure to allow notifications in your browser!";
    }

    // General help
    if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('guide')) {
      return "Here's what I can help with:\n\n📋 Creating & managing goals\n🔥 Building streaks\n🍅 Using Pomodoro timer\n📅 Understanding calendar\n👥 Social features\n😊 Mood tracking\n🏆 Earning badges\n\nWhat would you like to know more about?";
    }

    // Getting started
    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('new')) {
      return "Welcome! Here's how to get started:\n\n1. Create your first goal (Goals page)\n2. Track your mood (Dashboard)\n3. Complete goals daily\n4. Build your streak\n5. Try Pomodoro for focus\n\nStart small with 1-2 light goals and build from there!";
    }

    // Motivation (with identity-based motivation)
    if (lowerMessage.includes('motivat') || lowerMessage.includes('inspire') || lowerMessage.includes('encourage')) {
      const motivationalResponses = [
        "You know what I've noticed? People who track their goals aren't just task-doers - they're the kind of people who invest in themselves. You're literally that person right now.",
        "Think about this: Future you is watching what you do today. What would make them proud? Even one small action counts.",
        "Here's the secret - you don't need to feel motivated to start. Start first, and motivation follows. Action creates momentum, not the other way around.",
        "You're not building a streak. You're building proof that you're someone who keeps their word to themselves. That's powerful identity work.",
        "Small wins compound. What feels insignificant today becomes your success story tomorrow. You're writing that story right now.",
      ];
      return motivationalResponses[Math.floor(Math.random() * motivationalResponses.length)];
    }

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return "Hello! How can I help you with your productivity journey today? Ask me about goals, streaks, Pomodoro, or anything else!";
    }

    // Thanks
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Keep crushing your goals! 🎯";
    }

    // Jokes
    if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
      const jokes = [
        "Why did the developer go broke? Because he used up all his cache! 💸",
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "What's a productivity expert's favorite drink? Focus-presso! ☕",
        "Why was the streak worried? It couldn't handle the pressure! 🔥",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Weather/time (humorous responses since we can't access real data)
    if (lowerMessage.includes('weather')) {
      return "I don't have real-time weather data, but I do know this: perfect weather for productivity is whatever gets you started! ☀️\n\nRainy day? Perfect for focused work.\nSunny day? Great energy for tasks.\n\nNo excuses, just action! 💪";
    }

    // Philosophy
    if (lowerMessage.includes('meaning of life') || lowerMessage.includes('purpose of life')) {
      return "The meaning of life? That's the big question!\n\nMy take: Life's meaning comes from:\n• Connection with others\n• Growth and learning\n• Creating and contributing\n• Finding joy in small moments\n• Making today count\n\nWhat gives YOUR life meaning? 🌟";
    }

    // Default response
    return "I'm here to help with anything! You can ask me about:\n\n📱 This App:\n• Goals & streaks\n• Pomodoro timer\n• Calendar & social features\n\n💡 General Topics:\n• Productivity tips\n• Work-life balance\n• Mental health\n• Building habits\n• Overcoming challenges\n\nWhat's on your mind?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How do I create a goal?",
    "What's the Pomodoro timer?",
    "Tips for productivity?",
    "How to avoid burnout?",
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-2xl z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">Work Tracker Assistant</h3>
            <p className="text-xs opacity-90">Always here to help!</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="p-3 border-t border-border bg-background">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInputValue(question);
                  setTimeout(handleSendMessage, 100);
                }}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
