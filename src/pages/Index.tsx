import { Link } from "react-router-dom";
import { Zap, Target, Music, Cpu, Film, ArrowRight, Check, Download, Shield } from "lucide-react";

const features = [
  { icon: Zap, label: "Whooshes" },
  { icon: Target, label: "Impacts" },
  { icon: Music, label: "Bass Drops" },
  { icon: Cpu, label: "Glitches" },
  { icon: Film, label: "Cinematic Hits" },
  { icon: ArrowRight, label: "Transitions" },
];

const trustPoints = [
  { icon: Download, title: "Instant Download", desc: "Get access immediately after payment." },
  { icon: Check, title: "399+ Premium Sound Effects", desc: "Professionally crafted for high-retention content." },
  { icon: Film, title: "Universal Compatibility", desc: "Works with CapCut, Alight Motion, VN, Premiere Pro & more." },
  { icon: Shield, title: "Secure UPI Payment", desc: "Fast, safe, and trusted payment via UPI." },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 hero-gradient">
        <div className="absolute top-12 tracking-[0.3em] font-display text-sm text-muted-foreground">
          ZORNERR
        </div>

        <div className="text-center mt-20 animate-fade-up">
          <h2 className="text-xs uppercase tracking-[0.5em] text-primary mb-4 glow-text font-medium">
            Sound Library 001
          </h2>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-none tracking-tighter mb-6">
            ULTIMATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground">
              SFX PACK
            </span>
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed mb-8">
            399+ Professional sound effects engineered for high-retention Reels, TikToks, and Cinematic Edits.
          </p>
        </div>

        {/* Product Visual */}
        <div className="relative w-64 h-64 mb-12 animate-float animate-fade-up-delay-1">
          <div className="absolute inset-0 bg-primary blur-[80px] opacity-20" />
          <div className="glass-card w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden border border-foreground/20">
            <span className="font-display text-6xl font-bold italic text-foreground/20">Z</span>
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-muted-foreground">
              VER. 2.0 / 399 FILES
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="w-full max-w-xs space-y-4 mb-20 animate-fade-up-delay-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-muted-foreground line-through text-lg">₹299</span>
            <span className="text-foreground text-2xl font-display font-bold">
              ₹49 <span className="text-xs text-primary tracking-normal">LAUNCH PRICE</span>
            </span>
          </div>
          <Link
            to="/payment"
            className="btn-primary-zornerr w-full py-5 rounded-full flex items-center justify-center"
          >
            BUY NOW
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-secondary">
        <h2 className="font-display text-xl font-bold text-center uppercase mb-8 animate-fade-up-delay-1">
          What's Inside
        </h2>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="glass-card p-6 rounded-2xl">
              <Icon className="w-5 h-5 text-primary mb-2" />
              <h3 className="font-display font-bold text-sm uppercase">{label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 py-20 border-t border-foreground/5">
        <div className="max-w-md mx-auto space-y-6">
          {trustPoints.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm">{title}</h4>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 hero-gradient">
        <div className="max-w-xs mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-2">Ready to Level Up?</h2>
          <p className="text-muted-foreground text-sm mb-8">Get 399+ SFX for just ₹49</p>
          <Link
            to="/payment"
            className="btn-primary-zornerr w-full py-5 rounded-full flex items-center justify-center"
          >
            BUY NOW
          </Link>
        </div>
      </section>

      <footer className="p-10 text-center text-[10px] tracking-widest text-muted-foreground uppercase">
        &copy; 2024 ZORNERR DIGITAL LABS
      </footer>
    </div>
  );
};

export default Index;
