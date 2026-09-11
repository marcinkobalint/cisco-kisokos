import KodBox from './KodBox';

export default function Vpn() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>VPN beállítások</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="vpn">🔒</span> IPsec VPN (Site-to-Site Virtuális Magánhálózat)
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              A Site-to-Site IPsec VPN két különálló hálózatot köti össze biztonságosan az interneten keresztül. A beállítás 3 fő szakaszból áll:
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>ISAKMP / Phase 1:</strong> Titkosítási algoritmusok és az előre megosztott kulcs (pre-shared key) megadása.</li>
              <li><strong>IPsec / Phase 2:</strong> Adatátviteli csatorna (Transform Set) és a titkosítandó forgalom (ACL) meghatározása.</li>
              <li><strong>Crypto Map:</strong> A beállítások összefogása és az interfészhez rendelése.</li>
            </ul>
          </div>
        </div>

        <h1>1. Lépés: ISAKMP (Phase 1) beállítása</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="1. ISAKMP szakasz konfigurációja" kod="Router(config)#crypto isakmp policy 10" />
          <KodBox leiras="Titkosítási algoritmus beállítása" kod="Router(config-isakmp)#encryption aes" />
          <KodBox leiras="Integritás-ellenőrző hash algoritmus" kod="Router(config-isakmp)#hash sha" />
          <KodBox leiras="Hitelesítési mód beállítása" kod="Router(config-isakmp)#authentication pre-share" />
          <KodBox leiras="Diffie-Hellman csoport meghatározása" kod="Router(config-isakmp)#group 2" />
          <KodBox leiras="Kilépés az ISAKMP módból" kod="Router(config-isakmp)#exit" />
          <KodBox leiras="Előre megosztott kulcs beállítása a távoli router IP-címéhez" kod="Router(config)#crypto isakmp key TitkosKulcs123 address 200.0.0.2" />
        </div>

        <h1>2. Lépés: IPsec (Phase 2) és ACL beállítása</h1>

        <div className="kod-doboz">
          <KodBox leiras="Transform Set (adatcsatorna) létrehozása" kod="Router(config)#crypto ipsec transform-set VPN_SET esp-aes esp-sha-hmac" />
          <KodBox leiras="ACL létrehozása a titkosítandó forgalom kijelölésére" kod="Router(config)#access-list 100 permit ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255" />
        </div>

        <h1>3. Lépés: Crypto Map és Interfész csatolás</h1>

        <div className="kod-doboz">
          <KodBox leiras="Crypto Map létrehozása" kod="Router(config)#crypto map VPN_MAP 10 ipsec-isakmp" />
          <KodBox leiras="Távoli router (Peer) IP-címének megadása" kod="Router(config-crypto-map)#set peer 200.0.0.2" />
          <KodBox leiras="Transform Set hozzárendelése" kod="Router(config-crypto-map)#set transform-set VPN_SET" />
          <KodBox leiras="ACL szabály hozzárendelése" kod="Router(config-crypto-map)#match address 100" />
          <KodBox leiras="Kilépés a Crypto Map módból" kod="Router(config-crypto-map)#exit" />
          <KodBox leiras="Kimenő WAN interfész kiválasztása" kod="Router(config)#interface g0/1" />
          <KodBox leiras="Crypto Map rátétele az interfészre" kod="Router(config-if)#crypto map VPN_MAP" />
        </div>

        <h1>VPN tesztelése Packet Tracerben</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="pc">💻</span> 1. Forgalom generálása (Alagút felépítése)
          </h3>
          <p style={{ margin: '5px 0' }}>
            Az IPsec alagút csak akkor épül fel, ha a megadott ACL szabálynak megfelelő forgalom indul el. Nyisd meg a <strong>PC1</strong> (192.168.1.10) Command Prompt-ját:
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Ping indítása a távoli LAN-ban lévő PC2 gépére" kod="PC> ping 192.168.2.10" />
        </div>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="router">🔍</span> 2. VPN alagút állapotának ellenőrzése
          </h3>
          <p style={{ margin: '5px 0' }}>
            A ping indítása után futtasd az alábbi parancsokat a routeren az alagút ellenőrzéséhez:
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="ISAKMP (Phase 1) állapot (QM_IDLE = sikeres)" kod="Router#show crypto isakmp sa" />
          <KodBox leiras="IPsec (Phase 2) csomagstatisztikák ellenőrzése" kod="Router#show crypto ipsec sa" />
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