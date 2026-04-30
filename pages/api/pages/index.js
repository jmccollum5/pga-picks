import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

const DRAFT_SEQUENCE = [
  'Mike','Kollas','Georgie','Corey','Zach','Tomas','Mark','Adrian',
  'Jack','Jack',
  'Adrian','Mark','Tomas','Zach','Corey','Georgie','Kollas','Mike',
  'Mike','Kollas','Georgie','Corey','Zach','Tomas','Mark','Adrian',
  'Jack','Jack',
  'Adrian','Mark','Tomas','Zach','Corey','Georgie','Kollas','Mike',
  'Mike','Kollas','Georgie','Corey','Zach','Tomas','Mark','Adrian',
  'Jack','Jack',
  'Adrian','Mark','Tomas','Zach','Corey','Georgie','Kollas','Mike',
  'Mike','Kollas','Georgie','Corey','Zach','Tomas','Mark','Adrian','Jack'
];

const PARTICIPANTS = ['Mike','Kollas','Georgie','Corey','Zach','Tomas','Mark','Adrian','Jack'];

const PARTICIPANT_COLORS = {
  'Mike':   '#ef4444',
  'Kollas': '#f97316',
  'Georgie':'#eab308',
  'Corey':  '#22c55e',
  'Zach':   '#06b6d4',
  'Tomas':  '#3b82f6',
  'Mark':   '#8b5cf6',
  'Adrian': '#ec4899',
  'Jack':   '#14b8a6',
};

