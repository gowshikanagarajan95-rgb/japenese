import { GrammarLesson, SentencePuzzle } from '../types';

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  // ==========================================
  // UNIT 1: INTRODUCTIONS & AFFILIATION
  // ==========================================
  {
    id: 'g_u1_wa_desu',
    unit: 1,
    title: 'Unit 1: A は B です & Negative Form',
    japaneseTitle: '第1課：A は B です・ではありません',
    level: 'Unit 1',
    summary: 'The fundamental formula for declaring identity, nationality, occupation, and basic negative statements in Japanese.',
    keyRule: 'Topic + は (wa) + Predicate + です (desu = is/am/are) / ではありません (dewa arimasen = is not).',
    formula: [
      { label: 'Topic (A)', role: 'topic' },
      { label: 'は (wa)', role: 'particle' },
      { label: 'Noun (B)', role: 'predicate' },
      { label: 'です / ではありません', role: 'verb' },
    ],
    explanation: [
      'The particle は is written with the hiragana "ha", but pronounced as "wa" when serving as the topic marker.',
      'です (desu) functions as the polite affirmative copula (am/is/are).',
      'The polite negative is ではありません (dewa arimasen) or じゃありません (ja arimasen).',
      'To turn any sentence into a question, simply append the question particle か (ka) at the end.',
    ],
    examples: [
      {
        sentenceJp: '私はマイク・ミラーです。',
        sentenceRomaji: 'Watashi wa Maiku Miraa desu.',
        sentenceEn: 'I am Mike Miller.',
        breakdown: [
          { text: '私', role: 'Topic (I)' },
          { text: 'は', role: 'Topic marker', highlight: true },
          { text: 'マイク・ミラー', role: 'Name (Mike Miller)' },
          { text: 'です', role: 'Copula (am)', highlight: true },
        ],
      },
      {
        sentenceJp: 'サントスさんは学生ではありません。',
        sentenceRomaji: 'Santosu-san wa gakusei dewa arimasen.',
        sentenceEn: 'Mr. Santos is not a student.',
        breakdown: [
          { text: 'サントスさん', role: 'Topic (Mr. Santos)' },
          { text: 'は', role: 'Topic marker', highlight: true },
          { text: '学生', role: 'Occupation (Student)' },
          { text: 'ではありません', role: 'Negative copula (is not)', highlight: true },
        ],
      },
    ],
    tip: 'Never append "〜さん" to your own name when introducing yourself; "〜さん" is an honorific reserved exclusively for others.',
  },

  // ==========================================
  // UNIT 2: DEMONSTRATIVES & POSSESSION
  // ==========================================
  {
    id: 'g_u2_kore_sore_are',
    unit: 2,
    title: 'Unit 2: Demonstratives (これ/それ/あれ & この/その/あの)',
    japaneseTitle: '第2課：これ・それ・あれ・この〜・誰の',
    level: 'Unit 2',
    summary: 'Distinguish proximity relative to the speaker and listener for both independent pronouns and noun-modifying demonstratives.',
    keyRule: 'これ (near speaker), それ (near listener), あれ (far from both). Use この/その/あの directly before a noun.',
    formula: [
      { label: 'これ / それ / あれ', role: 'topic' },
      { label: 'は (wa)', role: 'particle' },
      { label: '[Owner] の [Noun]', role: 'predicate' },
      { label: 'です (desu)', role: 'verb' },
    ],
    explanation: [
      'これ / それ / あれ stand independently as nouns and cannot be followed directly by another noun.',
      'この / その / あの must ALWAYS modify an immediately following noun (e.g. この本, その時計).',
      'The particle の connects two nouns, frequently indicating possession (私の傘 = my umbrella, 誰の本 = whose book).',
      'When replying affirmatively to an identification question, you can say 「はい、そうです」.',
    ],
    examples: [
      {
        sentenceJp: 'これは誰の鍵ですか？',
        sentenceRomaji: 'Kore wa dare no kagi desu ka?',
        sentenceEn: 'Whose key is this?',
        breakdown: [
          { text: 'これ', role: 'Demonstrative (This)', highlight: true },
          { text: 'は', role: 'Topic marker' },
          { text: '誰の', role: 'Whose (Possessive question)' },
          { text: '鍵', role: 'Noun (Key)' },
          { text: 'ですか', role: 'Question copula', highlight: true },
        ],
      },
      {
        sentenceJp: 'この手帳は田中さんのです。',
        sentenceRomaji: 'Kono techou wa Tanaka-san no desu.',
        sentenceEn: 'This pocket notebook is Mr. Tanaka’s.',
        breakdown: [
          { text: 'この', role: 'Demonstrative adjective', highlight: true },
          { text: '手帳', role: 'Noun (Pocket notebook)' },
          { text: 'は', role: 'Topic marker' },
          { text: '田中さんの', role: 'Possessive (Tanaka’s)' },
          { text: 'です', role: 'Copula (is)' },
        ],
      },
    ],
    tip: 'In conversation, if the noun is already understood, you can drop it after の: 「それは私のです」 (That is mine).',
  },

  // ==========================================
  // UNIT 3: PLACES, DIRECTIONS & PRICES
  // ==========================================
  {
    id: 'g_u3_koko_soko_asoko',
    unit: 3,
    title: 'Unit 3: Places, Directions & Prices (ここ/そこ & いくら)',
    japaneseTitle: '第3課：ここ・そこ・あそこ・場所・いくら',
    level: 'Unit 3',
    summary: 'Inquiring about locations, navigating buildings, polite directions (こちら/そちら), and asking prices with いくら.',
    keyRule: '[Location/Facility] は [ここ/そこ/あそこ/Floor/Country] です / [Item] は いくらですか。',
    formula: [
      { label: 'Facility / Item', role: 'topic' },
      { label: 'は (wa)', role: 'particle' },
      { label: 'Place / Price', role: 'predicate' },
      { label: 'です (desu)', role: 'verb' },
    ],
    explanation: [
      'ここ (here), そこ (there), and あそこ (over there) pinpoint physical places.',
      'どこ (doko) asks "where". The polite direction counterparts are こちら (kochira), そちら (sochira), あちら (achira), and どちら (dochira).',
      'Both origins and places of employment use の: 日本のカメラ (camera made in Japan), 会社の電話 (company telephone).',
      'To inquire about the price of an item: [Noun] は いくらですか。',
    ],
    examples: [
      {
        sentenceJp: 'お手洗いはどこですか？',
        sentenceRomaji: 'Otearai wa doko desu ka?',
        sentenceEn: 'Where is the restroom?',
        breakdown: [
          { text: 'お手洗い', role: 'Topic (Restroom)' },
          { text: 'は', role: 'Topic marker' },
          { text: 'どこ', role: 'Question word (Where)', highlight: true },
          { text: 'ですか', role: 'Question ending' },
        ],
      },
      {
        sentenceJp: 'このワインは二千五百円です。',
        sentenceRomaji: 'Kono wain wa nisen gohyaku-en desu.',
        sentenceEn: 'This wine is 2,500 yen.',
        breakdown: [
          { text: 'このワイン', role: 'Topic (This wine)' },
          { text: 'は', role: 'Topic marker' },
          { text: '二千五百円', role: 'Price (2,500 Yen)', highlight: true },
          { text: 'です', role: 'Copula (is)' },
        ],
      },
    ],
    tip: 'When asking which country a person is from politely, use 「お国はどちらですか」 rather than 「どこ」.',
  },

  // ==========================================
  // UNIT 4: TIME, DAYS & ROUTINE VERBS
  // ==========================================
  {
    id: 'g_u4_time_and_verbs',
    unit: 4,
    title: 'Unit 4: Telling Time & Polite Verb Tenses (ます/ました)',
    japaneseTitle: '第4課：時間・曜日・動詞の時制・から〜まで',
    level: 'Unit 4',
    summary: 'Telling exact time with 時 (ji) and 分 (fun/pun), daily routine verbs, and four polite tense inflections.',
    keyRule: 'Non-past: 〜ます / 〜ません. Past: 〜ました / 〜ませんでした. Mark specific time with に (ni).',
    formula: [
      { label: 'Time (Specific)', role: 'topic' },
      { label: 'に (ni)', role: 'particle' },
      { label: 'Action Verb', role: 'verb' },
    ],
    explanation: [
      'Specific numeric times take the particle に (e.g. 7時に起きます). Relative times like 今日 (today) or 毎朝 (every morning) do NOT take に.',
      '〜ます is non-past affirmative (present habit or future intention).',
      '〜ません is non-past negative.',
      '〜ました is past affirmative, and 〜ませんでした is past negative.',
      'から (from) and まで (to / until) express boundaries of time or space.',
    ],
    examples: [
      {
        sentenceJp: '毎朝六時半に起きます。',
        sentenceRomaji: 'Maiasa roku-ji han ni okimasu.',
        sentenceEn: 'I get up at 6:30 every morning.',
        breakdown: [
          { text: '毎朝', role: 'Time adverb (Every morning)' },
          { text: '六時半', role: 'Specific time (6:30)' },
          { text: 'に', role: 'Time particle (at)', highlight: true },
          { text: '起きます', role: 'Verb (wake up)', highlight: true },
        ],
      },
      {
        sentenceJp: '昨晩は勉強しませんでした。',
        sentenceRomaji: 'Sakuban wa benkyou shimasen deshita.',
        sentenceEn: 'I did not study last night.',
        breakdown: [
          { text: '昨晩', role: 'Time (Last night)' },
          { text: 'は', role: 'Topic marker' },
          { text: '勉強しませんでした', role: 'Past negative verb (did not study)', highlight: true },
        ],
      },
    ],
    tip: 'Pay attention to irregular hour readings: 4 o’clock is よじ (yo-ji), 7 o’clock is しちじ (shichi-ji), and 9 o’clock is くじ (ku-ji).',
  },

  // ==========================================
  // UNIT 5: MOVEMENT & TRANSPORTATION
  // ==========================================
  {
    id: 'g_u5_movement_e_de',
    unit: 5,
    title: 'Unit 5: Movement Verbs (行く/来る/帰る) & Means of Transport (で)',
    japaneseTitle: '第5課：移動の助詞「へ」・交通手段「で」・同行者「と」',
    level: 'Unit 5',
    summary: 'Expressing destination with the direction particle へ, vehicle means with で, and companion with と.',
    keyRule: '[Destination] へ 行きます / [Vehicle] で 行きます / [Person] と 行きます / いつ (When).',
    formula: [
      { label: 'Destination', role: 'topic' },
      { label: 'へ (e)', role: 'particle' },
      { label: 'Vehicle / Means', role: 'object' },
      { label: 'で (de)', role: 'particle' },
      { label: '行きます / 来ます / 帰ります', role: 'verb' },
    ],
    explanation: [
      'The destination particle へ is written with "he" but pronounced "e".',
      'The particle で denotes the means of transportation (e.g. 電車で行きます = go by train).',
      '歩いて (aruite = on foot) does NOT take で because it is an adverbial form, not a vehicle.',
      'The particle と marks a companion: 友達と (with a friend). To travel alone, use 一人で (hitori de).',
      'いつ (itsu) means "when" and does not take the particle に.',
    ],
    examples: [
      {
        sentenceJp: '新幹線で京都へ行きます。',
        sentenceRomaji: 'Shinkansen de Kyouto e ikimasu.',
        sentenceEn: 'I will go to Kyoto by bullet train.',
        breakdown: [
          { text: '新幹線', role: 'Vehicle (Shinkansen)' },
          { text: 'で', role: 'Means particle (by)', highlight: true },
          { text: '京都', role: 'Destination (Kyoto)' },
          { text: 'へ', role: 'Direction particle (to)', highlight: true },
          { text: '行きます', role: 'Movement verb (go)' },
        ],
      },
      {
        sentenceJp: '家族と日本へ来ました。',
        sentenceRomaji: 'Kazoku to Nihon e kimashita.',
        sentenceEn: 'I came to Japan with my family.',
        breakdown: [
          { text: '家族', role: 'Companion (Family)' },
          { text: 'と', role: 'Companion particle (with)', highlight: true },
          { text: '日本へ', role: 'Destination (to Japan)' },
          { text: '来ました', role: 'Past verb (came)' },
        ],
      },
    ],
    tip: 'どこへも行きません (doko e mo ikimasen) means "I do not go anywhere" — [Question word] + [Particle] + も + [Negative verb] creates a complete negative.',
  },

  // ==========================================
  // UNIT 6: DIRECT OBJECT & INVITATIONS
  // ==========================================
  {
    id: 'g_u6_object_o_invitations',
    unit: 6,
    title: 'Unit 6: Direct Object (を), Action Location (で) & Invitations (〜ませんか)',
    japaneseTitle: '第6課：目的語「を」・場所「で」・勧誘「〜ませんか」',
    level: 'Unit 6',
    summary: 'Transitive actions with direct object particle を, action venue particle で, and polite social invitations.',
    keyRule: '[Noun] を [Transitive Verb] / [Place] で [Action] / [Verb stem] + ませんか (won’t you?) / ましょう (let’s).',
    formula: [
      { label: 'Action Location', role: 'topic' },
      { label: 'で (de)', role: 'particle' },
      { label: 'Direct Object', role: 'object' },
      { label: 'を (o)', role: 'particle' },
      { label: 'Verb', role: 'verb' },
    ],
    explanation: [
      'The particle を (pronounced "o") marks the direct recipient/object of an action.',
      'The particle で indicates the location where an active event takes place (unlike に which indicates static existence).',
      'Verb stem + ませんか invites someone politely, giving them the freedom to decline gracefully.',
      'Verb stem + ましょう enthusiastically proposes doing something together ("Let’s!").',
    ],
    examples: [
      {
        sentenceJp: '食堂で昼ご飯を食べます。',
        sentenceRomaji: 'Shokudou de hirugohan o tabemasu.',
        sentenceEn: 'I eat lunch in the cafeteria.',
        breakdown: [
          { text: '食堂', role: 'Location (Cafeteria)' },
          { text: 'で', role: 'Action location particle (in/at)', highlight: true },
          { text: '昼ご飯', role: 'Direct object (Lunch)' },
          { text: 'を', role: 'Object marker', highlight: true },
          { text: '食べます', role: 'Verb (eat)' },
        ],
      },
      {
        sentenceJp: '一緒にお茶を飲みませんか？',
        sentenceRomaji: 'Isshoni ocha o nomimasen ka?',
        sentenceEn: 'Won’t you drink green tea together with me?',
        breakdown: [
          { text: '一緒に', role: 'Adverb (Together)' },
          { text: 'お茶を', role: 'Object (Tea)' },
          { text: '飲みませんか', role: 'Polite invitation (Won’t you drink?)', highlight: true },
        ],
      },
    ],
    tip: 'To accept an invitation with 〜ませんか, the standard response is: 「ええ、飲みましょう」(Yes, let’s drink!).',
  },

  // ==========================================
  // UNIT 7: TOOLS, INSTRUMENTS & GIVING/RECEIVING
  // ==========================================
  {
    id: 'g_u7_tools_giving_receiving',
    unit: 7,
    title: 'Unit 7: Tools (で), Giving & Receiving (あげます/もらいます)',
    japaneseTitle: '第7課：手段・道具「で」・授受「あげます/もらいます」・もう〜ました',
    level: 'Unit 7',
    summary: 'Expressing instruments/languages with で, transferring items with あげます and もらいます, and completion with もう.',
    keyRule: '[Tool/Language] で / [Recipient] に あげます / [Giver] に/から もらいます / もう Verb-ました。',
    formula: [
      { label: 'Giver / Receiver', role: 'topic' },
      { label: 'Target / Partner', role: 'object' },
      { label: 'に (ni)', role: 'particle' },
      { label: 'あげます / もらいます', role: 'verb' },
    ],
    explanation: [
      'で denotes the instrument or language: 箸で食べます (eat with chopsticks), 日本語で話します (speak in Japanese).',
      'あげます indicates giving outward to another person: 友達に花をあげました (I gave flowers to a friend).',
      'もらいます indicates receiving from someone: 先生に本をもらいました (I received a book from the teacher).',
      'もう (mou) + past tense indicates an action has already concluded: もう荷物を送りました (I have already sent the parcel).',
    ],
    examples: [
      {
        sentenceJp: 'ハサミで紙を切ります。',
        sentenceRomaji: 'Hasami de kami o kirimasu.',
        sentenceEn: 'I cut paper with scissors.',
        breakdown: [
          { text: 'ハサミ', role: 'Tool (Scissors)' },
          { text: 'で', role: 'Instrument particle (with)', highlight: true },
          { text: '紙を', role: 'Object (Paper)' },
          { text: '切ります', role: 'Verb (cut)' },
        ],
      },
      {
        sentenceJp: '誕生日に時計をもらいました。',
        sentenceRomaji: 'Tanjoubi ni tokei o moraimashita.',
        sentenceEn: 'I received a watch on my birthday.',
        breakdown: [
          { text: '誕生日に', role: 'Time (On birthday)' },
          { text: '時計を', role: 'Gift object (Watch)' },
          { text: 'もらいました', role: 'Verb (received)', highlight: true },
        ],
      },
    ],
    tip: 'If someone asks 「もう昼ご飯を食べましたか？」 and you have not eaten yet, answer: 「いいえ、まだです」(No, not yet). Never say 「食べませんでした」.',
  },

  // ==========================================
  // UNIT 8: ADJECTIVES & MODIFICATION
  // ==========================================
  {
    id: 'g_u8_adjectives',
    unit: 8,
    title: 'Unit 8: i-Adjectives & na-Adjectives (Conjugation & Modification)',
    japaneseTitle: '第8課：い形容詞・な形容詞の活用・修飾',
    level: 'Unit 8',
    summary: 'Distinguishing the two adjective classes in Japanese, modifying nouns directly, and forming affirmative/negative polite statements.',
    keyRule: 'i-Adj drop い -> くないです. na-Adj drop な -> じゃありません / ではありません.',
    formula: [
      { label: 'Topic', role: 'topic' },
      { label: 'は (wa)', role: 'particle' },
      { label: 'い-Adj です / な-Adj です', role: 'predicate' },
    ],
    explanation: [
      'い-adjectives naturally end in "い" (e.g. 高い, おいしい, 寒い). Negative: drop い and add くないです (e.g. 高くないです).',
      'The adjective いい (good) conjugates irregularly from よい: negative is よくないです.',
      'な-adjectives do not end in い (or end in pseudo-i like きれい, 有名). Predicate: 静かです. Negative: 静かじゃありません.',
      'Direct noun modification: い-adjectives directly precede the noun (おいしい料理); な-adjectives require "な" (静かな町).',
      'Adverbs of degree: とても (very, affirmative) and あまり (not very, strictly negative).',
    ],
    examples: [
      {
        sentenceJp: '富士山は高くてきれいです。',
        sentenceRomaji: 'Fujisan wa takakute kirei desu.',
        sentenceEn: 'Mt. Fuji is high and beautiful.',
        breakdown: [
          { text: '富士山は', role: 'Topic (Mt. Fuji)' },
          { text: '高くて', role: 'Te-form of i-adj (high and)', highlight: true },
          { text: 'きれいです', role: 'na-adj predicate (is beautiful)', highlight: true },
        ],
      },
      {
        sentenceJp: 'この辞書はあまり高くありません。',
        sentenceRomaji: 'Kono jisho wa amari takaku arimasen.',
        sentenceEn: 'This dictionary is not very expensive.',
        breakdown: [
          { text: 'この辞書は', role: 'Topic (This dictionary)' },
          { text: 'あまり', role: 'Degree adverb (not very)', highlight: true },
          { text: '高くありません', role: 'Negative i-adj (is not high/expensive)', highlight: true },
        ],
      },
    ],
    tip: 'Be careful: きれい (clean/beautiful) and 有名 (famous) end in the sound "i" phonetically, but they are grammatically な-adjectives (きれいな花, 有名な人).',
  },

  // ==========================================
  // UNIT 9: LIKES, SKILLS, POSSESSION & REASONS
  // ==========================================
  {
    id: 'g_u9_likes_abilities_kara',
    unit: 9,
    title: 'Unit 9: Likes (好き), Skills (上手), Understanding (分かります) & Reasons (から)',
    japaneseTitle: '第9課：対象の「が」・好き嫌い・能力・理由「から」',
    level: 'Unit 9',
    summary: 'Verbs and adjectives that take が for their target/object, and explaining reasons with から.',
    keyRule: '[Topic] は [Target] が 好き/嫌い/上手/下手/わかります/あります. [Reason] から、[Result].',
    formula: [
      { label: 'Topic (Person)', role: 'topic' },
      { label: 'Target / Skill', role: 'object' },
      { label: 'が (ga)', role: 'particle' },
      { label: '好き / 上手 / わかります', role: 'predicate' },
    ],
    explanation: [
      'In Japanese, emotional preferences and capabilities (好き, 嫌い, 上手, 下手, 分かります, あります) mark their object with が rather than を.',
      'あります can mean to possess inanimate objects or intangible things like time, money, or appointments (約束があります).',
      'から attached to the end of a clause means "because" / "since".',
      'どうして (doushite) asks "why". When responding, always terminate your reason with から (kara).',
    ],
    examples: [
      {
        sentenceJp: 'マリアさんは日本語が上手です。',
        sentenceRomaji: 'Maria-san wa nihongo ga jouzu desu.',
        sentenceEn: 'Maria is good at Japanese.',
        breakdown: [
          { text: 'マリアさんは', role: 'Topic (Maria)' },
          { text: '日本語', role: 'Target skill (Japanese)' },
          { text: 'が', role: 'Target particle', highlight: true },
          { text: '上手です', role: 'na-adj (good at)', highlight: true },
        ],
      },
      {
        sentenceJp: '時間がありませんから、タクシーで行きます。',
        sentenceRomaji: 'Jikan ga arimasen kara, takushii de ikimasu.',
        sentenceEn: 'Because I have no time, I will go by taxi.',
        breakdown: [
          { text: '時間がありません', role: 'Reason clause (Have no time)' },
          { text: 'から', role: 'Conjunction (because)', highlight: true },
          { text: 'タクシーで', role: 'Means (by taxi)' },
          { text: '行きます', role: 'Result action (will go)' },
        ],
      },
    ],
    tip: 'Avoid praising yourself with 上手 (jouzu); use 得意 (tokui) for yourself, or say 「少しできます」 (I can do a little).',
  },

  // ==========================================
  // UNIT 10: EXISTENCE (ある/いる) & POSITIONS
  // ==========================================
  {
    id: 'g_u10_existence_positions',
    unit: 10,
    title: 'Unit 10: Existence (あります vs. います) & Spatial Relationships',
    japaneseTitle: '第10課：存在「あります・います」と位置関係',
    level: 'Unit 10',
    summary: 'Distinct existence verbs for inanimate versus living entities, and spatial relational nouns with の.',
    keyRule: 'Inanimate (things, plants): あります. Animate (people, animals): います. Location takes に (ni).',
    formula: [
      { label: 'Location', role: 'topic' },
      { label: 'に (ni)', role: 'particle' },
      { label: 'Entity (Noun)', role: 'object' },
      { label: 'が (ga)', role: 'particle' },
      { label: 'あります / います', role: 'verb' },
    ],
    explanation: [
      'あります is used for inanimate objects, buildings, furniture, and plants (which do not move under their own will).',
      'います is used for humans and living creatures/animals.',
      'Two word-order perspectives: [Place] に [Entity] が あります/います ("There is an entity in a place") vs. [Entity] は [Place] に あります/います ("The entity is located in the place").',
      'Spatial words combine with の: 机の上 (on top of desk), 銀行の隣 (next to the bank), 箱の中 (inside the box).',
      'The particle や lists items non-exhaustively ("things like A and B"), frequently concluded with など.',
    ],
    examples: [
      {
        sentenceJp: '公園に犬と子どもがいます。',
        sentenceRomaji: 'Kouen ni inu to kodomo ga imasu.',
        sentenceEn: 'There are dogs and children in the park.',
        breakdown: [
          { text: '公園に', role: 'Location of existence (In park)' },
          { text: '犬と子ども', role: 'Living entities (Dogs & children)' },
          { text: 'が', role: 'Subject marker' },
          { text: 'います', role: 'Animate existence verb', highlight: true },
        ],
      },
      {
        sentenceJp: '本屋は駅の前にあります。',
        sentenceRomaji: 'Honya wa eki no mae ni arimasu.',
        sentenceEn: 'The bookstore is located in front of the station.',
        breakdown: [
          { text: '本屋は', role: 'Topic (Bookstore)' },
          { text: '駅の前', role: 'Position (In front of station)' },
          { text: 'に', role: 'Location marker', highlight: true },
          { text: 'あります', role: 'Inanimate existence verb', highlight: true },
        ],
      },
    ],
    tip: 'Do not confuse で (location of an action) with に (location of existence): 食堂で食べます (action) vs. 食堂にいます (static presence).',
  },

  // ==========================================
  // UNIT 11: QUANTITY, COUNTERS & DURATION
  // ==========================================
  {
    id: 'g_u11_counters_duration',
    unit: 11,
    title: 'Unit 11: Counters, Quantities & Duration (期間)',
    japaneseTitle: '第11課：助数詞・期間・頻度の表現',
    level: 'Unit 11',
    summary: 'Japanese counter suffixes, position of numbers in sentences, and expressing time spans and frequency.',
    keyRule: '[Noun] を [Number + Counter] Verb. Counters typically sit directly before the verb without particles.',
    formula: [
      { label: 'Object Noun', role: 'object' },
      { label: 'を (o)', role: 'particle' },
      { label: 'Quantity / Counter', role: 'topic' },
      { label: 'Verb', role: 'verb' },
    ],
    explanation: [
      'Native Japanese counters (ひとつ, ふたつ, みっつ... とお) are used for general 3D items up to 10.',
      'Sino-Japanese counters depend on shape and nature: 〜人 (people), 〜台 (machines, cars), 〜枚 (flat thin things), 〜本 (cylindrical long things).',
      'Numbers with counters typically follow the object and its particle: りんごを二つ買いました (bought 2 apples).',
      'Time duration does NOT take に: 3時間勉強しました (studied for 3 hours).',
      'Frequency: [Period] に [Times] (e.g. 1か月に2回 = twice in a month).',
    ],
    examples: [
      {
        sentenceJp: 'ビールを三本飲みました。',
        sentenceRomaji: 'Biiru o sanbon nomimashita.',
        sentenceEn: 'I drank three bottles/cans of beer.',
        breakdown: [
          { text: 'ビールを', role: 'Object (Beer)' },
          { text: '三本', role: 'Quantity counter (3 bottles)', highlight: true },
          { text: '飲みました', role: 'Verb (drank)' },
        ],
      },
      {
        sentenceJp: '国で二年間日本語を勉強しました。',
        sentenceRomaji: 'Kuni de ninenkan nihongo o benkyou shimashita.',
        sentenceEn: 'I studied Japanese for two years in my home country.',
        breakdown: [
          { text: '国で', role: 'Location (In home country)' },
          { text: '二年間', role: 'Duration span (For 2 years)', highlight: true },
          { text: '日本語を', role: 'Object (Japanese)' },
          { text: '勉強しました', role: 'Past verb (studied)' },
        ],
      },
    ],
    tip: 'Notice the irregular readings for 1 person (ひとり) and 2 people (ふたり). From 3 people onward it follows the standard pattern: さんにん, よにん, etc.',
  },

  // ==========================================
  // UNIT 12: PAST ADJECTIVES & COMPARISONS
  // ==========================================
  {
    id: 'g_u12_comparisons',
    unit: 12,
    title: 'Unit 12: Past Adjectives & Comparisons (より/どちらが/一番)',
    japaneseTitle: '第12課：形容詞の過去形・比較「より」・最上級「一番」',
    level: 'Unit 12',
    summary: 'Forming past tense for adjectives, comparing two entities, and selecting superlatives among a group.',
    keyRule: 'Past i-adj: drop い -> かったです. Past na-adj: でした. A は B より [Adj]. [Group] の中で [Item] が 一番 [Adj].',
    formula: [
      { label: 'Item A', role: 'topic' },
      { label: 'は (wa)', role: 'particle' },
      { label: 'Item B', role: 'object' },
      { label: 'より (yori)', role: 'particle' },
      { label: 'Adjective です', role: 'predicate' },
    ],
    explanation: [
      'Past tense of i-adjectives: drop い and add かったです (暑かったです). Past negative: くなかったです.',
      'Past tense of na-adjectives: でした (静かでした). Past negative: じゃありませんでした.',
      'Comparing two items: A は B より [Adjective] です ("A is more [Adj] than B").',
      'Asking which of two is preferable: A と B と どちらが [Adjective] ですか。',
      'Superlative in a group: [Category] の中で [Item] が 一番 [Adjective] です。',
    ],
    examples: [
      {
        sentenceJp: '新幹線は飛行機より安いです。',
        sentenceRomaji: 'Shinkansen wa hikouki yori yasui desu.',
        sentenceEn: 'The bullet train is cheaper than the airplane.',
        breakdown: [
          { text: '新幹線は', role: 'Subject/Topic (Shinkansen)' },
          { text: '飛行機', role: 'Standard of comparison (Airplane)' },
          { text: 'より', role: 'Comparison particle (than)', highlight: true },
          { text: '安いです', role: 'Adjective (is cheaper)', highlight: true },
        ],
      },
      {
        sentenceJp: '一年の中で夏が一番好きです。',
        sentenceRomaji: 'Ichinen no naka de natsu ga ichiban suki desu.',
        sentenceEn: 'Among the entire year, I like summer the best.',
        breakdown: [
          { text: '一年の中で', role: 'Category boundary (Within the year)' },
          { text: '夏が', role: 'Chosen element (Summer)' },
          { text: '一番', role: 'Superlative adverb (Number one / most)', highlight: true },
          { text: '好きです', role: 'Predicate (like)' },
        ],
      },
    ],
    tip: 'When comparing two things, always use どちら (dochira) rather than どれ (dore). Use どれ when choosing among three or more items.',
  },

  // ==========================================
  // UNIT 13: DESIRES & PURPOSE OF MOVEMENT
  // ==========================================
  {
    id: 'g_u13_desires_purpose',
    unit: 13,
    title: 'Unit 13: Desires (欲しい & 〜たい) & Purpose of Movement (に行きます)',
    japaneseTitle: '第13課：願望「欲しい・〜たい」と移動の目的「〜に行く」',
    level: 'Unit 13',
    summary: 'Expressing desires for objects with が欲しい, desires for actions with 〜たい, and traveling with a purpose.',
    keyRule: '[Noun] が 欲しい / Verb[Stem] + たいです / [Place] へ [Verb stem / Noun] に 行きます/来ます.',
    formula: [
      { label: 'Destination', role: 'topic' },
      { label: 'へ (e)', role: 'particle' },
      { label: 'Verb Stem / Activity', role: 'object' },
      { label: 'に (ni)', role: 'particle' },
      { label: '行きます / 来ます', role: 'verb' },
    ],
    explanation: [
      '欲しい is an i-adjective expressing the desire to possess a concrete thing: 車が欲しいです (I want a car).',
      'Verb stem + たいです expresses the desire to perform an action: 日本へ行きたいです (I want to go to Japan).',
      '〜たい conjugates just like an i-adjective: negative is 〜たくないです, past is 〜たかったです.',
      'Purpose of movement: take the verb masu-stem or a verbal noun, add に, followed by a movement verb: デパートへ買い物に行きます.',
    ],
    examples: [
      {
        sentenceJp: '日本料理を食べたいです。',
        sentenceRomaji: 'Nihon ryouri o tabetai desu.',
        sentenceEn: 'I want to eat Japanese food.',
        breakdown: [
          { text: '日本料理を', role: 'Object (Japanese food)' },
          { text: '食べたいです', role: 'Desire verb form (want to eat)', highlight: true },
        ],
      },
      {
        sentenceJp: '図書館へ本を借りに行きます。',
        sentenceRomaji: 'Toshokan e hon o kari ni ikimasu.',
        sentenceEn: 'I go to the library in order to borrow books.',
        breakdown: [
          { text: '図書館へ', role: 'Destination (To library)' },
          { text: '本を', role: 'Object (Books)' },
          { text: '借り', role: 'Verb stem (Borrow)' },
          { text: 'に', role: 'Purpose particle (in order to)', highlight: true },
          { text: '行きます', role: 'Movement verb (go)' },
        ],
      },
    ],
    tip: 'Never use 欲しいです or 〜たいです directly to ask your teacher or boss what they want, as it is considered presumptuous; use indirect polite forms instead.',
  },

  // ==========================================
  // UNIT 14: VERB GROUPS & TE-FORM REQUESTS
  // ==========================================
  {
    id: 'g_u14_te_form_requests',
    unit: 14,
    title: 'Unit 14: Verb Groups, Te-Form Conjugation & Requests (〜てください)',
    japaneseTitle: '第14課：動詞グループ・て形・依頼「〜てください」・進行「〜ています」',
    level: 'Unit 14',
    summary: 'The cornerstone of Japanese grammar: classifying verbs into 3 groups, converting to Te-form, making polite requests, and current progressive actions.',
    keyRule: 'Group 1 (u-verbs), Group 2 (ru-verbs), Group 3 (suru/kuru). Verb[Te] + ください / Verb[Te] + います.',
    formula: [
      { label: 'Target / Action', role: 'object' },
      { label: 'Verb (て-form)', role: 'verb' },
      { label: 'ください (Please do)', role: 'predicate' },
    ],
    explanation: [
      'Group 1 rules: い/ち/り -> って (買って, 待って, 帰って); み/び/に -> んで (飲んで, 遊んで, 死んで); き -> いて (書いて), ぎ -> いで (急いで); し -> して (話して). Exception: 行く -> 行って.',
      'Group 2: Drop ます, add て (食べて, 見て, 開けて).',
      'Group 3: します -> して, 来ます (kimasu) -> 来て (kite).',
      '〜てください makes a direct polite request ("Please do...").',
      '〜ています denotes an ongoing action occurring right now (e.g. 今本を読んでいます).',
      '〜ましょうか offers your assistance ("Shall I do ... for you?").',
    ],
    examples: [
      {
        sentenceJp: 'ここに住所と名前を書いてください。',
        sentenceRomaji: 'Koko ni juusho to namae o kaite kudasai.',
        sentenceEn: 'Please write your address and name here.',
        breakdown: [
          { text: 'ここに', role: 'Location' },
          { text: '住所と名前を', role: 'Object (Address and name)' },
          { text: '書いて', role: 'Te-form of 書きます (write)', highlight: true },
          { text: 'ください', role: 'Polite request auxiliary', highlight: true },
        ],
      },
      {
        sentenceJp: '今、家族に手紙を書いています。',
        sentenceRomaji: 'Ima, kazoku ni tegami o kaite imasu.',
        sentenceEn: 'Right now, I am writing a letter to my family.',
        breakdown: [
          { text: '今', role: 'Time adverb (Now)' },
          { text: '家族に', role: 'Recipient (To family)' },
          { text: '手紙を', role: 'Object (Letter)' },
          { text: '書いています', role: 'Progressive action (am writing)', highlight: true },
        ],
      },
    ],
    tip: 'Memorize the Te-form song or rhyming pairs (i-chi-ri -> tte; mi-bi-ni -> nde; ki -> ite; gi -> ide; shi -> shite). It is the gateway to intermediate Japanese.',
  },

  // ==========================================
  // UNIT 15: PERMISSION, PROHIBITION & STATES
  // ==========================================
  {
    id: 'g_u15_permission_prohibition',
    unit: 15,
    title: 'Unit 15: Permission (〜てもいい), Prohibition (〜てはいけません) & States',
    japaneseTitle: '第15課：許可「〜てもいいですか」・禁止「〜てはいけません」・現在の状態',
    level: 'Unit 15',
    summary: 'Asking for and granting permission, stating strict prohibitions, and using 〜ています to describe enduring states.',
    keyRule: 'Permission: Verb[Te] + もいいですか. Prohibition: Verb[Te] + はいけません. State: 住んでいます, 知っています.',
    formula: [
      { label: 'Action (て-form)', role: 'verb' },
      { label: 'も いいですか (May I?)', role: 'predicate' },
    ],
    explanation: [
      '〜てもいいですか asks for permission: ここで写真を撮ってもいいですか (May I take photos here?).',
      'Affirmative reply: 「ええ、いいですよ」 or 「どうぞ」. Polite refusal: 「すみません、ちょっと…」.',
      '〜てはいけません announces a strict prohibition: ここに車を止めてはいけません (You must not park your car here).',
      '〜ています expresses resulting states that continue in the present: 結婚しています (is married), 持っています (owns/possesses), 住んでいます (resides).',
      'Knowing someone: 知っています (I know). But "I do not know" is 知りません (never 知っていません).',
    ],
    examples: [
      {
        sentenceJp: 'このカタログをもらってもいいですか？',
        sentenceRomaji: 'Kono katarogu o moratte mo ii desu ka?',
        sentenceEn: 'May I take this catalog?',
        breakdown: [
          { text: 'このカタログを', role: 'Object (This catalog)' },
          { text: 'もらって', role: 'Te-form of もらいます (receive)' },
          { text: 'もいいですか', role: 'Permission phrase (May I?)', highlight: true },
        ],
      },
      {
        sentenceJp: '私は東京に住んでいます。',
        sentenceRomaji: 'Watashi wa Toukyou ni sunde imasu.',
        sentenceEn: 'I live in Tokyo.',
        breakdown: [
          { text: '私は', role: 'Topic (I)' },
          { text: '東京に', role: 'Location of residence (in Tokyo)' },
          { text: '住んでいます', role: 'Resulting state (reside/live)', highlight: true },
        ],
      },
    ],
    tip: 'Always remember: The negative of 知っています is always 知りません (shirimasen), not 知っていません.',
  },

  // ==========================================
  // UNIT 16: SEQUENTIAL ACTIONS & CONNECTIONS
  // ==========================================
  {
    id: 'g_u16_sequential_actions',
    unit: 16,
    title: 'Unit 16: Sequential Actions (〜てから) & Attribute Descriptions (は〜が)',
    japaneseTitle: '第16課：動作の順序「〜て、〜て」「〜てから」・属性「は〜が」',
    level: 'Unit 16',
    summary: 'Chaining actions in chronological order, expressing prerequisites with 〜てから, connecting adjectives, and describing bodily features.',
    keyRule: 'Sequence: Verb[Te], Verb[Te], [Final Verb]. Prerequisite: Verb[Te] + から. Features: [Person] は [Body Part] が [Adj].',
    formula: [
      { label: 'Action 1 (て-form)', role: 'verb' },
      { label: 'Action 2 (て-form)', role: 'verb' },
      { label: 'Final Verb', role: 'predicate' },
    ],
    explanation: [
      'Chaining verbs with Te-form expresses actions performed in chronological succession. The tense of the final verb defines the entire sentence tense.',
      'Verb[Te] + から emphasizes that Action 2 cannot occur until Action 1 is completed ("After doing A, then B").',
      'Connecting adjectives: i-adjectives drop い and add くて (安くて、おいしい); na-adjectives add で (静かで、きれい).',
      'Describing features or body parts: Maria-san wa me ga ookii desu (Maria has big eyes).',
      'どうやって (dou yatte) asks "how / by what way" to do something.',
    ],
    examples: [
      {
        sentenceJp: '朝起きて、シャワーを浴びて、朝ご飯を食べました。',
        sentenceRomaji: 'Asa okite, shawaa o abite, asagohan o tabemashita.',
        sentenceEn: 'In the morning I woke up, took a shower, and ate breakfast.',
        breakdown: [
          { text: '朝起きて', role: 'Action 1 in Te-form (Woke up)' },
          { text: 'シャワーを浴びて', role: 'Action 2 in Te-form (Showered)' },
          { text: '朝ご飯を食べました', role: 'Action 3 past (Ate breakfast)', highlight: true },
        ],
      },
      {
        sentenceJp: '仕事を終えてから、映画を見に行きます。',
        sentenceRomaji: 'Shigoto o oete kara, eiga o mi ni ikimasu.',
        sentenceEn: 'After finishing work, I will go to see a movie.',
        breakdown: [
          { text: '仕事を終えて', role: 'Action 1 Te-form' },
          { text: 'から', role: 'After particle (after finishing)', highlight: true },
          { text: '映画を見に行きます', role: 'Action 2 (go to see movie)' },
        ],
      },
    ],
    tip: 'Do not confuse 〜から attached to a polite sentence (busy desu kara = reason "because") with 〜てから attached to a Te-form verb (after doing).',
  },

  // ==========================================
  // UNIT 17: NAI-FORM & OBLIGATIONS
  // ==========================================
  {
    id: 'g_u17_nai_form_obligations',
    unit: 17,
    title: 'Unit 17: Verb Nai-Form, Negative Requests & Obligations (〜なければなりません)',
    japaneseTitle: '第17課：ない形・否定の依頼・義務「〜なければなりません」・不必要',
    level: 'Unit 17',
    summary: 'Mastering the plain negative (Nai-form), asking someone politely not to do something, expressing duty/obligation, and optionality.',
    keyRule: 'Negative request: Verb[Nai] + でください. Obligation: Verb[Nai] drop い -> ければなりません. Not required: 〜なくてもいいです.',
    formula: [
      { label: 'Verb (ない-form)', role: 'verb' },
      { label: 'ければ なりません (Must do)', role: 'predicate' },
    ],
    explanation: [
      'Nai-form rules: Group 1: change the "i-column" syllable to the "a-column" and append ない (e.g. 書きます -> 書かない; 飲みます -> 飲まない; い becomes わ: 会います -> 会わない).',
      'Group 2: drop ます and append ない (食べます -> 食べない; 見ます -> 見ない).',
      'Group 3: します -> しない; 来ます (kimasu) -> こない (konai). Exception: あります -> ない.',
      '〜ないでください asks someone to refrain from an action ("Please do not...").',
      '〜なければなりません conveys strict necessity or obligation ("Must do...").',
      '〜なくてもいいです expresses lack of obligation ("You do not need to do...").',
    ],
    examples: [
      {
        sentenceJp: 'ここでタバコを吸わないでください。',
        sentenceRomaji: 'Koko de tabako o suwanaide kudasai.',
        sentenceEn: 'Please do not smoke here.',
        breakdown: [
          { text: 'ここで', role: 'Location' },
          { text: 'タバコを', role: 'Object (Cigarette)' },
          { text: '吸わないで', role: 'Nai-form of 吸います + で', highlight: true },
          { text: 'ください', role: 'Request ending (please)' },
        ],
      },
      {
        sentenceJp: '毎日薬を飲まなければなりません。',
        sentenceRomaji: 'Mainichi kusuri o nomanakereba narimasen.',
        sentenceEn: 'I must take medicine every day.',
        breakdown: [
          { text: '毎日', role: 'Time adverb' },
          { text: '薬を', role: 'Object (Medicine)' },
          { text: '飲まなければなりません', role: 'Obligation form (must drink/take)', highlight: true },
        ],
      },
    ],
    tip: 'Pay special attention to verbs with "い" before ます: 買います becomes 買わない (kawanai), not かあない.',
  },

  // ==========================================
  // UNIT 18: DICTIONARY FORM & ABILITIES
  // ==========================================
  {
    id: 'g_u18_dict_form_abilities',
    unit: 18,
    title: 'Unit 18: Dictionary Form, Potential Ability & Hobbies (〜ことができる)',
    japaneseTitle: '第18課：辞書形・能力可能「〜ことができる」・趣味・「〜前に」',
    level: 'Unit 18',
    summary: 'The basic dictionary form (plain present), nominalizing actions with こと, expressing abilities, talking about hobbies, and time sequence with 前に.',
    keyRule: 'Ability: Verb[Dict] + ことができます. Hobby: 趣味は Verb[Dict] + ことです. Sequence: Verb[Dict] + 前に.',
    formula: [
      { label: 'Verb (辞書形 / Dict form)', role: 'verb' },
      { label: 'こと が できます (Can do)', role: 'predicate' },
    ],
    explanation: [
      'Dictionary form is the plain present form found in dictionaries.',
      'Group 1: change the "i-column" syllable to the "u-column" (書きます -> 書く, 飲みます -> 飲む, 行きます -> 行く).',
      'Group 2: replace ます with る (食べます -> 食べる, 見ます -> 見る).',
      'Group 3: します -> する, 来ます -> くる (kuru).',
      'こと nominalizes the verb (turns it into a noun concept), allowing it to take が できます (can do).',
      '〜前に expresses an action that occurs before the main verb, always taking dictionary form regardless of the main verb’s tense.',
    ],
    examples: [
      {
        sentenceJp: '日本語の新聞を読むことができます。',
        sentenceRomaji: 'Nihongo no shinbun o yomu koto ga dekimasu.',
        sentenceEn: 'I can read Japanese newspapers.',
        breakdown: [
          { text: '日本語の新聞を', role: 'Object (Japanese newspaper)' },
          { text: '読む', role: 'Dictionary form of 読みます', highlight: true },
          { text: 'ことができます', role: 'Ability formula (can do)', highlight: true },
        ],
      },
      {
        sentenceJp: '日本へ来る前に、ひらがなを勉強しました。',
        sentenceRomaji: 'Nihon e kuru mae ni, hiragana o benkyou shimashita.',
        sentenceEn: 'Before coming to Japan, I studied hiragana.',
        breakdown: [
          { text: '日本へ来る', role: 'Action in dictionary form (come to Japan)' },
          { text: '前に', role: 'Before conjunction', highlight: true },
          { text: 'ひらがなを勉強しました', role: 'Past action' },
        ],
      },
    ],
    tip: 'Before a noun, use の前に (e.g. 食事の前に = before the meal). Before a verb, use dictionary form + 前に (e.g. 食べる前に = before eating).',
  },

  // ==========================================
  // UNIT 19: TA-FORM & EXPERIENCES
  // ==========================================
  {
    id: 'g_u19_ta_form_experiences',
    unit: 19,
    title: 'Unit 19: Verb Ta-Form, Life Experiences (〜たことがある) & Alternating Actions',
    japaneseTitle: '第19課：た形・経験「〜たことがある」・「〜たり〜たりします」・変化',
    level: 'Unit 19',
    summary: 'Forming plain past (Ta-form) using identical phonetic rules to Te-form, discussing lifetime experiences, and listing non-exhaustive representative activities.',
    keyRule: 'Experience: Verb[Ta] + ことがあります. Listing: Verb[Ta]り、Verb[Ta]り します. Becoming: [Adj] + なります.',
    formula: [
      { label: 'Verb (た-form)', role: 'verb' },
      { label: 'こと が あります (Have experienced)', role: 'predicate' },
    ],
    explanation: [
      'Ta-form conjugation follows the exact same phonetic shifts as Te-form, simply replacing て/で with た/だ (e.g. 書いて -> 書いた, 飲んで -> 飲んだ, 食べた -> 食べた).',
      'Verb[Ta] + ことがあります indicates that you have had the experience of doing that action at least once in your life.',
      '〜たり〜たりします lists 2 or 3 non-exhaustive representative activities from among many ("doing things like A and B").',
      'Changes of state: i-adjectives change い to く + なります (寒くなります = becomes cold); na-adjectives and nouns add に + なります (元気になります, 先生になります).',
    ],
    examples: [
      {
        sentenceJp: '一度歌舞伎を見たことがあります。',
        sentenceRomaji: 'Ichido kabuki o mita koto ga arimasu.',
        sentenceEn: 'I have watched Kabuki once before.',
        breakdown: [
          { text: '一度', role: 'Frequency (Once)' },
          { text: '歌舞伎を', role: 'Object (Kabuki)' },
          { text: '見た', role: 'Ta-form of 見ます (watched)', highlight: true },
          { text: 'ことがあります', role: 'Experience formula', highlight: true },
        ],
      },
      {
        sentenceJp: '休日は本を読んだり、音楽を聞いたりします。',
        sentenceRomaji: 'Kyuujitsu wa hon o yondari, ongaku o kiitari shimasu.',
        sentenceEn: 'On holidays I do things like read books and listen to music.',
        breakdown: [
          { text: '本を読んだり', role: 'Action 1 with たり' },
          { text: '音楽を聞いたり', role: 'Action 2 with たり' },
          { text: 'します', role: 'Concluding verb (do)', highlight: true },
        ],
      },
    ],
    tip: 'Do not use 〜たことがあります for events from earlier today or yesterday; it is strictly reserved for historic life experiences.',
  },

  // ==========================================
  // UNIT 20: PLAIN FORM & CASUAL SPEECH
  // ==========================================
  {
    id: 'g_u20_plain_form_casual',
    unit: 20,
    title: 'Unit 20: Plain Form & Conversational Japanese (タメ口)',
    japaneseTitle: '第20課：普通形・丁寧形との対比・日常会話スタイル',
    level: 'Unit 20',
    summary: 'Mastering the plain speech style (普通形) used with friends, family, and peers, contrasting with formal 丁寧形.',
    keyRule: 'Affirmative: 辞書形 / だ. Negative: ない形 / ではない. Past: た形 / だった. Past Neg: なかった / ではなかった.',
    formula: [
      { label: 'Plain Verb / Adjective / Noun', role: 'predicate' },
    ],
    explanation: [
      '丁寧形 (polite style ending in です/ます) is used with teachers, strangers, and seniors.',
      '普通形 (plain style) is the standard neutral form used in writing, internal thoughts, and casual conversation with close acquaintances.',
      'In casual speech questions, the particle か is usually dropped and replaced with rising intonation (e.g. ご飯食べる? = Will you eat?).',
      'The affirmative copula だ is often dropped in casual questions and speech: 明日暇? (Are you free tomorrow?).',
      'The particle を and は are often omitted when context is clear in everyday banter.',
    ],
    examples: [
      {
        sentenceJp: '「明日どこへ行くの？」「京都へ行くよ。」',
        sentenceRomaji: '"Ashita doko e iku no?" "Kyouto e iku yo."',
        sentenceEn: '"Where are you going tomorrow?" "I’m going to Kyoto."',
        breakdown: [
          { text: 'どこへ行くの？', role: 'Casual question with rising intonation', highlight: true },
          { text: '京都へ行くよ', role: 'Plain form affirmative statement + assertion particle よ', highlight: true },
        ],
      },
      {
        sentenceJp: '「今時間ある？」「ううん、ない。」',
        sentenceRomaji: '"Ima jikan aru?" "Uun, nai."',
        sentenceEn: '"Do you have time right now?" "Nah, I don’t."',
        breakdown: [
          { text: '時間ある？', role: 'Plain question (dropped が particle)' },
          { text: 'ううん、ない', role: 'Casual negative reply (Nah, don’t have)', highlight: true },
        ],
      },
    ],
    tip: 'Switching to casual speech too soon with superiors or strangers can sound rude. Maintain polite style until intimacy is clearly established.',
  },

  // ==========================================
  // UNIT 21: OPINIONS, QUOTES & THOUGHTS
  // ==========================================
  {
    id: 'g_u21_opinions_and_quotes',
    unit: 21,
    title: 'Unit 21: Opinions (〜と思う), Quotations (〜と言いました) & Tag Questions (でしょう)',
    japaneseTitle: '第21課：意見「〜と思う」・引用「〜と言った」・確認「〜でしょう」',
    level: 'Unit 21',
    summary: 'Framing clauses into thoughts and personal viewpoints with と思います, reporting direct and indirect speech with と言いました.',
    keyRule: '[Plain form clause] + と 思います (I think that...). [Quote / Plain form] + と 言いました (Said that...).',
    formula: [
      { label: 'Plain Clause', role: 'object' },
      { label: 'と (to)', role: 'particle' },
      { label: '思います / 言いました', role: 'verb' },
    ],
    explanation: [
      'The quotation particle と acts like quotation marks or the English conjunction "that".',
      'The clause preceding と must always be in plain form (e.g. 日本はおもしろいと思います = I think Japan is interesting).',
      'Direct quote: 「...」と言いました. Indirect quote: [Plain clause] と言いました.',
      '〜でしょう (deshou) with rising intonation seeks agreement or confirmation from the listener ("..., right?").',
    ],
    examples: [
      {
        sentenceJp: '明日は雨が降ると思います。',
        sentenceRomaji: 'Ashita wa ame ga furu to omoimasu.',
        sentenceEn: 'I think it will rain tomorrow.',
        breakdown: [
          { text: '明日は', role: 'Topic (Tomorrow)' },
          { text: '雨が降る', role: 'Plain form clause (Rain falls)' },
          { text: 'と', role: 'Quotation particle (that)', highlight: true },
          { text: '思います', role: 'Verb (think)', highlight: true },
        ],
      },
      {
        sentenceJp: '田中さんは「来週出張する」と言いました。',
        sentenceRomaji: 'Tanaka-san wa "Raishuu shucchou suru" to iimashita.',
        sentenceEn: 'Mr. Tanaka said, "I will go on a business trip next week."',
        breakdown: [
          { text: '田中さんは', role: 'Speaker (Mr. Tanaka)' },
          { text: '「来週出張する」', role: 'Quoted plain statement' },
          { text: 'と', role: 'Quotation marker' },
          { text: '言いました', role: 'Past verb (said)', highlight: true },
        ],
      },
    ],
    tip: 'To disagree politely, say: 「私はそう思いません」(I don’t think so).',
  },

  // ==========================================
  // UNIT 22: NOUN-MODIFYING CLAUSES
  // ==========================================
  {
    id: 'g_u22_noun_modifying_clauses',
    unit: 22,
    title: 'Unit 22: Noun Modification & Relative Clauses (連体修飾節)',
    japaneseTitle: '第22課：連体修飾節・名詞を修飾する文',
    level: 'Unit 22',
    summary: 'In Japanese, entire descriptive sentences sit directly in front of nouns to create relative clauses, without any relative pronouns.',
    keyRule: '[Plain form sentence] + [Noun]. Within the modifying clause, the subject is marked with が (ga), never は.',
    formula: [
      { label: 'Modifying Clause (Plain Form)', role: 'predicate' },
      { label: 'Modified Noun', role: 'topic' },
    ],
    explanation: [
      'English puts relative clauses after the noun: "The book [that I bought yesterday]". Japanese puts the clause BEFORE: "[私が昨日買った] 本".',
      'The verb inside the modifying clause MUST be in plain form (辞書, ない, た, なかった).',
      'The subject inside the clause must take が (ga), because は would conflict with the main sentence topic.',
      'Also covers clothing verbs: 着ます (kimasu: upper body shirts/jackets), 履きます (hakimasu: lower body trousers/shoes), 被ります (kaburimasu: hats), かけます (kakemasu: glasses).',
    ],
    examples: [
      {
        sentenceJp: 'これは母が作ったケーキです。',
        sentenceRomaji: 'Kore wa haha ga tsukutta keeki desu.',
        sentenceEn: 'This is the cake that my mother made.',
        breakdown: [
          { text: 'これは', role: 'Main topic (This)' },
          { text: '母が作った', role: 'Relative clause (Mother made)', highlight: true },
          { text: 'ケーキ', role: 'Modified noun (Cake)' },
          { text: 'です', role: 'Copula (is)' },
        ],
      },
      {
        sentenceJp: 'あそこで眼鏡をかけている人は誰ですか？',
        sentenceRomaji: 'Asoko de megane o kakete iru hito wa dare desu ka?',
        sentenceEn: 'Who is the person wearing glasses over there?',
        breakdown: [
          { text: '眼鏡をかけている', role: 'Modifying clause (wearing glasses)', highlight: true },
          { text: '人', role: 'Modified noun (person)' },
          { text: 'は誰ですか', role: 'Main question (is who?)' },
        ],
      },
    ],
    tip: 'Practice translating from the head noun backwards: look at the final noun of the phrase, then look at the clause modifying it immediately to its left.',
  },

  // ==========================================
  // UNIT 23: CONDITIONS & TIMING (とき & と)
  // ==========================================
  {
    id: 'g_u23_toki_and_to',
    unit: 23,
    title: 'Unit 23: Timing (〜とき) & Natural Consequence Condition (〜と)',
    japaneseTitle: '第23課：時「〜とき」・機械操作や道案内「〜と」',
    level: 'Unit 23',
    summary: 'Using 〜とき (when...) for temporal context, and 〜と for inevitable natural outcomes, machine operations, and street directions.',
    keyRule: '[Dict/Ta/Nai] + とき (When...). [Verb Dict] + と、[Inevitable Result].',
    formula: [
      { label: 'Condition / Trigger', role: 'topic' },
      { label: 'と (Whenever)', role: 'particle' },
      { label: 'Automatic Result', role: 'verb' },
    ],
    explanation: [
      '〜とき specifies the time context: 図書館で本を借りるとき、カードが要ります (When you borrow books at the library, you need a card).',
      'Tense nuance with とき: 辞書形 + とき = before/in the process of; た形 + とき = after completion.',
      'Verb[Dict] + と indicates an inevitable, natural, or automatic result ("Whenever X happens, Y automatically follows").',
      'Common in road navigation: 「この角を右へ曲がると、銀行があります」(When you turn right at this corner, the bank is right there).',
      'The clause following と cannot contain requests (〜てください), invitations, or personal intentions.',
    ],
    examples: [
      {
        sentenceJp: 'このボタンを押すと、切符が出ます。',
        sentenceRomaji: 'Kono botan o osu to, kippu ga demasu.',
        sentenceEn: 'When you press this button, the ticket comes out automatically.',
        breakdown: [
          { text: 'このボタンを押す', role: 'Trigger action (Press button)' },
          { text: 'と', role: 'Condition particle (whenever)', highlight: true },
          { text: '切符が出ます', role: 'Automatic result (Ticket comes out)', highlight: true },
        ],
      },
      {
        sentenceJp: '朝起きたとき、窓を開けます。',
        sentenceRomaji: 'Asa okita toki, mado o akemasu.',
        sentenceEn: 'When I wake up in the morning, I open the window.',
        breakdown: [
          { text: '朝起きた', role: 'Past action' },
          { text: 'とき', role: 'Temporal particle (when)', highlight: true },
          { text: '窓を開けます', role: 'Action (open window)' },
        ],
      },
    ],
    tip: 'When giving street directions in Japanese, always use the 〜と pattern: まっすぐ行くと (if you go straight), 信号を渡ると (when you cross the signal).',
  },

  // ==========================================
  // UNIT 24: GIVING & RECEIVING FAVORS
  // ==========================================
  {
    id: 'g_u24_giving_receiving_favors',
    unit: 24,
    title: 'Unit 24: Giving & Receiving Favors (あげる/もらう/くれる)',
    japaneseTitle: '第24課：行為の授受「〜てあげる」「〜てもらう」「〜てくれる」',
    level: 'Unit 24',
    summary: 'The social etiquette of exchanging actions and favors: doing things for others, receiving favors, and having someone do a favor for you.',
    keyRule: 'Verb[Te] + あげる (I do favor for someone). Verb[Te] + もらう (Receive favor from someone). Verb[Te] + くれる (Someone does favor for me).',
    formula: [
      { label: 'Benefactor / Beneficiary', role: 'topic' },
      { label: 'Action (て-form)', role: 'verb' },
      { label: 'くれる / もらう / あげる', role: 'predicate' },
    ],
    explanation: [
      '〜てあげます: The speaker performs a helpful action for someone else (use with caution directly to superiors as it implies doing a favor).',
      '〜てもらいます: The speaker receives a beneficial action performed by someone else (marked with に/から).',
      '〜てくれます: Someone else performs a beneficial action directed towards the speaker or speaker’s in-group.',
      'くれる expresses heartfelt gratitude: 田中さんが駅まで送ってくれました (Mr. Tanaka kindly took me to the station).',
      'Polite request: Verb[Te] + くださいませんか (Could you please do for me?).',
    ],
    examples: [
      {
        sentenceJp: '山田さんが傘を貸してくれました。',
        sentenceRomaji: 'Yamada-san ga kasa o kashite kuremashita.',
        sentenceEn: 'Mr. Yamada kindly lent me an umbrella.',
        breakdown: [
          { text: '山田さんが', role: 'Kind benefactor' },
          { text: '傘を', role: 'Object (Umbrella)' },
          { text: '貸して', role: 'Te-form of 貸します (lend)' },
          { text: 'くれました', role: 'Favor toward speaker (kindly did for me)', highlight: true },
        ],
      },
      {
        sentenceJp: '私は先生に作文を直してもらいました。',
        sentenceRomaji: 'Watashi wa sensei ni sakubun o naoshite moraimashita.',
        sentenceEn: 'I had the teacher correct my essay.',
        breakdown: [
          { text: '私は', role: 'Receiver of benefit (I)' },
          { text: '先生に', role: 'Source of favor (By teacher)' },
          { text: '作文を', role: 'Object (Essay)' },
          { text: '直してもらいました', role: 'Received favor (had corrected)', highlight: true },
        ],
      },
    ],
    tip: 'Remember that くれます always moves toward the speaker or the speaker’s family: [Someone] が 私に [Favor] を してくれます.',
  },

  // ==========================================
  // UNIT 25: CONDITIONALS "TARA" & "TEMO"
  // ==========================================
  {
    id: 'g_u25_tara_and_temo',
    unit: 25,
    title: 'Unit 25: Conditionals (〜たら) & Concessions (〜ても)',
    japaneseTitle: '第25課：仮定条件「〜たら」・確定条件・逆接条件「〜ても」',
    level: 'Unit 25',
    summary: 'The ultimate JLPT N5 capstone: forming general conditional "if/when" with 〜たら, and expressing contrast "even if / even though" with 〜ても.',
    keyRule: 'Condition: Verb[Ta] + ら (If/When). Concession: Verb[Te] + も (Even if).',
    formula: [
      { label: 'Hypothetical / Contingency', role: 'topic' },
      { label: '〜たら (If / When)', role: 'particle' },
      { label: 'Consequence / Intent', role: 'verb' },
    ],
    explanation: [
      'To form 〜たら, simply take the past tense (Ta-form) of any verb, adjective, or noun and append ら (e.g. 雨が降ったら, 安かったら, 暇だったら).',
      'Hypothetical condition: 「もし1億円あったら、何をしますか」(If you had 100 million yen, what would you do?).',
      'Definite temporal condition: 「10時になったら、出かけましょう」(When it turns 10:00, let’s leave).',
      '〜ても / 〜でも expresses concession: "Even if X happens, Y still holds true" (e.g. 雨が降っても、行きます = Even if it rains, I will go).',
      'Concession with adjectives: i-adjectives change くて -> くても (高くても買います = Even if expensive, I will buy it); na-adjectives/nouns add でも (日曜日でも働きます = Even if it’s Sunday, I work).',
    ],
    examples: [
      {
        sentenceJp: '時間がなかったら、明日やりましょう。',
        sentenceRomaji: 'Jikan ga nakattara, ashita yarimashou.',
        sentenceEn: 'If there is no time, let’s do it tomorrow.',
        breakdown: [
          { text: '時間がなかった', role: 'Past negative of あります (Had no time)' },
          { text: 'ら', role: 'Conditional suffix (if)', highlight: true },
          { text: '明日やりましょう', role: 'Consequence proposal (Let’s do tomorrow)' },
        ],
      },
      {
        sentenceJp: 'いくら安くても、買いません。',
        sentenceRomaji: 'Ikura yasukutemo, kaimasen.',
        sentenceEn: 'No matter how cheap it is, I will not buy it.',
        breakdown: [
          { text: 'いくら', role: 'Concession intensifier (No matter how...)' },
          { text: '安くても', role: 'Concession of i-adj (even if cheap)', highlight: true },
          { text: '買いません', role: 'Definite action (will not buy)' },
        ],
      },
    ],
    tip: '〜たら is the most versatile conditional in Japanese. Unlike 〜と, the second clause of a 〜たら sentence CAN freely contain requests, permissions, or proposals.',
  },
];

