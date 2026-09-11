import KodBox from './KodBox';

export default function Wlan() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>WLAN (Vezeték nélküli hálózatok)</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="wlan">📶</span> WLAN és WLC Alapjai
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              A vezeték nélküli hálózatok (WLAN) felépítése két fő architektúrában fordul elő a szakmai vizsgán:
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Autonomous AP / Home Router:</strong> Önállóan működő hozzáférési pont (SSID, WPA2-PSK jelszó, DHCP beállítások a helyi eszközön).</li>
              <li><strong>Controller-based (WLC + LAP):</strong> Központi Wireless LAN Controller (WLC) vezérli a Lightweight AP-kat (CAPWAP alagúton keresztül).</li>
              <li><strong>Titkosítás & Hitelesítés:</strong> WPA2/WPA3 Personal (Pre-Shared Key / PSK) vagy Enterprise (802.1X + RADIUS szerver).</li>
            </ul>
          </div>
        </div>

        <h1>1. Switch oldali infrastruktúra (WLC & AP támogatás)</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Switch#config terminal" />
          <KodBox leiras="AP / WLC csatlakozási port kiválasztása" kod="Switch(config)#interface FastEthernet 0/1" />
          <KodBox leiras="Port beállítása trunk módba (több VLAN/SSID esetén)" kod="Switch(config-if)#switchport mode trunk" />
          <KodBox leiras="Native VLAN megadása az AP menedzsment forgalmához" kod="Switch(config-if)#switchport trunk native vlan 10" />
          <KodBox leiras="Port bekapcsolása" kod="Switch(config-if)#no shutdown" />
        </div>

        <h1>2. WLC (Wireless LAN Controller) Beállítási Lépések PT-ben</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="wlc">🖥️</span> WLC Webes Felület (GUI) Beállítási Szempontok
          </h3>
          <p style={{ margin: '5px 0' }}>
            A WLC-t a Packet Tracerben általában a Management PC böngészőjéből konfiguráljuk:
          </p>
          <ul style={{ marginTop: '10px' }}>
            <li><strong>1. Interface létrehozása:</strong> <code>Controller &gt; Interfaces &gt; New</code> (Név, VLAN ID, IP cím, Gateway, DHCP szerver megadása).</li>
            <li><strong>2. WLAN létrehozása:</strong> <code>WLANs &gt; Create New</code> (Profile Name és SSID megadása).</li>
            <li><strong>3. VLAN csatolás:</strong> A WLAN beállításainál az <em>Interface/Interface Group</em> mezőben válaszd ki a létrehozott VLAN interfészt.</li>
            <li><strong>4. Biztonság:</strong> <code>Security fülnél Layer 2 &gt; WPA+WPA2</code> engedélyezése, WPA2 Policy + PSK kulcs megadása.</li>
            <li><strong>5. WLAN aktiválása:</strong> Status opció bepipálása (<code>Enabled</code>), majd Apply.</li>
          </ul>
        </div>

        <h1>3. Kliens (PC / Laptop) Csatlakoztatása WLAN-hoz</h1>

        <div className="kod-doboz">
          <KodBox leiras="Laptop Wi-Fi modul cseréje (Physical tab)" kod="PC/Laptop > Power Off > WPC300N modul behelyezése > Power On" />
          <KodBox leiras="Csatlakozás tesztelése GUI-ból" kod="PC > PC Wireless App > Connect > SSID kiválasztása > PSK megadása" />
        </div>

        <h1>WLAN Állapot és Diagnosztika</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="search">🔍</span> Ellenőrzés Packet Tracerben
          </h3>
          <p style={{ margin: '5px 0' }}>
            Ellenőrizd, hogy a vezeték nélküli kliensek megkapták-e a DHCP IP-címet és elérik-e a hálózat többi részét.
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Kliens IP-címének és Wi-Fi kapcsolatának ellenőrzése" kod="PC> ipconfig /all" />
          <KodBox leiras="Ping teszt a vezeték nélküli kliensről az átjáró (Gateway) felé" kod="PC> ping 192.168.10.1" />
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