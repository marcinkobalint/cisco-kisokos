import KodBox from './KodBox';

export default function Alapbeallitasok() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="section-fade">
      <h1>Alapbeállítások és biztonság</h1>

      <div className="alapozo-kontener">
        <div className="kod-doboz">
          <h2>Név beállítás:</h2>
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Router nevének módosítása" kod="Router(config)#hostname R1" />
          <KodBox leiras="Név visszaállítása alapértelmezettre" kod="R1(config)#no hostname" />
        </div>

        <div className="circuit-separator">
          <div className="circuit-line"></div>
          <button className="vissza-a-tetejére" onClick={scrollToTop}>
            <span className="nyil">↑</span>
          </button>
          <div className="circuit-line"></div>
        </div>

        <div className="kod-doboz">
          <h2>Jelszavak beállítása:</h2>
          <KodBox leiras="Privilegizált mód jelszava (titkosítás nélkül)" kod="Router(config)#enable password titok" />
          <KodBox leiras="Privilegizált mód jelszava (MD5 titkosítással - AJÁNLOTT)" kod="Router(config)#enable secret titok" />
        </div>

        <div className="circuit-separator">
          <div className="circuit-line"></div>
          <button className="vissza-a-tetejére" onClick={scrollToTop}>
            <span className="nyil">↑</span>
          </button>
          <div className="circuit-line"></div>
        </div>

        <div className="kod-doboz">
          <h2>Konfiguráció mentése:</h2>
          <KodBox kod="Router#copy running-config startup-config" />
          <KodBox kod="Router#do write" />
        </div>

        <div className="circuit-separator">
          <div className="circuit-line"></div>
          <button className="vissza-a-tetejére" onClick={scrollToTop}>
            <span className="nyil">↑</span>
          </button>
          <div className="circuit-line"></div>
        </div>

        <div className="kod-doboz">
          <h2>Interfész konfiguráció:</h2>
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Belépés a Gig0/0 interfészre" kod="Router(config)#interface GigabitEthernet 0/0" />
          <KodBox leiras="IP cím és alhálózati maszk beállítása" kod="Router(config-if)#ip address 192.168.1.1 255.255.255.0" />
          <KodBox leiras="Port bekapcsolása (alapból shutdown állapotban vannak)" kod="Router(config-if)#no shutdown" />
          <KodBox leiras="Kilépés a konfigurációs módból" kod="Router(config-if)#end" />
        </div>

        <div className="circuit-separator">
          <div className="circuit-line"></div>
          <button className="vissza-a-tetejére" onClick={scrollToTop}>
            <span className="nyil">↑</span>
          </button>
          <div className="circuit-line"></div>
        </div>

        <div className="kod-doboz">
          <h2>Extra Biztonság</h2>
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Az összes sima jelszó titkosítása a configban" kod="Router(config)#service password-encryption" />
          <KodBox leiras="Minimális jelszóhossz kényszerítése" kod="Router(config)#security password min-length 8" />
          <KodBox leiras="Brute force védelem: 3 rontás után 2 perc tiltás" kod="Router(config)#login block-for 120 attempts 3 within 60" />
          <KodBox leiras="VTY vonalak (távoli elérés) alapbeállítása" kod="Router(config)#line vty 0 4" />
          <KodBox leiras="Időtúllépés miatti kiléptetés (10 perc)" kod="Router(config-vty)#exec-timeout 10" />
          <KodBox leiras="Kilépés a konfigurációs módból" kod="Router(config-vty)#end" />
        </div>

        <div className="circuit-separator footer-space">
          <div className="circuit-line"></div>
          <button className="vissza-a-tetejére" onClick={scrollToTop}>
            <span className="nyil">↑</span>
          </button>
          <div className="circuit-line"></div>
        </div>
      </div>
    </div>
  );
}