export const SENTENCE_PUZZLES: SentencePuzzle[] = [
  {
    id: 'puz_1',
    englishPrompt: 'I drink green tea.',
    japaneseFull: '私はお茶を飲みます。',
    romajiFull: 'Watashi wa ocha o nomimasu.',
    tokens: [
      { id: 't_watashi', text: '私' },
      { id: 't_wa', text: 'は' },
      { id: 't_ocha', text: 'お茶' },
      { id: 't_o', text: 'を' },
      { id: 't_nomimasu', text: '飲みます' },
    ],
    correctOrder: ['t_watashi', 't_wa', 't_ocha', 't_o', 't_nomimasu'],
    hint: 'Remember SOV order: Topic (I) + は + Object (Tea) + を + Verb (Drink).',
  },
  {
    id: 'puz_2',
    englishPrompt: 'This is delicious sushi.',
    japaneseFull: 'これは美味しい寿司です。',
    romajiFull: 'Kore wa oishii sushi desu.',
    tokens: [
      { id: 't_kore', text: 'これ' },
      { id: 't_wa2', text: 'は' },
      { id: 't_oishii', text: '美味しい' },
      { id: 't_sushi', text: '寿司' },
      { id: 't_desu', text: 'です' },
    ],
    correctOrder: ['t_kore', 't_wa2', 't_oishii', 't_sushi', 't_desu'],
    hint: 'Topic (This) + は + Adjective (Delicious) + Noun (Sushi) + です.',
  },
  {
    id: 'puz_3',
    englishPrompt: 'I will go to Japan tomorrow.',
    japaneseFull: '明日日本へ行きます。',
    romajiFull: 'Ashita Nihon e ikimasu.',
    tokens: [
      { id: 't_ashita', text: '明日' },
      { id: 't_nihon', text: '日本' },
      { id: 't_e', text: 'へ' },
      { id: 't_ikimasu', text: '行きます' },
    ],
    correctOrder: ['t_ashita', 't_nihon', 't_e', 't_ikimasu'],
    hint: 'Time (Tomorrow) + Destination (Japan) + Direction particle (へ) + Movement verb (Go).',
  },
  {
    id: 'puz_4',
    englishPrompt: 'Where is the train station?',
    japaneseFull: '駅はどこですか？',
    romajiFull: 'Eki wa doko desu ka?',
    tokens: [
      { id: 't_eki', text: '駅' },
      { id: 't_wa3', text: 'は' },
      { id: 't_doko', text: 'どこ' },
      { id: 't_desuka', text: 'ですか' },
    ],
    correctOrder: ['t_eki', 't_wa3', 't_doko', 't_desuka'],
    hint: 'Topic (Station) + は + Question word (Where) + ですか.',
  },
  {
    id: 'puz_5',
    englishPrompt: 'Please write your name here.',
    japaneseFull: 'ここに名前を書いてください。',
    romajiFull: 'Koko ni namae o kaite kudasai.',
    tokens: [
      { id: 't_koko', text: 'ここに' },
      { id: 't_namae', text: '名前' },
      { id: 't_o_puz5', text: 'を' },
      { id: 't_kaite', text: '書いて' },
      { id: 't_kudasai', text: 'ください' },
    ],
    correctOrder: ['t_koko', 't_namae', 't_o_puz5', 't_kaite', 't_kudasai'],
    hint: 'Location (Here) + Object (Name) + を + Te-form (Write) + ください.',
  },
  {
    id: 'puz_6',
    englishPrompt: 'I have climbed Mt. Fuji before.',
    japaneseFull: '富士山に登ったことがあります。',
    romajiFull: 'Fujisan ni nobotta koto ga arimasu.',
    tokens: [
      { id: 't_fuji', text: '富士山に' },
      { id: 't_nobotta', text: '登った' },
      { id: 't_koto', text: 'こと' },
      { id: 't_ga_puz6', text: 'が' },
      { id: 't_arimasu_puz6', text: 'あります' },
    ],
    correctOrder: ['t_fuji', 't_nobotta', 't_koto', 't_ga_puz6', 't_arimasu_puz6'],
    hint: 'Destination + Ta-form (Climbed) + こと + が + あります (Experience).',
  },
  {
    id: 'puz_7',
    englishPrompt: 'If I have money, I will travel.',
    japaneseFull: 'お金があったら旅行します。',
    romajiFull: 'Okane ga attara ryokou shimasu.',
    tokens: [
      { id: 't_okane', text: 'お金' },
      { id: 't_ga_puz7', text: 'が' },
      { id: 't_attara', text: 'あったら' },
      { id: 't_ryokou', text: '旅行します' },
    ],
    correctOrder: ['t_okane', 't_ga_puz7', 't_attara', 't_ryokou'],
    hint: 'Condition: Money + が + Had-If (あったら) + Result (Travel).',
  },
];
