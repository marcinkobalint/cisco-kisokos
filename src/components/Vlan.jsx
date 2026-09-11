import KodBox from './KodBox';

export default function Vlan() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="section-fade">
      <h1>VLAN beállítások</h1>
      <h1>Általános beállítás:</h1>

      <div className="kod-doboz">
        <h2>Switch konfiguráció:</h2>
        <h2>VLAN-ok létrehozása switchen:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Switch#config terminal" />
        <KodBox leiras="VLAN-ok létrehozása" kod="Switch(config)#vlan [VLAN_ID]" />
        <KodBox leiras="VLAN-ok elnevezése" kod="Switch(config-vlan)#name [VLAN_NÉV]" />
        <KodBox leiras="Kilépés a VLAN konfigurációs kódból" kod="Switch(config-vlan)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Portok hozzárendelése a VLAN-okhoz:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Switch#config terminal" />
        <KodBox leiras="Interfész kiválasztása" kod="Switch(config)#interface [PORT]" />
        <KodBox leiras="A portot access módba állítjuk" kod="Switch(config-if)#switchport mode access" />
        <KodBox leiras="A port hozzárendelése a VLAN-hoz" kod="Switch(config-if)#switchport access vlan [VLAN_ID]" />
        <KodBox leiras="Kilépés a konfigurációs módból" kod="Switch(config-if)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Trunk port beállítása switchen:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Switch#config terminal" />
        <KodBox leiras="Trunk port kiválasztása" kod="Switch(config)#interface [PORT]" />
        <KodBox leiras="Trunk port beállítás, több VLAN forgalma is áthaladjon ugyanazon a porton" kod="Switch(config-if)#switchport mode trunk" />
        <KodBox leiras="VLAN keretek megjelölése azonosítóval (alapból már be van kapcsolva több switchen)" kod="Switch(config-if)#switchport trunk encapsulation dot1q" />
        <KodBox leiras="Kilépés a konfigurációs kódból" kod="Switch(config-if)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Router konfiguráció:</h2>
        <h2>Router-on-a-Stick:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Kiválasszuk a router interfészt" kod="Router(config)#interface [INTERFACE]" />
        <KodBox leiras="Bekapcsoljuk (aktiváljuk) az interfészt" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés a konfigurációs kódból" kod="Router(config-if)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Alinterfészek konfigurálása:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Létrehozunk egy alinterfészt a routeren" kod="Router(config)#interface [INTERFACE].[VLAN_ID]" />
        <KodBox leiras="Alinterfész és VLAN összekötése" kod="Router(config-if)#encapsulation dot1q [VLAN_ID]" />
        <KodBox leiras="VLAN alapértelmezett átjárója" kod="Router(config-if)#ip address [IP_CÍM] [MASZK]" />
        <KodBox leiras="Kilépés a konfigurációs kódból" kod="Router(config-if)#exit" />
      </div>

      <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>

      <div className="feladat-doboz">
        <h1><span role="img" aria-label="topology">🔌</span> Hálózati bekötések (Fizikai réteg):</h1>
        <ul className="bekotes-lista">
          <li><strong>Router (GigabitEthernet 0/0)</strong> <span className="nyil-ikn">⟷</span> <strong>Switch (FastEthernet 0/1)</strong> <span className="label-vlan">(Trunk port)</span></li>
          <li><strong>PC0</strong> <span className="nyil-ikn">⟶</span> <strong>Switch (FastEthernet 0/2)</strong> <span className="label-vlan">(VLAN 10 - osztaly)</span></li>
          <li><strong>PC1</strong> <span className="nyil-ikn">⟶</span> <strong>Switch (FastEthernet 0/3)</strong> <span className="label-vlan">(VLAN 20 - tanari)</span></li>
          <li><strong>PC2</strong> <span className="nyil-ikn">⟶</span> <strong>Switch (FastEthernet 0/4)</strong> <span className="label-vlan">(VLAN 30 - igazgatoi)</span></li>
        </ul>
      </div>

      <div className="warning-doboz">
        <h2><span role="img" aria-label="note">📝</span> VLAN kiosztás:</h2>
        <p>
          Feladat: 1 db router (pl.: 2911), 1 db switch (pl.: 2960), 3 db PC
          A feladat során 3 darab VLAN-t hozunk létre: <strong>10, 20, 30</strong> azonosítóval, 
          melyek nevei rendre <strong>osztaly, tanari, igazgatoi</strong>.
        </p>
      </div>

      <h1>Példa beállítás:</h1>

      <div className="kod-doboz">
        <h2>//DHCP konfigurálása nélkül (IP címek kiosztása manuálisan történik)//</h2>
        <h2>Switch konfiguráció:</h2>
        <h2>VLAN-ok létrehozása switchen:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Switch#config terminal" />
        <KodBox leiras="VLAN 10 létrehozása" kod="Switch(config)#vlan 10" />
        <KodBox leiras="VLAN 10 elnevezése" kod="Switch(config-vlan)#name osztaly" />
        <KodBox leiras="VLAN 20 létrehozása" kod="Switch(config)#vlan 20" />
        <KodBox leiras="VLAN 20 elnevezése" kod="Switch(config-vlan)#name tanari" />
        <KodBox leiras="VLAN 30 létrehozása" kod="Switch(config)#vlan 30" />
        <KodBox leiras="VLAN 30 elnevezése" kod="Switch(config-vlan)#name igazgatoi" />
        <KodBox leiras="Kilépés a VLAN konfigurációs kódból" kod="Switch(config-vlan)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Portok hozzárendelése a VLAN-okhoz:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Switch#config terminal" />
        <KodBox leiras="Interfész kiválasztása" kod="Switch(config)#interface FastEthernet 0/2" />
        <KodBox leiras="A portot access módba állítjuk" kod="Switch(config-if)#switchport mode access" />
        <KodBox leiras="A port hozzárendelése a VLAN-hoz" kod="Switch(config-if)#switchport access vlan 10" />
        <KodBox leiras="Kilépés a konfigurációs módból" kod="Switch(config-if)#exit" />

        <KodBox leiras="Interfész kiválasztása" kod="Switch(config)#interface FastEthernet 0/3" />
        <KodBox leiras="A portot access módba állítjuk" kod="Switch(config-if)#switchport mode access" />
        <KodBox leiras="A port hozzárendelése a VLAN-hoz" kod="Switch(config-if)#switchport access vlan 20" />
        <KodBox leiras="Kilépés a konfigurációs módból" kod="Switch(config-if)#exit" />

        <KodBox leiras="Interfész kiválasztása" kod="Switch(config)#interface FastEthernet 0/4" />
        <KodBox leiras="A portot access módba állítjuk" kod="Switch(config-if)#switchport mode access" />
        <KodBox leiras="A port hozzárendelése a VLAN-hoz" kod="Switch(config-if)#switchport access vlan 30" />
        <KodBox leiras="Kilépés a konfigurációs módból" kod="Switch(config-if)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Trunk port beállítása switchen:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Switch#config terminal" />
        <KodBox leiras="Trunk port kiválasztása" kod="Switch(config)#interface FastEthernet 0/1" />
        <KodBox leiras="Trunk port beállítás, több VLAN forgalma is áthaladjon ugyanazon a porton" kod="Switch(config-if)#switchport mode trunk" />
        <KodBox leiras="VLAN keretek megjelölése azonosítóval (alapból már be van kapcsolva több switchen)" kod="Switch(config-if)#switchport trunk encapsulation dot1q" />
        <KodBox leiras="Kilépés a konfigurációs kódból" kod="Switch(config-if)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Router konfiguráció:</h2>
        <h2>Router-on-a-Stick:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="Kiválasszuk a router interfészt" kod="Router(config)#interface GigabitEthernet 0/0" />
        <KodBox leiras="Bekapcsoljuk (aktiváljuk) az interfészt" kod="Router(config-if)#no shutdown" />
        <KodBox leiras="Kilépés a konfigurációs kódból" kod="Router(config-if)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>Alinterfészek konfigurálása:</h2>
        <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
        <KodBox leiras="VLAN 10 konfigurációja" kod="Router(config)#interface GigabitEthernet 0/0.10" />
        <KodBox leiras="Alinterfész és VLAN összekötése" kod="Router(config-if)#encapsulation dot1q 10" />
        <KodBox leiras="VLAN alapértelmezett átjárója" kod="Router(config-if)#ip address 192.168.10.1 255.255.255.0" />
        <KodBox leiras="Kilépés a konfigurációs kódból" kod="Router(config-if)#exit" />

        <KodBox leiras="VLAN 20 konfigurációja" kod="Router(config)#interface GigabitEthernet 0/0.20" />
        <KodBox leiras="Alinterfész és VLAN összekötése" kod="Router(config-if)#encapsulation dot1q 20" />
        <KodBox leiras="VLAN alapértelmezett átjárója" kod="Router(config-if)#ip address 192.168.20.1 255.255.255.0" />
        <KodBox leiras="Kilépés a konfigurációs kódból" kod="Router(config-if)#exit" />

        <KodBox leiras="VLAN 30 konfigurációja" kod="Router(config)#interface GigabitEthernet 0/0.30" />
        <KodBox leiras="Alinterfész és VLAN összekötése" kod="Router(config-if)#encapsulation dot1q 30" />
        <KodBox leiras="VLAN alapértelmezett átjárója" kod="Router(config-if)#ip address 192.168.30.1 255.255.255.0" />
        <KodBox leiras="Kilépés a konfigurációs kódból" kod="Router(config-if)#exit" />
      </div>

      <div className="kod-doboz">
        <h2>PC-k Statikus IP beállítása</h2>
        <p style={{ marginBottom: '15px', fontSize: '0.95rem', color: '#8b949e' }}>
          A végpontokon (PC-k) manuálisan kell megadni az alábbi adatokat a Desktop / IP Configuration menüben:
        </p>

        <table className="ip-tablazat">
          <thead>
            <tr>
              <th>Eszköz</th>
              <th>IP cím</th>
              <th>Alhálózati maszk</th>
              <th>Alapértelmezett átjáró</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>PC0</strong> (VLAN 10)</td>
              <td>192.168.10.10</td>
              <td>255.255.255.0</td>
              <td className="kiemelt-gw">192.168.10.1</td>
            </tr>
            <tr>
              <td><strong>PC1</strong> (VLAN 20)</td>
              <td>192.168.20.10</td>
              <td>255.255.255.0</td>
              <td className="kiemelt-gw">192.168.20.1</td>
            </tr>
            <tr>
              <td><strong>PC2</strong> (VLAN 30)</td>
              <td>192.168.30.10</td>
              <td>255.255.255.0</td>
              <td className="kiemelt-gw">192.168.30.1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="warning-doboz" style={{ borderLeftColor: '#3fb950', backgroundColor: 'rgba(63, 185, 80, 0.05)' }}>
        <h3 style={{ color: '#3fb950' }}>
          <span role="img" aria-label="check">✅</span> Tesztelés és Ellenőrzés
        </h3>
        <p>Nyisd meg valamelyik PC-n a <strong>Command Prompt</strong>-ot és teszteld a kapcsolatot:</p>

        <KodBox leiras="Saját átjáró tesztelése" kod="ping 192.168.10.1" />
        <KodBox leiras="Átjárás tesztelése másik VLAN-ba (PC1)" kod="ping 192.168.20.10" />
        <KodBox leiras="Átjárás tesztelése másik VLAN-ba (PC2)" kod="ping 192.168.30.10" />

        <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '10px', color: '#8b949e' }}>
          Megjegyzés: Ha az első 1-2 csomag "Request timed out", az természetes (ARP folyamat). A többi csomagnak meg kell érkeznie!
        </p>
      </div>

      <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>

      <div className="section-fade" style={{ marginTop: '50px' }}>
        <h1 style={{ borderTop: '2px solid #30363d', paddingTop: '40px' }}>VLAN Feladat 2: VLAN + DHCP</h1>

        <div className="feladat-doboz">
          <h3><span role="img" aria-label="star">🌟</span> Célkitűzés:</h3>
          <p>
            A Switch és Router alapkonfigurációja (VLAN-ok, Trunk, Alinterfészek) megegyezik az előző feladattal. 
            A különbség, hogy a PC-ken nem manuálisan állítunk be IP-t, hanem a <strong>Router fogja kiosztani őket</strong> DHCP pool-ok segítségével.
          </p>
        </div>

        <div className="alapozo-kontener">
          <div className="kod-doboz">
            <h2>Router: DHCP Pool-ok létrehozása</h2>

            <KodBox leiras="VLAN 10 (Osztály) pool" kod="Router(config)#ip dhcp pool VLAN_10" />
            <KodBox kod="Router(dhcp-config)#network 192.168.10.0 255.255.255.0" />
            <KodBox kod="Router(dhcp-config)#default-router 192.168.10.1" />
            <KodBox kod="Router(dhcp-config)#dns-server 8.8.8.8" />

            <div style={{ height: '20px' }}></div>

            <KodBox leiras="VLAN 20 (Tanári) pool" kod="Router(config)#ip dhcp pool VLAN_20" />
            <KodBox kod="Router(dhcp-config)#network 192.168.20.0 255.255.255.0" />
            <KodBox kod="Router(dhcp-config)#default-router 192.168.20.1" />
            <KodBox kod="Router(dhcp-config)#dns-server 8.8.8.8" />

            <div style={{ height: '20px' }}></div>

            <KodBox leiras="VLAN 30 (Igazgatói) pool" kod="Router(config)#ip dhcp pool VLAN_30" />
            <KodBox kod="Router(dhcp-config)#network 192.168.30.0 255.255.255.0" />
            <KodBox kod="Router(dhcp-config)#default-router 192.168.30.1" />
            <KodBox kod="Router(dhcp-config)#dns-server 8.8.8.8" />
            <KodBox kod="Router(dhcp-config)#exit" />
          </div>

          <div className="kod-doboz">
            <h2>2. Router: Átjárók (Gateway-ek) kizárása</h2>
            <p style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#8b949e' }}>
              Fontos: A router saját címeit (alinterfész IP-k) ki kell zárni, hogy ne ossza ki a gépeknek!
            </p>
            <KodBox leiras="VLAN 10 átjáró kizárása" kod="Router(config)#ip dhcp excluded-address 192.168.10.1" />
            <KodBox leiras="VLAN 20 átjáró kizárása" kod="Router(config)#ip dhcp excluded-address 192.168.20.1" />
            <KodBox leiras="VLAN 30 átjáró kizárása" kod="Router(config)#ip dhcp excluded-address 192.168.30.1" />
          </div>

          <div className="warning-doboz" style={{ borderLeftColor: '#58a6ff', backgroundColor: 'rgba(88, 166, 255, 0.05)' }}>
            <h3 style={{ color: '#58a6ff' }}>
              <span role="img" aria-label="pc">💻</span> PC Beállítás:
            </h3>
            <p>
              Menj a PC-k <strong>Desktop / IP Configuration</strong> fülére, és a "Static" helyett válaszd a <strong>DHCP</strong> opciót. 
              Pár másodperc múlva meg kell jelennie a kiosztott IP címnek!
            </p>
          </div>
        </div>
      </div>

      <div className="circuit-separator">
        <div className="circuit-line"></div>
        <button className="vissza-a-tetejére" onClick={scrollToTop}>
          <span className="nyil">↑</span>
        </button>
        <div className="circuit-line"></div>
      </div>
    </div>
  );
}