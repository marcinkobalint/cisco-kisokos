import React, { useRef } from 'react';
import KodBox from './KodBox';

export default function Ospf() {
  const topRef = useRef(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="section-fade" ref={topRef}>
      <h1>OSPF DINAMIKUS ROUTING</h1>

      {/* Általános leírás */}
      <div className="feladat-doboz">
        <h2>Mi az az OSPF és hogyan működik? (Általános leírás)</h2>
        <p>
          Az <strong>OSPF (Open Shortest Path First)</strong> egy nyílt szabványú, link-state (kapcsolatállapot-alapú) 
          dinamikus útvonalválasztó protokoll. A hálózatban lévő routerek automatikusan felderítik egymást, 
          információt cserélnek a hozzájuk kapcsolódó hálózatokról, és algoritmussal kiszámítják 
          a leggyorsabb útvonalat.
        </p>
        <br />
        <p>
          Az OSPF hálózatokat úgynevezett <strong>Területekre (Area)</strong> osztjuk. A legfontosabb a központi 
          terület, a <strong>Gerinchálózat (Backbone Area - Area 0)</strong>. Kisebb és közepes hálózatokban 
          elegendő egyetlen Area 0 használata (Single-Area OSPF).
        </p>

        <div className="warning-doboz" style={{ marginTop: '20px' }}>
          <h3>⚠️ A Wildcard Maszk (Inverz Maszk) fogalma:</h3>
          <p>
            Az OSPF parancsokban nem a megszokott alhálózati maszkot használjuk, hanem a <strong>Wildcard maszkot</strong>, 
            amely a 255.255.255.255 értékből kivonva számítható ki:
          </p>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li><strong>255.255.255.252 (/30-as maszk, max 4 IP / 2 használható IP)</strong> ➔ Wildcard: <strong>0.0.0.3</strong></li>
            <li><strong>255.255.255.0 (/24-es maszk)</strong> ➔ Wildcard: <strong>0.0.0.255</strong></li>
          </ul>
        </div>
      </div>

      {/* Bekötések */}
      <div className="feladat-doboz">
        <h3>
          <span role="img" aria-label="topology">🔌</span> Hálózati bekötések (Fizikai réteg)
        </h3>
        <ul className="bekotes-lista">
          <li>
            <strong>R1 (GigabitEthernet 0/0)</strong> <span className="nyil-ikn">⟷</span> <strong>R2 (GigabitEthernet 0/0)</strong>
          </li>
          <li>
            <strong>R2 (GigabitEthernet 0/1)</strong> <span className="nyil-ikn">⟷</span> <strong>R3 (GigabitEthernet 0/0)</strong>
          </li>
          <li>
            <strong>R3 (GigabitEthernet 0/1)</strong> <span className="nyil-ikn">⟷</span> <strong>R1 (GigabitEthernet 0/1)</strong>
          </li>
        </ul>
      </div>

      <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>

      {/* Általános beállítások */}
      <h1>Router Konfigurációk</h1>
      <h1>Általános beállítás:</h1>

      <div className="kod-doboz">
        <h2>Router 1 (Interfészek + OSPF)</h2>

        <h3>Interfész 1 beállítása:</h3>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Belépés az első interfész beállításaiba" kod="Router(config)#interface [INTERFÉSZ_1]" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address [IP_CÍM_1] [ALHÁLÓZATI_MASZK]" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>Interfész 2 beállítása:</h3>
        <KodBox leiras="Belépés a második interfész beállításaiba" kod="Router(config)#interface [INTERFÉSZ_2]" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address [IP_CÍM_2] [ALHÁLÓZATI_MASZK]" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>OSPF dinamikus útvonalválasztás:</h3>
        <KodBox leiras="OSPF folyamat elindítása" kod="Router(config)#router ospf 1" />
        <KodBox leiras="Első szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network [HÁLÓZATI_CÍM_1] [WILDCARD_MASZK_1] area 0" />
        <KodBox leiras="Második szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network [HÁLÓZATI_CÍM_2] [WILDCARD_MASZK_2] area 0" />
        <KodBox leiras="Kilépés az OSPF beállításokból" kod="Router(config-router)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Router 2 (Interfészek + OSPF)</h2>

        <h3>Interfész 1 beállítása:</h3>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Belépés az első interfész beállításaiba" kod="Router(config)#interface [INTERFÉSZ_1]" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address [IP_CÍM_1] [ALHÁLÓZATI_MASZK]" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>Interfész 2 beállítása:</h3>
        <KodBox leiras="Belépés a második interfész beállításaiba" kod="Router(config)#interface [INTERFÉSZ_2]" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address [IP_CÍM_2] [ALHÁLÓZATI_MASZK]" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>OSPF dinamikus útvonalválasztás:</h3>
        <KodBox leiras="OSPF folyamat elindítása" kod="Router(config)#router ospf 1" />
        <KodBox leiras="Első szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network [HÁLÓZATI_CÍM_1] [WILDCARD_MASZK_1] area 0" />
        <KodBox leiras="Második szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network [HÁLÓZATI_CÍM_2] [WILDCARD_MASZK_2] area 0" />
        <KodBox leiras="Kilépés az OSPF beállításokból" kod="Router(config-router)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Router 3 (Interfészek + OSPF)</h2>

        <h3>Interfész 1 beállítása:</h3>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Belépés az első interfész beállításaiba" kod="Router(config)#interface [INTERFÉSZ_1]" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address [IP_CÍM_1] [ALHÁLÓZATI_MASZK]" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>Interfész 2 beállítása:</h3>
        <KodBox leiras="Belépés a második interfész beállításaiba" kod="Router(config)#interface [INTERFÉSZ_2]" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address [IP_CÍM_2] [ALHÁLÓZATI_MASZK]" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>OSPF dinamikus útvonalválasztás:</h3>
        <KodBox leiras="OSPF folyamat elindítása" kod="Router(config)#router ospf 1" />
        <KodBox leiras="Első szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network [HÁLÓZATI_CÍM_1] [WILDCARD_MASZK_1] area 0" />
        <KodBox leiras="Második szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network [HÁLÓZATI_CÍM_2] [WILDCARD_MASZK_2] area 0" />
        <KodBox leiras="Kilépés az OSPF beállításokból" kod="Router(config-router)#exit" />
      </div>

      <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>

      {/* Címzési elv doboz */}
      <div className="warning-doboz">
        <h3>
          <span role="img" aria-label="warning">⚠️</span> IP címek felírása a későbbi érthetőség kedvéért
        </h3>
        <p style={{ lineHeight: '1.6' }}>
          Nem kötelező így megadni az IP címeket, de lényegesen könnyíti a megértést, ha valamilyen módon jelöljük.<br /><br />
          <strong>Router 1 konfigurációja:</strong><br />
          • Router 1 és Router 2 kapcsolata: <code>10.0.12.1</code> (a 12-es az R1-R2 kapcsolatot jelöli, az utolsó .1-es R1-re utal)<br />
          • Router 1 és Router 3 kapcsolata: <code>10.0.31.2</code> (a 31-es az R3-R1 kapcsolatot jelöli, az utolsó .2-es pedig R1-re utal)<br /><br />
          <strong>Router 2 konfigurációja:</strong><br />
          • Router 1 és Router 2 kapcsolata: <code>10.0.12.2</code> (a 12-es az R1-R2 kapcsolatot jelöli, az utolsó .2-es R2-re utal)<br />
          • Router 2 és Router 3 kapcsolata: <code>10.0.23.1</code> (a 23-as az R2-R3 kapcsolatot jelöli, az utolsó .1-es R2-re utal)<br /><br />
          <strong>Router 3 konfigurációja:</strong><br />
          • Router 3 és Router 2 kapcsolata: <code>10.0.23.2</code> (a 23-as az R2-R3 kapcsolatot jelöli, az utolsó .2-es R3-ra utal)<br />
          • Router 3 és Router 1 kapcsolata: <code>10.0.31.1</code> (a 31-es az R3-R1 kapcsolatot jelöli, az utolsó .1-es R3-ra utal)
        </p>
      </div>

      {/* Példa beállítások */}
      <h1>Példa beállítás:</h1>

      <div className="kod-doboz">
        <h2>Router 1 (Interfészek + OSPF)</h2>

        <h3>Interfész 1 beállítása:</h3>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Belépés az első interfész beállításaiba" kod="Router(config)#interface g0/0" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address 10.0.12.1 255.255.255.252" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>Interfész 2 beállítása:</h3>
        <KodBox leiras="Belépés a második interfész beállításaiba" kod="Router(config)#interface g0/1" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address 10.0.31.2 255.255.255.252" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>OSPF dinamikus útvonalválasztás:</h3>
        <KodBox leiras="OSPF folyamat elindítása" kod="Router(config)#router ospf 1" />
        <KodBox leiras="Első szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network 10.0.12.0 0.0.0.3 area 0" />
        <KodBox leiras="Második szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network 10.0.31.0 0.0.0.3 area 0" />
        <KodBox leiras="Kilépés az OSPF beállításokból" kod="Router(config-router)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Router 2 (Interfészek + OSPF)</h2>

        <h3>Interfész 1 beállítása:</h3>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Belépés az első interfész beállításaiba" kod="Router(config)#interface g0/0" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address 10.0.12.2 255.255.255.252" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>Interfész 2 beállítása:</h3>
        <KodBox leiras="Belépés a második interfész beállításaiba" kod="Router(config)#interface g0/1" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address 10.0.23.1 255.255.255.252" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>OSPF dinamikus útvonalválasztás:</h3>
        <KodBox leiras="OSPF folyamat elindítása" kod="Router(config)#router ospf 1" />
        <KodBox leiras="Első szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network 10.0.12.0 0.0.0.3 area 0" />
        <KodBox leiras="Második szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network 10.0.23.0 0.0.0.3 area 0" />
        <KodBox leiras="Kilépés az OSPF beállításokból" kod="Router(config-router)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Router 3 (Interfészek + OSPF)</h2>

        <h3>Interfész 1 beállítása:</h3>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Belépés az első interfész beállításaiba" kod="Router(config)#interface g0/0" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address 10.0.23.2 255.255.255.252" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>Interfész 2 beállítása:</h3>
        <KodBox leiras="Belépés a második interfész beállításaiba" kod="Router(config)#interface g0/1" />
        <KodBox leiras="IP-cím és alhálózati maszk megadása" kod="Router(config-if)#ip address 10.0.31.1 255.255.255.252" />
        <KodBox leiras="Interfész aktiválása (bekapcsolása)" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés az interfész módból" kod="Router(config-if)#exit" />

        <h3>OSPF dinamikus útvonalválasztás:</h3>
        <KodBox leiras="OSPF folyamat elindítása" kod="Router(config)#router ospf 1" />
        <KodBox leiras="Első szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network 10.0.23.0 0.0.0.3 area 0" />
        <KodBox leiras="Második szomszédos hálózat meghirdetése (Wildcard maszkkal)" kod="Router(config-router)#network 10.0.31.0 0.0.0.3 area 0" />
        <KodBox leiras="Kilépés az OSPF beállításokból" kod="Router(config-router)#exit" />
      </div>

      <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>

      {/* Tesztelés és ellenőrzés */}
      <div className="warning-doboz" style={{ borderLeftColor: '#3fb950', backgroundColor: 'rgba(63, 185, 80, 0.05)' }}>
        <h3 style={{ color: '#3fb950' }}>
          <span role="img" aria-label="check">✅</span> Tesztelés és Ellenőrzés
        </h3>
        <p>Az OSPF működését és az átjárást az alábbi parancsokkal ellenőrizheted:</p>

        <KodBox 
          leiras="Szomszédsági kapcsolatok ellenőrzése (FULL állapot = sikeres szomszédság)" 
          kod="Router#show ip ospf neighbor" 
        />
        <KodBox 
          leiras="OSPF útvonalak megtekintése a routing táblában ('O' jelzésű sorok)" 
          kod="Router#show ip route ospf" 
        />
        <KodBox 
          leiras="Távoli interfész vagy eszköz elérhetőségének tesztelése" 
          kod="Router#ping 10.0.23.2" 
        />

        <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '10px', color: '#8b949e' }}>
          Megjegyzés: Az OSPF szomszédság felépülése pár másodpercet igénybe vehet. Amint az állapot FULL-ra vált, az útvonalak automatikusan bekerülnek a routing táblába.
        </p>
      </div>
    </div>
  );
}