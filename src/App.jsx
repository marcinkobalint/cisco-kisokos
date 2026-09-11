import { useState } from 'react';
import Alapbeallitasok from './components/Alapbeallitasok';
import Dhcp from './components/Dhcp';
import Vlan from './components/Vlan';
import Ssh from './components/Ssh';
import EtherChannel from './components/Etherchannel';
import Ospf from './components/Ospf';
import Nat from './components/Nat';
import Vpn from './components/Vpn';
import Acl from './components/Acl';
import StaticRoute from './components/StaticRoute';
import PortSecurity from './components/PortSecurity';
import Stp from './components/Stp';
import Hsrp from './components/Hsrp';
import Ipv6 from './components/Ipv6';
import Wlan from './components/Wlan';
import NtpCdp from './components/NtpCdp';
import './App.css';

export default function App() {
  // Alapértelmezetten a 'home' (főmenü / csempés oldal) töltődik be
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="app-kontener">
      {activeSection === 'home' ? (
        /* --- WINDOWS MOBIL SZERŰ CSEMPÉS FŐMENÜ --- */
        <div className="dashboard-oldal section-fade">
          {/* Jobb felső sarokba rögzített verziószám */}
          <div className="top-version">v1.0</div>

          <header className="dashboard-header">
            <h1>Cisco Packet Tracer beállítások</h1>
            <p>Válassz egy témakört a folytatáshoz!</p>
          </header>
          
          {/* 3 oszlopos csempe grid */}
          <div className="csempe-grid">
            <button className="csempe csempe-alap" onClick={() => setActiveSection('alapbeallitasok')}>
              <span className="csempe-ikon">⚙️</span>
              <span className="csempe-szoveg">Alapbeállítások</span>
            </button>
            
            <button className="csempe csempe-dhcp" onClick={() => setActiveSection('dhcp')}>
              <span className="csempe-ikon">🌐</span>
              <span className="csempe-szoveg">DHCP Szerver</span>
            </button>
            
            <button className="csempe csempe-vlan" onClick={() => setActiveSection('vlan')}>
              <span className="csempe-ikon">🔀</span>
              <span className="csempe-szoveg">VLAN & Routing</span>
            </button>
            
            <button className="csempe csempe-ssh" onClick={() => setActiveSection('ssh')}>
              <span className="csempe-ikon">🛡️</span>
              <span className="csempe-szoveg">SSH Elérés</span>
            </button>
            
            <button className="csempe csempe-etherchannel" onClick={() => setActiveSection('etherchannel')}>
              <span className="csempe-ikon">⛓️‍💥</span>
              <span className="csempe-szoveg">EtherChannel</span>
            </button>

            <button className="csempe csempe-ospf" onClick={() => setActiveSection('ospf')}>
              <span className="csempe-ikon">🗺️</span>
              <span className="csempe-szoveg">Ospf</span>
            </button>

             <button className="csempe csempe-nat" onClick={() => setActiveSection('nat')}>
              <span className="csempe-ikon">📡</span>
              <span className="csempe-szoveg">Nat</span>
            </button>

            <button className="csempe csempe-vpn" onClick={() => setActiveSection('vpn')}>
              <span className="csempe-ikon">🔒</span>
              <span className="csempe-szoveg">Vpn</span>
            </button>

            <button className="csempe csempe-acl" onClick={() => setActiveSection('acl')}>
              <span className="csempe-ikon">🛂</span>
              <span className="csempe-szoveg">ACL</span>
            </button>

            <button className="csempe csempe-staticroute" onClick={() => setActiveSection('staticroute')}>
              <span className="csempe-ikon">🛣️</span>
              <span className="csempe-szoveg">Static Route</span>
            </button>

            <button className="csempe csempe-portsecurity" onClick={() => setActiveSection('portsecurity')}>
              <span className="csempe-ikon">🔌</span>
              <span className="csempe-szoveg">Port Security</span>
            </button>

            <button className="csempe csempe-stp" onClick={() => setActiveSection('stp')}>
              <span className="csempe-ikon">🌳</span>
              <span className="csempe-szoveg">STP</span>
            </button>

            <button className="csempe csempe-hsrp" onClick={() => setActiveSection('hsrp')}>
              <span className="csempe-ikon">👥</span>
              <span className="csempe-szoveg">HSRP</span>
            </button>

            <button className="csempe csempe-ipv6" onClick={() => setActiveSection('ipv6')}>
              <span className="csempe-ikon">♾️</span>
              <span className="csempe-szoveg">IPV6</span>
            </button>

            <button className="csempe csempe-wlan" onClick={() => setActiveSection('wlan')}>
              <span className="csempe-ikon">📡</span>
              <span className="csempe-szoveg">WLAN</span>
            </button>

            <button className="csempe csempe-ntpcdp" onClick={() => setActiveSection('ntpcdp')}>
              <span className="csempe-ikon">📡</span>
              <span className="csempe-szoveg">NTPCDP</span>
            </button>

          </div>
        </div>
      ) : (
        /* --- TARTALMI OLDAL (HA MÁR RÁKATTINTOTTAL EGY CSEMPÉRE) --- */
        <div className="tartalom-oldal">
          {/* Felső navigációs sáv a vissza gombbal */}
          <div className="felso-navigacio">
            <button className="vissza-btn" onClick={() => setActiveSection('home')}>
              ⬅ Vissza a főmenübe
            </button>
            <span className="aktualis-oldal-cim">
              {activeSection === 'alapbeallitasok' && '⚙️ Alapbeállítások'}
              {activeSection === 'dhcp' && '🌐 DHCP Konfiguráció'}
              {activeSection === 'vlan' && '🔀 VLAN Beállítások'}
              {activeSection === 'ssh' && '🛡️ SSH Távoli Elérés'}
              {activeSection === 'etherchannel' && '⛓️‍💥 EtherChannel'}
              {activeSection === 'ospf' && '🗺️ Ospf' }
              {activeSection === 'nat' && '📡 Nat' }
              {activeSection === 'vpn' && '🔒 Vpn' }
              {activeSection === 'acl' && '🛂 Acl' }
              {activeSection === 'staticroute' && '🛣️ StaticRoute' }
              {activeSection === 'portsecurity' && '🔌 PortSecurity' }
              {activeSection === 'stp' && '🌳 Stp' }
              {activeSection === 'hsrp' && '👥 Hsrp' }
              {activeSection === 'ipv6' && '♾️ Ipv6' }
              {activeSection === 'wlan' && '📡 Wlan' }
              {activeSection === 'ntpcdp' && '📡 Ntpcdp' }
            </span>
          </div>
          
          {/* Itt jelenik meg a kiválasztott csempe anyaga */}
          <main className="tartalom">
            {activeSection === 'alapbeallitasok' && <Alapbeallitasok />}
            {activeSection === 'dhcp' && <Dhcp />}
            {activeSection === 'vlan' && <Vlan />}
            {activeSection === 'ssh' && <Ssh />}
            {activeSection === 'etherchannel' && <EtherChannel />}
            {activeSection === 'ospf' && <Ospf />}
            {activeSection === 'nat' && <Nat />}
            {activeSection === 'vpn' && <Vpn />}
            {activeSection === 'acl' && <Acl />}
            {activeSection === 'staticroute' && <StaticRoute />}
            {activeSection === 'portsecurity' && <PortSecurity />}
            {activeSection === 'stp' && <Stp />}
            {activeSection === 'hsrp' && <Hsrp />}
            {activeSection === 'ipv6' && <Ipv6 />}
            {activeSection === 'wlan' && <Wlan />}
            {activeSection === 'ntpcdp' && <NtpCdp />}
          </main>
        </div>

      )}
    </div>
  );
}