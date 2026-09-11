import KodBox from './KodBox';

export default function Nat() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>NAT beállítások</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="shield">📡</span> NAT (Hálózati Címfordítás) és ACL (Hozzáférés-vezérlési Listák)
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              A NAT (Hálózati Címfordítás) és az ACL-ek (Hozzáférési Vezérlőlisták) a hálózati biztonság és az adatátvitel alappillérei. Egy Cisco hálózatban a címterületeket négy alapvető fogalom alapján különböztetjük meg:
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Inside Local:</strong> A belső hálózatban lévő eszköz privát IP-címe (pl. 192.168.1.10).</li>
              <li><strong>Inside Global:</strong> A belső eszköz külvilág felé látható, publikus IP-címe (pl. 203.0.113.10).</li>
              <li><strong>Outside Local:</strong> A külső eszköz címe a belső hálózat szemszögéből.</li>
              <li><strong>Outside Global:</strong> A külső eszköz valódi, publikus IP-címe (pl. 8.8.8.8).</li>
            </ul>
          </div>
          <div style={{ marginTop: '20px' }}>
            <strong>Hálózati Architektúra: Belső, Külső és DMZ</strong>
            <p style={{ margin: '5px 0' }}>
              <strong>A router interfészeit a NAT és a biztonsági zónák alapján három különálló területre osztjuk fel:</strong>
            </p>
            <ul>
              <li><strong>Belső hálózat (Inside):</strong> Privát IP-címtartomány (pl. 192.168.1.0/24). Innen az eszközök a NAT (PAT/Port Address Translation) segítségével érik el az internetet.</li>
              <li><strong>Külső hálózat (Outside):</strong> A publikus internet vagy a szolgáltató felőli oldal.</li>
              <li><strong>DMZ (Demilitarized Zone):</strong> A nyilvánosan elérhető szerverek (pl. Webszerver 192.168.2.10) elkülönített területe. A DMZ-be statikus NAT-ot állítunk be, hogy a külső felhasználók fix publikus IP-címen érhessék el a webszervert.</li>
            </ul>
          </div>
        </div>

        <h1>Statikus NAT beállítás</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Interfész kiválasztása" kod="Router(config)#interface g0/0" />
          <KodBox leiras="IP cím és alhálózati maszk beállítása" kod="Router(config-if)#ip address 192.168.1.1 255.255.255.0" />
          <KodBox leiras="LAN oldal beállítása" kod="Router(config-if)#ip nat inside" />
          <KodBox leiras="Port bekapcsolása" kod="Router(config-if)#no shutdown" />
          <KodBox leiras="Kilépés a konfigurációs módból" kod="Router(config-if)#exit" />
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Interfész kiválasztása" kod="Router(config)#interface g0/1" />
          <KodBox leiras="IP cím és alhálózati maszk beállítása" kod="Router(config-if)#ip address 200.0.0.1 255.255.255.0" />
          <KodBox leiras="WAN oldal beállítása" kod="Router(config-if)#ip nat outside" />
          <KodBox leiras="Port bekapcsolása" kod="Router(config-if)#no shutdown" />
          <KodBox leiras="Kilépés a konfigurációs módból" kod="Router(config-if)#exit" />
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Statikus NAT létrehozása" kod="Router(config)#ip nat inside source static 192.168.1.10 200.1.1.10" />
          <KodBox leiras="Ellenőrzés" kod="Router#show ip nat translations" />
        </div>

        <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>

        <h1>Dinamikus NAT beállítás</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Belső (LAN) interfész kiválasztása" kod="Router(config)#interface g0/0" />
          <KodBox leiras="IP cím beállítása" kod="Router(config-if)#ip address 192.168.1.1 255.255.255.0" />
          <KodBox leiras="LAN oldal kijelölése" kod="Router(config-if)#ip nat inside" />
          <KodBox leiras="Port bekapcsolása" kod="Router(config-if)#no shutdown" />
          <KodBox leiras="Kilépés az interfészből" kod="Router(config-if)#exit" />
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Külső (WAN) interfész kiválasztása" kod="Router(config)#interface g0/1" />
          <KodBox leiras="IP cím beállítása" kod="Router(config-if)#ip address 200.0.0.1 255.255.255.0" />
          <KodBox leiras="WAN oldal kijelölése" kod="Router(config-if)#ip nat outside" />
          <KodBox leiras="Port bekapcsolása" kod="Router(config-if)#no shutdown" />
          <KodBox leiras="Kilépés az interfészből" kod="Router(config-if)#exit" />
        </div>

        <div className="kod-doboz">
          <KodBox leiras="1. Lépés: Belső hálózat kijelölése (ACL)" kod="Router(config)#access-list 1 permit 192.168.1.0 0.0.0.255" />
          <KodBox leiras="2. Lépés: Publikus IP-címtartomány (Pool) megadása" kod="Router(config)#ip nat pool SAJAT_POOL 200.0.0.10 200.0.0.20 netmask 255.255.255.0" />
          <KodBox leiras="3. Lépés: ACL és a Pool összekapcsolása" kod="Router(config)#ip nat inside source list 1 pool SAJAT_POOL" />
          <KodBox leiras="Ellenőrzés (fordítások megtekintése)" kod="Router#show ip nat translations" />
          <KodBox leiras="Ellenőrzés (NAT statisztikák)" kod="Router#show ip nat statistics" />
        </div>

        <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>

        <h1>DMZ (Demilitarizált Zóna) beállítás</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="DMZ interfész kiválasztása" kod="Router(config)#interface g0/2" />
          <KodBox leiras="DMZ IP-cím és maszk megadása" kod="Router(config-if)#ip address 192.168.2.1 255.255.255.0" />
          <KodBox leiras="DMZ kijelölése belső (NAT) oldalnak" kod="Router(config-if)#ip nat inside" />
          <KodBox leiras="Port bekapcsolása" kod="Router(config-if)#no shutdown" />
          <KodBox leiras="Kilépés az interfészből" kod="Router(config-if)#exit" />
        </div>

        <div className="kod-doboz">
          <KodBox leiras="DMZ Webszerver (192.168.2.10) publikus IP-re fordítása" kod="Router(config)#ip nat inside source static 192.168.2.10 200.0.0.50" />
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Kiterjesztett ACL létrehozása" kod="Router(config)#ip access-list extended DMZ_VEDELEM" />
          <KodBox leiras="HTTP (80) forgalom engedélyezése a webszerverre" kod="Router(config-ext-nacl)#permit tcp any host 192.168.2.10 eq 80" />
          <KodBox leiras="HTTPS (443) forgalom engedélyezése a webszerverre" kod="Router(config-ext-nacl)#permit tcp any host 192.168.2.10 eq 443" />
          <KodBox leiras="DMZ-ből a belső LAN (192.168.1.0/24) elérésének tiltása" kod="Router(config-ext-nacl)#deny ip 192.168.2.0 0.0.0.255 192.168.1.0 0.0.0.255" />
          <KodBox leiras="Minden más forgalom (pl. internet elérés) engedélyezése" kod="Router(config-ext-nacl)#permit ip any any" />
          <KodBox leiras="Kilépés az ACL konfigurációból" kod="Router(config-ext-nacl)#exit" />
          <KodBox leiras="ACL alkalmazása a DMZ interfész bejövő (in) irányára" kod="Router(config)#interface g0/2" />
          <KodBox leiras="ACL hozzárendelése" kod="Router(config-if)#ip access-group DMZ_VEDELEM in" />
        </div>

        <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>

        <h1>NAT tesztelése Packet Tracerben</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="server">🖥️</span> 1. Weboldal létrehozása (Server0)
          </h3>
          <p style={{ margin: '5px 0' }}>
            Nyisd meg a <strong>Server0</strong> eszközt, majd kövesd az alábbi lépéseket:
          </p>
          <ul>
            <li>Kattints a <strong>Services</strong> fülre, majd válaszd a <strong>HTTP</strong> menüpontot.</li>
            <li>Győződj meg róla, hogy a HTTP és HTTPS opciók <strong>ON</strong> állapotban vannak.</li>
            <li>Keresd meg az <code>index.html</code> fájlt, kattints az <strong>edit</strong> gombra, és írd bele az alábbi kódot:</li>
          </ul>
          <div style={{ background: '#1e1e1e', color: '#61afef', padding: '10px', borderRadius: '5px', marginTop: '10px', fontFamily: 'monospace' }}>
            &lt;h1&gt;Szia! Ez a NAT teszt oldal!&lt;/h1&gt;
          </div>
        </div>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="pc">💻</span> 2. Tesztelés PC1-ről
          </h3>
          <p style={{ margin: '5px 0' }}>
            Nyisd meg a <strong>PC1</strong> eszközt, és válaszd a <strong>Desktop</strong> fület:
          </p>
          <ul style={{ marginBottom: '10px' }}>
            <li>Nyisd meg a <strong>Command Prompt</strong>-ot és teszteld a pinget.</li>
          </ul>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Ping teszt a szerver publikus IP-címére" kod="PC> ping 200.0.0.100" />
        </div>

        <div className="feladat-doboz">
          <ul style={{ margin: '5px 0' }}>
            <li>
              Nyisd meg a <strong>Web Browser</strong>-t, és írd be az URL mezőbe: <code>200.0.0.100</code>
            </li>
          </ul>
          <p style={{ marginTop: '10px', color: '#4caf50', fontWeight: 'bold' }}>
            ✅ Ha a beállítás sikeres, meg kell jelennie a "Szia! Ez a NAT teszt oldal!" feliratnak.
          </p>
        </div>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="router">🔍</span> 3. Router tábla vizsgálata
          </h3>
          <p style={{ margin: '5px 0' }}>
            A sikeres böngészés után nézd meg az aktív NAT fordítási táblázatot a routeren:
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Aktív NAT fordítások ellenőrzése" kod="Router#show ip nat translations" />
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