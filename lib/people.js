// XENCE people source: Google Sheet "XENCE ウェブサイト ニュース管理" (tab "people").
// Columns: A 掲載 | B 順番 | C 名前(英) | D 役職 | E 写真 | F 名前(日) | G 紹介文(日) | H 紹介文(英) | I 受賞歴(日) | J 受賞歴(英) | K LinkedIn | L X | M Instagram
// Uncheck 掲載 to hide someone; add a row to add someone. Empty F–M cells fall back to PROFILES below (matched by English name).
// FALLBACK is used only if the sheet can't be reached.
import { SHEET_ID, driveImg } from '/lib/news.js';
export const PROFILES = {
"Kotaro Ozawa": {
"jp": "小澤 巧太郎",
"bio": "一級建築士。幼少期から山や森で得た木材を使い、家族とともに建物や家具をつくる環境の中で育つ。\n東京大学大学院にて、サステナブルな建築の設計とマネジメントを研究。修了後、竹中工務店にて中大規模建築の設計に従事し、建築の設計・施工プロセスや建設産業の構造を実務の中で経験する。\n2022年、建設業の川上から川下までをデジタル技術とサプライチェーンマネジメントによって統合し、素材の流れから建築を設計する新しい建設産業の構築を目指して株式会社XENCEを創業。\nXENCEでは、未利用木材を活用した建築システムの開発や、デジタルファブリケーション技術を活用した建築部材の研究開発を推進。建築の設計・施工・運営の各プロセスを横断しながら、資源循環を前提としたサーキュラー建築の実装に取り組んでいる。",
"bio_en": "Licensed Architect. Grew up building furniture and structures with wood gathered from mountains and forests with family.\nStudied sustainable architectural design and management at the University of Tokyo Graduate School. After graduating, joined Takenaka Corporation, where he gained hands-on experience in medium-to-large-scale building design and the design-construction process across the construction industry.\nIn 2022, founded XENCE Inc. with the aim of building a new construction industry that integrates the full supply chain, from upstream material sourcing to downstream construction, using digital technology and supply chain management.\nAt XENCE, he leads the development of architectural systems using unutilized timber and advances research on building components through Robotic Fabrication, working across design, construction, and operations with a focus on implementing Circular Architecture based on resource circulation.",
"aw": "リサーチデザインビルド共同プログラム 2022 / 日本空間デザイン賞 2022 / AND賞 2022 / iF DESIGN AWARD 2022 他",
"aw_en": "Research Design Build Joint Program 2022 / Japan Space Design Award 2022 / AND Award 2022 / iF Design Award 2022, and others",
"li": "https://www.linkedin.com/in/ozawa-kotaro-7b8582162/",
"x": "https://x.com/OzawaKotaro",
"ig": "https://www.instagram.com/kotaro_ozawa_/"
},
"Asako Osedo": {
"jp": "大世渡 麻子",
"bio": "アクセンチュアのデザインマネジャーとして、資生堂やKDDIなどの新規サービス・プロダクトの立ち上げを支援。2023年に独立し、オランダを拠点に大学でのデザイン研究やスタートアップとの協業に従事。2025年にXENCEへ参画。\nXENCEでは、世の中に眠る未活用材を、社会的インパクトを生む規模で建築に活用することを目指し、事業開発とサービスデザインを推進している。",
"bio_en": "As a Design Manager at Accenture, Asako supported the launch of new products and services for major companies. In 2023, she became an independent designer based in the Netherlands, pursuing academic research in design and collaborating with startups. She joined XENCE in 2025.\nAt XENCE, she leads business development and service design, aiming to transform underutilized materials into scalable building solutions that create meaningful social impact.",
"aw": "Red Dot Design Award 2023, 2026 / iF Design Award 2023, 2026 / A' Design Award 2025 / グッドデザイン賞 2023 他",
"aw_en": "Red Dot Design Award 2023, 2026 / iF Design Award 2023, 2026 / A' Design Award 2025 / Good Design Award 2023, and others",
"li": "https://www.linkedin.com/in/asako-osedo-55a608142",
"x": "",
"ig": "https://www.instagram.com/asako_osedo/"
},
"Koji Saito": {
"jp": "斎藤 孝治",
"bio": "一級建築士。愛知県出身、名古屋大学にてファシリティマネジメントを専攻。\n卒業後、久米設計にて大手企業のオフィスや研究施設の設計に従事し、建築計画の立案や要件整理など、企業施設の計画・マネジメント業務を担当。\nXENCEでは、建物の運営や資産価値を長期的に高めるためのファシリティマネジメントの企画やロードマップの策定を担当し、建築の設計・施工だけでなく運営までを見据えた建築プロジェクトの推進に取り組んでいる。\n現在は名古屋大学助教として、ファシリティマネジメントと建築の関係について研究にも取り組んでいる。",
"bio_en": "Licensed Architect. From Aichi Prefecture, studied facility management at Nagoya University.\nAfter graduating, worked at a major corporation on the design of corporate offices and research facilities, handling architectural planning and requirements management for institutional clients.\nAt XENCE, he leads the development of facility management strategies and roadmaps aimed at enhancing long-term building performance and asset value, driving architectural projects that encompass not just design and construction but ongoing operations.\nCurrently also serves as an assistant professor at Nagoya University, conducting research on the relationship between facility management and architecture.",
"aw": "",
"aw_en": "",
"li": "",
"x": "",
"ig": ""
},
"Akihiro Yamada": {
"jp": "山田 晃大",
"bio": "一級施工管理技術士。福井県出身、名古屋工業大学建築学科卒業。\n大成建設にて建築の施工管理および現場マネジメントに従事したのち、neie設計にて木造住宅の現場監督として数十棟の新築木造住宅プロジェクトを担当し、木造建築の施工管理と品質管理の経験を積む。RC造、SRC・S造、木造の新規建築及びリノベーションにおいて多くの経験を持つ。\n2022年よりXENCEに参画。住宅プロジェクトの設計施工計画の策定や、建材・建築部材の技術開発プロジェクトを担当。\n2026年の株式会社化以降はLead Construction Managementとして、XENCEの建築プロジェクトにおける施工マネジメントを担い、設計・技術開発と連携した建築の実装を推進している。",
"bio_en": "Licensed Construction Management Engineer. From Fukui Prefecture, graduated from Nagoya Institute of Technology, Department of Architecture.\nAfter working in construction management and site supervision at Taisei Corporation, he served as site supervisor at neie design, overseeing dozens of new timber residential projects and building deep expertise in timber construction management and quality control. Experienced across RC, SRC, S, and timber construction for both new builds and renovation.\nJoined XENCE in 2022, taking charge of design-construction planning for residential projects and technical development of materials and building components.\nSince XENCE's incorporation in 2026, he has served as Lead Construction Management, overseeing construction management for XENCE's architectural projects and advancing implementation in coordination with design and technology development.",
"aw": "",
"aw_en": "",
"li": "",
"x": "",
"ig": ""
},
"Kotaro Jin": {
"jp": "陣 昂太郎",
"bio": "東京都出身。名古屋大学工学部卒業。アトリエ系設計事務所にて住宅建築の設計に従事した後、XENCEに参画。\nXENCEでは建築設計を担当するとともに、BIMソフトを活用した設計プロセスの構築や、デジタルツインによる建築設計・プロジェクト管理の高度化に取り組んでいる。",
"bio_en": "From Tokyo. Graduated from Nagoya University, Faculty of Engineering. Worked on residential architecture design at an atelier-style architecture firm before joining XENCE.\nAt XENCE, he handles architectural design while also building BIM-integrated design workflows and advancing digital twin applications for project management and design precision.",
"aw": "",
"aw_en": "",
"li": "",
"x": "",
"ig": ""
},
"Kosuke Kuroda": {
"jp": "黒田 晃佑",
"bio": "家具デザイナー/クリエイティブディレクター。\n前職の株式会社飛騨の森でクマは踊るでは、クレヨンから建築、メーカーの製品開発まで広く木の魅力を活かしたディレクション、デザイン、空間設計に携わる。映画が好きで、飛騨地域を中心とした映画の上映活動にも取り組んでいる。\nXENCEでは、木材を活用した建築・家具・プロダクトのデザインや製造に取り組んでいる。",
"bio_en": "Furniture Designer / Creative Director.\nAt his previous role at Hida no Mori de Kuma wa Odoru Co., Ltd., he directed and designed across a wide range, from crayons and architecture to manufacturer product development, drawing on the full appeal of wood. A film enthusiast, he is also involved in film screening activities centered around the Hida region.\nAt XENCE, he works on the design and production of wood-based architecture, furniture, and products.",
"aw": "日本空間デザイン賞 2023, 2025 / ウッドデザイン賞 2022",
"aw_en": "Japan Space Design Award 2023, 2025 / Wood Design Award 2022",
"li": "",
"x": "",
"ig": ""
},
"Yushi Kimoto": {
"jp": "木本 諭志",
"bio": "京都工芸繊維大学建築学科卒業。竹中工務店にて建築設計に従事したのち、岐阜県郡上市へ移住。飛騨地域にて木工を学び、木材を活かしたものづくりの技術を習得する。\n現在は郡上市を拠点に、地方での暮らしを基盤としながら、デザインと木工の両面から建築やプロダクトの制作に取り組んでいる。",
"bio_en": "Graduated from Kyoto Institute of Technology, Department of Architecture. Worked in architectural design at Takenaka Corporation before relocating to Gujo City, Gifu Prefecture. Studied woodworking in the Hida region, developing craftsmanship in wood-based making.\nCurrently based in Gujo City, combining rural living with a practice that bridges design and woodworking in both architecture and product creation.",
"aw": "",
"aw_en": "",
"li": "",
"x": "",
"ig": ""
},
"Mako Sumi": {
"jp": "鷲見 真子",
"bio": "岐阜県出身。郡上市役所にて保健師に従事。\n2024年からコミュニティマネージャーとしてXENCEに参加。名古屋大学内のインキュベーション施設であるIdeaStoaの運営に従事。大学施設の最適なマネジメントと大学生の自主性に基づくイノベーションの創出やアントレプレナーシップの醸成に取り組む。またその他、ファシリティマネジメント事業について、運営のための基盤資料の作成や現場マネジメントを担当。",
"bio_en": "From Gifu Prefecture. Previously worked as a public health nurse at Gujo City Hall.\nJoined XENCE in 2024 as Community Manager. Manages operations at IdeaStoa, an incubation facility at Nagoya University. Works to optimize facility management and foster student-led innovation and entrepreneurship. Also handles facility management operations, including the creation of operational documentation and on-site management.",
"aw": "",
"aw_en": "",
"li": "",
"x": "",
"ig": ""
}
};
export const FALLBACK = [
{
"name": "Kotaro Ozawa",
"role": "Founder & CEO",
"img": "/assets/ko.jpg",
"jp": "小澤 巧太郎",
"bio": "一級建築士。幼少期から山や森で得た木材を使い、家族とともに建物や家具をつくる環境の中で育つ。\n東京大学大学院にて、サステナブルな建築の設計とマネジメントを研究。修了後、竹中工務店にて中大規模建築の設計に従事し、建築の設計・施工プロセスや建設産業の構造を実務の中で経験する。\n2022年、建設業の川上から川下までをデジタル技術とサプライチェーンマネジメントによって統合し、素材の流れから建築を設計する新しい建設産業の構築を目指して株式会社XENCEを創業。\nXENCEでは、未利用木材を活用した建築システムの開発や、デジタルファブリケーション技術を活用した建築部材の研究開発を推進。建築の設計・施工・運営の各プロセスを横断しながら、資源循環を前提としたサーキュラー建築の実装に取り組んでいる。",
"bio_en": "Licensed Architect. Grew up building furniture and structures with wood gathered from mountains and forests with family.\nStudied sustainable architectural design and management at the University of Tokyo Graduate School. After graduating, joined Takenaka Corporation, where he gained hands-on experience in medium-to-large-scale building design and the design-construction process across the construction industry.\nIn 2022, founded XENCE Inc. with the aim of building a new construction industry that integrates the full supply chain, from upstream material sourcing to downstream construction, using digital technology and supply chain management.\nAt XENCE, he leads the development of architectural systems using unutilized timber and advances research on building components through Robotic Fabrication, working across design, construction, and operations with a focus on implementing Circular Architecture based on resource circulation.",
"aw": "リサーチデザインビルド共同プログラム 2022 / 日本空間デザイン賞 2022 / AND賞 2022 / iF DESIGN AWARD 2022 他",
"aw_en": "Research Design Build Joint Program 2022 / Japan Space Design Award 2022 / AND Award 2022 / iF Design Award 2022, and others",
"li": "https://www.linkedin.com/in/ozawa-kotaro-7b8582162/",
"x": "https://x.com/OzawaKotaro",
"ig": "https://www.instagram.com/kotaro_ozawa_/"
},
{
"name": "Asako Osedo",
"role": "Co-Director, Service Design Officer",
"img": "/assets/ao.jpg",
"jp": "大世渡 麻子",
"bio": "アクセンチュアのデザインマネジャーとして、資生堂やKDDIなどの新規サービス・プロダクトの立ち上げを支援。2023年に独立し、オランダを拠点に大学でのデザイン研究やスタートアップとの協業に従事。2025年にXENCEへ参画。\nXENCEでは、世の中に眠る未活用材を、社会的インパクトを生む規模で建築に活用することを目指し、事業開発とサービスデザインを推進している。",
"bio_en": "As a Design Manager at Accenture, Asako supported the launch of new products and services for major companies. In 2023, she became an independent designer based in the Netherlands, pursuing academic research in design and collaborating with startups. She joined XENCE in 2025.\nAt XENCE, she leads business development and service design, aiming to transform underutilized materials into scalable building solutions that create meaningful social impact.",
"aw": "Red Dot Design Award 2023, 2026 / iF Design Award 2023, 2026 / A' Design Award 2025 / グッドデザイン賞 2023 他",
"aw_en": "Red Dot Design Award 2023, 2026 / iF Design Award 2023, 2026 / A' Design Award 2025 / Good Design Award 2023, and others",
"li": "https://www.linkedin.com/in/asako-osedo-55a608142",
"x": "",
"ig": "https://www.instagram.com/asako_osedo/"
},
{
"name": "Koji Saito",
"role": "Lead Architect",
"img": "/assets/ks.jpg",
"jp": "斎藤 孝治",
"bio": "一級建築士。愛知県出身、名古屋大学にてファシリティマネジメントを専攻。\n卒業後、久米設計にて大手企業のオフィスや研究施設の設計に従事し、建築計画の立案や要件整理など、企業施設の計画・マネジメント業務を担当。\nXENCEでは、建物の運営や資産価値を長期的に高めるためのファシリティマネジメントの企画やロードマップの策定を担当し、建築の設計・施工だけでなく運営までを見据えた建築プロジェクトの推進に取り組んでいる。\n現在は名古屋大学助教として、ファシリティマネジメントと建築の関係について研究にも取り組んでいる。",
"bio_en": "Licensed Architect. From Aichi Prefecture, studied facility management at Nagoya University.\nAfter graduating, worked at a major corporation on the design of corporate offices and research facilities, handling architectural planning and requirements management for institutional clients.\nAt XENCE, he leads the development of facility management strategies and roadmaps aimed at enhancing long-term building performance and asset value, driving architectural projects that encompass not just design and construction but ongoing operations.\nCurrently also serves as an assistant professor at Nagoya University, conducting research on the relationship between facility management and architecture.",
"aw": "",
"aw_en": "",
"li": "",
"x": "",
"ig": ""
},
{
"name": "Akihiro Yamada",
"role": "Lead Construction Management",
"img": "/assets/ay.jpg",
"jp": "山田 晃大",
"bio": "一級施工管理技術士。福井県出身、名古屋工業大学建築学科卒業。\n大成建設にて建築の施工管理および現場マネジメントに従事したのち、neie設計にて木造住宅の現場監督として数十棟の新築木造住宅プロジェクトを担当し、木造建築の施工管理と品質管理の経験を積む。RC造、SRC・S造、木造の新規建築及びリノベーションにおいて多くの経験を持つ。\n2022年よりXENCEに参画。住宅プロジェクトの設計施工計画の策定や、建材・建築部材の技術開発プロジェクトを担当。\n2026年の株式会社化以降はLead Construction Managementとして、XENCEの建築プロジェクトにおける施工マネジメントを担い、設計・技術開発と連携した建築の実装を推進している。",
"bio_en": "Licensed Construction Management Engineer. From Fukui Prefecture, graduated from Nagoya Institute of Technology, Department of Architecture.\nAfter working in construction management and site supervision at Taisei Corporation, he served as site supervisor at neie design, overseeing dozens of new timber residential projects and building deep expertise in timber construction management and quality control. Experienced across RC, SRC, S, and timber construction for both new builds and renovation.\nJoined XENCE in 2022, taking charge of design-construction planning for residential projects and technical development of materials and building components.\nSince XENCE's incorporation in 2026, he has served as Lead Construction Management, overseeing construction management for XENCE's architectural projects and advancing implementation in coordination with design and technology development.",
"aw": "",
"aw_en": "",
"li": "",
"x": "",
"ig": ""
},
{
"name": "Kotaro Jin",
"role": "Architect",
"img": "/assets/kj.jpg",
"jp": "陣 昂太郎",
"bio": "東京都出身。名古屋大学工学部卒業。アトリエ系設計事務所にて住宅建築の設計に従事した後、XENCEに参画。\nXENCEでは建築設計を担当するとともに、BIMソフトを活用した設計プロセスの構築や、デジタルツインによる建築設計・プロジェクト管理の高度化に取り組んでいる。",
"bio_en": "From Tokyo. Graduated from Nagoya University, Faculty of Engineering. Worked on residential architecture design at an atelier-style architecture firm before joining XENCE.\nAt XENCE, he handles architectural design while also building BIM-integrated design workflows and advancing digital twin applications for project management and design precision.",
"aw": "",
"aw_en": "",
"li": "",
"x": "",
"ig": ""
},
{
"name": "Kosuke Kuroda",
"role": "Designer",
"img": "/assets/kk.jpg",
"jp": "黒田 晃佑",
"bio": "家具デザイナー/クリエイティブディレクター。\n前職の株式会社飛騨の森でクマは踊るでは、クレヨンから建築、メーカーの製品開発まで広く木の魅力を活かしたディレクション、デザイン、空間設計に携わる。映画が好きで、飛騨地域を中心とした映画の上映活動にも取り組んでいる。\nXENCEでは、木材を活用した建築・家具・プロダクトのデザインや製造に取り組んでいる。",
"bio_en": "Furniture Designer / Creative Director.\nAt his previous role at Hida no Mori de Kuma wa Odoru Co., Ltd., he directed and designed across a wide range, from crayons and architecture to manufacturer product development, drawing on the full appeal of wood. A film enthusiast, he is also involved in film screening activities centered around the Hida region.\nAt XENCE, he works on the design and production of wood-based architecture, furniture, and products.",
"aw": "日本空間デザイン賞 2023, 2025 / ウッドデザイン賞 2022",
"aw_en": "Japan Space Design Award 2023, 2025 / Wood Design Award 2022",
"li": "",
"x": "",
"ig": ""
},
{
"name": "Mako Sumi",
"role": "Community Manager",
"img": "/assets/ms.jpg",
"jp": "鷲見 真子",
"bio": "岐阜県出身。郡上市役所にて保健師に従事。\n2024年からコミュニティマネージャーとしてXENCEに参加。名古屋大学内のインキュベーション施設であるIdeaStoaの運営に従事。大学施設の最適なマネジメントと大学生の自主性に基づくイノベーションの創出やアントレプレナーシップの醸成に取り組む。またその他、ファシリティマネジメント事業について、運営のための基盤資料の作成や現場マネジメントを担当。",
"bio_en": "From Gifu Prefecture. Previously worked as a public health nurse at Gujo City Hall.\nJoined XENCE in 2024 as Community Manager. Manages operations at IdeaStoa, an incubation facility at Nagoya University. Works to optimize facility management and foster student-led innovation and entrepreneurship. Also handles facility management operations, including the creation of operational documentation and on-site management.",
"aw": "",
"aw_en": "",
"li": "",
"x": "",
"ig": ""
}
];
const KEYS = ['jp', 'bio', 'bio_en', 'aw', 'aw_en', 'li', 'x', 'ig'];
let cache = null;
export function loadPeople(timeout = 6000) {
  if (cache) return cache;
  cache = new Promise((resolve) => {
    const cb = '__xppl' + Date.now();
    const s = document.createElement('script');
    let done = false;
    const finish = (v) => { if (done) return; done = true; try { delete window[cb]; } catch (e) {} s.remove(); resolve(v); };
    window[cb] = (res) => {
      try {
        const rows = (res.table && res.table.rows) || [];
        const val = (c, i) => (c[i] ? (c[i].v == null ? '' : c[i].v) : '');
        const out = [];
        rows.forEach((r) => {
          const c = r.c || [];
          if (val(c, 0) !== true) return;
          const name = String(val(c, 2)).trim();
          if (!name) return;
          const img = String(val(c, 4)).trim();
          const base = PROFILES[name] || {};
          const p = { order: Number(val(c, 1)) || 999, name, role: String(val(c, 3)).trim(), img: img.startsWith('/') ? img : driveImg(img) };
          KEYS.forEach((k, j) => { const v = String(val(c, 5 + j)).trim(); p[k] = v || base[k] || ''; });
          out.push(p);
        });
        out.sort((a, b) => a.order - b.order);
        finish(out.length ? out : FALLBACK);
      } catch (e) { finish(FALLBACK); }
    };
    s.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?headers=1&sheet=people&tqx=responseHandler:${cb}&_=${Date.now()}`;
    s.onerror = () => finish(FALLBACK);
    setTimeout(() => finish(FALLBACK), timeout);
    document.head.appendChild(s);
  });
  return cache;
}
