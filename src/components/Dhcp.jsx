import KodBox from './KodBox';

export default function Dhcp() {
  const scrollToTop = () => {
    const container = document.querySelector('.tartalom');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="section-fade">
      <h1>Dinamikus címkiosztás</h1>
      <h2>IPv4 beállítás</h2>

      <div className="alapozo-kontener">
        <div className="kod-doboz">
          <h2>1-4. Lépés: A Pool konfigurálása</h2>
          <KodBox leiras="0. lépés: Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="1. lépés: Pool létrehozása" kod="Router(config)#ip dhcp pool LAN_POOL" />
          <KodBox leiras="2. lépés: Hálózat és maszk" kod="Router(dhcp-config)#network 192.168.1.0 255.255.255.0" />
          <KodBox leiras="3. lépés: Alapértelmezett átjáró" kod="Router(dhcp-config)#default-router 192.168.1.1" />
          <KodBox leiras="4. lépés: DNS szerver (opcionális)" kod="Router(dhcp-config)#dns-server 8.8.8.8" />
        </div>

        <h1>Általános beállítás:</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Pool és DHCP név létrehozása" kod="Router(config)#ip dhcp pool [POOL_NÉV]" />
          <KodBox leiras="Hálózat IP cím megadása" kod="Router(dhcp-config)#network [HÁLÓZAT_CÍM] [MASZK]" />
          <KodBox leiras="DNS IP cím megadása" kod="Router(dhcp-config)#dns-server [DNS_IP]" />
          <KodBox leiras="Router IP cím megadása (alapértelmezett Gateway)" kod="Router(dhcp-config)#default-router [ROUTER_IP]" />
          <KodBox leiras="Kilépés a konfigurációs módból" kod="Router(dhcp-config)#end" />
        </div>

        <div className="kod-doboz">
          <h2>IP cím kizárások:</h2>
          <KodBox leiras="Csak egy IP cím kizárás" kod="Router(config)#ip dhcp excluded-address [IP_CÍM]" />
          <KodBox leiras="Tartomány kizárás" kod="Router(config)#ip dhcp excluded-address [KEZDŐ_IP] [VÉG_IP]" />
        </div>

        <div className="circuit-separator">
          <div className="circuit-line"></div>
          <button className="vissza-a-tetejére" onClick={scrollToTop}>
            <span className="nyil">↑</span>
          </button>
          <div className="circuit-line"></div>
        </div>

        <h1>Példa beállítás:</h1>

        <div className="kod-doboz">
          <KodBox leiras="Konfigurációs módba lépés" kod="Router#config terminal" />
          <KodBox leiras="Pool és DHCP név létrehozása" kod="Router(config)#ip dhcp pool LAN_A" />
          <KodBox leiras="Hálózat IP cím megadása" kod="Router(dhcp-config)#network 192.168.1.0 255.255.255.0" />
          <KodBox leiras="DNS IP cím megadása" kod="Router(dhcp-config)#dns-server 8.8.8.8" />
          <KodBox leiras="Router IP cím megadása (alapértelmezett Gateway)" kod="Router(dhcp-config)#default-router 192.168.1.1" />
          <KodBox leiras="Kilépés a konfigurációs módból" kod="Router(dhcp-config)#end" />
        </div>

        <div className="kod-doboz">
          <h2>IP cím kizárások:</h2>
          <KodBox leiras="Router IP cím kizárása" kod="Router(config)#ip dhcp excluded-address 192.168.1.1" />
          <KodBox leiras="Tartomány kizárás (pl.: nyomtatók részére)" kod="Router(config)#ip dhcp excluded-address 192.168.1.6 192.168.1.8" />
        </div>

        <div className="circuit-separator">
          <div className="circuit-line"></div>
          <button className="vissza-a-tetejére" onClick={scrollToTop}>
            <span className="nyil">↑</span>
          </button>
          <div className="circuit-line"></div>
        </div>

        <div className="warning-doboz">
          <h3>
            <span role="img" aria-label="warning">⚠️</span> Gyakori hiba: Egyedi címek vs. Tartományok
          </h3>
          <p>
            Egyedi címek: Ha két konkrét címet (pl. .1 és .4) akarsz kizárni, a parancsot kétszer kell kiadni!
          </p>
          <p>
            Tartomány: Ha egy sorba írod a két címet, a router tól-ig értelmezi, és a köztes címeket is kizárja.
          </p>

          <div className="pelda-szekcio">
            <KodBox leiras="HELYES: Csak az .1 és .4 kizárása (külön parancsok)" kod="Router(config)#ip dhcp excluded-address 192.168.1.1" />
            <KodBox kod="Router(config)#ip dhcp excluded-address 192.168.1.4" />
          </div>

          <div className="pelda-szekcio hiba-szekcio">
            <KodBox leiras="VIGYÁZAT: Ez kizárja az .1, .2, .3 és .4-et is!" kod="Router(config)#ip dhcp excluded-address 192.168.1.1 192.168.1.4" />
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
    </div>
  );
}