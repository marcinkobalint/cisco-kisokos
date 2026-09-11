import KodBox from './KodBox';

export default function PortSecurity() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="section-fade">
        <h1>Port Security (Kikötőbiztonság)</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="port-security">🔌</span> Port Security Alapjai
          </h3>
          <div style={{ marginTop: '10px' }}>
            <strong>
              A Port Security segítségével korlátozhatjuk a switch portjaira csatlakozó eszközök MAC-címeit, megelőzve az illetéktelen eszközök hálózatra csatlakozását:
            </strong>
            <ul style={{ marginTop: '10px' }}>
              <li><strong>Access Mode:</strong> A Port Security csak Access (vagy 802.1Q Trunk) portokon engedélyezhető, így először be kell állítani az access módot.</li>
              <li><strong>Sticky MAC:</strong> A dinamikusan megtanult MAC-címeket automatikusan elmenti a futó konfigurációba (running-config).</li>
              <li><strong>Violation Módok:</strong>
                <ul style={{ marginTop: '5px' }}>
                  <li><code>shutdown</code> (alapértelmezett): Letiltja a portot (err-disabled állapot), log bejegyzést generál és növeli a számlálót.</li>
                  <li><code>restrict</code>: Eldobja az illetéktelen csomagokat, log bejegyzést generál és növeli a számlálót.</li>
                  <li><code>protect</code>: Csendben eldobja az illetéktelen csomagokat log bejegyzés és számlálónövelés nélkül.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <h1>Port Security konfigurációja</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Switch#config terminal" />
          <KodBox leiras="Interfész (vagy porttartomány: range f0/1 - 10) kiválasztása" kod="Switch(config)#interface FastEthernet 0/1" />
          <KodBox leiras="Port Access módba állítása (kötelező előfeltétel)" kod="Switch(config-if)#switchport mode access" />
          <KodBox leiras="Port Security bekapcsolása" kod="Switch(config-if)#switchport port-security" />
          <KodBox leiras="Maximálisan engedélyezett MAC-címek száma (alapértelmezetten 1)" kod="Switch(config-if)#switchport port-security maximum 2" />
          <KodBox leiras="Sticky MAC-cím tanulás engedélyezése (automatikus rögzítés)" kod="Switch(config-if)#switchport port-security mac-address sticky" />
          <KodBox leiras="Jogsértési (Violation) mód beállítása (shutdown / restrict / protect)" kod="Switch(config-if)#switchport port-security violation shutdown" />
          <KodBox leiras="Kilépés az interfészből" kod="Switch(config-if)#exit" />
        </div>

        <h1>Letiltott (err-disabled) port helyreállítása</h1>

        <div className="kod-doboz">
          <KodBox leiras="Belépés a letiltódott interfészre" kod="Switch(config)#interface FastEthernet 0/1" />
          <KodBox leiras="Port manuális lekapcsolása" kod="Switch(config-if)#shutdown" />
          <KodBox leiras="Port visszakapcsolása" kod="Switch(config-if)#no shutdown" />
        </div>

        <h1>Port Security ellenőrzése</h1>

        <div className="feladat-doboz">
          <h3>
            <span role="img" aria-label="search">🔍</span> Ellenőrzés Packet Tracerben
          </h3>
          <p style={{ margin: '5px 0' }}>
            A konfiguráció után ellenőrizheted az összes port biztonsági állapotát, vagy egy adott interfész részletes adatait.
          </p>
        </div>

        <div className="kod-doboz">
          <KodBox leiras="Összes védett port áttekintése" kod="Switch#show port-security" />
          <KodBox leiras="Egy konkrét interfész részletes beállításai és állapota" kod="Switch#show port-security interface Fa0/1" />
          <KodBox leiras="Megtanult és rögzített (Sticky) MAC-címek listája" kod="Switch#show port-security address" />
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