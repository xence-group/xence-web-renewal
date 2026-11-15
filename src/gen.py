import json, re

B = {  # asset urls
 'hero': '/_blob/7c5f4db0ca472ab7e8c679ccecaac214', 'heroPoster': '/_blob/cfe346df0999bbdd3e11b10388cca3fd',
 'heroM': '/_blob/1e76272a0c8e66cee6f002da101617af', 'heroPosterM': '/_blob/3bc65aeb0f4795cc67fa8afdd8c8e44a', 'heroShellD': '/_blob/6ea631533f250d8cdfab3c504fee4550', 'heroShellM': '/_blob/631573d39db29ed854e91605cc84cc5a', 'heroV10D': '/_blob/8867be9629459f9e8118e550046de46b', 'heroV10M': '/_blob/3ef47860092a314dadff031d0433461b', 'hero4k': '/_blob/2856d4b0c55055b6971c5c6fd422b89a',
 'heroV4': '/_blob/7b5b07ca38a48bef5c46abc5f09cbca4',
 'heroV3': '/_blob/994cb5d41a833ead6596c5ca8e05a54c', 'bench3d': '/_blob/ca56ace82d3ef7e9f92cef742bbee2d2', 'bench3d_b': '/_blob/dd8ca0b169f796b4d3ff8f64703f056c',
 'heroV2': '/_blob/c762b279b87494dcfe6b5af8e9c06dd0', 'heroV2Poster': '/_blob/97aadf582b149f18913f994399a05c68',
 'reel': '/_blob/3e8d416840f25f03174a943bc4679ace', 'reelPoster': '/_blob/68f64b353b1ca4f706c185c3c280a1ea',
 'gh_day': '/_blob/45c3d30788ae58648396d08d369ba0ea', 'gh_interior': '/_blob/5d0beb28c6d23397abf23303671ac8c7',
 'gh_night_in': '/_blob/0caa39d0679323907c4e80b2b0d45d45', 'selfbuild': '/_blob/0827acd9c476292022b8142783bcd173',
 'team': '/_blob/1f8eb5c1c0e786e03b37748a2c385ae7', 'sawmill': '/_blob/c9667bbba9efbf3d19b31211ceeb1b7d',
 'grasshopper': '/_blob/c02732e5bbd93bf7d3cf5653bb91cfbe', 'model3d': '/_blob/03bd2c37ca241c464af4a619561e80a2',
 'joint': '/_blob/a4bbd6726f9ccecdfcf22ec97e91be01', 'tsite': '/_blob/6ac87887e326b32746dc6c1d325b2dc2',
 'table': '/_blob/2726743cbe18e8962c03389fd87a03a5', 'logs': '/_blob/96c11e44a63da5ae8feb2f98b49ee99b',
 'lca': '/_blob/32c9f334cd827a7516fcf09e4bbf49cc',
 't1': '/_blob/174dde0f3b21f60ea39180d3b4167fd3', 't2': '/_blob/885d7329b070ff1b488415113eced735', 't3': '/_blob/538c03eb81b170a1d21139352861653b',
 't4': '/_blob/40106d93cf7d02c42801e0b0483b7d61', 't5': '/_blob/ad063c4c9374549834de29d09593ccdc', 't6': '/_blob/47d97a62836e98aaf05bd2d9557b1ae7',
 'scale': '/_blob/1c7f068225be46db83bd2eba287580f0', 'scalePoster': '/_blob/cd7e1833210c5b378b301f715b73e4d3',
 'whyForest': '/_blob/66773f197849d4fbaddc565e4e64217e', 'whyLogs': '/_blob/6279775f3f4fb42920ca2717999e3d97', 'whyWaste': '/_blob/2f6f837b0adad80d0c23f691a92a90c2', 'joint2': '/_blob/116e27f5fe0fe1eb6b49ad94822a6d31', 'woodnode': '/_blob/855b9ad22c70078993518c179d7e6a4e', 'higashiura': '/_blob/6bc3d5268bbd9a9dd809c9560f45a34b', 'wfbench': '/_blob/1a3534db213e2ee00bbaa8ddc3d3b88f', 'arch': '/_blob/32bbb3912f8050b6d0d5529ab994e594', 'house': '/_blob/cd7e1833210c5b378b301f715b73e4d3', 'bench': '/_blob/bc7a3f7fa89d244d44ff358e5763976a', 'chashitsu': '/_blob/b9b66c6a693bba44881dedec2a10f9be', 'proto': '/_blob/1b488a6d81d5789c8367e802f0821e19',
}

