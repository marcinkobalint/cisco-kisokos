import KodBox from './KodBox';

export default function Stp() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>STP (Spanning Tree Protocol)</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="stp">🌉</span> Spanning Tree Protocol Alapjai
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              Az STP megakadályozza a Layer 2 hálózati hurok (switching loop) és a szórási viharok (broadcast storm) kialakulását a redundáns switch-kapcsolatoknál:
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Root Bridge:</strong> A hálózat gyökér-switche. A legkisebb Bridge ID-val rendelkező switch lesz az (Bridge Priority + MAC cím). Alapértelmezett prioritás: 32768.</li>
              <li><strong>Rapid-PVST+:</strong> A gyorsabb konvergenciát biztosító Cisco szabványú Spanning Tree üzemmód (VLAN-onként külön fa).</li>
              <li><strong>PortFast:</strong> Kikerüli a listening/learning állapotokat, a végberendezések (PC, szerver) portjain azonnali továbbítási (forwarding) állapotba kapcsol.</li>
              <li><strong>BPDU Guard:</strong> Ha egy PortFast-os portra véletlenül switch csatlakozik (BPDU csomag érkezik), azonnal letiltja a portot (err-disabled) a hurok megakadályozására.</li>
            </ul>
          </div>
        </div>

        <h1>STP Üzemmód és Root Bridge Beállítása</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Switch#config terminal" />
          <KodBox leiras="Rapid-PVST+ üzemmód bekapcsolása" kod="Switch(config)#spanning-tree mode rapid-pvst" />
          <KodBox leiras="Root Bridge prioritás megadása (4096 többszörösei: pl. 4096, 8192)" kod="Switch(config)#spanning-tree vlan 1 priority 4096" />
          <KodBox leiras="Alternatív beállítás: Elsődleges Root Bridge jelölés" kod="Switch(config)#spanning-tree vlan 1 root primary" />
          <KodBox leiras="Alternatív beállítás: Másodlagos (tartalék) Root Bridge jelölés" kod="Switch(config)#spanning-tree vlan 1 root secondary" />
        </div>

        <h1>PortFast és BPDU Guard Konfigurációja (Access Portok)</h1>

        <div className="kod-doboz">
          <KodBox leiras="Végberendezések portjainak kiválasztása" kod="Switch(config)#interface range FastEthernet 0/1 - 10" />
          <KodBox leiras="PortFast bekapcsolása az interfészeken" kod="Switch(config-if-range)#spanning-tree portfast" />
          <KodBox leiras="BPDU Guard bekapcsolása az interfészeken" kod="Switch(config-if-range)#spanning-tree bpduguard enable" />
          <KodBox leiras="Globális beállítás: PortFast engedélyezése minden access porton" kod="Switch(config)#spanning-tree portfast default" />
          <KodBox leiras="Globális beállítás: BPDU Guard engedélyezése minden PortFast porton" kod="Switch(config)#spanning-tree portfast bpduguard default" />
        </div>

        <h1>STP Ellenőrzése és Diagnosztika</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="search">🔍</span> Ellenőrzés Packet Tracerben
          </h3>
          <p style={{ margin: '5px 0' }}>
            A beállítások után ellenőrizheted a Root Bridge kilétét, a portok állapotát (Forwarding / Blocking) és a PortFast beállításokat.
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Spanning Tree állapot és portszerepek megjelenítése" kod="Switch#show spanning-tree" />
          <KodBox leiras="Összefoglaló statisztika és aktív funkciók (PortFast, BPDU Guard)" kod="Switch#show spanning-tree summary" />
          <KodBox leiras="Egy adott VLAN Spanning Tree állapota" kod="Switch#show spanning-tree vlan 1" />
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