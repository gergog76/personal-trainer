// Auto-generált seed adat a trainings.json migrációból.
// Ez csak akkor kerül a Blobs store-ba, ha az még üres (első betöltéskor).
export default {
  "constants": {
    "work_sec": 40,
    "rest_sec": 10,
    "quick_rest_sec": 5,
    "round_rest_sec": 60,
    "prep_sec": 10,
    "block_transition_sec": 10,
    "rounds_min": 1,
    "rounds_max": 5
  },
  "exercises": {
    "karkorzes-elore": {
      "name": "Karkörzés előre",
      "category": "warmup",
      "equipment": [],
      "description": "Állj egyenesen, és körözz mindkét karoddal nagy, kontrollált mozdulatokkal előre. Lazítsd be a vállad.",
      "image": "images/karkorzeselore.webp",
      "duration_sec": 20,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall"
      ]
    },
    "karkorzes-hatra": {
      "name": "Karkörzés hátra",
      "category": "warmup",
      "equipment": [],
      "description": "Folytasd, most hátrafelé körözz mindkét karoddal nagy, kontrollált mozdulatokkal. Lazítsd be a vállad.",
      "image": "images/karkorzeshatra.webp",
      "duration_sec": 20,
      "quick_rest_default": true,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall"
      ]
    },
    "csipokorzes-oramutato-jarasaval-megegyezoen": {
      "name": "Csípőkörzés – óramutató járásával megegyezően",
      "category": "warmup",
      "equipment": [],
      "description": "Kezed a csípődön, körözz a csípőddel az óramutató járásával megegyező irányba, kis-közepes amplitúdóval, kényelmes tartományban.",
      "image": "images/csipokorzes.webp",
      "duration_sec": 20,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "csipo"
      ]
    },
    "csipokorzes-oramutato-jarasaval-ellentetesen": {
      "name": "Csípőkörzés – óramutató járásával ellentétesen",
      "category": "warmup",
      "equipment": [],
      "description": "Válts irányt: körözz a csípőddel az óramutató járásával ellentétesen, kis-közepes amplitúdóval, kényelmes tartományban.",
      "image": "images/csipokorzes.webp",
      "duration_sec": 20,
      "quick_rest_default": true,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "csipo"
      ]
    },
    "macska-teve-mozgas": {
      "name": "Macska-teve mozgás",
      "category": "warmup",
      "equipment": [],
      "description": "Négykézláb, kezek a váll, térdek a csípő alatt. Lassan, kontrolláltan domborítsd, majd homorítsd a hátad, a fájdalommentes tartományon belül maradva.",
      "image": "images/macskateve.webp",
      "duration_sec": 40,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "also-hat",
        "has"
      ]
    },
    "csipohajlito-bemozgatas": {
      "name": "Csípőhajlító bemozgatás",
      "category": "warmup",
      "equipment": [],
      "description": "Állva, lassú, kontrollált lépésekkel emeld egy kicsit magasabbra a térded helyben járás közben, hogy bemozgasd a csípőt.",
      "image": "images/csipohajlitobemozgatas.webp",
      "duration_sec": 30,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "csipo"
      ]
    },
    "konnyu-helyben-jaras": {
      "name": "Könnyű helyben járás",
      "category": "warmup",
      "equipment": [],
      "description": "Járj helyben laza, könnyed tempóban, karlengetéssel, hogy felmelegítsd a testet.",
      "image": "images/konnyuhelybenjaras.webp",
      "duration_sec": 30,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "teljes-test"
      ]
    },
    "bird-dog": {
      "name": "Bird-dog",
      "category": "main",
      "equipment": [],
      "description": "Négykézláb, csukló a váll alatt, térd a csípő alatt. Nyújtsd ki egyszerre az egyik karod előre és az ellentétes lábad hátra, közben a derekad semleges marad, ne homorodjon be. Tarts 2 másodpercet, majd válts oldalt.",
      "subtitle": "váltott oldal",
      "image": "images/birddog.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"58\" cy=\"28\" r=\"6\"/><path d=\"M52 32 L24 38\"/><path d=\"M52 32 L52 62\"/><path d=\"M24 38 L24 62\"/>",
      "legacy_pose_b": "<circle cx=\"60\" cy=\"24\" r=\"6\"/><path d=\"M52 30 L24 36\"/><path d=\"M52 30 L70 28\"/><path d=\"M24 36 L6 34\"/>",
      "sided": false,
      "muscle_groups": [
        "has",
        "also-hat",
        "farizom"
      ]
    },
    "dead-bug": {
      "name": "Dead bug",
      "category": "main",
      "equipment": [],
      "description": "Hanyatt fekve, térdek 90 fokban a csípő fölött, karok a mennyezet felé nyúlnak. A derekad nyomd enyhén a talajhoz, és tartsd is ott mozgás közben. Nyújtsd ki lassan az egyik karod hátra és az ellentétes lábad előre, majd hozd vissza, és válts oldalt.",
      "subtitle": "váltott oldal",
      "image": "images/deadbug.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<path d=\"M18 50 L55 50\"/><circle cx=\"14\" cy=\"50\" r=\"6\"/><path d=\"M55 50 L55 30 L70 30\"/><path d=\"M35 50 L35 25\"/>",
      "legacy_pose_b": "<path d=\"M18 50 L55 50\"/><circle cx=\"14\" cy=\"50\" r=\"6\"/><path d=\"M55 50 L72 58\"/><path d=\"M35 50 L20 30\"/>",
      "sided": false,
      "muscle_groups": [
        "has",
        "also-hat"
      ]
    },
    "csipoemeles": {
      "name": "Csípőemelés",
      "category": "main",
      "equipment": [],
      "description": "Hanyatt fekve, térdek behajlítva, talpak a talajon csípőszélességben. Emeld fel a csípőd, amíg váll-csípő-térd egy vonalba nem kerül. Szorítsd össze a farizmot fent, majd engedd vissza kontrolláltan.",
      "subtitle": "glute bridge",
      "image": "images/csipoemeles.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"14\" cy=\"55\" r=\"6\"/><path d=\"M20 55 L45 55\"/><path d=\"M45 55 L50 62 L50 72\"/><path d=\"M20 57 L8 57\"/>",
      "legacy_pose_b": "<circle cx=\"14\" cy=\"55\" r=\"6\"/><path d=\"M20 55 L45 45\"/><path d=\"M45 45 L50 60 L50 72\"/><path d=\"M20 57 L8 57\"/>",
      "sided": false,
      "muscle_groups": [
        "farizom",
        "csipo",
        "also-hat"
      ]
    },
    "oldalso-plank": {
      "name": "Oldalsó plank",
      "category": "main",
      "equipment": [],
      "description": "Oldaladra fekve a bal könyököd pontosan a bal válladat alatt van. Emeld meg a csípőd, hogy a tested egyenes vonalban legyen fejtől bokáig. Ne engedd lecsúszni a csípőd.",
      "subtitle": "bal könyökön",
      "image": "images/oldalsoplank.webp",
      "quick_rest_default": false,
      "mirror": true,
      "legacy_pose_a": "<path d=\"M20 58 L20 45\"/><path d=\"M20 45 L50 50 L78 58\"/><circle cx=\"16\" cy=\"40\" r=\"6\"/>",
      "legacy_pose_b": "<path d=\"M20 58 L20 44\"/><path d=\"M20 44 L50 48 L78 56\"/><circle cx=\"16\" cy=\"39\" r=\"6\"/>",
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Fordulj a másik oldaladra: a jobb könyököd van pontosan a jobb válladat alatt. Emeld meg a csípőd, hogy a tested egyenes vonalban legyen fejtől bokáig. Ne engedd lecsúszni a csípőd.",
      "muscle_groups": [
        "has",
        "vall"
      ]
    },
    "fekvotamasz": {
      "name": "Fekvőtámasz",
      "category": "main",
      "equipment": [],
      "description": "Tenyerek vállszélességben, test egyenes vonalban fejtől sarokig. Ereszkedj le, amíg a mellkasod majdnem éri a talajt, majd told vissza magad. Figyelj, hogy a csípőd ne süllyedjen be. Nehezebb esetben térdelt fekvőtámasz.",
      "subtitle": "csípő stabilan",
      "image": "images/fekvotamasz.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"18\" cy=\"26\" r=\"6\"/><path d=\"M24 30 L60 44\"/><path d=\"M28 32 L28 58\"/><path d=\"M60 44 L76 50\"/>",
      "legacy_pose_b": "<circle cx=\"20\" cy=\"34\" r=\"6\"/><path d=\"M26 38 L60 46\"/><path d=\"M30 40 L22 52 L28 58\"/><path d=\"M60 46 L76 51\"/>",
      "sided": false,
      "muscle_groups": [
        "mellkas",
        "vall",
        "has"
      ]
    },
    "plank": {
      "name": "Plank",
      "category": "main",
      "equipment": [],
      "description": "Alkarok a talajon, könyök pont a váll alatt. Test egyenes vonal fejtől sarokig, a csípőd se ne süllyedjen, se ne emelkedjen túl magasra. Feszítsd meg a hasad és a farizmod.",
      "subtitle": "deszka tartás",
      "image": "images/plank.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"14\" cy=\"30\" r=\"6\"/><path d=\"M20 32 L64 45\"/><path d=\"M25 34 L25 56\"/><path d=\"M64 45 L77 50\"/>",
      "legacy_pose_b": "<circle cx=\"14\" cy=\"32\" r=\"6\"/><path d=\"M20 34 L64 44\"/><path d=\"M25 36 L25 57\"/><path d=\"M64 44 L77 49\"/>",
      "sided": false,
      "muscle_groups": [
        "has",
        "vall"
      ]
    },
    "hegymaszo": {
      "name": "Hegymászó",
      "category": "main",
      "equipment": [],
      "description": "Fekvőtámasz-pozícióból indulsz. Egyik térdet kontrolláltan húzd a mellkasod felé, majd tedd vissza, és válts lábat. A csípőd maradjon alacsonyan és stabilan, ne biccenjen fel-le.",
      "subtitle": "csípő stabilan",
      "image": "images/hegymaszo.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"14\" cy=\"30\" r=\"6\"/><path d=\"M20 32 L62 46\"/><path d=\"M25 34 L25 56\"/><path d=\"M62 46 L75 51\"/>",
      "legacy_pose_b": "<circle cx=\"14\" cy=\"30\" r=\"6\"/><path d=\"M20 32 L62 46\"/><path d=\"M25 34 L25 56\"/><path d=\"M62 46 L48 50 L42 38\"/>",
      "sided": false,
      "muscle_groups": [
        "has",
        "csipo"
      ]
    },
    "sekely-guggolas": {
      "name": "Sekély guggolás",
      "category": "main",
      "equipment": [],
      "description": "Láb vállszélességben. Ülj hátra, mintha egy székre ülnél: csípő hátra, térd a lábujjak irányába, hát egyenesen. Csak addig ereszkedj, ameddig kényelmesen tudod tartani a hátad egyenesen és a sarkad a talajon marad.",
      "subtitle": "csak kényelmes mélységig",
      "image": "images/sekelyguggolas.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"12\" r=\"6\"/><path d=\"M40 18 L40 42\"/><path d=\"M40 42 L32 58 L32 72\"/><path d=\"M40 42 L48 58 L48 72\"/><path d=\"M40 22 L34 38\"/><path d=\"M40 22 L46 38\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"18\" r=\"6\"/><path d=\"M40 24 L40 46\"/><path d=\"M40 46 L34 56 L34 72\"/><path d=\"M40 46 L46 56 L46 72\"/><path d=\"M40 28 L50 26\"/><path d=\"M40 28 L50 32\"/>",
      "sided": false,
      "muscle_groups": [
        "comb-lab",
        "farizom",
        "also-hat"
      ]
    },
    "gyerekpoz": {
      "name": "Gyerekpóz",
      "category": "cooldown",
      "equipment": [],
      "description": "Ülj a sarkadra, karod nyújtsd előre a talajon, homlokod a talaj felé. Csak annyira hajolj előre, amennyire kényelmes – ha az előrehajlás kellemetlen, hagyd ki.",
      "image": "images/gyerekpoz.webp",
      "duration_sec": 45,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "also-hat",
        "csipo"
      ]
    },
    "galamb-gyakorlat": {
      "name": "Galamb gyakorlat",
      "category": "cooldown",
      "equipment": [],
      "description": "Ülj a földre, bal lábad hajlítsd magad elé, jobb lábad nyújtsd hátra. Maradj egyenes háttal, ne dőlj előre – kezeddel támaszkodj magad mellett a talajon. Ha bármi kellemetlent érzel a derekadban, hagyd ki.",
      "image": "images/galamb.webp",
      "duration_sec": 45,
      "quick_rest_default": false,
      "mirror": false,
      "sided": true,
      "side_labels": {
        "left": "bal láb",
        "right": "jobb láb"
      },
      "description_switch": "Válts oldalt: jobb lábad hajlítsd magad elé, bal lábad nyújtsd hátra. Maradj egyenes háttal, ne dőlj előre – kezeddel támaszkodj magad mellett a talajon. Ha bármi kellemetlent érzel a derekadban, hagyd ki.",
      "muscle_groups": [
        "csipo"
      ]
    },
    "csipohajlito-nyujtas": {
      "name": "Csípőhajlító nyújtás",
      "category": "cooldown",
      "equipment": [],
      "description": "Állva vagy féltérdelésben told enyhén előre a csípőd, amíg érzed a nyúlást a bal csípő elején.",
      "image": "images/csipohajlitonyujtas.webp",
      "duration_sec": 45,
      "quick_rest_default": false,
      "mirror": false,
      "sided": true,
      "side_labels": {
        "left": "bal láb",
        "right": "jobb láb"
      },
      "description_switch": "Válts oldalt: told enyhén előre a csípőd, amíg érzed a nyúlást a jobb csípő elején.",
      "muscle_groups": [
        "csipo"
      ]
    },
    "vallkorzes-elore": {
      "name": "Vállkörzés előre",
      "category": "warmup",
      "equipment": [],
      "description": "Körözz mindkét válladdal előre irányba, nagy, lassú mozdulatokkal.",
      "image": "images/vallkorzeselore.webp",
      "duration_sec": 30,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall"
      ]
    },
    "vallkorzes-hatra": {
      "name": "Vállkörzés hátra",
      "category": "warmup",
      "equipment": [],
      "description": "Körözz mindkét válladdal hátra irányba, nagy, lassú mozdulatokkal.",
      "image": "images/vallkorzeselore.webp",
      "duration_sec": 30,
      "quick_rest_default": true,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall"
      ]
    },
    "fej-oldalra-dontes": {
      "name": "Fej oldalra döntés",
      "category": "warmup",
      "equipment": [],
      "description": "Döntsd a fejed lassan oldalra (a füled a válladhoz közelít), majd vissza, váltott oldalra. Ne hajtsd előre a nyakad.",
      "image": "images/fejoldalradontes.webp",
      "duration_sec": 60,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "nyak"
      ]
    },
    "fej-forgatasa": {
      "name": "Fej forgatása",
      "category": "warmup",
      "equipment": [],
      "description": "Fordítsd a fejed lassan jobbra, majd balra, csak addig, ameddig kényelmes.",
      "image": "images/fejforgatasa.webp",
      "duration_sec": 60,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "nyak"
      ]
    },
    "hatra-nyomas-nyak": {
      "name": "Hátra nyomás (nyak)",
      "category": "main",
      "equipment": [],
      "description": "Tedd a kezed a fejed hátuljára. Nyomd a fejed hátra a kezed ellen úgy, hogy a kezed megtartja – nincs tényleges mozgás, csak feszülés. Tarts 5 másodpercet, engedd el, és ismételd az idő alatt.",
      "subtitle": "izometrikus",
      "image": "images/hatranyomasnyak.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"44\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 60\"/><path d=\"M40 26 L52 14 L44 8\"/>",
      "legacy_pose_b": "<circle cx=\"44\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 60\"/><path d=\"M40 26 L52 14 L44 8\"/>",
      "sided": false,
      "muscle_groups": [
        "nyak"
      ]
    },
    "oldalra-nyomas": {
      "name": "Oldalra nyomás",
      "category": "main",
      "equipment": [],
      "description": "Bal tenyered a bal halántékodon. Nyomd a fejed a kezed felé, a kéz tartja ellen – nincs mozgás, csak feszülés. Tarts 5 másodpercet, engedd el, ismételd.",
      "subtitle": "izometrikus",
      "image": "images/oldalranyomas.webp",
      "quick_rest_default": false,
      "mirror": true,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 60\"/><path d=\"M40 24 L28 16 L32 10\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 60\"/><path d=\"M40 24 L28 16 L32 10\"/>",
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Válts oldalt: jobb tenyered a jobb halántékodon. Nyomd a fejed a kezed felé, a kéz tartja ellen – nincs mozgás, csak feszülés. Tarts 5 másodpercet, engedd el, ismételd.",
      "muscle_groups": [
        "nyak"
      ]
    },
    "forgato-nyomas": {
      "name": "Forgató nyomás",
      "category": "main",
      "equipment": [],
      "description": "Tenyered az arcod bal oldalán. Próbáld elfordítani a fejed balra a kezed ellen, ami megakadályozza a mozgást. Tarts 5 másodpercet, engedd el, ismételd.",
      "subtitle": "izometrikus",
      "image": "images/forgatonyomas.webp",
      "quick_rest_default": false,
      "mirror": true,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 60\"/><path d=\"M40 24 L30 20 L34 12\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 60\"/><path d=\"M40 24 L30 20 L34 12\"/>",
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Válts oldalt: tenyered az arcod jobb oldalán. Próbáld elfordítani a fejed jobbra a kezed ellen, ami megakadályozza a mozgást. Tarts 5 másodpercet, engedd el, ismételd.",
      "muscle_groups": [
        "nyak"
      ]
    },
    "lapocka-osszehuzas": {
      "name": "Lapocka-összehúzás",
      "category": "main",
      "equipment": [],
      "description": "Állj egyenesen, karod lazán az oldaladon. Húzd össze a lapockáid, mintha egy ceruzát fognál köztük a hátadon, a válladat kicsit hátrahúzva. Tarts 3 másodpercet, engedd el. Ismételd.",
      "subtitle": "hátulnézet",
      "image": "images/lapockaosszehuzas.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M24 26 L56 26\"/><path d=\"M24 26 L20 50\"/><path d=\"M56 26 L60 50\"/><path d=\"M32 32 L34 36\"/><path d=\"M48 32 L46 36\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M24 26 L56 26\"/><path d=\"M24 26 L20 50\"/><path d=\"M56 26 L60 50\"/><path d=\"M36 32 L37 36\"/><path d=\"M44 32 L43 36\"/>",
      "sided": false,
      "muscle_groups": [
        "felso-hat",
        "vall"
      ]
    },
    "fal-angyal": {
      "name": "Fal-angyal",
      "category": "main",
      "equipment": [],
      "description": "Háttal a falnak (vagy csak állva, ha nincs fal kéznél), karod indulj 'W' tartásból, csúsztasd fel 'Y' alakba, majd vissza – lassan, kontrolláltan.",
      "subtitle": "hátulnézet",
      "image": "images/falangyal.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M24 26 L56 26\"/><path d=\"M24 26 L16 36 L22 22\"/><path d=\"M56 26 L64 36 L58 22\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M24 26 L56 26\"/><path d=\"M24 26 L6 6\"/><path d=\"M56 26 L74 6\"/>",
      "sided": false,
      "muscle_groups": [
        "vall",
        "felso-hat"
      ]
    },
    "kulso-forgatas": {
      "name": "Külső forgatás",
      "category": "main",
      "equipment": [],
      "description": "Bal könyököd 90 fokban, szorosan a törzsedhez szorítva. Forgasd kifelé az alkarod (üres kézzel), mintha egy ajtót nyitnál, a könyököd közben a helyén marad. Lassan vissza.",
      "subtitle": "könyök a törzsön",
      "image": "images/kulsoforgatas.webp",
      "quick_rest_default": false,
      "mirror": true,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"12\" r=\"6\"/><path d=\"M40 18 L40 58\"/><path d=\"M40 26 L40 44\"/><path d=\"M40 44 L52 50\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"12\" r=\"6\"/><path d=\"M40 18 L40 58\"/><path d=\"M40 26 L40 44\"/><path d=\"M40 44 L58 38\"/>",
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Válts oldalt: jobb könyököd 90 fokban, szorosan a törzsedhez szorítva. Forgasd kifelé az alkarod, a könyököd a helyén marad. Lassan vissza.",
      "muscle_groups": [
        "vall"
      ]
    },
    "gyerekpoz-szalag-szethuzas": {
      "name": "Gyerekpóz szalag-széthúzás",
      "category": "main",
      "equipment": [],
      "description": "Térdelj gyerekpózba: csípőd hátra a sarkad felé, alkarod a talajon előre nyújtva, könyököd derékszögben. Fogj egy gumiszalagot mindkét kezedbe, és húzd szét a lapockáid összehúzásával, majd engedd vissza kontrolláltan. A derekad és a törzsed közben ellazulva pihen, csak a felső hátad és a vállad dolgozik.",
      "subtitle": "gumiszalaggal",
      "image": "images/gyerekpozszalagszethuzas.webp",
      "duration_sec": 60,
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"66\" cy=\"52\" r=\"6\"/><path d=\"M60 56 L34 62\"/><path d=\"M34 62 L34 74\"/><path d=\"M56 58 L44 60\"/><path d=\"M56 58 L44 56\"/>",
      "legacy_pose_b": "<circle cx=\"66\" cy=\"52\" r=\"6\"/><path d=\"M60 56 L34 62\"/><path d=\"M34 62 L34 74\"/><path d=\"M56 58 L44 50\"/><path d=\"M56 58 L44 66\"/>",
      "sided": false,
      "muscle_groups": [
        "felso-hat",
        "vall"
      ]
    },
    "felso-trapez-nyujtas": {
      "name": "Felső trapéz nyújtás",
      "category": "cooldown",
      "equipment": [],
      "description": "Döntsd a fejed jobbra (fül a jobb váll felé), a jobb kezeddel finoman, óvatosan húzd lefelé a fejed egy kicsit. Nyújtást érzel a bal nyak-váll oldalon.",
      "image": "images/felsotrapeznyujtas.webp",
      "duration_sec": 45,
      "quick_rest_default": false,
      "mirror": false,
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Válts oldalt: döntsd a fejed balra, a bal kezeddel finoman húzd lefelé a fejed. Nyújtást érzel a jobb nyak-váll oldalon.",
      "muscle_groups": [
        "nyak",
        "vall"
      ]
    },
    "vall-nyujtas-modositva": {
      "name": "Váll-nyújtás módosítva",
      "category": "cooldown",
      "equipment": [],
      "description": "Fejed enyhén oldalra fordítva (nem lehajtva), finom nyújtást érzel a nyakad bal oldalán. Ne erőltesd, csak amíg kényelmes.",
      "image": "images/vallnyujtasmodositva.webp",
      "duration_sec": 45,
      "quick_rest_default": false,
      "mirror": false,
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Válts oldalt: fejed enyhén jobbra fordítva, finom nyújtást érzel a nyakad jobb oldalán.",
      "muscle_groups": [
        "nyak",
        "vall"
      ]
    },
    "mellizom-nyujtas-ajtofelfaban": {
      "name": "Mellizom-nyújtás ajtófélfában",
      "category": "cooldown",
      "equipment": [],
      "description": "Bal karod az ajtófélfán, dőlj enyhén előre a testeddel, amíg érzed a mellkasod nyúlását a bal oldalon.",
      "image": "images/mellizomnyujtasajtofelfaban.webp",
      "duration_sec": 45,
      "quick_rest_default": false,
      "mirror": false,
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Válts oldalt: jobb karod az ajtófélfán, dőlj enyhén előre, amíg érzed a nyúlást a jobb oldalon.",
      "muscle_groups": [
        "mellkas"
      ]
    },
    "keztartas-hatul-osszekulcsolva": {
      "name": "Kéztartás hátul összekulcsolva",
      "category": "cooldown",
      "equipment": [],
      "description": "Kezeidet hátul összekulcsolva emeld kissé felfelé, nyisd ki a mellkasod. Tartsd lazán, ne erőltesd a vállad.",
      "image": "images/keztartashatulosszekulcsolva.webp",
      "duration_sec": 45,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "mellkas",
        "vall"
      ]
    },
    "konnyu-szalag-huzogatas": {
      "name": "Könnyű szalag-húzogatás",
      "category": "warmup",
      "equipment": [],
      "description": "Fogd meg a gumiszalagot mindkét kezeddel, karod magad előtt, vállszélességben. Húzogasd lazán szét és engedd vissza, hogy bemelegítsd a vállöv izmait, nem kell nagy erővel.",
      "duration_sec": 30,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall",
        "felso-hat"
      ]
    },
    "fej-dontes": {
      "name": "Fej döntés",
      "category": "warmup",
      "equipment": [],
      "description": "Döntsd a fejed lassan balra (a füled a bal válladhoz közelít), majd lassan vissza középre. Ne hajtsd előre a nyakad.",
      "duration_sec": 20,
      "quick_rest_default": true,
      "mirror": false,
      "sided": true,
      "side_labels": {
        "left": "balra",
        "right": "jobbra"
      },
      "description_switch": "Döntsd a fejed lassan jobbra (a füled a jobb válladhoz közelít), majd lassan vissza középre. Ne hajtsd előre a nyakad.",
      "muscle_groups": [
        "nyak"
      ]
    },
    "allbehuzas-labdaval": {
      "name": "Állbehúzás labdával",
      "category": "main",
      "equipment": [],
      "description": "Feküdj háton, a felfújható labdát tedd a nyakad alá, közvetlenül a fejed és a válladat összekötő ívbe. Húzd be az állad (mintha dupla tokát csinálnál), és nyomd a labdát finoman a föld felé. Tarts néhány másodpercet, majd lazíts: engedd a fejed enyhén hátrabillenni, és pihend ki a nyakad. Apró, kontrollált mozgás legyen, ne erőltesd – ha szédülsz vagy éles fájdalmat érzel, hagyd abba.",
      "subtitle": "háton fekve, labda a nyak alatt",
      "image": "images/allbehuzaslabdaval.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"18\" cy=\"46\" r=\"6\"/><path d=\"M24 48 L58 48\"/><path d=\"M40 52 L36 66\"/><path d=\"M40 52 L48 66\"/><circle cx=\"16\" cy=\"54\" r=\"5\"/>",
      "legacy_pose_b": "<circle cx=\"16\" cy=\"42\" r=\"6\"/><path d=\"M24 46 L58 48\"/><path d=\"M40 52 L36 66\"/><path d=\"M40 52 L48 66\"/><circle cx=\"16\" cy=\"54\" r=\"5\"/>",
      "sided": false,
      "muscle_groups": [
        "nyak"
      ]
    },
    "nyakforgatas-labdanyomassal": {
      "name": "Nyakforgatás labdanyomással",
      "category": "main",
      "equipment": [],
      "description": "Maradj ugyanabban a helyzetben: háton fekve, a labda a nyakad alatt. Nyomd finoman a labdát a föld felé, és eközben lassan fordítsd a fejed balra, majd jobbra, végig tartva az enyhe nyomást. Kicsi, kontrollált mozgástartományban dolgozz, ne feszítsd túl.",
      "subtitle": "háton fekve, labda a nyak alatt",
      "image": "images/nyakforgataslabdanyomassal.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"18\" cy=\"46\" r=\"6\"/><path d=\"M12 46 L6 44\"/><path d=\"M24 48 L58 48\"/><path d=\"M40 52 L36 66\"/><path d=\"M40 52 L48 66\"/><circle cx=\"16\" cy=\"54\" r=\"5\"/>",
      "legacy_pose_b": "<circle cx=\"18\" cy=\"46\" r=\"6\"/><path d=\"M24 46 L30 44\"/><path d=\"M24 48 L58 48\"/><path d=\"M40 52 L36 66\"/><path d=\"M40 52 L48 66\"/><circle cx=\"16\" cy=\"54\" r=\"5\"/>",
      "sided": false,
      "muscle_groups": [
        "nyak"
      ]
    },
    "felso-hat-nyujtas-hengeren": {
      "name": "Felső hát nyújtás hengeren",
      "category": "main",
      "equipment": [],
      "description": "Feküdj háton, a sima hengert helyezd keresztben a lapockáid alá, térdeid hajlítva, talpad a talajon. Kezed a tarkódon vagy mellkasodon összekulcsolva. Engedd a felsőtested finoman hátrahajolni a hengeren, nyisd meg a mellkasod. A derekad maradjon nyugodt, ne homorítsd túl.",
      "subtitle": "sima hengeren, háton fekve",
      "image": "images/felsohatnyujtashengeren.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"20\" cy=\"46\" r=\"6\"/><path d=\"M26 48 L58 48\"/><path d=\"M40 52 L36 66\"/><path d=\"M40 52 L48 66\"/><path d=\"M50 48 L64 44 L50 40\"/>",
      "legacy_pose_b": "<circle cx=\"16\" cy=\"38\" r=\"6\"/><path d=\"M22 42 L58 48\"/><path d=\"M40 52 L36 66\"/><path d=\"M40 52 L48 66\"/><path d=\"M50 48 L64 44 L50 40\"/>",
      "sided": false,
      "muscle_groups": [
        "felso-hat",
        "mellkas"
      ]
    },
    "kulso-forgatas-sulyzoval": {
      "name": "Külső forgatás súlyzóval",
      "category": "main",
      "equipment": [],
      "description": "Feküdj a jobb oldaladra, alul lévő karodon támaszd meg a fejed. A bal könyököd hajlítsd 90 fokban, szorítsd a törzsedhez, egy könnyű súlyzót fogj a bal kezedben. Emeld a súlyzót felfelé úgy, hogy a könyököd a helyén marad, majd lassan engedd vissza.",
      "subtitle": "oldalt fekve",
      "image": "images/kulsoforgatassulyzoval.webp",
      "quick_rest_default": false,
      "mirror": true,
      "legacy_pose_a": "<path d=\"M14 55 L50 55\"/><circle cx=\"10\" cy=\"50\" r=\"6\"/><path d=\"M40 55 L40 42\"/><path d=\"M40 42 L40 30\"/><circle cx=\"40\" cy=\"27\" r=\"3\"/>",
      "legacy_pose_b": "<path d=\"M14 55 L50 55\"/><circle cx=\"10\" cy=\"50\" r=\"6\"/><path d=\"M40 55 L40 42\"/><path d=\"M40 42 L52 34\"/><circle cx=\"55\" cy=\"32\" r=\"3\"/>",
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Válts oldalt: feküdj a bal oldaladra. A jobb könyököd hajlítsd 90 fokban, szorítsd a törzsedhez, egy könnyű súlyzót fogj a jobb kezedben. Emeld a súlyzót felfelé úgy, hogy a könyököd a helyén marad, majd lassan engedd vissza.",
      "muscle_groups": [
        "vall"
      ]
    },
    "gumiszalag-szethuzas-gyermekpozban": {
      "name": "Gumiszalag széthúzás gyermekpózban",
      "category": "main",
      "equipment": [],
      "description": "Térdelj gyerekpózba: csípőd hátra a sarkad felé, alkarod a talajon előre nyújtva, könyököd derékszögben. Fogj egy gumiszalagot mindkét kezedbe, és húzd szét a lapockáid összehúzásával, majd engedd vissza kontrolláltan. A derekad és a törzsed közben ellazulva pihen, csak a felső hátad és a vállad dolgozik.",
      "subtitle": "gumiszalaggal",
      "image": "images/gyerekpozszalagszethuzas.webp",
      "duration_sec": 60,
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"66\" cy=\"52\" r=\"6\"/><path d=\"M60 56 L34 62\"/><path d=\"M34 62 L34 74\"/><path d=\"M56 58 L44 60\"/><path d=\"M56 58 L44 56\"/>",
      "legacy_pose_b": "<circle cx=\"66\" cy=\"52\" r=\"6\"/><path d=\"M60 56 L34 62\"/><path d=\"M34 62 L34 74\"/><path d=\"M56 58 L44 50\"/><path d=\"M56 58 L44 66\"/>",
      "sided": false,
      "muscle_groups": [
        "felso-hat",
        "vall"
      ]
    },
    "gumiszalagos-archuzas-felulrol": {
      "name": "Gumiszalagos archúzás felülről",
      "category": "main",
      "equipment": [],
      "description": "Rögzítsd a gumiszalagot magasan – az ajtókeret tetején, vagy egy régi hintakampón. Állj a rögzítési pont alá, fogd meg a szalagot mindkét kézzel, karod nyújtva felfelé-előre. Húzd le a szalagot úgy, hogy a könyököd oldalra és lefelé nyílik szét az arcod magasságáig, közben összehúzod a lapockáid. Lassan engedd vissza felfelé.",
      "subtitle": "magas rögzítéssel (pl. régi hintakampó)",
      "image": "images/gumiszalagosarchuzasfelulrol.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 55\"/><path d=\"M40 22 L28 8\"/><path d=\"M40 22 L52 8\"/><path d=\"M28 8 L28 2\"/><path d=\"M52 8 L52 2\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 55\"/><path d=\"M40 22 L24 22\"/><path d=\"M40 22 L56 22\"/><path d=\"M24 22 L34 14\"/><path d=\"M56 22 L46 14\"/><path d=\"M34 14 L34 2\"/><path d=\"M46 14 L46 2\"/>",
      "sided": false,
      "muscle_groups": [
        "felso-hat",
        "vall"
      ]
    },
    "gumiszalagos-y-emeles": {
      "name": "Gumiszalagos Y-emelés",
      "category": "main",
      "equipment": [],
      "description": "Állj a gumiszalag közepére, fogd meg mindkét végét. Nyújtott karral emeld a karod ferdén felfelé, 'Y' alakba, közben a lapockáid enyhén összehúzod. Lassan engedd vissza. Ha fáj a válladban, csökkentsd a mozgástartományt.",
      "subtitle": "állva",
      "image": "images/gumiszalagosyemeles.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 55\"/><path d=\"M40 24 L24 40\"/><path d=\"M40 24 L56 40\"/><path d=\"M24 40 L18 66\"/><path d=\"M56 40 L62 66\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 55\"/><path d=\"M40 24 L22 12\"/><path d=\"M40 24 L58 12\"/><path d=\"M22 12 L18 66\"/><path d=\"M58 12 L62 66\"/>",
      "sided": false,
      "muscle_groups": [
        "vall",
        "felso-hat"
      ]
    },
    "lapocka-osszehuzas-allva": {
      "name": "Lapocka-összehúzás állva",
      "category": "main",
      "equipment": [],
      "description": "Állj egyenes háttal, a gumiszalagot fogd mindkét kézzel magad előtt, karod nyújtva vállmagasságban. Húzd szét a szalagot úgy, hogy a könyököd hátrafelé húzod, közben a lapockáid összehúzod. Tarts 2 másodpercet, majd lassan engedd vissza.",
      "subtitle": "gumiszalaggal",
      "image": "images/lapockaosszehuzas.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 50\"/><path d=\"M24 26 L56 26\"/><path d=\"M24 26 L14 26\"/><path d=\"M56 26 L66 26\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M40 20 L40 50\"/><path d=\"M28 24 L52 24\"/><path d=\"M28 24 L6 20\"/><path d=\"M52 24 L74 20\"/>",
      "sided": false,
      "muscle_groups": [
        "felso-hat",
        "vall"
      ]
    },
    "oldalso-vallemeles-sulyzoval": {
      "name": "Oldalsó vállemelés súlyzóval",
      "category": "main",
      "equipment": [],
      "description": "Állj egyenesen, egy-egy könnyű súlyzót fogj a kezedbe, karod lazán az oldaladon. Emeld a karod oldalra vállmagasságig, könyököd enyhén hajlítva, majd lassan engedd vissza. Ne lendülj, kontrolláltan mozogj.",
      "subtitle": "állva, könnyű súllyal",
      "image": "images/oldalsovallemelessulyzoval.webp",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M32 22 L48 22\"/><path d=\"M32 22 L28 40\"/><path d=\"M48 22 L52 40\"/><path d=\"M32 24 L20 26\"/><path d=\"M48 24 L60 26\"/><circle cx=\"18\" cy=\"26\" r=\"3\"/><circle cx=\"62\" cy=\"26\" r=\"3\"/>",
      "legacy_pose_b": "<circle cx=\"40\" cy=\"14\" r=\"6\"/><path d=\"M32 22 L48 22\"/><path d=\"M32 22 L28 40\"/><path d=\"M48 22 L52 40\"/><path d=\"M32 24 L14 16\"/><path d=\"M48 24 L66 16\"/><circle cx=\"12\" cy=\"15\" r=\"3\"/><circle cx=\"68\" cy=\"15\" r=\"3\"/>",
      "sided": false,
      "muscle_groups": [
        "vall"
      ]
    },
    "rucskos-henger-nyak-vall-lazitas": {
      "name": "Rücskös henger nyak-váll lazítás",
      "category": "cooldown",
      "equipment": [],
      "description": "Feküdj háton, a rücskös hengert tedd a felső hátad/vállad alá (ne közvetlenül a nyakcsigolyákra). Lassan, apró mozdulatokkal görgesd a felső hátad és a váll környékét. Maradj a kényelmes tartományban.",
      "duration_sec": 60,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "nyak",
        "vall"
      ]
    },
    "jogategla-alatt-tamasztott-mellkasnyitas": {
      "name": "Jógatégla alatt támasztott mellkasnyitás",
      "category": "cooldown",
      "equipment": [],
      "description": "Feküdj háton, a jógatéglát a legalacsonyabb élére állítva helyezd a lapockáid alá, hosszában a gerinced mentén. Karod engedd lazán oldalra vagy fejed fölé nyújtva. Csak annyi ideig maradj így, amíg kényelmes; ha bármi kellemetlent érzel a derekadban vagy a nyakadban, hagyd ki.",
      "duration_sec": 60,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "mellkas",
        "felso-hat"
      ]
    },
    "seta-helyben-karlengetes": {
      "name": "Séta helyben / karlengetés",
      "category": "warmup",
      "equipment": [],
      "description": "Járj helyben laza tempóban, karod közben lazán lengesd. Cél a bemelegítés, ne az izzasztás – maradj kényelmes tartományban.",
      "duration_sec": 75,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "teljes-test"
      ]
    },
    "medencebillentes": {
      "name": "Medencebillentés",
      "category": "warmup",
      "equipment": [],
      "description": "Hanyatt fekve, térdek behajlítva, talpak a talajon. Nagyon finoman nyomd a derekad a talajhoz, tarts 2-3 másodpercet, majd engedd el. Kis mozgás, ne erőltesd.",
      "duration_sec": 60,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "has",
        "also-hat"
      ]
    },
    "macska-teve-kontrollalt": {
      "name": "Macska-teve (kontrollált)",
      "category": "main",
      "equipment": [],
      "description": "Négykézláb, kezek a váll, térdek a csípő alatt. Nagyon lassan, kis amplitúdóval domborítsd, majd enyhén homorítsd a hátad – csak a fájdalommentes tartományon belül. Ha bármi meghúzódik, csökkentsd tovább a mozgást.",
      "subtitle": "kis mozgástartomány",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"58\" cy=\"26\" r=\"6\"/><path d=\"M52 30 Q40 38 24 34\"/><path d=\"M52 30 L52 62\"/><path d=\"M24 34 L24 62\"/>",
      "legacy_pose_b": "<circle cx=\"56\" cy=\"34\" r=\"6\"/><path d=\"M50 34 Q40 24 24 30\"/><path d=\"M50 34 L50 62\"/><path d=\"M24 30 L24 62\"/>",
      "sided": false,
      "muscle_groups": [
        "also-hat",
        "has"
      ]
    },
    "bird-dog-v2": {
      "name": "Bird-dog",
      "category": "main",
      "equipment": [],
      "description": "Válts oldalt: bal kar előre, jobb láb hátra, a derekad semleges marad. Tarts 2 másodpercet, engedd el.",
      "subtitle": "kar és ellentétes láb",
      "quick_rest_default": true,
      "mirror": true,
      "legacy_pose_a": "<circle cx=\"58\" cy=\"28\" r=\"6\"/><path d=\"M52 32 L24 38\"/><path d=\"M52 32 L52 62\"/><path d=\"M24 38 L24 62\"/>",
      "legacy_pose_b": "<circle cx=\"60\" cy=\"24\" r=\"6\"/><path d=\"M52 30 L24 36\"/><path d=\"M52 30 L70 28\"/><path d=\"M24 36 L6 34\"/>",
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Négykézláb, csukló a váll alatt, térd a csípő alatt. Nyújtsd ki a jobb karod előre és a bal lábad hátra, a derekad semleges marad. Tarts 2 másodpercet, engedd el.",
      "muscle_groups": [
        "has",
        "also-hat",
        "farizom"
      ]
    },
    "mckenzie-kobra-nyujtas": {
      "name": "McKenzie kobra nyújtás",
      "category": "main",
      "equipment": [],
      "description": "Feküdj hasra, tenyered a válladnál. Nagyon finoman told fel a felsőtested a karoddal, a csípőd és a lábad végig a talajon marad, ellazulva. Csak addig emelkedj, ameddig kényelmes. Ha lábba sugárzó fájdalmat érzel, azonnal állj le.",
      "subtitle": "csípő a talajon marad",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"18\" cy=\"50\" r=\"6\"/><path d=\"M24 50 L60 50\"/><path d=\"M30 50 L30 60\"/><path d=\"M55 50 L70 50\"/>",
      "legacy_pose_b": "<circle cx=\"20\" cy=\"34\" r=\"6\"/><path d=\"M26 38 L60 50\"/><path d=\"M28 40 L28 58\"/><path d=\"M55 50 L70 50\"/>",
      "sided": false,
      "muscle_groups": [
        "also-hat"
      ]
    },
    "dead-bug-v2": {
      "name": "Dead bug",
      "category": "main",
      "equipment": [],
      "description": "Hanyatt fekve, térdek 90 fokban a csípő fölött, karok a mennyezet felé nyúlnak. A derekad enyhén nyomd a talajhoz. Lassan nyújtsd ki az egyik karod hátra és az ellentétes lábad előre, majd hozd vissza, válts oldalt.",
      "subtitle": "váltott oldal",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<path d=\"M18 50 L55 50\"/><circle cx=\"14\" cy=\"50\" r=\"6\"/><path d=\"M55 50 L55 30 L70 30\"/><path d=\"M35 50 L35 25\"/>",
      "legacy_pose_b": "<path d=\"M18 50 L55 50\"/><circle cx=\"14\" cy=\"50\" r=\"6\"/><path d=\"M55 50 L72 58\"/><path d=\"M35 50 L20 30\"/>",
      "sided": false,
      "muscle_groups": [
        "has",
        "also-hat"
      ]
    },
    "csipoemeles-v2": {
      "name": "Csípőemelés",
      "category": "main",
      "equipment": [],
      "description": "Hanyatt fekve, térdek behajlítva, talpak a talajon. Emeld fel a csípőd, amíg váll-csípő-térd egy vonalba nem kerül. Szorítsd össze a farizmot fent, majd engedd vissza kontrolláltan.",
      "subtitle": "glute bridge",
      "quick_rest_default": false,
      "mirror": false,
      "legacy_pose_a": "<circle cx=\"14\" cy=\"55\" r=\"6\"/><path d=\"M20 55 L45 55\"/><path d=\"M45 55 L50 62 L50 72\"/><path d=\"M20 57 L8 57\"/>",
      "legacy_pose_b": "<circle cx=\"14\" cy=\"55\" r=\"6\"/><path d=\"M20 55 L45 45\"/><path d=\"M45 45 L50 60 L50 72\"/><path d=\"M20 57 L8 57\"/>",
      "sided": false,
      "muscle_groups": [
        "farizom",
        "csipo",
        "also-hat"
      ]
    },
    "oldalso-plank-v2": {
      "name": "Oldalsó plank",
      "category": "main",
      "equipment": [],
      "description": "Oldaladra fekve a bal könyököd pontosan a bal válladat alatt van. Emeld meg a csípőd egyenes vonalba. Ez a fázisban rövidebb ideig tartod, mint máskor – ne erőltesd.",
      "subtitle": "rövidebb tartás",
      "duration_sec": 30,
      "quick_rest_default": false,
      "mirror": true,
      "legacy_pose_a": "<path d=\"M20 58 L20 45\"/><path d=\"M20 45 L50 50 L78 58\"/><circle cx=\"16\" cy=\"40\" r=\"6\"/>",
      "legacy_pose_b": "<path d=\"M20 58 L20 44\"/><path d=\"M20 44 L50 48 L78 56\"/><circle cx=\"16\" cy=\"39\" r=\"6\"/>",
      "sided": true,
      "side_labels": {
        "left": "bal oldal",
        "right": "jobb oldal"
      },
      "description_switch": "Fordulj a másik oldaladra: a jobb könyököd a jobb válladat alatt. Emeld meg a csípőd egyenes vonalba. Rövidebb tartás, ne erőltesd.",
      "muscle_groups": [
        "has",
        "vall"
      ]
    },
    "ulo-enyhen-hatradontott-nyujtas": {
      "name": "Ülő, enyhén hátradöntött nyújtás",
      "category": "cooldown",
      "equipment": [],
      "description": "Ülj kényelmesen, kezed magad mögött a talajon, dőlj enyhén hátra – mély előrehajlás helyett ez a nyújtás kíméletesebb a derekadnak. Csak addig dőlj, ameddig kényelmes.",
      "duration_sec": 60,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "also-hat"
      ]
    },
    "fejfeletti-nyujtas-osszekulcsolt-kezzel": {
      "name": "Fejfeletti nyújtás összekulcsolt kézzel",
      "category": "main",
      "equipment": [],
      "description": "Nyújtsd a karjaid a fejed fölé, ujjaidat kulcsold össze, tenyered felfelé fordítva. Nyújtózz felfelé, a felsőtested engedd csak nagyon enyhén hátradőlni. Ne erőltesd a hátrahajlást, csak annyira, amennyire kényelmes.",
      "subtitle": "minimális hátradőlés",
      "image": "images/fejfelettinyujtasosszekulcsoltkezzel.webp",
      "duration_sec": 20,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall"
      ]
    },
    "kaktuszkar-vallnyito": {
      "name": "Kaktuszkar vállnyitó",
      "category": "main",
      "equipment": [],
      "description": "Emeld a karod fejmagasságig, könyöködet hajlítsd derékszögbe, mintha egy 'W' betű formáját vennéd fel. Húzd hátra enyhén a lapockáid, nyisd meg a mellkasod.",
      "subtitle": "könyök derékszögben",
      "image": "images/kaktuszkarvallnyito.webp",
      "duration_sec": 20,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall",
        "mellkas",
        "felso-hat"
      ]
    },
    "mellkasnyujtas-hatrakulcsolt-kezzel": {
      "name": "Mellkasnyújtás hátrakulcsolt kézzel",
      "category": "main",
      "equipment": [],
      "description": "Kulcsold össze a kezeid a hátad mögött, alul. Nyújtsd le és hátra a karod, közben nyisd meg a mellkasod és húzd hátra a válladat.",
      "subtitle": "kezek alul összekulcsolva",
      "image": "images/mellkasnyujtashatrakulcsoltkezzel.webp",
      "duration_sec": 20,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "mellkas",
        "vall"
      ]
    },
    "t-tartas-csukloforgatassal-tenyer-felfele": {
      "name": "T-tartás csuklóforgatással – tenyér felfelé",
      "category": "main",
      "equipment": [],
      "description": "Emeld a karod oldalra, vállmagasságba, egyenes vonalban a törzsedtől. Fordítsd a tenyered felfelé, érezd a nyúlást a váll elülső részén.",
      "subtitle": "tenyér felfelé",
      "image": "images/ttartascsukloforgatassaltenyerfelfele.webp",
      "duration_sec": 20,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall"
      ]
    },
    "t-tartas-csukloforgatassal-tenyer-lefele": {
      "name": "T-tartás csuklóforgatással – tenyér lefelé",
      "category": "main",
      "equipment": [],
      "description": "Ugyanabban a T-tartásban fordítsd a tenyered lefelé. Érezd, ahogy a nyúlás a váll másik oldalára helyeződik át.",
      "subtitle": "tenyér lefelé",
      "image": "images/ttartascsukloforgatassaltenyerlefele.webp",
      "duration_sec": 20,
      "quick_rest_default": true,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall"
      ]
    },
    "kez-a-fejteton-konyok-nyitva": {
      "name": "Kéz a fejtetőn, könyök nyitva",
      "category": "main",
      "equipment": [],
      "description": "Tedd mindkét kezed a fejed tetejére, ujjaid összekulcsolva. Nyisd szét a könyöködet oldalra, engedd lazán lógni. Ez más szögből nyitja a vállízületet, mint az első gyakorlat.",
      "subtitle": "fejtetőn összekulcsolva",
      "image": "images/kezafejtetonkonyoknyitva.webp",
      "duration_sec": 20,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "vall"
      ]
    },
    "egykaros-nyujtas-fel-le": {
      "name": "Egykaros nyújtás fel-le",
      "category": "main",
      "equipment": [],
      "description": "Nyújtsd a bal karod egyenesen felfelé, ameddig kényelmesen tudod, majd engedd lassan lefelé, oldalad mellé. Ismételd a fel-le mozgást kontrolláltan, oldaldőlés nélkül.",
      "subtitle": "nincs oldaldőlés",
      "image": "images/egykarosnyujtasfellebal.webp",
      "duration_sec": 20,
      "quick_rest_default": false,
      "mirror": false,
      "sided": true,
      "side_labels": {
        "left": "bal",
        "right": "jobb"
      },
      "description_switch": "Válts oldalt: a jobb karoddal ismételd ugyanezt a kontrollált fel-le nyújtást.",
      "image_right": "images/egykarosnyujtasfellejobb.webp",
      "muscle_groups": [
        "vall"
      ]
    },
    "teljes-oldalnyujtas-osszekulcsolt-kezzel": {
      "name": "Teljes oldalnyújtás összekulcsolt kézzel",
      "category": "main",
      "equipment": [],
      "description": "Emeld mindkét karod a fejed fölé, kulcsold össze a kezeid, tenyered felfelé. Dőlj enyhén oldalra, ameddig kényelmes a nyújtás a törzsed oldalán, majd válts oldalt.",
      "subtitle": "oldalra dőlve",
      "image": "images/teljesoldalnyujtasosszekulcsoltkezzel.webp",
      "duration_sec": 20,
      "quick_rest_default": false,
      "mirror": false,
      "sided": false,
      "muscle_groups": [
        "has",
        "vall"
      ]
    }
  },
  "programs": [
    {
      "id": "core-alap",
      "name": "Core alap",
      "rounds": 2,
      "blocks": {
        "warmup": [
          {
            "exerciseId": "karkorzes-elore"
          },
          {
            "exerciseId": "karkorzes-hatra",
            "quickRest": true
          },
          {
            "exerciseId": "csipokorzes-oramutato-jarasaval-megegyezoen"
          },
          {
            "exerciseId": "csipokorzes-oramutato-jarasaval-ellentetesen",
            "quickRest": true
          },
          {
            "exerciseId": "macska-teve-mozgas"
          },
          {
            "exerciseId": "csipohajlito-bemozgatas"
          },
          {
            "exerciseId": "konnyu-helyben-jaras"
          }
        ],
        "main": [
          {
            "exerciseId": "bird-dog"
          },
          {
            "exerciseId": "dead-bug"
          },
          {
            "exerciseId": "csipoemeles"
          },
          {
            "exerciseId": "oldalso-plank",
            "sided": true
          },
          {
            "exerciseId": "fekvotamasz"
          },
          {
            "exerciseId": "plank"
          },
          {
            "exerciseId": "hegymaszo"
          },
          {
            "exerciseId": "sekely-guggolas"
          }
        ],
        "cooldown": [
          {
            "exerciseId": "gyerekpoz"
          },
          {
            "exerciseId": "galamb-gyakorlat",
            "sided": true
          },
          {
            "exerciseId": "csipohajlito-nyujtas",
            "sided": true
          }
        ]
      }
    },
    {
      "id": "nyak-vall",
      "name": "Nyak és váll",
      "rounds": 2,
      "blocks": {
        "warmup": [
          {
            "exerciseId": "vallkorzes-elore"
          },
          {
            "exerciseId": "vallkorzes-hatra",
            "quickRest": true
          },
          {
            "exerciseId": "fej-oldalra-dontes"
          },
          {
            "exerciseId": "fej-forgatasa"
          }
        ],
        "main": [
          {
            "exerciseId": "hatra-nyomas-nyak"
          },
          {
            "exerciseId": "oldalra-nyomas",
            "sided": true
          },
          {
            "exerciseId": "forgato-nyomas",
            "sided": true
          },
          {
            "exerciseId": "lapocka-osszehuzas"
          },
          {
            "exerciseId": "fal-angyal"
          },
          {
            "exerciseId": "kulso-forgatas",
            "sided": true
          },
          {
            "exerciseId": "gyerekpoz-szalag-szethuzas"
          }
        ],
        "cooldown": [
          {
            "exerciseId": "felso-trapez-nyujtas",
            "sided": true
          },
          {
            "exerciseId": "vall-nyujtas-modositva",
            "sided": true
          },
          {
            "exerciseId": "mellizom-nyujtas-ajtofelfaban",
            "sided": true
          },
          {
            "exerciseId": "keztartas-hatul-osszekulcsolva"
          }
        ]
      }
    },
    {
      "id": "nyak-vall-eszkoz",
      "name": "Nyak-váll (eszközzel)",
      "rounds": 2,
      "blocks": {
        "warmup": [
          {
            "exerciseId": "vallkorzes-elore"
          },
          {
            "exerciseId": "vallkorzes-hatra",
            "quickRest": true
          },
          {
            "exerciseId": "konnyu-szalag-huzogatas"
          },
          {
            "exerciseId": "fej-dontes",
            "sided": true
          }
        ],
        "main": [
          {
            "exerciseId": "allbehuzas-labdaval"
          },
          {
            "exerciseId": "nyakforgatas-labdanyomassal"
          },
          {
            "exerciseId": "felso-hat-nyujtas-hengeren"
          },
          {
            "exerciseId": "kulso-forgatas-sulyzoval",
            "sided": true
          },
          {
            "exerciseId": "gumiszalag-szethuzas-gyermekpozban"
          },
          {
            "exerciseId": "gumiszalagos-archuzas-felulrol"
          },
          {
            "exerciseId": "gumiszalagos-y-emeles"
          },
          {
            "exerciseId": "lapocka-osszehuzas-allva"
          },
          {
            "exerciseId": "oldalso-vallemeles-sulyzoval"
          }
        ],
        "cooldown": [
          {
            "exerciseId": "rucskos-henger-nyak-vall-lazitas"
          },
          {
            "exerciseId": "jogategla-alatt-tamasztott-mellkasnyitas"
          }
        ]
      }
    },
    {
      "id": "kimeletes-derek",
      "name": "Kíméletes derék",
      "rounds": 2,
      "blocks": {
        "warmup": [
          {
            "exerciseId": "seta-helyben-karlengetes"
          },
          {
            "exerciseId": "medencebillentes"
          }
        ],
        "main": [
          {
            "exerciseId": "macska-teve-kontrollalt"
          },
          {
            "exerciseId": "bird-dog-v2",
            "sided": true
          },
          {
            "exerciseId": "mckenzie-kobra-nyujtas"
          },
          {
            "exerciseId": "dead-bug-v2"
          },
          {
            "exerciseId": "csipoemeles-v2"
          },
          {
            "exerciseId": "oldalso-plank-v2",
            "sided": true
          }
        ],
        "cooldown": [
          {
            "exerciseId": "ulo-enyhen-hatradontott-nyujtas"
          }
        ]
      }
    },
    {
      "id": "kombinalt",
      "name": "Kombinált",
      "rounds": 2,
      "blocks": {
        "warmup": [
          {
            "exerciseId": "karkorzes-elore"
          },
          {
            "exerciseId": "karkorzes-hatra",
            "quickRest": true
          },
          {
            "exerciseId": "csipokorzes-oramutato-jarasaval-megegyezoen"
          },
          {
            "exerciseId": "csipokorzes-oramutato-jarasaval-ellentetesen",
            "quickRest": true
          },
          {
            "exerciseId": "macska-teve-mozgas"
          },
          {
            "exerciseId": "csipohajlito-bemozgatas"
          },
          {
            "exerciseId": "konnyu-helyben-jaras"
          }
        ],
        "main": [
          {
            "exerciseId": "bird-dog"
          },
          {
            "exerciseId": "dead-bug"
          },
          {
            "exerciseId": "csipoemeles"
          },
          {
            "exerciseId": "allbehuzas-labdaval"
          },
          {
            "exerciseId": "nyakforgatas-labdanyomassal"
          },
          {
            "exerciseId": "felso-hat-nyujtas-hengeren"
          },
          {
            "exerciseId": "oldalso-plank",
            "sided": true
          },
          {
            "exerciseId": "kulso-forgatas-sulyzoval",
            "sided": true
          },
          {
            "exerciseId": "fekvotamasz"
          },
          {
            "exerciseId": "plank"
          },
          {
            "exerciseId": "hegymaszo"
          },
          {
            "exerciseId": "gumiszalag-szethuzas-gyermekpozban"
          },
          {
            "exerciseId": "gumiszalagos-archuzas-felulrol"
          },
          {
            "exerciseId": "gumiszalagos-y-emeles"
          },
          {
            "exerciseId": "lapocka-osszehuzas-allva"
          },
          {
            "exerciseId": "oldalso-vallemeles-sulyzoval"
          },
          {
            "exerciseId": "sekely-guggolas"
          }
        ],
        "cooldown": [
          {
            "exerciseId": "galamb-gyakorlat",
            "sided": true
          },
          {
            "exerciseId": "csipohajlito-nyujtas",
            "sided": true
          }
        ]
      }
    },
    {
      "id": "testtartas-javitas",
      "name": "Testtartás-javítás",
      "rounds": 1,
      "blocks": {
        "warmup": [],
        "main": [
          {
            "exerciseId": "fejfeletti-nyujtas-osszekulcsolt-kezzel"
          },
          {
            "exerciseId": "kaktuszkar-vallnyito"
          },
          {
            "exerciseId": "mellkasnyujtas-hatrakulcsolt-kezzel"
          },
          {
            "exerciseId": "t-tartas-csukloforgatassal-tenyer-felfele"
          },
          {
            "exerciseId": "t-tartas-csukloforgatassal-tenyer-lefele",
            "quickRest": true
          },
          {
            "exerciseId": "kez-a-fejteton-konyok-nyitva"
          },
          {
            "exerciseId": "egykaros-nyujtas-fel-le",
            "sided": true
          },
          {
            "exerciseId": "teljes-oldalnyujtas-osszekulcsolt-kezzel"
          }
        ],
        "cooldown": []
      }
    }
  ],
  "muscle_group_taxonomy": {
    "has": "Has (core)",
    "also-hat": "Alsó hát / derék",
    "felso-hat": "Felső hát / lapocka",
    "nyak": "Nyak",
    "vall": "Váll",
    "mellkas": "Mellkas",
    "csipo": "Csípő",
    "farizom": "Farizom",
    "comb-lab": "Comb / láb",
    "teljes-test": "Teljes test / mobilizáció"
  }
};
