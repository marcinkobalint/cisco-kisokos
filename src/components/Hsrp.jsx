import KodBox from './KodBox';

export default function Hsrp() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>HSRP (Hot Standby Router Protocol)</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="hsrp">🛡️</span> HSRP (Redundáns Átjáró) Alapjai
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              A HSRP (First Hop Redundancy Protocol) segítségével több fizikai routerből egyetlen virtuális alapértelmezett átjárót képezünk a hálózati kliensek számára:
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Active Router:</strong> A ténylegesen továbbító router. Az a gép lesz az Active, amelyiknek magasabb a prioritása.</li>
              <li><strong>Standby Router:</strong> A tartalék router, amely azonnal átveszi a feladatot, ha az Active router kiesik.</li>
              <li><strong>Virtuális IP és MAC cím:</strong> A kliensek csak ezt a virtuális IP-címet látják átjáróként (pl. 192.168.1.254).</li>
              <li><strong>Prioritás (Priority):</strong> Alapértelmezett értéke 100. A magasabb prioritású router lesz az Active (pl. 110).</li>
              <li><strong>Preemption:</strong> Engedélyezi, hogy a magasabb prioritású router automatikusan visszavegye az Active szerepet az újraindulása után.</li>
            </ul>
          </div>
        </div>

        <h1>1. Elsődleges Router (Active Router) Beállítása</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router1#config terminal" />
          <KodBox leiras="Belső (LAN) interfész kiválasztása" kod="Router1(config)#interface g0/0" />
          <KodBox leiras="Fizikai IP-cím megadása" kod="Router1(config-if)#ip address 192.168.1.2 255.255.255.0" />
          <KodBox leiras="HSRP csoport és virtuális IP-cím megadása" kod="Router1(config-if)#standby 1 ip 192.168.1.254" />
          <KodBox leiras="Prioritás növelése (hogy ez legyen az Active router)" kod="Router1(config-if)#standby 1 priority 110" />
          <KodBox leiras="Preempt bekapcsolása (visszavegye a szerepet helyreálláskor)" kod="Router1(config-if)#standby 1 preempt" />
          <KodBox leiras="Interfész nyomon követése (Tracking): WAN hiba esetén prioritás csökkentése" kod="Router1(config-if)#standby 1 track g0/1 20" />
          <KodBox leiras="Port bekapcsolása" kod="Router1(config-if)#no shutdown" />
        </div>

        <h1>2. Másodlagos Router (Standby Router) Beállítása</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router2#config terminal" />
          <KodBox leiras="Belső (LAN) interfész kiválasztása" kod="Router2(config)#interface g0/0" />
          <KodBox leiras="Fizikai IP-cím megadása" kod="Router2(config-if)#ip address 192.168.1.3 255.255.255.0" />
          <KodBox leiras="Ugyanaz a HSRP csoport és virtuális IP-cím" kod="Router2(config-if)#standby 1 ip 192.168.1.254" />
          <KodBox leiras="Alapértelmezett prioritás marad (100)" kod="Router2(config-if)#standby 1 priority 100" />
          <KodBox leiras="Preempt bekapcsolása ezen a routeren is" kod="Router2(config-if)#standby 1 preempt" />
          <KodBox leiras="Port bekapcsolása" kod="Router2(config-if)#no shutdown" />
        </div>

        <h1>HSRP Állapot Ellenőrzése</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="search">🔍</span> Ellenőrzés Packet Tracerben
          </h3>
          <p style={{ margin: '5px 0' }}>
            Konfigurálás után ellenőrizd az Active és Standby szerepeket, majd teszteld a kiesést az Active router interfészének lekapcsolásával (<code>shutdown</code>).
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="HSRP állapot rövid összefoglalása" kod="Router#show standby brief" />
          <KodBox leiras="Részletes HSRP információk, timer-ek és virtuális MAC-cím" kod="Router#show standby" />
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