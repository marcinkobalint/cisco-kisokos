import KodBox from './KodBox';

export default function Acl() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>ACL (Hozzáférés-vezérlési Listák)</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="shield">🛡️</span> ACL (Access Control Lists) Alapjai
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              Az ACL-ek hálózati forgalomszűrésre szolgálnak. Két fő típust különböztetünk meg:
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Standard ACL (1–99, 1300–1999):</strong> Csak a forrás IP-címet vizsgálja. A rendeltetési helyhez (célhoz) a lehető legközelebb kell elhelyezni.</li>
              <li><strong>Extended ACL (100–199, 2000–2699):</strong> Vizsgálja a forrás/cél IP-címet, protokollt (TCP/UDP/ICMP) és portszámokat (pl. 80, 443). A forráshoz a lehető legközelebb kell elhelyezni.</li>
              <li><strong>Wildcard maszk:</strong> Az alhálózati maszk inverze (pl. 255.255.255.0 → 0.0.0.255).</li>
            </ul>
          </div>
        </div>

        <h1>Standard ACL beállítás (Számozott)</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Egy konkrét PC (192.168.1.5) tiltása" kod="Router(config)#access-list 1 deny host 192.168.1.5" />
          <KodBox leiras="A többi gép engedélyezése a hálózatból" kod="Router(config)#access-list 1 permit 192.168.1.0 0.0.0.255" />
          <KodBox leiras="Cél oldali interfész kiválasztása" kod="Router(config)#interface g0/0" />
          <KodBox leiras="ACL alkalmazása kimenő (out) irányba" kod="Router(config-if)#ip access-group 1 out" />
          <KodBox leiras="Kilépés az interfészből" kod="Router(config-if)#exit" />
        </div>

        <h1>Extended ACL beállítás (Nevesített)</h1>

        <div className="kod-doboz">
          <KodBox leiras="Nevesített kiterjesztett ACL létrehozása" kod="Router(config)#ip access-list extended WEBSZURES" />
          <KodBox leiras="HTTP (80) forgalom tiltása a webszerver felé" kod="Router(config-ext-nacl)#deny tcp 192.168.1.0 0.0.0.255 host 200.0.0.100 eq 80" />
          <KodBox leiras="HTTPS (443) forgalom tiltása a webszerver felé" kod="Router(config-ext-nacl)#deny tcp 192.168.1.0 0.0.0.255 host 200.0.0.100 eq 443" />
          <KodBox leiras="Minden egyéb forgalom engedélyezése" kod="Router(config-ext-nacl)#permit ip any any" />
          <KodBox leiras="Kilépés az ACL konfigurációból" kod="Router(config-ext-nacl)#exit" />
          <KodBox leiras="Forrás felőli interfész kiválasztása" kod="Router(config)#interface g0/0" />
          <KodBox leiras="ACL alkalmazása bejövő (in) irányba" kod="Router(config-if)#ip access-group WEBSZURES in" />
        </div>

        <h1>ACL tesztelése és ellenőrzése</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="search">🔍</span> Ellenőrzés Packet Tracerben
          </h3>
          <p style={{ margin: '5px 0' }}>
            A szabályok felvitele után próbálj pingelni vagy böngészőt nyitni az adott gépekről, majd ellenőrizd az illeszkedéseket a routeren.
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Létrehozott ACL-ek és találatok (matches) megtekintése" kod="Router#show access-lists" />
          <KodBox leiras="Interfészre alkalmazott ACL ellenőrzése" kod="Router#show ip interface g0/0" />
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