// 동물 데이터: id(그림 파일 이름), en(영어), ko(한글), say(읽을 소리, 없으면 en)
window.A = window.A || {};

A.THEMES = [
  { id: 'bird', ko: '새', en: 'Birds', icon: '🦜', cover: 'parrot', color: '#f9e9a8',
    words: [
      ['parrot', 'parrot', '앵무새'], ['eagle', 'eagle', '독수리'], ['swan', 'swan', '백조'], ['flamingo', 'flamingo', '플라밍고'], ['peacock', 'peacock', '공작새'],
      ['pigeon', 'pigeon', '비둘기'], ['woodpecker', 'woodpecker', '딱따구리'], ['seagull', 'seagull', '갈매기'], ['hummingbird', 'hummingbird', '벌새'], ['bird', 'bird', '새'],
      ['owl', 'owl', '부엉이'], ['toucan', 'toucan', '투칸'], ['pelican', 'pelican', '펠리컨'], ['ostrich', 'ostrich', '타조'], ['stork', 'stork', '황새'],
    ] },
];

// 5개씩 묶음으로 나누기 (맨 끝 묶음은 5개보다 적을 수 있음)
A.GROUP_SIZE = 5;
A.THEMES.forEach(t => {
  t.words = t.words.map(([id, en, ko, say]) => ({
    id, en, ko, say: say || en,
    art: /^[aeiou]/i.test(en) && !/^uni/i.test(en) ? 'an' : 'a',   // unicorn 은 '유'로 시작하는 소리라 a
  }));
  t.groups = [];
  for (let i = 0; i < t.words.length; i += A.GROUP_SIZE) {
    t.groups.push(t.words.slice(i, i + A.GROUP_SIZE));
  }
});