JA = dict(
 lang='ja', title='XENCE — 規格外資源を、建築に。', font="'Zen Kaku Gothic New', sans-serif",
 heroAria='森、丸太、製材所、設計データ、建方、木組み、完成した温室をつなぐ映像',
 eyebrow='OUR MISSION', h1a='「建てて終わり」を、', h1b='終わらせる。', tag='Waste in. Assets out.',
 heroBody='端材、大径木、解体材、木粉。建設が使えずに手放してきた規格外の資源を、XENCEは建築に変えます。設計・施工・運用をひとつのデジタルデータでつなぎ、建てた後も記録し、運用し、次の建築へ循環させます。',
 mq=['Red Dot Design Award 2026','グッドデザイン賞 2025','ウッドデザイン賞 2025','Computational Design','Structural Analysis','Digital Fabrication','3D Printing','Material Passport','Whole-life Carbon','Nagoya ／ Düsseldorf'],
 whyH='デジタル技術で、あらゆる資源を<br>未来に残る建築の資産に。',
 stats=[('約40%','丸太のうち、一般的な製材で建材になる割合。残りは燃料・チップ・廃棄へ回る。'),('553万t','国内で毎年出る建設発生木材。そのうち96.2%がチップや燃料として処理されている。'),('35%+','EUの廃棄物のうち建設由来の割合。採取される資源の約半分は建設に使われている。')],
 statsNote='出典は「数字で見るXENCE」の計算根拠を参照',
 imgLogs='雪の積もる土場に積まれた丸太', wc1='森の資源', wc2='規格外として残る丸太', wc3='捨てられていく資源', wa1='上空から見た森と林道', wa2='断面も太さも不揃いな丸太の山', wa3='埋立地に積み上がる廃棄物', imgSaw='製材所で端材を手にする職人',
 modelH='規格外資源を、建築に。<br>建築を、社会の資産に。',
 modelLead='XENCEは設計も施工も自社で行い、建てた施設の指定管理・運営まで担います。そこで得たデータを技術開発に戻し、次の建築をより速く、確かにする。<b>ひとつの建築から、素材・建築・データの3つの収益が生まれます。</b>',
 cols=[('DESIGN','設計','一級建築士事務所として、温室・住宅・施設を設計する。'),('BUILD','施工','規格外の材を自社で加工し、組み上げる。'),('OPERATE','指定管理','建てた施設を運営・管理し、データを残す。'),('R&amp;D','技術開発','自動設計・構造解析・Passportを自社で開発する。')],
 fly=['設計','施工','指定管理','技術開発'], flyCap='設計・施工・指定管理を一社で行い、そこで得たデータを技術開発に戻す。回るほど、次の建築が速く確かになる。',
 techH='規格外を、<br>標準にするデジタル技術。', techLead='自社で開発したツールで、設計・施工・運用をひとつのデータでつなぎます。',
 techAria='技術', reelAria='自動設計、構造解析、形状変換のモーショングラフィック',
 cfgH='サーキュラー木造温室™を、<br>ここで設計してみる。', cfgLead='自動設計エンジンの体験版です。条件を変えると構造と数量がその場で変わります。「分解する」で部材を整列させ、何本の立木から製材されたかも確かめられます。',
 lLen='奥行き', lSpan='間口', lUnits='連棟', sMem='部材数', sArea='床面積', sVol='製材品の量', sCo2='炭素貯蔵量',
 treesH='この温室の製材品を、立木に換算すると', trConv='従来の製材（歩留まり約40%）', trX='XENCE（利用率約95%）', trUnit='本', co2Eq='炭素貯蔵量はスギ立木 約',
 co2EqU='本分', cfgNote='※ 体験用の簡易モデルで、断面は仮定値です。スギの容積密度0.314 t/m³・炭素含有率0.5、立木1本の幹材積0.56 m³、スギ1本のCO₂蓄積0.505 tで換算しています。',
 svgAria='設定に応じて変わる温室フレームの図。分解すると部材が種類ごとに整列する',
 modH='ジョイントから建築まで、<br>ひとつのモジュールで拡張する。',
 modLead='XENCEの設計単位は、建物ではなくジョイントです。不揃いな材をつなぐ同じ接合ルールを、家具・プロダクト、温室、建築へとデジタルに組み上げていきます。大きさが変わっても、設計・加工・記録のデータは一本でつながっています。',
 mods=[('joint2','01 — JOINT · 0.1 m','ジョイント','製材所の耳材を、金属3Dプリントのジョイントでつなぐ。トポロジー最適化で材ごとに形を変え、ボルトを外せば分解して再利用できる。すべての基本単位。','耳付きの板材4枚を放射状につなぐ金属3Dプリントのジョイント'),('tsite','02 — PRODUCT · 1 m','家具・プロダクト','同じジョイントで什器を組む。祭りの提灯スタンドが、そのままベンチに組み替わる。','代官山T-SITEの提灯スタンド'),('gh_interior','03 — GREENHOUSE · 10 m','温室','モジュールを連ねて温室に。80㎡から数haまで、設計ルールを変えずに広げる。','サーキュラー木造温室の内部と木製トラス'),('arch','04 — ARCHITECTURE · 12 m','建築','住宅も同じジョイントのルールとデータで設計する。柱・梁の接合まで一本のデータでつながり、分解すれば次の建築の材料になる。','XENCEが設計する木造住宅の外観パース')],
 scaleAria='ジョイントが家具、温室、建築へと拡張していくモーショングラフィック',
 projH='プロジェクト', fAria='種類で絞り込み', asideAria='選択中のプロジェクト', noPhoto='[写真 準備中]',
 th=['No.','Project','Type','Input','年'], dType='種類', dInput='素材', dTech='技術', dPlace='場所', dYear='年', dStatus='状況',
 impH='数字で見るXENCE', impLead='実績値と目標値を分けて表示しています。すべての数字に計算式と出典を付けています。',
 imp=[('40→95%','原木1m³あたりの木材利用率。一般的な製材と、XENCEの設計・加工プロセスの比較。','実績値'),('840 t','木造温室1haあたりの炭素固定量（CO₂換算、躯体・建設時）。','算定値'),('99.8 t','XENCEがLCA算定した建物（木材126.9 m³）の炭素貯蔵量。スギ立木 約198本分。','算定値'),('−19%','同じ建物のホールライフカーボン104.6 kg-CO₂e/㎡。事務所の平均値129 kgとの比較。','算定値'),('610 kg','端材・木粉から製造し、納入した木粉樹脂ペレット。','実績値'),('11.5万 t','製材所200社・年20万m³を建築に流したときの年間炭素貯蔵量（CO₂換算）。','目標値')],
 basisSum='計算根拠と出典を見る',
 basis=['<b>木材利用率 40%→95%</b>：一般的な製材の歩留まり約4割に対し、XENCEは端材・曲がり材・木粉まで設計・加工で使い切る。出典：2027愛知環境賞 応募概要（XENCE, 2026年9月）。',
  '<b>840 t-CO₂e/ha</b>：木造温室の躯体について One Click LCA で建設時（A1–A3）のCO₂インパクトを算定。ISO 14040/44・GHG Protocol・IPCCガイドライン準拠。1㎡あたり84 kg。出典：サーキュラー木造温室ご説明資料（2026年5月）。',
  '<b>東浦町の温室（2棟・130㎡）</b>：130㎡ × 0.084 t/㎡ ＝ 約10.9 t-CO₂e の固定を見込む（建設中）。',
  '<b>99.8 t-CO₂</b>：大冷工業 四日市支店 YOUR BASE の工事内訳書から木材126.9 m³を抽出。炭素貯蔵量 ＝ 体積 × 気乾密度 ÷（1＋含水率）× 炭素含有率0.5 × 44/12（樹種別に集計）。スギ1本のCO₂蓄積0.505 t（林野庁）で割り約198本。出典：木材使用量算出表（2026年8月）。',
  '<b>−19%</b>：同建物のホールライフカーボンを J-CAT で104.6 kg-CO₂e/㎡と算定。慶應義塾大学 伊香賀研究室のケーススタディによる事務所平均129 kgと比較し、1 − 104.6 ÷ 129 ＝ 18.9%。出典：LCA算定報告資料（2026年10月）。',
  '<b>610 kg</b>：竹中工務店・倉敷紡績と共同開発した木粉樹脂ペレットの納入量（2025年7月）。',
  '<b>11.5万 t-CO₂/年（目標）</b>：200,000 m³ × スギ容積密度0.314 t/m³ × 炭素含有率0.5 × 44/12 ＝ 115,133 t。製材所200社との連携を前提にした目標値。',
  '<b>市場の数字</b>：国内の建設発生木材553万t/年・チップ/燃料化96.2%、EUの廃棄物の35%超が建設由来・採取資源の約50%が建設向け（欧州委員会）、国内の製材所 約3,500。出典：XENCE TECHPLANTER 2026 資料ほか。',
  '<b>約1,110億円（市場の試算）</b>：国内の施設園芸37,000 ha（うちガラス温室1,478 ha）の1%＝370 ha＝370万㎡。× サーキュラー木造温室™の㎡単価3万円 ＝ 1,110億円。単価の出典：サーキュラー木造温室ご説明資料（2026年5月）。',
  '<b>2028年度・建築物LCA</b>：改正建築物省エネ法が2026年7月に公布。国交省は2028年度を目標に建築物のライフサイクルカーボン評価制度を始める方針で、5,000㎡以上の事務所に届出を義務化する予定（2,000㎡以上は説明義務を検討）。',
  '<b>建設投資81兆円</b>：国土交通省「令和8年度（2026年度）建設投資見通し」（2026年8月31日公表）。2026年度の建設投資は約81兆円の見通し。'],
 groH='XENCEが、社会に<br>価値を出し続けられる理由。', groLead='「建てて終わり」を終わらせるには、その仕組み自体が続かなければなりません。XENCEがそれを続けられる理由は、次の6つです。',
 gro=[('01','建てた後も、建築が価値を生み続けるから','XENCEは竣工後も、材の履歴・CO₂・運用データを記録し、施設の運営まで担う。記録が残っている建物は、解体するときに次の建築の材料リストになる。そのため一棟の価値は竣工で終わらず、XENCEの収益も工事の一度で終わらない。'),('02','同じ設計ルールで、何度でもつくれるから','サーキュラー木造温室™は、接合と部材の割付をルール化したパッケージ商品である（㎡3万円〜、1,000㎡で約3,500万円）。案件ごとに設計をつくり直さないため、件数が増えるほど1件あたりの設計工数が下がり、より多くの場所に届けられる。'),('03','足りないのは資源ではなく、使う仕組みだから','国内では毎年553万tの建設発生木材が出て、その96.2%がチップや燃料になる。丸太も一般的な製材では約4割しか建材にならない。XENCEは不揃いな材をデジタルで設計・加工できるため、材の利用率を約95%まで上げられる。'),('04','受け止める市場が大きいから','国内の施設園芸は37,000 haあり、そのうちガラス温室は1,478 haにとどまる。1%（370 ha）を木造温室に置き換えるだけで、㎡3万円で約1,110億円の需要になる。温室は、規格外の材を最初に量で受け止められる出口になる。'),('05','社会のルールが、記録できる建築を求め始めたから','改正建築物省エネ法（2026年7月公布）にもとづき、国は2028年度に建築物のLCA評価制度を始める方針で、5,000㎡以上の事務所には届出義務を予定している。EUでもデジタルプロダクトパスポートの導入が進む。XENCEはJ-CATによる算定とMaterial Passportをすでに実務で運用しているため、制度が求める記録を始まった時点から出せる。'),('06','森も工場も持たずに広げられるから','XENCEは森林も製材工場も所有しない。全国約3,500の製材所（プレカット・製材で約1.4兆円の市場）と地域の工務店を、在庫データと設計データでつなぐ。設備投資に縛られないため、地域を増やしても同じ仕組みのまま広がる。')],
 mkt=[('37,000 ha','国内の施設園芸面積（ガラス温室は1,478 ha）'),('約1,110億円','その1%を木造温室に置き換えた場合（㎡3万円）'),('1.4兆円','国内のプレカット・製材市場。XENCEの調達先'),('2028年度','国の建築物LCA評価制度の開始目標')],
 rec=['Red Dot Design Award 2026','グッドデザイン賞 2025','ウッドデザイン賞 2025','名古屋大学発ベンチャー','愛知県 革新事業創造事業費補助金 採択','協業：竹中工務店／CCC（代官山T-SITE）'],
 recH='評価と協業',
 studio='建築士、エンジニア、研究者、運営チーム。名古屋とデュッセルドルフから。', peopleH='People',
 cH='国内の建設投資81兆円が<br>循環に変われば、<br>世界はもっと循環する。',
 cards=[('建てたい・置きたい','温室、宿、住宅、什器の設計施工 →'),('資源を活かしたい','製材所・解体事業者・自治体の方 →'),('技術で組みたい','企業・大学・海外パートナーの方 →'),('投資・事業提携','投資家・事業会社の方 →')],
 foot1='株式会社XENCE ／ XENCE一級建築士事務所<br>愛知県知事登録（い－4）第14198号', foot2='Nagoya — 愛知県名古屋市中区栄1-29-29 SIMON 10 SAKAE 401<br>Düsseldorf — Germany',
)

