import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const DOWNLOAD_LINK = "https://drive.google.com/your-download-link";

const Success = () => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVerified(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (verified) {
      const redirect = setTimeout(() => {
        window.location.href = DOWNLOAD_LINK;
      }, 3000);
      return () => clearTimeout(redirect);
    }
  }, [verified]);

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      {!verified ? (
        <div className="text-center animate-fade-up">
          <div className="w-10 h-10 border-2 border-muted rounded-full border-t-primary animate-spin-slow mx-auto mb-6" />
          <h2 className="font-display text-xl tracking-tight">Verifying Transaction...</h2>
          <p className="text-muted-foreground text-sm mt-2">Preparing your high-quality SFX library.</p>
        </div>
      ) : (
        <div className="text-center animate-fade-up">
          <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-8 flex items-center justify-center success-glow">
            <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Payment Confirmed</h1>
          <p className="text-muted-foreground mb-8">Your download will start automatically.</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            Redirecting to Secure Server...
          </p>
        </div>
      )}
    </div>
  );
};

export default Success;