const FIELD = [
  { name: 'Scottie Scheffler', odds: '+425' },
  { name: 'Rory McIlroy', odds: '+500' },
  { name: 'Bryson DeChambeau', odds: '+950' },
  { name: 'Jon Rahm', odds: '+1800' },
  { name: 'Xander Schauffele', odds: '+2200' },
  { name: 'Justin Thomas', odds: '+2200' },
  { name: 'Collin Morikawa', odds: '+2500' },
  { name: 'Ludvig Aberg', odds: '+2800' },
  { name: 'Joaquin Niemann', odds: '+3000' },
  { name: 'Tyrrell Hatton', odds: '+4500' },
  { name: 'Tommy Fleetwood', odds: '+4500' },
  { name: 'Patrick Cantlay', odds: '+4500' },
  { name: 'Hideki Matsuyama', odds: '+4500' },
  { name: 'Brooks Koepka', odds: '+4500' },
  { name: 'Viktor Hovland', odds: '+5000' },
  { name: 'Jordan Spieth', odds: '+5000' },
  { name: 'Shane Lowry', odds: '+5500' },
  { name: 'Sepp Straka', odds: '+6000' },
  { name: 'Russell Henley', odds: '+6500' },
  { name: 'Corey Conners', odds: '+6500' },
  { name: 'Jason Day', odds: '+7500' },
  { name: 'Wyndham Clark', odds: '+9000' },
  { name: 'Sungjae Im', odds: '+9000' },
  { name: 'Patrick Reed', odds: '+9000' },
  { name: 'Min Woo Lee', odds: '+9000' },
  { name: 'Justin Rose', odds: '+10000' },
  { name: 'Daniel Berger', odds: '+10000' },
  { name: 'Tony Finau', odds: '+11000' },
  { name: 'Robert MacIntyre', odds: '+11000' },
  { name: 'Maverick McNealy', odds: '+11000' },
  { name: 'Keegan Bradley', odds: '+11000' },
  { name: 'Si Woo Kim', odds: '+12000' },
  { name: 'Sergio Garcia', odds: '+12000' },
  { name: 'Sam Burns', odds: '+12000' },
  { name: 'Dustin Johnson', odds: '+12000' },
  { name: 'Will Zalatoris', odds: '+13000' },
  { name: 'Keith Mitchell', odds: '+13000' },
  { name: 'Cameron Smith', odds: '+13000' },
  { name: 'Akshay Bhatia', odds: '+13000' },
  { name: 'Dean Burmester', odds: '+14000' },
  { name: 'Byeong Hun An', odds: '+14000' },
  { name: 'Taylor Pendrith', odds: '+15000' },
  { name: 'Davis Thompson', odds: '+15000' },
  { name: 'Aaron Rai', odds: '+15000' },
  { name: 'J.J. Spaun', odds: '+16000' },
  { name: 'Max Homa', odds: '+16000' },
  { name: 'Denny McCarthy', odds: '+16000' },
  { name: 'Tom Kim', odds: '+18000' },
  { name: 'Matt Fitzpatrick', odds: '+18000' },
  { name: 'Brian Harman', odds: '+18000' },
  { name: 'David Puig', odds: '+18000' },
  { name: 'Michael Kim', odds: '+19000' },
  { name: 'Andrew Novak', odds: '+19000' },
  { name: 'Thomas Detry', odds: '+20000' },
  { name: 'Stephan Jaeger', odds: '+20000' },
  { name: 'Sahith Theegala', odds: '+20000' },
  { name: 'Ryan Fox', odds: '+20000' },
  { name: 'Rickie Fowler', odds: '+20000' },
  { name: 'Rasmus Hojgaard', odds: '+20000' },
  { name: 'Mackenzie Hughes', odds: '+20000' },
  { name: 'Harris English', odds: '+20000' },
  { name: 'Adam Scott', odds: '+20000' },
  { name: 'Thorbjorn Olesen', odds: '+25000' },
  { name: 'Samuel Stevens', odds: '+25000' },
  { name: 'Tom Hoge', odds: '+25000' },
  { name: 'Rasmus Neergaard-Petersen', odds: '+25000' },
  { name: 'Taylor Moore', odds: '+25000' },
  { name: 'Max Greyserman', odds: '+25000' },
  { name: 'Michael Thorbjornsen', odds: '+25000' },
  { name: 'Bud Cauley', odds: '+25000' },
  { name: 'Ben Griffin', odds: '+25000' },
  { name: 'Lucas Glover', odds: '+25000' },
  { name: 'Kurt Kitayama', odds: '+25000' },
  { name: 'Niklas Norgaard', odds: '+25000' },
  { name: 'J.T. Poston', odds: '+25000' },
  { name: 'Gary Woodland', odds: '+25000' },
  { name: 'Cameron Young', odds: '+25000' },
  { name: 'Nick Taylor', odds: '+30000' },
  { name: 'Kevin Yu', odds: '+30000' },
  { name: 'Jacob Bridgeman', odds: '+30000' },
  { name: 'Phil Mickelson', odds: '+30000' },
  { name: 'Nicolai Hojgaard', odds: '+30000' },
  { name: 'Jake Knapp', odds: '+30000' },
  { name: 'Tom McKibbin', odds: '+30000' },
  { name: 'Erik Van Rooyen', odds: '+30000' },
  { name: 'Seamus Power', odds: '+35000' },
  { name: 'Ryan Gerard', odds: '+35000' },
  { name: 'Laurie Canter', odds: '+35000' },
  { name: 'Harry Hall', odds: '+35000' },
  { name: 'Patrick Rodgers', odds: '+35000' },
  { name: 'Rico Hoey', odds: '+35000' },
  { name: 'Chris Kirk', odds: '+35000' },
  { name: 'Alex Noren', odds: '+35000' },
  { name: 'Matt McCarty', odds: '+40000' },
  { name: 'Lee Hodges', odds: '+40000' },
  { name: 'Victor Perez', odds: '+40000' },
  { name: 'Eugenio Chacarra', odds: '+40000' },
  { name: 'Eric Cole', odds: '+40000' },
  { name: 'Christiaan Bezuidenhout', odds: '+40000' },
  { name: 'Cam Davis', odds: '+40000' },
  { name: 'Austin Eckroat', odds: '+40000' },
  { name: 'Ryo Hisatsune', odds: '+45000' },
  { name: 'Garrick Higgo', odds: '+45000' },
  { name: 'Matt Wallace', odds: '+45000' },
  { name: 'Beau Hossler', odds: '+45000' },
  { name: 'Patrick Fishburn', odds: '+50000' },
  { name: 'Keita Nakajima', odds: '+50000' },
  { name: 'John Keefer', odds: '+50000' },
  { name: 'Joe Highsmith', odds: '+50000' },
  { name: 'Jhonattan Vegas', odds: '+50000' },
  { name: 'Sami Valimaki', odds: '+50000' },
  { name: 'Davis Riley', odds: '+50000' },
  { name: 'Karl Vilips', odds: '+50000' },
  { name: 'Elvis Smylie', odds: '+50000' },
  { name: 'Nico Echavarria', odds: '+60000' },
  { name: 'Max McGreevy', odds: '+60000' },
  { name: 'Adam Hadwin', odds: '+60000' },
  { name: 'Justin Lower', odds: '+70000' },
  { name: 'Marco Penge', odds: '+70000' },
  { name: 'Richard Bland', odds: '+80000' },
  { name: 'Nick Dunlap', odds: '+80000' },
  { name: 'Takumi Kanaya', odds: '+90000' },
  { name: 'Matthieu Pavon', odds: '+100000' },
  { name: 'Thriston Lawrence', odds: '+100000' },
  { name: 'Patton Kizzire', odds: '+100000' },
  { name: 'John Parry', odds: '+100000' },
  { name: 'John Catlin', odds: '+100000' },
  { name: 'Brian Campbell', odds: '+100000' },
  { name: 'Daniel van Tonder', odds: '+150000' },
  { name: 'Padraig Harrington', odds: '+200000' },
  { name: 'Martin Kaymer', odds: '+250000' },
  { name: 'Luke Donald', odds: '+250000' },
  { name: 'Michael Block', odds: '+250000' },
  { name: 'Jason Dufner', odds: '+250000' },
  { name: 'Rafael Campos', odds: '+300000' },
  { name: 'Jimmy Walker', odds: '+300000' },
  { name: 'Timothy Wiseman', odds: '+500000' },
  { name: 'Tyler Collet', odds: '+500000' },
  { name: 'Tom Johnson', odds: '+500000' },
  { name: 'Shaun Micheel', odds: '+500000' },
  { name: 'Larkin Gross', odds: '+500000' },
  { name: 'Justin Hicks', odds: '+500000' },
  { name: 'John Somers', odds: '+500000' },
  { name: 'Jesse Droemer', odds: '+500000' },
  { name: 'Greg Koch', odds: '+500000' },
  { name: 'Bob Sowards', odds: '+500000' },
  { name: 'Ryan Lenahan', odds: '+500000' },
  { name: 'Andre Chi', odds: '+500000' },
  { name: 'Rupe Taylor', odds: '+500000' },
  { name: 'Nic Ishee', odds: '+500000' },
  { name: 'Michael Kartrude', odds: '+500000' },
  { name: 'Eric Steger', odds: '+500000' },
  { name: 'Dylan Newman', odds: '+500000' },
  { name: 'Brian Bergstol', odds: '+500000' },
  { name: 'Brandon Bingaman', odds: '+500000' },
  { name: 'Bobby Gates', odds: '+500000' },
];