EN = dict(
 lang='en', title='XENCE — Waste in. Assets out.', font="Montserrat, 'Zen Kaku Gothic New', sans-serif",
 heroAria='Film: forest, logs, sawmill, design data, assembly, joinery and the finished greenhouse',
 eyebrow='OUR MISSION', h1a='Waste in.', h1b='Assets out.', tag='Ending build-and-forget.',
 heroBody='Offcuts. Oversized logs. Demolition timber. Sawdust. XENCE turns the materials construction rejects into architecture — then keeps every piece tracked, operated and ready for its next life, on one digital thread from design to fabrication to operation.',
 mq=['Red Dot Design Award 2026','Good Design Award 2025','Wood Design Award 2025','Computational Design','Structural Analysis','Digital Fabrication','3D Printing','Material Passport','Whole-life Carbon','Nagoya ／ Düsseldorf'],
 whyH='Digital technology that turns every resource<br>into architecture that lasts — and keeps its value.',
 stats=[('~40%','of a log becomes building material at a typical sawmill. The rest is burned, chipped or dumped.'),('5.53 Mt','of construction timber waste every year in Japan — 96.2% of it ends up as chips or fuel.'),('35%+','of all EU waste comes from construction, which consumes about half of every material we extract.')],
 statsNote='Sources: see “XENCE in numbers” below',
 imgLogs='Snow-covered logs stacked at a timber yard', wc1='THE FOREST', wc2='LOGS LEFT AS NON-STANDARD', wc3='RESOURCES THROWN AWAY', wa1='Aerial view of a forest and logging road', wa2='A stack of irregular logs', wa3='Waste piled at a landfill', imgSaw='A sawmill worker holding an offcut',
 modelH='Non-standard in.<br>Long-term value out.',
 modelLead='XENCE designs and builds, then runs and manages what it builds. The data from every site goes back into our technology, so each building is faster and more certain than the last. <b>One building, three revenue streams: material, architecture, data.</b>',
 cols=[('DESIGN','Design','A licensed architecture office designing greenhouses, homes and facilities.'),('BUILD','Build','We fabricate non-standard timber in-house and put it up ourselves.'),('OPERATE','Operate','We run and manage what we build — and keep its data.'),('R&amp;D','Technology','Design engine, structural analysis and Material Passport, built in-house.')],
 fly=['Design','Build','Operate','R&amp;D'], flyCap='Design, build and operation in one company, with the data fed back into R&amp;D. The more it turns, the faster and surer the next building.',
 techH='Digital tools that make<br>the non-standard standard.', techLead='Software we write ourselves links design, fabrication and operation into a single stream of data.',
 techAria='Technologies', reelAria='Motion graphic: design engine, structural analysis and shape conversion',
 cfgH='Design a Circular Timber Greenhouse™.<br>Right here.', cfgLead='A lightweight build of our design engine. Change the inputs and the structure recalculates live. Hit “Take it apart” to see the kit of parts — and how many trees it took.',
 lLen='Length', lSpan='Span', lUnits='Linked units', sMem='Members', sArea='Floor area', sVol='Lumber volume', sCo2='Carbon stored',
 treesH='The lumber in this greenhouse, counted in standing trees', trConv='Conventional sawmilling (~40% yield)', trX='XENCE (~95% utilisation)', trUnit='trees', co2Eq='Carbon stored ≈',
 co2EqU='standing cedars', cfgNote='Simplified demo model with assumed sections. Japanese cedar: density 0.314 t/m³, carbon fraction 0.5; 0.56 m³ of stem per standing tree; 0.505 t CO₂ stored per tree.',
 svgAria='Greenhouse frame that updates with your settings; taken apart, the members line up by type',
 modH='From joint to building,<br>one module scales.',
 modLead='Our unit of design isn’t the building — it’s the joint. The same connection rules that join irregular timber assemble furniture, greenhouses and architecture, scaled up in software. At every size, design, fabrication and record data stay one continuous thread.',
 mods=[('joint2','01 — JOINT · 0.1 m','The joint','Sawmill offcuts meet at a metal 3D-printed node, topology-optimised to fit each piece. Unbolt it and everything comes apart for reuse. The base unit of everything.','Metal 3D-printed node joining four waney-edged boards'),('tsite','02 — PRODUCT · 1 m','Furniture & product','The same joint builds furniture. A festival lantern stand reassembles straight into a bench.','Lantern stands at Daikanyama T-SITE'),('gh_interior','03 — GREENHOUSE · 10 m','Greenhouse','Modules link into greenhouses — from 80 m² to several hectares, without changing the rules.','Inside the Circular Timber Greenhouse'),('arch','04 — ARCHITECTURE · 12 m','Architecture','Houses are designed on the same joint rules and data, down to every post-and-beam connection. Take one apart and it becomes material for the next building.','Exterior rendering of a timber house designed by XENCE')],
 scaleAria='Motion graphic: a joint scaling up to furniture, greenhouses and buildings',
 projH='Projects', fAria='Filter by type', asideAria='Selected project', noPhoto='[Photo coming soon]',
 th=['No.','Project','Type','Input','Year'], dType='Type', dInput='Input', dTech='Technology', dPlace='Location', dYear='Year', dStatus='Status',
 impH='XENCE in numbers', impLead='Results and targets are labelled separately. Every figure comes with its formula and source.',
 imp=[('40→95%','Share of each log put to use — conventional sawmilling vs. XENCE’s design-to-fabrication process.','Result'),('840 t','CO₂e locked in per hectare of timber greenhouse (structure, embodied stage).','Assessed'),('99.8 t','CO₂ stored in a building we assessed (126.9 m³ of timber) — about 198 standing cedars.','Assessed'),('−19%','Whole-life carbon of that building, 104.6 kg CO₂e/m², against an office average of 129.','Assessed'),('610 kg','Wood-flour resin pellets made from offcuts and delivered.','Result'),('115 kt','CO₂ stored per year once 200 sawmills route 200,000 m³ into buildings.','Target')],
 basisSum='Show formulas and sources',
 basis=['<b>Utilisation 40% → 95%</b>: conventional sawmilling turns about 40% of a log into product; XENCE’s design and fabrication process uses offcuts, crooked stock and sawdust. Source: Aichi Environment Award 2027 application (XENCE, Sep 2026).',
  '<b>840 t CO₂e/ha</b>: embodied impact (A1–A3) of the greenhouse structure, calculated in One Click LCA in line with ISO 14040/44, the GHG Protocol and IPCC guidelines — 84 kg per m². Source: Circular Timber Greenhouse brochure (May 2026).',
  '<b>Higashiura greenhouses (2 units, 130 m²)</b>: 130 m² × 0.084 t/m² ≈ 10.9 t CO₂e expected (under construction).',
  '<b>99.8 t CO₂</b>: 126.9 m³ of timber extracted from the bill of quantities for Dairei Kogyo’s YOUR BASE, Yokkaichi. Storage = volume × air-dry density ÷ (1 + moisture content) × carbon fraction 0.5 × 44/12, by species. Divided by 0.505 t CO₂ per cedar (Forestry Agency) ≈ 198 trees. Source: timber quantity sheet (Aug 2026).',
  '<b>−19%</b>: whole-life carbon of the same building, 104.6 kg CO₂e/m² in J-CAT, against an office average of 129 kg from Keio University’s Ikaga Lab case studies: 1 − 104.6 / 129 = 18.9%. Source: LCA report (Oct 2026).',
  '<b>610 kg</b>: wood-flour resin pellets co-developed with Takenaka Corporation and Kurabo, delivered July 2025.',
  '<b>115 kt CO₂/yr (target)</b>: 200,000 m³ × cedar density 0.314 t/m³ × carbon fraction 0.5 × 44/12 = 115,133 t. Assumes partnerships with 200 sawmills.',
  '<b>Market figures</b>: 5.53 Mt/yr of construction timber waste in Japan, 96.2% chipped or burned; construction is 35%+ of EU waste and ~50% of extracted material (European Commission); ~3,500 sawmills in Japan. Source: XENCE TECHPLANTER 2026 deck and cited references.',
  '<b>¥111bn (market estimate)</b>: 1% of Japan’s 37,000 ha of protected cultivation = 370 ha = 3.7 million m², × ¥30,000 per m² for the Circular Timber Greenhouse™ = ¥111bn. Unit price: Circular Timber Greenhouse brochure (May 2026).',
  '<b>FY2028 building LCA</b>: Japan’s revised Building Energy Efficiency Act was promulgated in July 2026. MLIT aims to launch a whole-life carbon assessment scheme in FY2028, with mandatory filing for offices over 5,000 m² (an explanation duty for 2,000 m²+ is under discussion).',
  '<b>¥81tn construction</b>: MLIT, FY2026 construction investment outlook (published 31 Aug 2026): about ¥81 trillion.'],
 groH='Why XENCE keeps<br>creating value.', groLead='Ending build-and-forget only works if the model itself keeps going. Here are six reasons it does.',
 gro=[('01','Buildings keep producing value after handover','After completion, XENCE keeps recording each building’s material history, carbon and operating data, and runs the facility. Because that record exists, the building becomes the bill of materials for the next one when it comes down. Its value doesn’t end at handover — and neither does our revenue.'),('02','One rule set, built again and again','The Circular Timber Greenhouse™ is a package built on fixed joint and member rules, from ¥30,000 per m² (about ¥35m for 1,000 m²). We don’t redesign from scratch each time, so design effort per project falls as volume rises — and we reach more places.'),('03','The resource exists. The system to use it doesn’t — yet','Japan produces 5.53 Mt of construction timber waste a year, and 96.2% of it is chipped or burned. A typical sawmill turns only about 40% of a log into building material. XENCE designs and fabricates irregular stock digitally, lifting utilisation to about 95%.'),('04','A market big enough to absorb it','Japan has 37,000 ha under protected cultivation, only 1,478 ha of it glass. Converting just 1% (370 ha) to timber greenhouses at ¥30,000 per m² means ¥111bn of demand. Greenhouses are the first outlet that can take non-standard timber at volume.'),('05','The rules now ask for traceable buildings','Under Japan’s revised Building Energy Efficiency Act (July 2026), a building LCA scheme is planned for FY2028, with mandatory filing for offices over 5,000 m². The EU is introducing Digital Product Passports. XENCE already runs J-CAT assessments and Material Passports in practice, so it can deliver the records these rules require from day one.'),('06','Growth without forests or factories','XENCE owns no forests and no mills. It links Japan’s ~3,500 sawmills — a ¥1.4tn precut and sawmilling market — and local builders through inventory and design data. With no plant to fund, each new region runs on the same system.')],
 mkt=[('37,000 ha','Protected cultivation in Japan (1,478 ha of glass)'),('¥111bn','If 1% converts to timber greenhouses at ¥30,000/m²'),('¥1.4tn','Japan precut & sawmilling — our supply base'),('FY2028','Target start of Japan’s building LCA scheme')],
 rec=['Red Dot Design Award 2026','Good Design Award 2025','Wood Design Award 2025','Nagoya University startup','Aichi Prefecture innovation grant','Partners incl. Takenaka Corporation, CCC'],
 recH='Recognition & partners',
 studio='Architects, engineers, researchers and operators. From Nagoya and Düsseldorf.', peopleH='People',
 cH='If Japan’s ¥81tn construction<br>economy goes circular,<br>the world turns with it.',
 cards=[('Build with us','Greenhouses, guesthouses, homes and furniture →'),('Supply materials','For sawmills, demolition firms and municipalities →'),('Partner on R&amp;D','For companies, universities and international partners →'),('Invest','For investors and strategic partners →')],
 foot1='XENCE Inc. ／ XENCE First-class Architect Office<br>Registered in Aichi Prefecture (I-4) No. 14198', foot2='Nagoya — SIMON 10 SAKAE 401, 1-29-29 Sakae, Naka-ku, Nagoya, Japan<br>Düsseldorf — Germany',
)

