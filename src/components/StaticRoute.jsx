import KodBox from './KodBox';

export default function StaticRoute() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>Statikus és Alapértelmezett Útvonalválasztás</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="route">🛣️</span> Statikus Routing Alapjai
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              A statikus útvonalválasztás során manuálisan adjuk meg a célhálózatokat és az elérésükhöz szükséges következő ugrást (next-hop) vagy kimenő interfészt:
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Standard Statikus Útvonal:</strong> Egy konkrét távoli hálózat elérésére szolgál.</li>
              <li><strong>Alapértelmezett Útvonal (Default Route):</strong> A routing táblában nem szereplő hálózatok felé küldi a forgalmat (pl. Internet felé: <code>0.0.0.0 0.0.0.0</code>).</li>
              <li><strong>Floating Static Route (Lebegő útvonal):</strong> Tartalék útvonal magasabb Administrative Distance (AD) értékkel (alapértelmezett AD = 1).</li>
            </ul>
          </div>
        </div>

        <h1>Statikus és Alapértelmezett Útvonal beállítás</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Statikus útvonal (Next-Hop IP megadásával)" kod="Router(config)#ip route 192.168.2.0 255.255.255.0 10.0.0.2" />
          <KodBox leiras="Statikus útvonal (Kimenő interfész megadásával)" kod="Router(config)#ip route 192.168.3.0 255.255.255.0 g0/1" />
          <KodBox leiras="Alapértelmezett útvonal (Default Route) az ISP/Internet felé" kod="Router(config)#ip route 0.0.0.0 0.0.0.0 200.0.0.1" />
        </div>

        <h1>Floating Static Route (Tartalék útvonal)</h1>

        <div className="kod-doboz">
          <KodBox leiras="Elsődleges útvonal (Alapértelmezett AD = 1)" kod="Router(config)#ip route 10.10.10.0 255.255.255.0 200.0.0.1" />
          <KodBox leiras="Tartalék útvonal magasabb AD értékkel (pl. AD = 5)" kod="Router(config)#ip route 10.10.10.0 255.255.255.0 200.0.0.5 5" />
        </div>

        <h1>Útvonalválasztás tesztelése és ellenőrzése</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="search">🔍</span> Ellenőrzés Packet Tracerben
          </h3>
          <p style={{ margin: '5px 0' }}>
            Az útvonalak felvétele után ellenőrizd az útválasztási táblát és teszteld a csomagok útját.
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Routing tábla megtekintése (S betű jelöli a statikusat)" kod="Router#show ip route" />
          <KodBox leiras="Csak a statikus útvonalak szűrése" kod="Router#show ip route static" />
          <KodBox leiras="Útvonal nyomon követése PC-ről" kod="PC> tracert 192.168.2.10" />
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