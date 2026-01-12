
import React, { useState, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const BTC_ADDRESS = "bc1p2e5gp42c9rzv2sayslxtdpmk0mvtl974wsxzwz5sllw44x35f7csxf4x2h";

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    // Cross-platform copy support (Browser, Android, Telegram Mini App)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(BTC_ADDRESS).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  }, []);

  const fallbackCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = BTC_ADDRESS;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center bg-white p-6 pb-24 md:pb-32">
      {/* Background Shapes */}
      <div className="bg-shape-2"></div>
      <div className="bg-shape-1"></div>

      <div className="w-full max-w-lg z-10 flex flex-col">
        {/* Swirl Logo */}
        <div className="mb-10 mt-4">
          <svg width="80" height="80" viewBox="0 0 100 100" className="text-blue-600">
            <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="180 60" />
            <path d="M50 30C38.9 30 30 38.9 30 50C30 61.1 38.9 70 50 70C61.1 70 70 61.1 70 50" fill="none" stroke="black" strokeWidth="8" strokeDasharray="100 20" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
          </svg>
        </div>

        {/* Text Details Section */}
        <div className="space-y-4 mb-8">
          <div className="text-2xl font-semibold flex items-baseline">
            <span className="text-gray-900 mr-2">Currency:</span>
            <span className="text-gray-800">BTC</span>
          </div>

          <div className="text-xl flex items-baseline">
            <span className="text-gray-900 mr-2">Account Holder:</span>
            <span className="text-purple-900 font-medium">Address Only</span>
          </div>

          <div className="text-xl flex flex-col space-y-2">
            <span className="text-gray-900 font-semibold">BTC ID:</span>
            <span className="text-xs break-all font-mono text-gray-700 leading-relaxed">
              {BTC_ADDRESS}
            </span>
          </div>

          <div className="text-xl flex items-baseline">
            <span className="text-purple-800 font-semibold mr-2">Others:</span>
            <span className="text-gray-800">N/A</span>
          </div>
        </div>

        {/* Copy Button Container */}
        <div className="flex justify-end mb-12">
          <button 
            onClick={handleCopy}
            className="glossy-button px-8 py-2 text-white font-black text-xl tracking-wider uppercase flex items-center justify-center min-w-[120px]"
          >
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>

        {/* QR Code Card Replica */}
        <div className="bg-gray-50 rounded-sm p-8 shadow-sm border border-gray-100 flex flex-col items-center w-full">
          <div className="flex items-center w-full mb-4 space-x-3">
            <div className="bg-orange-500 rounded-full p-2">
              <svg viewBox="0 0 32 32" width="24" height="24" fill="white">
                <path d="M22.7,11.5c-0.2-1.3-0.8-2.3-1.8-3c-1-0.7-2.3-1-3.9-1c-1,0-1.8,0.1-2.5,0.3L14.5,4.5l-2.1,0.3l0.9,3.3l-1.6,0.2 L10.8,5l-2.1,0.3l0.9,3.3l-2.4,0.3l0.2,1.8l1,0l1.2-0.2c0.7-0.1,1.1,0.2,1.3,0.8l1.4,5.4c0.1,0.4,0,0.8-0.2,1.1 c-0.2,0.3-0.6,0.4-1.1,0.5l-1.3,0.2l0.2,1.8l2.5-0.3l0.9,3.4l2.1-0.3l-0.9-3.4c0.7-0.1,1.4-0.2,2-0.3l0.9,3.4l2.1-0.3l-0.9-3.4 c1.8-0.4,3.1-1.1,3.8-2.1c0.7-1,0.8-2.2,0.4-3.7C23.6,13.2,23.3,12.3,22.7,11.5z M19.4,19.2c-0.3,1.2-1.1,1.9-2.5,2.1 c-0.6,0.1-1.3,0.1-2.1,0.1l-1.1-4.2c0.8,0,1.5-0.1,2.1-0.2c1.4-0.2,2.2,0.2,2.5,1.2C18.4,18.4,18.4,18.8,19.4,19.2z M20.2,13.6 c-0.2,1-0.9,1.6-2,1.8c-0.5,0.1-1.1,0.1-1.8,0l-1-3.8c0.7,0,1.2-0.1,1.7-0.1c1.2-0.2,1.9,0.2,2.1,1.1 C19.3,12.8,19.3,13.2,20.2,13.6z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="font-bold text-gray-900 leading-none">BTC</span>
                <span className="text-xs text-gray-500">Bitcoin</span>
              </div>
              <span className="text-[9px] text-gray-400 break-all font-mono leading-tight max-w-[200px]">
                {BTC_ADDRESS}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6">
            <QRCodeSVG 
              value={BTC_ADDRESS} 
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>

          <div className="text-center text-[10px] text-gray-400 font-medium px-4 leading-relaxed mb-10">
            Only send <span className="text-gray-700 font-bold">Bitcoin</span> network assets to this<br />
            address. Other assets will be lost forever.
          </div>

          <div className="w-full text-center py-2 border-t border-gray-100">
             <span className="text-[#f97316] font-bold tracking-widest text-lg uppercase">
               SALMAN DOLLAR EXCHANGER
             </span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {copied && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-full text-sm z-50 animate-bounce">
          Copied to Clipboard
        </div>
      )}
    </div>
  );
};

export default App;