TECH = {
 'ja': [
  ('01','自動設計エンジン','COMPUTATIONAL DESIGN','手元の材の寸法と数から、構造と部材の割付を自動で生成する。温室・家具・パビリオンを同じルールで設計できる。','t1','不揃いな在庫材を、フレームの部材へ自動で割り当てる','在庫材が温室フレームの部材に割り当てられていくアニメーション',True),
  ('02','3D構造解析','STRUCTURAL ANALYSIS','積雪と風の荷重を3Dフレーム全体にかけ、変形と部材ごとの検定比を確かめる。規格外の材でも構造に使える根拠をつくる。','t2','積雪・風荷重による3Dフレームの変形と、部材ごとの検定比（イメージ）','温室の3Dフレームが積雪と風で変形し、部材が検定比に応じて色分けされるアニメーション',True),
  ('03','デジタル加工と接合','FABRICATION','不整形な材をスキャンし、曲がりや木目、耳をそのまま活かす形で部材と継手を割り付ける。金物に頼らない木組みで組み上げ、分解もできる。','t3','曲がった耳材をスキャンし、材の曲がりに沿って部材と継手を割り付ける','曲がった板材をスキャンし、その曲線に沿った部材と加工パスを生成するアニメーション',True),
  ('04','3Dプリント','ADDITIVE MANUFACTURING','自由な形を、積層できる向きに起こし、張り出しの角度を検出して積層できる形状へ自動で調整してから造形する。金属（WAAM）のほか、樹脂や木粉複合材にも同じ流れで対応する。','t4','曲面を90度起こし、張り出しを検出して積層できる形に自動調整してから、下から積み上げる（金属WAAMの例）','曲面が90度回転し、造形台の上に下から層を積み上げていくアニメーション',True),
  ('05','Material Passport','TRACEABILITY','伐採・運搬・製材・乾燥・加工・建物まで、材の履歴とCO₂をひとつのQRコードに記録し、次の利用へ受け継ぐ。2026年10月に運用開始。','t5','森から建物まで、履歴とCO₂がひとつのQRコードに積み上がる（記録例）','森、トレーラー、製材所、乾燥、加工、建物の順に記録が加わるQRコード付きパスポートのアニメーション',True),
  ('06','LCA・運用データ','WHOLE-LIFE CARBON','建物の生涯CO₂をJ-CATやOne Click LCAで算定し、運用データとあわせて資産価値の根拠にする。','t6','木造温室の炭素固定、J-CATによるホールライフカーボン、キャンパスの施設費分析','炭素固定量、ライフサイクルCO2の内訳、施設費の内訳が順に表示されるアニメーション',True)],
 'en': [
  ('01','Design engine','COMPUTATIONAL DESIGN','Feed in what’s actually available — lengths, sections, quantities — and the engine generates the structure and every cut. One rule set designs greenhouses, furniture and pavilions.','t1','Irregular stock automatically allocated to frame members','Animation of inventory boards being allocated to a greenhouse frame',True),
  ('02','Structural analysis','STRUCTURAL ANALYSIS','Snow and wind loads are run across the full 3D frame, checking deflection and utilisation member by member — the evidence that non-standard material can carry real loads.','t2','Snow and wind load cases on the 3D frame, utilisation per member (illustrative)','Animation of a greenhouse frame deflecting under snow and wind, members coloured by utilisation',True),
  ('03','Digital fabrication','FABRICATION','We scan irregular stock and shape each member around its curve, grain and waney edge instead of cutting them away. Timber joints lock it together — no steel hardware, fully demountable.','t3','A curved board scanned, and a member shaped to follow its curve','Animation of a curved board being scanned and a member and toolpath following its shape',True),
  ('04','3D printing','ADDITIVE MANUFACTURING','Free-form geometry is stood up, checked for overhangs and automatically reshaped to be printable before slicing. Shown here in steel (WAAM); the same pipeline runs resin and wood composite.','t4','Stood up, checked for overhangs, auto-adjusted to be printable, then built bottom-up (steel WAAM example)','Animation of a curved surface rotating upright and being printed layer by layer',True),
  ('05','Material Passport','TRACEABILITY','Felling, haulage, sawing, drying, fabrication, building: each step adds its history and carbon to one QR code that travels with the piece into its next use. Live since October 2026.','t5','History and carbon build up in one QR code, forest to building (sample record)','Animation of a QR passport collecting records from forest, trailer, sawmill, kiln, fabrication and building',True),
  ('06','LCA & operating data','WHOLE-LIFE CARBON','We calculate whole-life carbon with J-CAT and One Click LCA, then pair it with operating data to evidence a building’s value as an asset.','t6','Greenhouse carbon storage, whole-life carbon in J-CAT, and campus facility-cost analytics','Animation showing carbon storage, lifecycle carbon breakdown and facility cost breakdown',True)]}

