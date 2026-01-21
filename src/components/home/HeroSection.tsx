import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="hero-gradient text-primary-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Premium Quality Templates</span>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            Build faster with{' '}
            <span className="text-accent">premium templates</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            Launch your next project in hours, not weeks. Production-ready templates 
            built with React, TypeScript, and modern best practices.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            <Link to="/templates">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 btn-accent-glow gap-2"
              >
                Browse Templates
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Create Free Account
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div 
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            <div>
              <div className="text-3xl font-bold text-accent">50+</div>
              <div className="text-sm text-primary-foreground/60">Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">5k+</div>
              <div className="text-sm text-primary-foreground/60">Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">99%</div>
              <div className="text-sm text-primary-foreground/60">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
