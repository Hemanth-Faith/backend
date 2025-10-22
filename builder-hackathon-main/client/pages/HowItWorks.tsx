import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Set Your Goals',
      description: 'Create goals with different effort levels. Choose whether they\'re one-time tasks or recurring habits.',
      icon: '🎯',
      details: [
        'Light effort: Quick wins (5-15 min)',
        'Medium effort: Standard goals (15-45 min)',
        'Heavy effort: Major undertakings (45+ min)',
      ],
    },
    {
      number: '2',
      title: 'Track Daily Progress',
      description: 'Complete your goals each day and mark them as done. Watch your consistency build over time.',
      icon: '✓',
      details: [
        'Mark goals complete when finished',
        'Celebrate small daily wins',
        'Build momentum with visible progress',
      ],
    },
    {
      number: '3',
      title: 'Build Your Streak',
      description: 'Maintain consistency and build a streak. The longer your streak, the more motivation you\'ll have.',
      icon: '🔥',
      details: [
        'Current streak: Active consistency count',
        'Best streak: Your personal record',
        'Celebrate milestones',
      ],
    },
    {
      number: '4',
      title: 'Visualize Progress',
      description: 'View your journey on the progress calendar. See patterns and celebrate completed days.',
      icon: '📅',
      details: [
        'Green days: All goals completed (100%)',
        'Yellow days: Most goals completed (33-66%)',
        'Orange days: Some goals completed (&lt;33%)',
      ],
    },
  ];

  const benefits = [
    {
      title: 'Bridge the Intention-Action Gap',
      description: 'Turn good intentions into consistent habits with visual tracking and motivation.',
      icon: '🌉',
    },
    {
      title: 'Overcome Procrastination',
      description: 'Build accountability through daily tracking and streak motivation.',
      icon: '⚡',
    },
    {
      title: 'Stay Motivated',
      description: 'See your progress grow with streaks, badges, and daily celebrations.',
      icon: '💪',
    },
    {
      title: 'Improve Consistency',
      description: 'Make progress visible. What gets measured gets managed.',
      icon: '📈',
    },
  ];

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-8">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl font-bold text-foreground mb-4">How Work Tracker Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, elegant system to turn your goals into habits and overcome the intention-action gap.
          </p>
        </section>

        {/* Four Steps */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Your Journey</h2>
          <div className="grid gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-8">
                <div className="flex items-start gap-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 flex-shrink-0">
                    <div className="text-3xl">{step.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-sm font-bold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                        Step {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="text-primary">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Why It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Principles */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Core Principles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Small Wins Matter</h3>
              <p className="text-muted-foreground">
                Don't aim for perfection. Consistent progress, no matter how small, compounds over time. Completing 60% of your goals daily is better than 100% sporadically.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Visibility Drives Action</h3>
              <p className="text-muted-foreground">
                When your progress is visible—through streaks, calendars, and daily counters—you're more likely to follow through. What gets measured gets managed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Streaks Build Momentum</h3>
              <p className="text-muted-foreground">
                A streak is a powerful motivator. It transforms goals from abstract desires into tangible, visual targets. Don't break the chain.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Flexibility is Key</h3>
              <p className="text-muted-foreground">
                Goals can be light, medium, or heavy. They can be once, daily, or weekly. Your tracking system should adapt to your life, not the other way around.
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Create your first goal and start your journey to bridging the intention-action gap today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/goals">
              <Button variant="default" className="text-base px-8">
                Create Your First Goal
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="text-base px-8">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">What if I miss a day?</h3>
            <p className="text-muted-foreground text-sm">
              Your streak resets, but that's okay. The goal is progress, not perfection. Start fresh the next day and focus on building a new streak.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">How many goals should I create?</h3>
            <p className="text-muted-foreground text-sm">
              Start small. 2-3 goals is ideal for beginners. You can always add more as you build consistency. Quality over quantity.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">Can I edit or delete goals?</h3>
            <p className="text-muted-foreground text-sm">
              Yes! Go to the Goals page to manage your goals. You can delete goals anytime, though your streak history will be cleared.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">Is my data saved?</h3>
            <p className="text-muted-foreground text-sm">
              Your data is saved locally in your browser. When we launch cloud sync, you'll be able to sync across devices.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
