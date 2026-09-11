import { useState } from 'react';

export default function KodBox({ kod, leiras }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Csak a # utáni részt másoljuk, ha van benne prompt
    let tisztaKod = kod.includes('#') ? kod.split('#')[1].trim() : kod;
    
    navigator.clipboard.writeText(tisztaKod);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="kod-blokk-kontener">
      {/* Ha van megadva leírás, szürkén és dőlten megjelenítjük a doboz felett */}
      {leiras && <div className="kod-magyarazat">// {leiras}</div>}
      
      <div className="masolhato-sor">
        <span className="parancs-szoveg">{kod}</span>
        <button 
          className={`masolas-btn ${copied ? 'siker-halvany' : ''}`} 
          onClick={handleCopy}
          title="Parancs másolása"
        >
          {/* Beépített SVG Ikon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="copy-icon"
          >
            {copied ? (
              // Pipa ikon, ha sikeres a másolás
              <path d="M20 6L9 17l-5-5"></path>
            ) : (
              // Normál kétlapos másolás ikon
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </>
            )}
          </svg>
          {/* Dinamikus szöveg az ikon mellé */}
          <span className="gomb-felirat">{copied ? 'Másolva!' : 'Másolás'}</span>
        </button>
      </div>
    </div>
  );
}