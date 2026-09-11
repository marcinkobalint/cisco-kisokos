import React from 'react';
import KodBox from './KodBox';

export default function Ssh() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="section-fade">
      <h1>SSH (Secure Shell) Konfiguráció</h1>

      <div className="feladat-doboz">
        <h3>
          <span role="img" aria-label="shield">🛡️</span> Biztonsági alapok: SSH vs. Telnet
        </h3>
        <p>
          Az <strong>SSH (Secure Shell)</strong> lehetővé teszi az eszköz távoli elérését egy <strong>titkosított csatornán</strong> keresztül.
        </p>
        <p style={{ marginTop: '10px' }}>
          Ezzel szemben a <strong>Telnet</strong> használata során a felhasználónevek, jelszavak és a kiadott utasítások{' '}
          <span style={{ color: '#f85149', fontWeight: 'bold' }}>titkosítás nélkül</span> utaznak a hálózaton, így bárki számára leolvashatóak.
        </p>
      </div>

      <div className="warning-doboz">
        <h3>
          <span role="img" aria-label="key">🔑</span> Miért kell Gépnév és Tartománynév?
        </h3>
        <p>
          Az SSH-hoz szükséges <strong>RSA kulcspár</strong> generálásához az eszköznek kötelezően rendelkeznie kell:
        </p>
        <ul>
          <li><strong>Hostname</strong> (Gépnév)</li>
          <li><strong>Domain-name</strong> (Tartománynév)</li>
        </ul>
        <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginTop: '5px' }}>
          Ezek az adatok alkotják a kulcs alapját (vagyis az azonosítóját).
        </p>
      </div>

      <h1>Általános beállítás:</h1>

      <div className="kod-doboz">
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Gépnév megadása. Az alapértelmezett Router névvel nem lehet titkosító kulcsot generálni" kod="Router(config)#hostname routernév" />
        <KodBox leiras="Tartomány megadása. Az RSA kulcs a gépnévből és a tartománynévből áll össze" kod="R1(config)#ip domain-name tesztpeldadomain.com" />
        <KodBox leiras="Titkosító kulcs létrehozása. 1024 bit már elegendő hosszúság, hogy az SSH2 verziója működjön" kod="R1(config)#crypto key generate rsa" />
        <KodBox leiras="Helyi felhasználó és a hozzátartozó jelszó megadása. Secret kód miatt a jelszó hash-elve tárolódik" kod="R1(config)#username név secret jelszó" />
        <KodBox leiras="Virtuális vonalak megadása, így egyszerre max 5 ember tud belépni" kod="R1(config)#line vty 0 4" />
        <KodBox leiras="Helyi hitelesítés, a router ne általános jelszót kérjen, hanem ellenőrizze a belépőt a fent létrehozott adatbázisban" kod="R1(config-line)#login local" />
        <KodBox leiras="Ez a parancs a telnet kizárása, tehát ezentúl aki nem titkosított csatornán próbálkozik, a router azonnal elutasítja" kod="R1(config-line)#transport input ssh" />
        <KodBox leiras="Kilépés a vonal beállításaiból" kod="R1(config-line)#exit" />
      </div>

      <h1>Példa beállítás:</h1>

      <div className="kod-doboz">
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Gépnév megadása" kod="Router(config)#hostname R1" />
        <KodBox leiras="Tartomány megadása" kod="R1(config)#ip domain-name iskolasshdomain.com" />
        <KodBox leiras="Titkosító kulcs létrehozása (1024 bit)" kod="R1(config)#crypto key generate rsa" />
        <KodBox leiras="Helyi felhasználó és a jelszó megadása" kod="R1(config)#username balint secret 123456" />
        <KodBox leiras="Virtuális vonalak megadása (0-4)" kod="R1(config)#line vty 0 4" />
        <KodBox leiras="Helyi adatbázisos hitelesítés" kod="R1(config-line)#login local" />
        <KodBox leiras="Csak SSH engedélyezése" kod="R1(config-line)#transport input ssh" />
        <KodBox leiras="Kilépés a vonal beállításaiból" kod="R1(config-line)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Jogosultságok és Ellenőrzés</h2>
        <KodBox 
          leiras="Felhasználó létrehozása teljes adminisztrátori joggal (level 15)" 
          kod="R1(config)#username balint privilege 15 secret 123456" 
        />
        <p style={{ fontSize: '0.85rem', color: '#8b949e', marginTop: '5px', marginBottom: '15px' }}>
          * A <strong>privilege 15</strong> azt jelenti, hogy belépés után azonnal az 'enable' módban leszünk, minden jogunk megvan.
        </p>

        <KodBox leiras="SSH verzió és állapot ellenőrzése" kod="R1#show ip ssh" />
        <KodBox leiras="A futó konfiguráció megtekintése" kod="R1#show running-config" />
        <KodBox leiras="A generált RSA kulcs megtekintése" kod="R1#show crypto key mypubkey rsa" />
      </div>

      <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>

      <div className="warning-doboz" style={{ borderLeftColor: '#3fb950', backgroundColor: 'rgba(63, 185, 80, 0.05)' }}>
        <h3 style={{ color: '#3fb950' }}>
          <span role="img" aria-label="connect">🚀</span> SSH Csatlakozás (A kliens gépről)
        </h3>
        <p>
          Ha mindent jól beállítottál, egy hálózatba kötött számítógép <strong>Command Prompt</strong>-jába kell beírnod a következőt:
        </p>

        <KodBox 
          leiras="Szintaxis: ssh -l [felhasználónév] [router_IP]" 
          kod="PC> ssh -l balint 192.168.1.1" 
        />
      </div>

      <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px' }}>
        <ol style={{ fontSize: '0.9rem', color: '#c9d1d9', marginLeft: '20px' }}>
          <li>A parancs után a router <strong>jelszót fog kérni</strong>.</li>
          <li>Gépeld be a jelszót (figyelem: a kurzor nem fog mozogni gépelés közben!).</li>
          <li>Ha sikerült, a prompt megváltozik: <code>R1#</code> - Innentől távolról konfigurálod az eszközt!</li>
        </ol>
      </div>

      <div className="footer-space"></div>
    </div>
  );
}