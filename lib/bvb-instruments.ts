export type BvbInstrument = { ticker: string; name: string; market: "Main" | "AeRO" };

// Main regulated-market catalogue from BVB's official Shares page, checked 2026-08-14.
export const bvbInstruments: BvbInstrument[] = [
  ["AAG","AAGES"],["ALR","Alro"],["ALT","Altur"],["ALU","Alumil Rom Industry"],
  ["AROBS","AROBS Transilvania Software"],["ARM","Armatura"],["ARS","Aerostar"],["ARTE","Artego"],
  ["ATB","Antibiotice"],["AQ","Aquila Part Prod Com"],["BCM","Casa de Bucovina"],["BIO","Biofarm"],
  ["BNET","Bittnet Systems"],["BRD","BRD Groupe Société Générale"],["BRK","BRK Financial Group"],["BRM","Bermas"],
  ["BUCV","Bucur"],["BVB","Bursa de Valori București"],["CAOR","SIF Hoteluri"],["CBC","Carbochim"],
  ["CFH","Cris-Tim Family Holding"],["CMCM","Comcm"],["CMF","Comelf"],["CMP","Compa"],
  ["CNTE","Conted"],["COMI","Condmag"],["COTE","Conpet"],["CRC","Chimcomplex"],
  ["DIGI","Digi Communications"],["EAI","Electro-Alfa International"],["EBS","Erste Group Bank"],["ECT","Electrocontact"],
  ["EFO","THR Marea Neagră"],["EL","Electrica"],["ELGS","AETA"],["ELJ","Electroaparataj"],
  ["ELMA","Electromagnetica"],["ENP","Energopetrol"],["EVER","Evergent Investments"],["FP","Fondul Proprietatea"],
  ["GREEN","Green Tech International"],["H2O","Hidroelectrica"],["IARV","IAR Brașov"],["IMP","Impact Developer & Contractor"],
  ["INFINITY","Infinity Capital Investments"],["LION","Lion Capital"],["LONG","Longshield Investment Group"],["M","MedLife"],
  ["MCAB","Romcab"],["MECF","Mecanica Ceahlău"],["MFC","MF Capital"],["NAPO","Construcții Napoca"],
  ["OIL","Oil Terminal"],["ONE","One United Properties"],["PBK","Patria Bank"],["PE","Premier Energy"],
  ["PPL","Promateris"],["PREB","Prebet Aiud"],["PREH","Prefab"],["PTR","Rompetrol Well Services"],
  ["RMAH","Farmaceutica Remedia"],["ROCE","Romcarbon"],["ROC1","ROCA Industry"],["RPH","Ropharma"],
  ["RRC","Rompetrol Rafinare"],["SAFE","Safetech Innovations"],["SFG","Sphera Franchise Group"],["SMTL","Simtel Team"],
  ["SNG","Romgaz"],["SNN","Nuclearelectrica"],["SNO","Șantierul Naval Orșova"],["SNP","OMV Petrom"],
  ["SOCP","Socep"],["STZ","Sinteza"],["TBK","Transilvania Broker"],["TBM","Turbomecanica"],
  ["TEL","Transelectrica"],["TGN","Transgaz"],["TLV","Banca Transilvania"],["TRANSI","Transilvania Investments Alliance"],
  ["TRIP","Christian Tour"],["TRP","TeraPlast"],["TTS","Transport Trade Services"],["UAM","UAMT"],
  ["UZT","Uztel"],["VESY","VES"],["VNC","Vrancart"],["WINE","Purcari Wineries"],
].map(([ticker, name]) => ({ ticker, name, market: "Main" as const }));

// Frequently followed AeRO companies. Any other valid BVB ticker is supported
// through the terminal's direct symbol lookup.
export const featuredAero: BvbInstrument[] = [
  ["2P","2Performant Network"],["4RT","Fort"],["AAB","Agroland Agribusiness"],["ABN","ABN Systems International"],
  ["ADISS","Adiss"],["AG","Agroland Business System"],["ASC","Ascendia"],["AST","Arctic Stream"],
  ["BENTO","2B Intelligent Soft"],["BONA","Bonas Import Export"],["CC","Connections Consult"],["CLAIM","Air Claim"],
  ["CODE","Softbinator Technologies"],["DENT","Dr. Fischer Dental"],["DN","DN Agrar Group"],
].map(([ticker, name]) => ({ ticker, name, market: "AeRO" as const }));

export const allFeaturedInstruments = [...bvbInstruments, ...featuredAero]
  .sort((a, b) => a.ticker.localeCompare(b.ticker));