export default function Home() {
  const [picks, setPicks] = useState({});
  const [pickLog, setPickLog] = useState([]);
  const [me, setMe] = useState('');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);
  const [showAllPicks, setShowAllPicks] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [showLog, setShowLog] = useState(false);

  const fetchPicks = useCallback(async () => {
    try {
      const res = await fetch('/api/picks');
      const data = await res.json();
      setPicks(data.picks || {});
      setPickLog(data.pickLog || []);
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchPicks();
    const interval = setInterval(fetchPicks, 4000);
    return () => clearInterval(interval);
  }, [fetchPicks]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const currentPickNum = pickLog.length;
  const isComplete = currentPickNum >= DRAFT_SEQUENCE.length;
  const currentTurn = isComplete ? null : DRAFT_SEQUENCE[currentPickNum];
  const nextTurn = (!isComplete && currentPickNum + 1 < DRAFT_SEQUENCE.length)
    ? DRAFT_SEQUENCE[currentPickNum + 1] : null;
  const isDoublePick = currentTurn && nextTurn && currentTurn === nextTurn;
  const isMyTurn = me && currentTurn === me;
  const myPicks = me ? (picks[me] || []) : [];

  const takenBy = {};
  for (const [person, golfers] of Object.entries(picks)) {
    for (const g of golfers) takenBy[g] = person;
  }

  const totalPicked = Object.keys(takenBy).length;

  const upcomingPicks = [];
  for (let i = currentPickNum; i < Math.min(currentPickNum + 7, DRAFT_SEQUENCE.length); i++) {
    upcomingPicks.push({ pickNum: i + 1, player: DRAFT_SEQUENCE[i] });
  }

  const handlePick = async (golfer) => {
    if (!me) return showToast('Select your name first!', 'error');
    if (currentTurn !== me) return showToast(`It's ${currentTurn}'s turn!`, 'error');
    if (takenBy[golfer]) return showToast(`${golfer} is already taken!`, 'error');

    const res = await fetch('/api/picks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'pick', participant: me, golfer }),
    });
    const data = await res.json();
    if (res.ok) {
      setPicks(data.picks);
      setPickLog(data.pickLog);
      showToast(`✓ ${golfer} — Pick #${data.pickNum}`);
    } else {
      showToast(data.error || 'Error', 'error');
      fetchPicks();
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'pga2025')) {
      setAdminAuthed(true); setAdminError('');
    } else setAdminError('Wrong password');
  };

  const handleReset = async () => {
    if (!confirm('Reset ALL picks? Cannot be undone.')) return;
    const res = await fetch('/api/picks', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset', password: adminPassword }),
    });
    if (res.ok) { setPicks({}); setPickLog([]); showToast('All picks reset'); }
  };

  const handleUndo = async () => {
    if (!confirm('Undo the last pick?')) return;
    const res = await fetch('/api/picks', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'undo', password: adminPassword }),
    });
    const data = await res.json();
    if (res.ok) { setPicks(data.picks); setPickLog(data.pickLog); showToast('Last pick undone'); }
    else showToast(data.error, 'error');
  };

  const filteredField = FIELD.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>PGA Championship 2025 — Pool Draft</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#0a0c0e;--surface:#111418;--surface2:#1a1f26;--border:#2a3040;
          --gold:#c9a84c;--text:#e8eaed;--muted:#8892a0;--green:#22c55e;--red:#ef4444;--r:10px;
        }
        body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh}
        .hdr{background:linear-gradient(180deg,#0d1117 0%,var(--bg) 100%);border-bottom:1px solid var(--border);padding:18px 16px 14px;text-align:center;position:sticky;top:0;z-index:50}
        .hdr-eye{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:3px}
        .hdr-title{font-family:'Bebas Neue',cursive;font-size:clamp(28px,8vw,48px);letter-spacing:2px;line-height:1;margin-bottom:2px}
        .hdr-sub{font-size:12px;color:var(--muted);margin-bottom:12px}
        .hdr-stats{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
        .stat{background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:3px 11px;font-size:12px;color:var(--muted)}
        .stat span{color:var(--gold);font-weight:600}
        .wrap{max-width:680px;margin:0 auto;padding:14px}
        .clock{border-radius:var(--r);padding:16px;border:2px solid;text-align:center;margin-bottom:12px;animation:pulse 2.5s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.75}}
        .clock-eye{font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin-bottom:4px}
        .clock-name{font-family:'Bebas Neue',cursive;font-size:40px;letter-spacing:2px;line-height:1}
        .clock-meta{font-size:12px;margin-top:3px;opacity:.8}
        .clock-you{margin-top:10px;border-radius:6px;padding:7px 14px;font-size:13px;font-weight:600}
        .upcoming{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:12px;margin-bottom:12px}
        .sec-label{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:9px}
        .up-list{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px}
        .up-item{flex-shrink:0;text-align:center;padding:6px 10px;border-radius:6px;border:1px solid var(--border);min-width:56px}
        .up-num{font-size:10px;color:var(--muted);margin-bottom:2px}
        .up-name{font-size:12px;font-weight:600}
        .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px;margin-bottom:12px}
        .name-grid{display:flex;flex-wrap:wrap;gap:7px}
        .nbtn{padding:7px 13px;border-radius:6px;border:1px solid var(--border);background:var(--surface2);color:var(--muted);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s}
        .nbtn:hover{border-color:var(--gold);color:var(--text)}
        .nbtn.active{background:var(--gold);border-color:var(--gold);color:#0a0c0e;font-weight:700}
        .nbtn .pc{background:rgba(0,0,0,.2);border-radius:10px;padding:1px 5px;font-size:10px;margin-left:4px}
        .mphdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
        .ctr{font-family:'Bebas Neue',cursive;font-size:22px;color:var(--gold)}
        .ctr.done{color:var(--green)}
        .ptags{display:flex;flex-wrap:wrap;gap:6px}
        .ptag{background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:5px 10px;font-size:12px;display:flex;align-items:center;gap:5px}
        .dots{display:flex;gap:4px;margin-top:10px}
        .dot{height:4px;flex:1;border-radius:2px;background:var(--border);transition:background .3s}
        .dot.on{background:var(--gold)}.dot.done{background:var(--green)}
        .toggle{width:100%;background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:11px 14px;color:var(--muted);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;text-align:left;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;transition:border-color .15s}
        .toggle:hover{border-color:var(--gold);color:var(--text)}
        .apgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;margin-bottom:12px}
        .pcard{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:12px}
        .pcname{font-family:'Bebas Neue',cursive;font-size:17px;letter-spacing:1px;margin-bottom:7px;display:flex;align-items:center;gap:7px}
        .pdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
        .prow{font-size:12px;color:var(--muted);padding:3px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between}
        .prow:last-child{border-bottom:none}
        .srchwrap{position:relative;margin-bottom:10px}
        .srchico{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:15px;pointer-events:none}
        .srch{width:100%;background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:11px 14px 11px 38px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .15s}
        .srch:focus{border-color:var(--gold)}
        .srch::placeholder{color:var(--muted)}
        .grphdr{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--muted);padding:7px 0 5px;border-bottom:1px solid var(--border);margin-bottom:5px;margin-top:12px}
        .grow{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:8px;background:var(--surface);border:1px solid transparent;margin-bottom:4px;transition:all .12s;-webkit-tap-highlight-color:transparent}
        .grow.pickable{cursor:pointer}
        .grow.pickable:hover{border-color:var(--gold);background:var(--surface2)}
        .grow.taken{opacity:.35;cursor:default}
        .grow.waiting{opacity:.55;cursor:not-allowed}
        .grank{font-family:'Bebas Neue',cursive;font-size:15px;color:var(--muted);width:24px;text-align:right;flex-shrink:0}
        .gname{flex:1;font-size:14px;font-weight:500}
        .godds{font-size:11px;color:var(--muted);flex-shrink:0}
        .tbadge{font-size:11px;font-weight:600;padding:2px 7px;border-radius:4px;flex-shrink:0}
        .pbtn{width:28px;height:28px;border-radius:50%;border:1.5px solid var(--border);background:none;color:var(--muted);font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .12s;flex-shrink:0;line-height:1}
        .pbtn.ready{border-color:var(--gold);color:var(--gold)}
        .pbtn.ready:hover{background:var(--gold);color:#0a0c0e}
        .logrow{display:flex;align-items:center;gap:9px;padding:5px 0;border-bottom:1px solid var(--border);font-size:12px}
        .logrow:last-child{border-bottom:none}
        .lnum{font-family:'Bebas Neue',cursive;font-size:14px;color:var(--muted);width:22px}
        .lplayer{font-weight:600;width:58px;flex-shrink:0}
        .lgolfer{color:var(--muted);flex:1}
        .admsec{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px;margin-top:18px}
        .admlabel{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:10px;cursor:pointer}
        .adminput{background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:7px 11px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;width:140px;margin-right:8px}
        .adminput:focus{border-color:var(--gold)}
        .btn{padding:7px 13px;border-radius:6px;border:none;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;margin-right:6px;margin-bottom:6px}
        .bg{background:var(--gold);color:#0a0c0e}
        .br{background:var(--red);color:#fff}
        .bo{background:#f97316;color:#fff}
        .errmsg{color:var(--red);font-size:12px;margin-top:5px}
        .divider{height:1px;background:var(--border);margin:14px 0}
        .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 20px;font-size:13px;font-weight:500;z-index:100;animation:sup .2s ease;white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,.5)}
        .toast.success{border-color:var(--gold);color:var(--gold)}
        .toast.error{border-color:var(--red);color:var(--red)}
        @keyframes sup{from{transform:translateX(-50%) translateY(20px);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}
        .complete{text-align:center;padding:22px;background:var(--surface);border:1px solid var(--gold);border-radius:var(--r);margin-bottom:12px}
        .complete h2{font-family:'Bebas Neue',cursive;font-size:30px;color:var(--gold);letter-spacing:2px;margin-bottom:4px}
      `}</style>

      <div className="hdr">
        <div className="hdr-eye">Quail Hollow · Charlotte, NC</div>
        <div className="hdr-title">PGA Championship 2025</div>
        <div className="hdr-sub">Snake Draft — 7 picks each · Top 4 scores count</div>
        <div className="hdr-stats">
          <div className="stat">Pick <span>{currentPickNum + 1}</span> of 63</div>
          <div className="stat"><span>{totalPicked}</span> taken</div>
          <div className="stat"><span>{FIELD.length - totalPicked}</span> available</div>
        </div>
      </div>

      <div className="wrap">

        {!isComplete && currentTurn && (
          <div className="clock" style={{ borderColor: PARTICIPANT_COLORS[currentTurn], background: PARTICIPANT_COLORS[currentTurn] + '18' }}>
            <div className="clock-eye" style={{ color: PARTICIPANT_COLORS[currentTurn] }}>
              🕐 On the clock — Pick #{currentPickNum + 1}{isDoublePick ? ` & #${currentPickNum + 2}` : ''}
            </div>
            <div className="clock-name" style={{ color: PARTICIPANT_COLORS[currentTurn] }}>{currentTurn}</div>
            <div className="clock-meta" style={{ color: PARTICIPANT_COLORS[currentTurn] }}>
              {isDoublePick ? '🔁 Double pick turn · ' : ''}{picks[currentTurn]?.length || 0} of 7 picks made
            </div>
            {isMyTurn && (
              <div className="clock-you" style={{ background: PARTICIPANT_COLORS[currentTurn] + '33', color: PARTICIPANT_COLORS[currentTurn] }}>
                👆 It's your turn — tap a golfer below!
              </div>
            )}
          </div>
        )}

        {isComplete && (
          <div className="complete">
            <h2>🏆 Draft Complete!</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>All 63 picks made. Good luck everyone!</p>
          </div>
        )}

        {!isComplete && (
          <div className="upcoming">
            <div className="sec-label">Upcoming picks</div>
            <div className="up-list">
              {upcomingPicks.map((u, i) => (
                <div key={u.pickNum} className="up-item" style={{
                  borderColor: i === 0 ? PARTICIPANT_COLORS[u.player] : 'var(--border)',
                  borderWidth: i === 0 ? 2 : 1,
                  background: i === 0 ? PARTICIPANT_COLORS[u.player] + '1a' : 'var(--surface2)',
                }}>
                  <div className="up-num">#{u.pickNum}</div>
                  <div className="up-name" style={{ color: i === 0 ? PARTICIPANT_COLORS[u.player] : 'var(--text)' }}>{u.player}</div>
                </div>
              ))}
              {currentPickNum + 7 < DRAFT_SEQUENCE.length && (
                <div className="up-item" style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', fontSize: 16 }}>···</div>
              )}
            </div>
          </div>
        )}

        <div className="card">
          <div className="sec-label">Who are you?</div>
          <div className="name-grid">
            {PARTICIPANTS.map(p => (
              <button key={p} className={`nbtn ${me === p ? 'active' : ''}`}
                onClick={() => setMe(me === p ? '' : p)}
                style={me === p ? {} : { borderColor: PARTICIPANT_COLORS[p] + '55' }}>
                {p}
                {(picks[p]?.length || 0) > 0 && <span className="pc">{picks[p].length}/7</span>}
                {picks[p]?.length === 7 && ' ✓'}
              </button>
            ))}
          </div>
        </div>

        {me && (
          <div className="card">
            <div className="mphdr">
              <div className="sec-label" style={{ marginBottom: 0 }}>{me}'s picks</div>
              <div className={`ctr ${myPicks.length === 7 ? 'done' : ''}`}>
                {myPicks.length === 7 ? '✓ DONE' : `${myPicks.length} / 7`}
              </div>
            </div>
            {myPicks.length === 0
              ? <div style={{ color: 'var(--muted)', fontSize: 13, fontStyle: 'italic' }}>No picks yet</div>
              : <div className="ptags">{myPicks.map((g, i) => (
                  <div key={g} className="ptag">
                    <span style={{ color: 'var(--muted)', fontSize: 11 }}>{i + 1}.</span>{g}
                  </div>
                ))}</div>
            }
            <div className="dots">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={`dot ${i < myPicks.length ? (myPicks.length === 7 ? 'done' : 'on') : ''}`} />
              ))}
            </div>
          </div>
        )}

        <button className="toggle" onClick={() => setShowAllPicks(!showAllPicks)}>
          <span>📋 Everyone's picks ({Object.keys(picks).filter(p => picks[p]?.length > 0).length}/{PARTICIPANTS.length})</span>
          <span>{showAllPicks ? '▲' : '▼'}</span>
        </button>
        {showAllPicks && (
          <div className="apgrid">
            {PARTICIPANTS.map(p => (
              <div className="pcard" key={p} style={{ borderColor: picks[p]?.length ? PARTICIPANT_COLORS[p] + '66' : '' }}>
                <div className="pcname">
                  <div className="pdot" style={{ background: PARTICIPANT_COLORS[p] }} />
                  {p}
                  <span style={{ marginLeft: 'auto', fontSize: 12, fontFamily: 'DM Sans', color: 'var(--muted)', fontWeight: 400 }}>
                    {picks[p]?.length || 0}/7
                  </span>
                </div>
                {picks[p]?.length > 0
                  ? picks[p].map((g, i) => {
                      const gd = FIELD.find(f => f.name === g);
                      return <div className="prow" key={g}><span>{i + 1}. {g}</span><span style={{ fontSize: 10 }}>{gd?.odds}</span></div>;
                    })
                  : <div style={{ color: 'var(--muted)', fontSize: 12, fontStyle: 'italic' }}>No picks yet</div>
                }
              </div>
            ))}
          </div>
        )}

        <div className="divider" />

        <div className="srchwrap">
          <span className="srchico">🔍</span>
          <input className="srch" placeholder="Search golfers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {(() => {
          let lastGroup = null;
          return filteredField.map(golfer => {
            const isTaken = !!takenBy[golfer.name];
            const takerColor = takenBy[golfer.name] ? PARTICIPANT_COLORS[takenBy[golfer.name]] : null;
            const canPick = isMyTurn && !isTaken;
            const oddsNum = parseInt(golfer.odds.replace('+', ''));
            let group = oddsNum <= 2200 ? '⭐ Favorites'
              : oddsNum <= 6500 ? 'Contenders'
              : oddsNum <= 15000 ? 'Mid-Tier'
              : oddsNum <= 30000 ? 'Longshots'
              : oddsNum <= 60000 ? 'Deep Shots' : 'Qualifiers';
            const showHdr = group !== lastGroup && !search;
            if (showHdr) lastGroup = group;
            return (
              <div key={golfer.name}>
                {showHdr && <div className="grphdr">{group}</div>}
                <div className={`grow ${isTaken ? 'taken' : canPick ? 'pickable' : 'waiting'}`}
                  onClick={() => canPick && handlePick(golfer.name)}>
                  <div className="grank">{FIELD.indexOf(golfer) + 1}</div>
                  <div className="gname">{golfer.name}</div>
                  <div className="godds">{golfer.odds}</div>
                  {isTaken
                    ? <div className="tbadge" style={{ background: takerColor + '2a', color: takerColor }}>{takenBy[golfer.name]}</div>
                    : <button className={`pbtn ${canPick ? 'ready' : ''}`} disabled={!canPick}
                        onClick={e => { e.stopPropagation(); canPick && handlePick(golfer.name); }}>+</button>
                  }
                </div>
              </div>
            );
          });
        })()}

        {pickLog.length > 0 && (
          <>
            <div className="divider" />
            <button className="toggle" onClick={() => setShowLog(!showLog)}>
              <span>📜 Pick history ({pickLog.length} picks)</span>
              <span>{showLog ? '▲' : '▼'}</span>
            </button>
            {showLog && (
              <div className="card">
                {[...pickLog].reverse().map(entry => (
                  <div className="logrow" key={entry.pickNum}>
                    <div className="lnum">#{entry.pickNum}</div>
                    <div className="lplayer" style={{ color: PARTICIPANT_COLORS[entry.player] }}>{entry.player}</div>
                    <div className="lgolfer">{entry.golfer}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>{FIELD.find(f => f.name === entry.golfer)?.odds}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div className="admsec">
          <div className="admlabel" onClick={() => setShowAdmin(!showAdmin)}>🔐 Admin {showAdmin ? '▲' : '▼'}</div>
          {showAdmin && !adminAuthed && (
            <div>
              <input className="adminput" type="password" placeholder="Password" value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminLogin()} />
              <button className="btn bg" onClick={handleAdminLogin}>Login</button>
              {adminError && <div className="errmsg">{adminError}</div>}
            </div>
          )}
          {showAdmin && adminAuthed && (
            <div>
              <button className="btn bo" onClick={handleUndo}>↩ Undo Last Pick</button>
              <button className="btn br" onClick={handleReset}>🗑 Reset All</button>
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
                Pick #{currentPickNum + 1} · {isComplete ? 'Draft complete' : `${currentTurn}'s turn`}
              </div>
            </div>
          )}
        </div>

        <div style={{ height: 60 }} />
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}