# id, cat, img, ja(title,type,input,tech,place,year,status,desc), en(...)
PROJ = [
 ('p1','gh','gh_night_in',('サーキュラー木造温室™','温室','製材端材','自動設計・構造解析','三重県','2025','完成','製材所の端材を構造に使った木造温室。全部材を分解・再組立でき、連棟で面積を広げられる。Red Dot Design Award 2026 受賞。'),('Circular Timber Greenhouse™','Greenhouse','Sawmill offcuts','Design engine · Analysis','Mie','2025','Completed','A timber greenhouse whose structure is built from sawmill offcuts. Fully demountable; units link together to scale. Red Dot Design Award 2026.')),
 ('p2','gh','higashiura',('東浦町 セルフビルド温室（2連棟・130㎡）','温室','製材端材','自動設計・デジタル加工','愛知県東浦町','2026','建設中','林業用苗木・イチゴ・トマトの3ゾーンをもつ温室を、番号付きの部材で、使う人たち自身が組み上げる。'),('Self-build greenhouse, Higashiura (2 units, 130 m²)','Greenhouse','Sawmill offcuts','Design engine · Fabrication','Higashiura, Aichi','2026','Under construction','A three-zone greenhouse — forestry seedlings, strawberries, tomatoes — raised with numbered parts by the people who will farm it.')),
 ('p3','fu','tsite',('代官山T-SITE 提灯スタンド ⇄ ベンチ','家具・プロダクト','製材端材','デジタル加工・Passport','東京','2026','完成','夏祭りの提灯スタンドを、祭りの後にベンチへ組み替えた。金物を使わない木製ジョイントで、全部材にMaterial Passportを発行。'),('Lantern stand ⇄ bench, Daikanyama T-SITE','Furniture','Sawmill offcuts','Fabrication · Passport','Tokyo','2026','Completed','Lantern stands for a summer festival, reassembled into benches once it ended. No steel hardware — and a Material Passport for every part.')),
 ('p4','fu','table',('名古屋大学 C-TECs 新素材什器','家具・プロダクト','新素材 [要確認]','デジタル加工','名古屋','2026','納品済','名古屋大学 未来社会創造機構の交流スペースのために製作した什器。[素材・仕様を記入]'),('New-material furniture, Nagoya University C-TECs','Furniture','New material [confirm]','Fabrication','Nagoya','2026','Delivered','Furniture for the exchange space at Nagoya University’s Institute of Innovation for Future Society. [Add material and spec]')),
 ('p11','fu','bench3d',('3Dプリントベンチ','家具・プロダクト','金属','金属3Dプリント（WAAM）','愛知県','2025','完成','形状を積層用に自動変換し、WAAMで一体造形したベンチ。座面の格子と脚のリブまで、ひと続きの金属で積み上げている。'),('3D-printed bench','Furniture','Steel','Metal 3D printing (WAAM)','Aichi','2025','Completed','A bench re-sliced for WAAM and printed in one continuous piece of steel — lattice seat and ribbed legs included.')),
 ('p12','ar','woodnode',('端材を建築にするジョイント（WoodNode）','建築','耳材・端材','金属3Dプリント・トポロジー最適化','[場所]','2024','完成','製材所で出る耳材を構造に使うための建築ジョイント。材ごとに違う形に合わせて金属3Dプリントで造形し、トポロジー最適化で強度と軽さを両立した。竹中工務店・シモダフランジ・野地木材工業と協働。アーバンインフラ・テクノロジー推進会議 優秀賞。'),('WoodNode — a joint that turns offcuts into architecture','Architecture','Sawmill offcuts','Metal 3D printing · Topology optimisation','[Location]','2024','Completed','A structural joint that lets sawmill offcuts carry loads. Each node is metal 3D-printed to fit its pieces and topology-optimised for strength and low weight. With Takenaka Corporation, Shimoda Flange and Noji Lumber. Excellence Award, Urban Infrastructure Technology Promotion Conference.')),
 ('p7','ar','arch',('大径木の家','建築','大径木','構造解析・デジタル加工','東京都','2026','施工中','流通しにくい大径木を、組立梁として構造に使う住宅。'),('House of large-diameter logs','Architecture','Large-diameter logs','Analysis · Fabrication','Tokyo','2026','Under construction','A house that puts hard-to-sell large-diameter logs to work as built-up structural beams.')),
 ('p8','ma','wfbench',('木粉樹脂ペレット（竹中工務店・倉敷紡績と共同開発）','素材・データ','端材・木粉','素材開発','東京・日本橋で採用','2025','610 kg 納入','エンジニアリングウッドの端材を木粉にし、生分解性樹脂や再生PPと混ぜて成形材料にした。'),('Wood-flour resin pellets (with Takenaka and Kurabo)','Material & data','Offcuts · Wood flour','Materials R&D','Adopted in Nihonbashi, Tokyo','2025','610 kg delivered','Engineered-wood offcuts milled to flour and compounded with biodegradable resin or recycled PP into a mouldable material.')),
]
FILT = {'ja': [('all','すべて'),('fu','家具・プロダクト'),('gh','温室'),('ar','建築'),('ma','素材・データ')],
        'en': [('all','All'),('fu','Furniture'),('gh','Greenhouse'),('ar','Architecture'),('ma','Material & data')]}
