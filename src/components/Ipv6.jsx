import KodBox from './KodBox';

export default function Ipv6() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>IPv6 Címzés és Útvonalválasztás</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="ipv6">🌐</span> IPv6 Alapjai
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              Az IPv6 128 bites címzést használ (8 darab 16 bites hexadecimális blokk):
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Global Unicast (GUA):</strong> Publikusan irányítható címek (pl. <code>2001:db8::/32</code>).</li>
              <li><strong>Link-Local (LLA):</strong> Helyi hálózaton belüli kommunikációra szolgál (<code>fe80::/10</code>) — minden interfészen kötelező.</li>
              <li><strong>SLAAC:</strong> Automatikus címkiosztás DHCP szerver nélkül, a router RA (Router Advertisement) üzenetei alapján.</li>
              <li><strong>IPv6 Routing:</strong> Alapértelmezetten ki van kapcsolva a Cisco routereken, az <code>ipv6 unicast-routing</code> parancssorral kell engedélyezni.</li>
            </ul>
          </div>
        </div>

        <h1>1. IPv6 Interfész Címzés és Útvonalválasztás Engedélyezése</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="IPv6 csomag-továbbítás (routing) globális engedélyezése" kod="Router(config)#ipv6 unicast-routing" />
          <KodBox leiras="Interfész kiválasztása" kod="Router(config)#interface g0/0" />
          <KodBox leiras="Global Unicast Address (GUA) megadása" kod="Router(config-if)#ipv6 address 2001:db8:1::1/64" />
          <KodBox leiras="Link-Local Address (LLA) manuális megadása" kod="Router(config-if)#ipv6 address fe80::1 link-local" />
          <KodBox leiras="Interfész bekapcsolása" kod="Router(config-if)#no shutdown" />
        </div>

        <h1>2. IPv6 Statikus és Default Route Beállítása</h1>

        <div className="kod-doboz">
          <KodBox leiras="IPv6 Statikus útvonal megadása (Next-hop IP-vel)" kod="Router(config)#ipv6 route 2001:db8:2::/64 2001:db8:10::2" />
          <KodBox leiras="IPv6 Default Route megadása (kimenő interfész + LLA next-hop)" kod="Router(config)#ipv6 route ::/0 g0/1 fe80::2" />
        </div>

        <h1>3. OSPFv3 (IPv6 OSPF) Konfigurálása</h1>

        <div className="kod-doboz">
          <KodBox leiras="OSPFv3 folyamat elindítása" kod="Router(config)#ipv6 router ospf 10" />
          <KodBox leiras="Kötelező: Router ID megadása (IPv4 formátumban!)" kod="Router(config-rtr)#router-id 1.1.1.1" />
          <KodBox leiras="Kilépés a router módból" kod="Router(config-rtr)#exit" />
          <KodBox leiras="Interfész beléptetése az OSPFv3 folyamatba" kod="Router(config)#interface g0/0" />
          <KodBox leiras="OSPFv3 engedélyezése közvetlenül az interfészen" kod="Router(config-if)#ipv6 ospf 10 area 0" />
        </div>

        <h1>IPv6 Ellenőrzése és Diagnosztika</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="search">🔍</span> Ellenőrzés Packet Tracerben
          </h3>
          <p style={{ margin: '5px 0' }}>
            A beállítások után ellenőrizheted az interfészek IPv6 címeit, az útválasztási táblát és az OSPF szomszédságokat.
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="IPv6 interfészek rövid állapota és címei" kod="Router#show ipv6 interface brief" />
          <KodBox leiras="IPv6 útválasztási tábla megtekintése" kod="Router#show ipv6 route" />
          <KodBox leiras="OSPFv3 szomszédságok ellenőrzése" kod="Router#show ipv6 ospf neighbor" />
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