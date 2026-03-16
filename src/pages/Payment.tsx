import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const MERCHANT_UPI = "8075537916@fam";
const MERCHANT_NAME = "Zornerr";
const AMOUNT = "49";

const upiApps = [
  {
    name: "Google Pay",
    logo: "/images/gpay-logo.png",
    scheme: `tez://upi/pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${AMOUNT}&cu=INR`,
  },
  {
    name: "PhonePe",
    logo: "/images/phonepe-logo.png",
    scheme: `phonepe://pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${AMOUNT}&cu=INR`,
  },
  {
    name: "Paytm",
    logo: "/images/paytm-logo.png",
    scheme: `paytm://pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${AMOUNT}&cu=INR`,
  },
  {
    name: "FamPay",
    logo: "/images/fampay-logo.png",
    scheme: `fampay://upi/pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${AMOUNT}&cu=INR`,
  },
];

const Payment = () => {
  const [upiId, setUpiId] = useState("");
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "app" | null>(null);
  const [showPaidModal, setShowPaidModal] = useState(false);

  const upiIdRegex = /^[\w.\-]+@[\w]+$/;
  const isValidUpi = upiIdRegex.test(upiId.trim());

  const upiSuffix = upiId.trim().split("@")[1]?.toLowerCase() || "";
  const upiAppMap: Record<string, string> = {
    fam: "FamPay",
    ybl: "PhonePe",
    ibl: "PhonePe",
    axl: "PhonePe",
    okhdfcbank: "Google Pay",
    okicici: "Google Pay",
    oksbi: "Google Pay",
    okaxis: "Google Pay",
    paytm: "Paytm",
    ptyes: "Paytm",
    pthdfc: "Paytm",
    apl: "Amazon Pay",
    ratn: "Cred",
  };
  const detectedApp = upiAppMap[upiSuffix] || null;

  const handleUpiPay = useCallback(() => {
    if (!isValidUpi) return;
    const encodedUpi = encodeURIComponent(upiId.trim());
    const link = `upi://pay?pa=${encodedUpi}&pn=${MERCHANT_NAME}&am=${AMOUNT}&cu=INR`;
    window.location.href = link;
    setShowCountdown(true);
    setCountdown(30);
  }, [upiId, isValidUpi]);

  useEffect(() => {
    if (!showCountdown) return;
    if (countdown <= 0) {
      setShowCountdown(false);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [showCountdown, countdown]);

  return (
    <div className="flex flex-col min-h-screen p-6">
      <header className="py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-muted-foreground text-sm flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-sm payment-card-gradient rounded-3xl p-8 text-center animate-fade-up">
          <h2 className="font-display text-xl mb-2">Complete Payment</h2>
          <div className="text-4xl font-display font-bold mb-6">₹{AMOUNT}</div>

          {/* Order summary */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm border-b border-foreground/5 pb-2">
              <span className="text-muted-foreground">Product</span>
              <span>Ultimate SFX Pack</span>
            </div>
            <div className="flex justify-between text-sm border-b border-foreground/5 pb-2">
              <span className="text-muted-foreground">Format</span>
              <span>High-Quality WAV</span>
            </div>
            <div className="flex justify-between text-sm border-b border-foreground/5 pb-2">
              <span className="text-muted-foreground">Files</span>
              <span>399+</span>
            </div>
          </div>

          {/* Payment method selector */}
          {!paymentMethod && (
            <div className="space-y-3 animate-fade-up">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Choose Payment Method
              </p>
              <button
                onClick={() => setPaymentMethod("upi")}
                className="glass-card w-full py-4 px-5 rounded-xl flex items-center gap-3 hover:border-primary/30 transition-colors"
              >
                <img src="/images/upi-logo.png" alt="UPI" className="w-8 h-8 object-contain shrink-0 rounded-lg" />
                <span className="font-medium text-sm">Pay with UPI ID</span>
              </button>
              <button
                onClick={() => setPaymentMethod("app")}
                className="glass-card w-full py-4 px-5 rounded-xl flex items-center gap-3 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center -space-x-1 shrink-0">
                  {upiApps.map((app) => (
                    <img
                      key={app.name}
                      src={app.logo}
                      alt={app.name}
                      className="w-7 h-7 rounded-lg object-contain bg-foreground/5 border border-background"
                    />
                  ))}
                </div>
                <span className="font-medium text-sm">Pay via UPI App</span>
              </button>
            </div>
          )}

          {/* Option 1: Enter UPI ID */}
          {paymentMethod === "upi" && (
            <div className="space-y-4 animate-fade-up">
              <button
                onClick={() => {
                  setPaymentMethod(null);
                  setShowCountdown(false);
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
              >
                ← Change method
              </button>

              <div className="text-left">
                <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  Your UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="example@okicici"
                  maxLength={50}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                {upiId && !isValidUpi && (
                  <p className="text-xs text-destructive mt-1">Enter a valid UPI ID (e.g., name@upi)</p>
                )}
                {isValidUpi && detectedApp && (
                  <p className="text-xs text-primary mt-1">
                    ✓ Check your <span className="font-semibold">{detectedApp}</span> app to continue the payment
                  </p>
                )}
              </div>

              {!showCountdown ? (
                <button
                  onClick={handleUpiPay}
                  disabled={!isValidUpi}
                  className="btn-cyan w-full py-4 rounded-xl text-lg disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  PAY ₹{AMOUNT}
                </button>
              ) : (
                <div className="glass-card rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium">
                      Check your {detectedApp || "UPI"} app
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A payment request has been sent. Approve it in your {detectedApp || "UPI"} app.
                  </p>
                  <div className="text-primary font-display text-2xl font-bold">{countdown}s</div>
                  {countdown <= 0 ? (
                    <button
                      onClick={handleUpiPay}
                      className="btn-cyan w-full py-3 rounded-xl text-sm"
                    >
                      RESEND REQUEST
                    </button>
                  ) : (
                    <p className="text-[10px] text-muted-foreground">
                      Resend available in {countdown}s
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Option 2: Select UPI App */}
          {paymentMethod === "app" && (
            <div className="space-y-4 animate-fade-up">
              <button
                onClick={() => setPaymentMethod(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
              >
                ← Change method
              </button>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Select your UPI App
              </p>
              <div className="space-y-3">
                {upiApps.map((app) => (
                  <a
                    key={app.name}
                    href={app.scheme}
                    className="glass-card w-full py-4 px-5 rounded-xl flex items-center gap-4 hover:border-primary/30 transition-colors block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={app.logo}
                        alt={app.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="font-medium text-sm">{app.name}</span>
                    <ArrowLeft className="w-4 h-4 text-muted-foreground ml-auto rotate-180" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* I Have Paid */}
        <button
          onClick={() => setShowPaidModal(true)}
          className="mt-8 text-muted-foreground text-sm underline underline-offset-4 hover:text-foreground transition-colors animate-fade-up-delay-2"
        >
          I HAVE PAID
        </button>

        {/* Paid verification modal */}
        {showPaidModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-up">
            <div className="w-full max-w-sm payment-card-gradient rounded-3xl p-8 text-center space-y-4">
              <h3 className="font-display text-lg font-bold">Verify Your Payment</h3>
              <p className="text-sm text-muted-foreground">
                To confirm your purchase, contact us with <span className="text-foreground font-medium">proper evidence</span> such as your <span className="text-foreground font-medium">Payment ID, UPI transaction screenshot,</span> or <span className="text-foreground font-medium">transaction reference number</span>.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/918606040229?text=Hi%2C%20I%20have%20paid%20%E2%82%B949%20for%20the%20Ultimate%20SFX%20Pack.%20Here%20is%20my%20payment%20proof%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card w-full py-4 rounded-xl flex items-center justify-center gap-3 hover:border-primary/30 transition-colors block"
                >
                  <span className="text-lg">💬</span>
                  <span className="font-medium text-sm">WhatsApp: 8606040229</span>
                </a>
                <a
                  href="mailto:notvalo052@gmail.com?subject=Payment%20Proof%20-%20Ultimate%20SFX%20Pack&body=Hi%2C%20I%20have%20paid%20%E2%82%B949%20for%20the%20Ultimate%20SFX%20Pack.%20Here%20is%20my%20payment%20proof%3A"
                  className="glass-card w-full py-4 rounded-xl flex items-center justify-center gap-3 hover:border-primary/30 transition-colors block"
                >
                  <span className="text-lg">📧</span>
                  <span className="font-medium text-sm">notvalo052@gmail.com</span>
                </a>
              </div>

              <button
                onClick={() => setShowPaidModal(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors pt-2"
              >
                ← Go Back
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Payment;