KINDS = {'ja': {'col':'柱','raf':'合掌','tie':'陸梁','beam':'桁・母屋','sill':'土台','brace':'筋かい'},
         'en': {'col':'Posts','raf':'Rafters','tie':'Ties','beam':'Beams & purlins','sill':'Sills','brace':'Braces'}}
UI = {'ja': {'explode':'分解する','assemble':'組み立てる','unit':'棟','units':'棟'}, 'en': {'explode':'Take it apart','assemble':'Put it back together','unit':' unit','units':' units'}}

NEWS = [
 ('2026/10/23','9LhNPbQ0','「未活用材をどれだけ使えたか」代官山T-SITEにて木材トレーサビリティの試験運用を開始','Daikanyama T-SITE begins a timber traceability trial: how much unused wood was put to use'),
 ('2026/9/11','_kRFwB8a','代官山T-SITE「爽涼祭」に、端材から生まれた提灯台が登場','Lantern stands made from offcuts at Daikanyama T-SITE’s summer festival'),
 ('2026/7/22','9VckaqYJ','日経木材新聞にて「サーキュラー木造温室®︎」をご紹介いただきました','Circular Timber Greenhouse® featured in the Nikkei Mokuzai Shimbun'),
 ('2026/6/30','260630','XENCE、愛知県の補助金事業に採択「サーキュラー木造温室™」の新モデル開発を開始','Selected for an Aichi Prefecture grant; development of a new Circular Timber Greenhouse™ model begins'),
 ('2026/6/16','260616','施工特化の新部門「XENCE Engineering」を発足','XENCE Engineering, a new construction-focused division, launches'),
 ('2026/6/2','260602','「サーキュラー木造温室™」が Red Dot Design Award 2026 アーバンデザイン部門を受賞','Circular Timber Greenhouse™ wins Red Dot Design Award 2026, Urban Design'),
 ('2026/4/7','260407','プレスリリース｜名古屋大学発ベンチャーに認定。デジタル設計施工×未利用木材で、建設業を「ジェネレーティブコントラクト」へ','Press release: certified as a Nagoya University venture, moving construction toward the “generative contract”'),
 ('2026/3/30','zNSZMKlS','中京テレビ「アプデの森」でサーキュラー木造温室®︎をご紹介いただきました','Circular Timber Greenhouse® featured on Chukyo TV’s “Apude no Mori”'),
 ('2026/1/16','260116','超異分野学会 愛知フォーラム2026 |「サーキュラー木造温室」が大冷工業賞を受賞しました','Circular Timber Greenhouse wins the Dairei Kogyo Award at the Hyper-Interdisciplinary Conference Aichi Forum 2026'),
 ('2025/12/31','260101','XENCE、2026年1月1日より株式会社化し、新たなスタート。','XENCE incorporates as a kabushiki kaisha from 1 January 2026'),
 ('2025/12/20','251220','日経クロステックに取材掲載いただきました','Featured in Nikkei xTECH'),
 ('2025/9/30','251001','グッドデザイン賞 2025 | サーキュラー木造温室が受賞しました','Circular Timber Greenhouse wins the Good Design Award 2025'),
 ('2025/9/29','250930','ウッドデザイン賞 2025 | サーキュラー木造温室が受賞しました','Circular Timber Greenhouse wins the Japan Wood Design Award 2025'),
 ('2024/11/20','241120','第36回技術研究発表会 優秀賞 | 金属3Dプリンター製接合部の開発が受賞しました','Excellence Award at the 36th Technical Research Presentation for a metal 3D-printed joint'),
]
AWARDS = [('/_blob/608f117ed81e3df0feed88d4035b0650','Red Dot Award 2026 Urban Design'),('/_blob/38e4338c07959de746d4f748d9923f78','Good Design Award 2025'),('/_blob/db1e40e54a4ba6e7a0752a6d15eed3a0','Japan Wood Design Award 2025'),('/_blob/157895a167dafee71d0282b68a501711','Nagoya University Venture')]

