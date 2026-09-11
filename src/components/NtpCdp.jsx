import KodBox from './KodBox';

export default function NtpCdp() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>NTP, CDP és LLDP Protokollok</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="clock">⏰</span> Hálózati Idő és Felderítés Alapjai
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              A rendszeridő pontos tartása és a szomszédos hálózati eszközök felderítése elengedhetetlen az üzemeltetéshez:
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>NTP (Network Time Protocol):</strong> A hálózati eszközök órájának szinkronizálására szolgál egy központi időszerverhez (fontos a syslog bejegyzések pontos időbélyegéhez).</li>
              <li><strong>CDP (Cisco Discovery Protocol):</strong> Cisco-proprietáris Layer 2 protokoll közvetlenül csatlakozó Cisco eszközök (router, switch, IP telefon) felderítésére.</li>
              <li><strong>LLDP (Link Layer Discovery Protocol):</strong> Szabványos, gyártófüggetlen (IEEE 802.1AB) Layer 2 felderítő protokoll.</li>
            </ul>
          </div>
        </div>

        <h1>1. NTP (Network Time Protocol) Beállítása</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="NTP szerver IP-címének megadása" kod="Router(config)#ntp server 192.168.1.100" />
          <KodBox leiras="Manuális órabeállítás (ha nincs NTP szerver)" kod="Router#clock set 14:30:00 10 Sep 2026" />
        </div>

        <h1>2. CDP (Cisco Discovery Protocol) Kezelése</h1>

        <div className="kod-doboz">
          <KodBox leiras="CDP globális engedélyezése (alapértelmezetten be van kapcsolva)" kod="Router(config)#cdp run" />
          <KodBox leiras="CDP globális kikapcsolása" kod="Router(config)#no cdp run" />
          <KodBox leiras="CDP kikapcsolása egy adott interfészen (biztonsági okokból)" kod="Router(config-if)#no cdp enable" />
          <KodBox leiras="CDP visszakapcsolása az interfészen" kod="Router(config-if)#cdp enable" />
        </div>

        <h1>3. LLDP (Link Layer Discovery Protocol) Kezelése</h1>

        <div className="kod-doboz">
          <KodBox leiras="LLDP globális engedélyezése (alapértelmezetten ki lehet kapcsolva)" kod="Router(config)#lldp run" />
          <KodBox leiras="Interfész kiválasztása" kod="Router(config)#interface g0/0" />
          <KodBox leiras="LLDP csomagok küldésének engedélyezése az interfészen" kod="Router(config-if)#lldp transmit" />
          <KodBox leiras="LLDP csomagok fogadásának engedélyezése az interfészen" kod="Router(config-if)#lldp receive" />
        </div>

        <h1>Ellenőrzés és Diagnosztika</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="search">🔍</span> Ellenőrzés Packet Tracerben
          </h3>
          <p style={{ margin: '5px 0' }}>
            A parancsok segítségével ellenőrizheted az NTP szinkronizáció állapotát, valamint a közvetlenül csatlakozó szomszédos eszközök adatait (IP-cím, port, eszközmodell).
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Jelenlegi pontos idő megjelenítése" kod="Router#show clock" />
          <KodBox leiras="NTP szinkronizáció állapotának ellenőrzése" kod="Router#show ntp status" />
          <KodBox leiras="NTP szerver kapcsolatok és stratum érték" kod="Router#show ntp associations" />
          <KodBox leiras="CDP szomszédok listájának megjelenítése" kod="Router#show cdp neighbors" />
          <KodBox leiras="CDP szomszédok részletes adatai (IP-címek, IOS verzió)" kod="Router#show cdp neighbors detail" />
          <KodBox leiras="LLDP szomszédok listájának megjelenítése" kod="Router#show lldp neighbors" />
          <KodBox leiras="LLDP szomszédok részletes adatai" kod="Router#show lldp neighbors detail" />
        </div>
      </div>

      <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>
    </>
  );
}