def page(L, code):
    tech = [dict(num=a, title=b, tag=c, body=d, media=B[e], caption=f, alt=g, video=h) for (a,b,c,d,e,f,g,h) in TECH[code]]
    projs = []
    for pid, cat, img, ja, en in PROJ:
        t = ja if code == 'ja' else en
        projs.append(dict(id=pid, cat=cat, img=B[img] if img else '', title=t[0], type=t[1], input=t[2], tech=t[3], place=t[4], year=t[5], status=t[6], desc=t[7]))
    data = dict(techs=tech, projects=projs, filters=FILT[code], kinds=KINDS[code], ui=UI[code])
    mq = ''.join(f'<span>{m}</span><span style="color: {{{{accent}}}}">●</span>' for m in L['mq']) * 2
    stats = ''.join(f'''<div class="reveal" style="border-top: 2px solid #fff; padding-top: 24px"><p class="en" style="margin: 0; font-size: clamp(48px, 5vw, 80px); font-weight: 800; letter-spacing: -0.02em">{v}</p><p style="margin: 12px 0 0; font-size: 15px; line-height: 1.8; color: #D8D6D1">{t}</p></div>''' for v, t in L['stats'])
    cols = ''.join(f'''<div class="reveal" style="border-top: 2px solid #000; padding-top: 16px"><p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.16em; color: {{{{accentDark}}}}; font-weight: 700">{a}</p><h3 style="margin: 6px 0 6px; font-size: 22px; font-weight: 900">{b}</h3><p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333">{c}</p></div>''' for a, b, c in L['cols'])
    fly = L['fly']
    mods = ''.join(f'''<article class="reveal{' mod-wide' if k == 'arch' else ''}" style="{'grid-column: 1 / -1' if k == 'arch' else ''}"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px"><span style="width: 10px; height: 10px; border-radius: 50%; background: {{{{accent}}}}"></span><span style="flex: 1; height: 1px; background: #444"></span></div><div class="zoom" style="height: {'560px' if k == 'arch' else '260px'}"><img src="{B[k]}" alt="{alt}" style="width: 100%; height: 100%; object-fit: cover; display: block"></div><p class="en" style="margin: 18px 0 6px; font-size: 12px; color: {{{{accent}}}}; letter-spacing: 0.14em; font-weight: 700">{s}</p><h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900">{t}</h3><p style="margin: 0; font-size: 14px; line-height: 1.8; color: #D8D6D1">{b}</p></article>''' for k, s, t, b, alt in L['mods'])
    imp = ''.join(f'''<div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">{tag.upper() if code=='en' else tag}</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">{v}</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">{t}</p></div>''' for v, t, tag in L['imp'])
    basis = ''.join(f'<li style="margin: 0 0 14px">{b}</li>' for b in L['basis'])
    gro = ''.join(f'''<div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p class="en" style="margin: 0; font-size: 13px; color: {{{{accent}}}}; font-weight: 700">{n}</p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">{h}</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">{b}</p></div>''' for n, h, b in L['gro'])
    mkt = ''.join(f'''<div style="background: #000; padding: 28px"><p class="en" style="margin: 0; font-size: 36px; font-weight: 800">{v}</p><p style="margin: 8px 0 0; font-size: 13px; color: #A9A69F">{t}</p></div>''' for v, t in L['mkt'])
    rec = ''.join(f'<span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">{r}</span>' for r in L['rec'])
    cards = ''.join(f'''<a href="#c{i}" class="row" style="background: #000; padding: 36px; display: block"><span class="en" style="font-size: 12px; color: {{{{accent}}}}">0{i}</span><span style="display: block; margin-top: 12px; font-size: 22px; font-weight: 700">{a}</span><span style="display: block; margin-top: 10px; font-size: 14px; color: #D8D6D1">{b}</span></a>''' for i, (a, b) in enumerate(L['cards'], 1))
    PEOPLE = [('/_blob/ec97285f0d43f2ae3e1dac0e6e94f21c','Kotaro Ozawa','Founder & CEO'),('/_blob/e79686e0cc8af439e8723114d6320641','Asako Osedo','Co-Director, Service Design Officer'),('/_blob/3e4cc91e964e98e9528c00a02f29d335','Koji Saito','Lead Architect'),('/_blob/0844533af6b687145bc76ba6f4251f08','Akihiro Yamada','Lead Construction Management'),('/_blob/786bbef104e74efe8a687b810c6eba9f','Kotaro Jin','Architect'),('/_blob/dffba86edfbe66be4576f9f844cb9046','Kosuke Kuroda','Designer'),('/_blob/030d3dc28477b4f6443099d08fe34506','Yushi Kimoto','Designer'),('/_blob/4177b533ea70c9bbb73e21e74ef11f20','Mako Sumi','Community Manager')]
    people = ''.join(f'''<div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="{m}" alt="{n}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block"></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">{n}</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">{r}</p></div>''' for m, n, r in PEOPLE)
    GAL = [('gh_night_in','サーキュラー木造温室™','Circular Timber Greenhouse™','2025'),('bench3d','3Dプリントベンチ','3D-printed bench','2025'),('joint','金物を使わない木組み','Timber joint, no steel',''),('higashiura','東浦町 セルフビルド温室','Self-build greenhouse, Higashiura','2026'),('gh_interior','温室の内部','Inside the greenhouse','2025'),('tsite','代官山T-SITE 提灯スタンド','Lantern stands, Daikanyama T-SITE','2026')]
    gal = ''.join(f'''<figure style="margin: 0; flex: none; width: min(78vw, 1100px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="{B[k]}" alt="{ja if code == 'ja' else en}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block"></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>{ja if code == 'ja' else en}</span><span class="en">{y}</span></figcaption></figure>''' for k, ja, en, y in GAL)
    awards = ''.join(f'<div style="background: #fff; aspect-ratio: 9 / 5; display: flex; align-items: center; justify-content: center"><img src="{u}" alt="{a}" loading="lazy" style="width: 100%; height: 100%; object-fit: contain; display: block"></div>' for u, a in AWARDS)
    news = ''.join(f'''<a href="https://xencegroup.com/news/{sl}" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">{d}</span><span style="font-size: 17px; line-height: 1.7">{ja if code == 'ja' else en}</span><span class="en" style="color: {{{{accent}}}}">↗</span></a>''' for d, sl, ja, en in NEWS)
    awH = '受賞・認定' if code == 'ja' else 'Awards & recognition'
    awP = ('Red Dot、グッドデザイン賞、ウッドデザイン賞を受賞。名古屋大学発ベンチャーに認定されています。' if code == 'ja' else 'Red Dot, Good Design and Japan Wood Design awards. Certified Nagoya University venture.')
    th = L['th']
    html = TEMPLATE
    rep = dict(L)
    rep.update(AWARDS=awards, NEWS=news, awH=awH, awP=awP, GAL=gal, PEOPLE=people, MQ=mq, STATS=stats, COLS=cols, F0=fly[0], F1=fly[1], F2=fly[2], F3=fly[3], MODS=mods, IMP=imp, BASIS=basis, GRO=gro, MKT=mkt, REC=rec, CARDS=cards,
               TH0=th[0], TH1=th[1], TH2=th[2], TH3=th[3], TH4=th[4], DATA=json.dumps(data, ensure_ascii=False).replace("'", "\\u0027"), **{k: v for k, v in B.items()})
    for k, v in rep.items():
        if isinstance(v, str):
            html = html.replace('@@' + k + '@@', v)
    left = re.findall(r'@@\w+@@', html)
    assert not left, left
    return html

TEMPLATE = open('/home/claude/xweb/template.html', encoding='utf-8').read()
open('/home/claude/xweb/project/Main.dc.html', 'w', encoding='utf-8').write(page(JA, 'ja'))
open('/home/claude/xweb/project/MainEN.dc.html', 'w', encoding='utf-8').write(page(EN, 'en'))
print('ok')
