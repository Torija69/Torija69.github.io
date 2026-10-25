// Datos recopilados de wikis de fans (dungeoncrawlercarlwiki.com, fandom, crawlerscookbook).
// b = libro en el que Carl/Donut lo conocen; f = piso; s = reencuentros relevantes [libro, nota]
// death = [libro, nota] (se oculta si el lector no ha llegado a ese libro)
window.BOOKS = [
  { n: 1, t: "Dungeon Crawler Carl", f: "Pisos 1–2" },
  { n: 2, t: "Carl's Doomsday Scenario", f: "Piso 3 · La Sobreciudad" },
  { n: 3, t: "The Dungeon Anarchist's Cookbook", f: "Piso 4 · La Maraña de Hierro" },
  { n: 4, t: "The Gate of the Feral Gods", f: "Piso 5 · Las Burbujas" },
  { n: 5, t: "The Butcher's Masquerade", f: "Pisos 6–7 · Cotos de Caza / Gran Carrera" },
  { n: 6, t: "The Eye of the Bedlam Bride", f: "Piso 8 · Los Fantasmas de la Tierra" },
  { n: 7, t: "This Inevitable Ruin", f: "Piso 9 · Faction Wars" },
  { n: 8, t: "A Parade of Horribles", f: "Pisos 10–11 · Carreras / Desfile" }
];

window.GROUPS = {
  corte:   { label: "Corte Real", color: "#e3a43b" },
  meadow:  { label: "Team Meadow Lark", color: "#7fb069" },
  aliado:  { label: "Crawlers aliados", color: "#4fb3bf" },
  rival:   { label: "Crawlers rivales", color: "#e0605e" },
  npc:     { label: "PNJ y Club Desperado", color: "#a98bd6" },
  alien:   { label: "Producción y alienígenas", color: "#6f93e0" },
  divino:  { label: "Dioses y entidades", color: "#d77bb0" },
  tierra:  { label: "Fuera de la mazmorra", color: "#c9b99a" }
};

window.NODES = [
  // ---- Corte Real
  { id: "carl", n: "Carl", a: "guardia costera primal compensated anarchist agent provocateur", g: "corte", b: 1, f: "1", d: "Humano Primal de Seattle, ex mecánico de la Guardia Costera. Sale a buscar a Donut la noche del colapso y entra en la mazmorra en calzoncillos. Clases: Compensated Anarchist (piso 3) y Agent Provocateur (piso 6); títulos Royal Bodyguard y Warlord. Experto en bombas y en enfadar a los productores.", s: [[1, "Tatuaje Goblin Pass y primer equipo encantado"], [2, "Elige raza Primal y clase Compensated Anarchist"], [3, "Recibe Cesta Punta por una poción de hobby"], [5, "Usa el Anillo del Sufrimiento Divino"], [6, "Elige a Emberus, contrae SlugPox y recibe el Ojo de la Novia de Bedlam"], [7, "Nivel 81, Faction Wars"]] },
  { id: "donut", n: "Princess Donut", a: "gata persa princesa", g: "corte", b: 1, f: "1", d: "Gata persa carey, campeona de concursos. Primera gata en entrar en la mazmorra; se vuelve inteligente con la galleta mejorada de Carl. Raza Gata y clase Former Child Actor (bardo/pícara); líder de la Royal Court. Lleva un tiempo la Corona de la Puta Séptica. Trata a Mongo como a su hijo.", s: [[1, "Adopta a Mongo y se hace líder del grupo"], [2, "Se quita la corona maldita; nivel 26"], [3, "Clase Football Hooligan; nivel 33"], [5, "Hasta nivel 63; enfrentamiento con Lucia"], [6, "Mata a Quan Ch (se le da el crédito)"], [7, "Llega a nivel 135"]] },
  { id: "mordecai", n: "Mordecai", a: "guia rata skyfowl changeling", g: "corte", b: 1, f: "1", d: "Skyfowl que eligió ser Changeling como crawler. Mago de fuego de nivel 50, guía del juego y luego mánager de Donut. Es un empleado de Borant en régimen de servidumbre. Cambia de forma en cada piso: rata, Bugaboo, íncubo, Grulke, Pocket Kuma, cíclope... Su hermano Uzzi murió a manos de Chaco por orden de Odette.", s: [[2, "Bugaboo de 2 metros"], [3, "Se hace mánager de Donut; ataca a Chaco en el Carrusel"], [4, "Grulke y luego Skyfowl"], [5, "Pocket Kuma y después limo"], [6, "Cíclope de las colinas"], [7, "Humano en el piso 9; investiga la caja de Carl con Rosetta"], [8, "Pisos 10–11"]] },
  { id: "mongo", n: "Mongo", a: "dinosaurio raptor velociraptor", g: "corte", b: 1, f: "2", d: "Mongoliensis (raptor) generado por la mazmorra en la sala de premios de mascotas del piso 2. Mascota y montura real de Donut. Destroza a Maggie My en el piso 5.", s: [[2, "Sube hasta nivel 13"], [3, "Nivel 26"], [4, "Devora a Maggie My"], [5, "Deja embarazada a Kiwi; mata a Vrah con ella"], [6, "Nivel 40; herido por Shi Maria a través de Carl"], [7, "Nacen sus crías Ursensus con Kiwi"]] },
  { id: "samantha", n: "Samantha", a: "psamathe cabeza muñeca diosa", g: "corte", b: 4, f: "5", d: "Psamathe, diosa menor desterrada del amor no correspondido y espíritu marchito, metida en la cabeza de una muñeca sexual Lika. Ghazi quiso invocar a Yarilo en la Puerta de los Dioses Salvajes y apareció ella fingiendo serlo. Quiere un cuerpo, rescatar a su hija Mrs. Ghazi del piso 9 y reunirse con el rey Blaine en el 12. Emberus es su tío abuelo.", s: [[5, "Ayuda a acabar con Vrah"], [6, "Busca cuerpo; identifica a Shi Maria"], [7, "Sobrevive a Faction Wars"], [8, "Juega a carreras con Doctor Bones; llega al piso 11"]] },
  { id: "katia", n: "Katia Grim", a: "grimmsdottir doppelganger monster truck", g: "corte", b: 2, f: "3", d: "Katia Grimmsdottir, ex profesora de arte de Reikiavik. Doppelgänger con clase Monster Truck Driver: tanque que cambia la forma de su cuerpo y su equipo. Entró con Eva y se unió a las Hijas de Brynhild de Hekla; se une a Carl y Donut en el piso 3.", s: [[3, "Traicionada por Hekla; la mata por accidente con Rush"], [4, "Nivel 44; pierde cuatro dedos contra Gore-Gore"], [5, "Lidera la misión de las burbujas; relación con Bautista; mata a Eva y recibe la corona maldita"], [6, "Adicción a drogas y recuerdos falsos"], [7, "Faction Wars"]] },

  // ---- Meadow Lark
  { id: "imani", n: "Imani", a: "mariposa obsidiana fire spiritualist", g: "meadow", b: 1, f: "1", d: "Cuidadora de Meadow Lark y maestra del gremio Safehome Yolanda. Tras el piso 3 es una Mariposa de Obsidiana con clase Fire Spiritualist (sanadora; sus alas dan mejoras) y puede volar. Mató a doce ex pacientes al escoltarlos, ganando calaveras de asesina de jugadores.", s: [[1, "Lucha contra la Bola de Cerdos y salva a Yolanda con una poción"], [3, "Tras la muerte de Brandon, habla con Carl mediante Bautista"], [5, "Ya puede volar"], [6, "Su tótem mata a sus cuatro compañeros de escuadra"], [7, "Faction Wars"], [8, "Carreras del piso 10"]] },
  { id: "elle", n: "Elle McGibbons", a: "mcgibbons frost maiden blizzardmancer hielo", g: "meadow", b: 1, f: "1–2", d: "Residente de la residencia Meadow Lark. Raza Frost Maiden, clase Blizzardmancer y luego Tundra Princess. Sigue la ruta de las «cuatro estaciones». Carl la salva del Elemental de Ira en el piso 2; Donut adora sentarse en su regazo.", s: [[3, "Top 10; mata a un orco camarero; primera calavera por matar al cómplice de Ji-Hoon; contrata a Clay-ton"], [4, "Anima a Florin a seguir luchando"], [5, "Cotos de Caza y Masquerade"], [6, "Bastón de hielo; nivel 72 con Graupel"], [7, "Defiende la torre de Donut"], [8, "Mando de la coalición"]] },
  { id: "brandon", n: "Brandon", a: "brandon andrews mantenimiento", g: "meadow", b: 1, f: "1", d: "Brandon Andrews, de Wenatchee (Washington), operario de mantenimiento de Meadow Lark con su hermano Chris. Ayuda a Carl a construir el fuerte «Speedbump» y las tiras de pinchos, y a vencer a la Bola de Cerdos. Recibe un bumerán mágico.", s: [[2, "Informa a Carl de la selección de clases de los residentes"]], death: [3, "Muere conteniendo a los Shade Gremlins en el piso 3 que se derrumba para que escapen Imani y Elle"] },
  { id: "chris", n: "Chris", a: "chris andrews igneous zulu", g: "meadow", b: 1, f: "1", d: "Chris Andrews, hermano de Brandon; callado, empático y gran saqueador. En el piso 3 elige raza Igneous (puede excavar) y clase Zulu Warrior.", s: [[3, "Deja Meadow Lark; mata a Frank Q y lo expulsan del Club Desperado"], [4, "Se descubre que Maggie My lo controlaba; Carl lo libera"], [7, "Sigue con Imani"], [8, "Carreras del piso 10"]] },
  { id: "yolanda", n: "Yolanda", a: "yolanda martinez arquera", g: "meadow", b: 1, f: "1", d: "Yolanda Martinez, auxiliar de enfermería nocturna de Meadow Lark, de Wenatchee. Mide 1,50, lleva un arco y un carcaj enorme. Da nombre al gremio Safehome Yolanda.", s: [], death: [1, "El Elemental de Ira la mata mientras protege a Randall, tras disparar a Jack, que lo había provocado"] },
  { id: "agatha", n: "Agatha", a: "agente 22 carrito residual", g: "meadow", b: 1, f: "1", d: "Aparenta ser una indigente de Wenatchee que empuja un carrito. En realidad es el Agente 22, una Residual dentro del cuerpo de un agente boticario al que mató. Incendió Meadow Lark y entró por la escalera resultante. Rechaza el tutorial y el grupo.", s: [[3, "Reaparece al final del piso 4 a nivel 8"], [4, "Comparte burbuja con Li Jun, Li Na y Zhang"], [6, "Su carrito se ve en el piso 7; Orren la identifica como Residual"], [7, "Busca a Carl en Larracos"], [8, "Akuma pide a Carl que la mate"]] },

  // ---- Crawlers aliados
  { id: "lijun", n: "Li Jun", a: "monje callejero street monk", g: "aliado", b: 1, f: "2", d: "Humano chino, Street Monk: rápido y disciplinado en combate cuerpo a cuerpo. Hermano de Li Na y compañero de Zhang. Oculta que es vampiro, lo que enfada a Katia.", s: [[3, "Top 10 a nivel 25"], [5, "Su vampirismo se cura con la muerte de Miriam"], [6, "Shi Maria le arranca un ojo a través de Carl"]], death: [7, "Muere protegiendo a Donut en la torre durante Faction Wars; Li Na culpa a Donut"] },
  { id: "lina", n: "Li Na", a: "demonio cadenas", g: "aliado", b: 1, f: "2", d: "Crawler de raza demonio que lucha con cadenas. Puede convertirse en humo, impedir curaciones, maldecir con el tacto y ver a qué dios adora alguien. Hermana de Li Jun; Zhang está enamorado de ella.", s: [[3, "Rescate de la línea Bermellón"], [5, "Masquerade: lucha contra la reina Imogen"], [7, "Pierde a Li Jun; culpa a Donut"], [8, "Acepta el plan de salida de Carl"]] },
  { id: "zhang", n: "Zhang", a: "earth mover calvo", g: "aliado", b: 1, f: "2", d: "Humano calvo con clase Earth Mover (mago y tanque). Él y Li Jun acaban en el programa del Maestro, donde un consejo de Carl salva a su grupo. Enamorado de Li Na.", s: [[3, "Mata con una Varita Reductora y le da a Carl la última carga"], [5, "Talent show; queda inconsciente luchando contra Imogen"], [6, "Elige Pekín, se une a Safehome Yolanda"]] },
  { id: "bautista", n: "Bautista", a: "daniel tigran tigre espadachin", g: "aliado", b: 2, f: "3", d: "Daniel Bautista, crawler de posible origen filipino. Tigran (tigre) y espadachín, muy religioso. Tenía la misión de matar a Miss Quill, pero Carl y Donut la mataron antes (logro CockBlock). Organiza salidas seguras para otros crawlers y hace té para el gremio.", s: [[3, "Guía a unos 400 crawlers; atrapados por un Station Mimic"], [5, "Relación con Katia; guarda sus secretos"], [6, "Escuadra con Katia, Louis, Tran y Britney"], [7, "Faction Wars"], [8, "Piso 10"]] },
  { id: "prepotente", n: "Prepotente", a: "pony cabra caprid", g: "aliado", b: 3, f: "4", d: "«Pony», cabra bóer de Miriam que se vuelve un Caprid bípedo con la galleta mejorada. Clases Forsaken Aerialist y Profane Vitiate: acumula debilitaciones. Top 10 y «frenemigo» de Carl.", s: [[4, "Enloquece al perder a Miriam de vista; libera a Bianca en Club Vanquisher"], [5, "Debilita cazadores en Zockau y protege a Carl"], [6, "Rompe el piso 7 y manda a todos al 8 antes de tiempo"], [8, "Carreras con Jurgen; grupo final combinado"]] },
  { id: "miriam", n: "Miriam Dom", a: "pastora cabras vampira", g: "aliado", b: 3, f: "4", d: "Crawler italiana que entró con quince cabras bóer. Clase Shepherd (sanadora). En el piso 5 una maldición la vuelve vampira.", s: [[4, "Conquista la zona de arañas con Pony; se vuelve vampira"], [5, "Rescata y cura a Carl en Zockau"]], death: [5, "Muere al amanecer por una debilitación ligada al Anillo del Sufrimiento Divino; su muerte cura a los vampiros vinculados"] },
  { id: "bianca", n: "Bianca", a: "bianca del ciao hellspawn", g: "aliado", b: 3, f: "4", d: "Bianca Del Ciao, cabra de Miriam convertida en Hellspawn Familiar de Prepotente: pelo negro, ojos rojos, llamas fantasmales, alas y cuernos. Crece con cada nivel.", s: [[4, "Devora clérigos en Club Vanquisher"], [5, "Tamaño de rinoceronte; alas de humo"], [7, "Nivel 70 con dos pares de alas"]] },
  { id: "ren", n: "Tserendolgor (Ren)", a: "tserendolgor dog soldier pastor aleman lanzallamas velma", g: "aliado", b: 3, f: "4", d: "Crawler mongola; humanoide pastor alemán, raza Dog Soldier y clase Crisper, con el lanzallamas Velma. Donut la llama acaparadora de experiencia.", s: [[4, "Emberus la confunde con Orthrus; Velma mejorado"], [5, "CrawlCon; gana el concurso de mascotas con Garret"], [6, "Intenta robar la llave de Sor Inés; da a Carl su equipo y a Garret"]], death: [6, "Se queda atrás en el piso 8"] },
  { id: "louis", n: "Louis", a: "exterminador furgoneta", g: "aliado", b: 4, f: "5", d: "Exterminador de plagas, con sobrepeso y calvo. Entró conduciendo una furgoneta descapotable (hechizo Cloud of Exhaust). Bromista pesado; se promete con Juice Box.", s: [[4, "Se emborracha con Firas; se promete con Juice Box"], [6, "Se derrumba al luchar contra una copia de su madre; cinco calaveras"], [7, "Piso 9"], [8, "Llega al piso 11 con la coalición"]] },
  { id: "firas", n: "Firas", a: "puddle jumper bart simpson", g: "aliado", b: 4, f: "5", d: "Miembro de la Royal Court con el hechizo Puddle Jumper y una maza de clérigo. Lleva un tatuaje de Bart Simpson en el tobillo. Compañero de copas de Louis.", s: [[4, "Pide a Katia que cosa esmóquines para la boda de Louis y Juice Box"]], death: [5, "Lo mata la reina Imogen en el piso 6"] },
  { id: "gwen", n: "Gwen", g: "aliado", b: 4, f: "5", d: "Crawler inuit canadiense. Avisa a otros crawlers gracias a las predicciones de Carl.", s: [[5,"Fuerza de confianza en el piso 6"]] },
  { id: "tran", n: "Tran", a: "espadachin swashbuckler silla ruedas", g: "aliado", b: 4, f: "5", d: "Espadachín de la burbuja 543, con habilidades de detección de metales y orientación. Recibe bonificación junto a otros espadachines como Bautista.", s: [[5, "Pierde las piernas en el combate de la jaula; usa un disco flotante"], [6, "Escuadra con Katia y Bautista; su silla explota contra Amayon e Ysalte"]] },
  { id: "florin", n: "Florin", a: "cocodrilo escopeta shotgun messenger", g: "aliado", b: 4, f: "5", d: "Crocodiliano con clase Shotgun Messenger y una escopeta Mossberg de munición infinita. Aparece en un resumen del piso 3; Donut se pregunta cómo se pone la camiseta. Forma pareja con Ifechi.", s: [[3, "El hechizo Rubber de Lucia hace que sus disparos maten a Ifechi"], [4, "Limpia tres castillos solo; Elle lo anima"], [5, "Equipo de Katia contra Eva; descubre las personalidades de Lucia"], [6, "Elige Ecuador y luego Nigeria"], [8, "Entra al piso 10 con Lucia"]] },
  { id: "lucia", n: "Lucia Mar", a: "lajabless rottweilers cici gustavo", g: "aliado", b: 2, f: "3", d: "Adolescente ecuatoriana del top 10 con sus rottweilers Cici y Gustavo 3. Lajabless con clase Black Inquisitor General. Mató a su propio guía. Rival volátil de Carl y Donut; tiene varias personalidades, quizá controladas por Gustavo 3.", s: [[3, "Número 1; su hechizo Rubber mata a Ifechi"], [4, "Confiesa haber matado a dos administradores"], [5, "Lucha contra Donut, que mata a Cici"], [6, "Mata a Fang y su mujer por la llave; da Doggy Doors al equipo de Li Jun"], [7, "Florin la ve en Shanty Town"], [8, "Desfile de los Horribles"]] },

  // ---- Rivales
  { id: "frank", n: "Frank Q", a: "asesino jugadores hacha", g: "rival", b: 1, f: "1", d: "Humano, marido de Maggie y padre de Yvette. De los primeros asesinos de jugadores: mata y saquea crawlers débiles. Él y Maggie intentan emboscar a Carl y Donut en una sala segura; la mazmorra los castiga. Da a Carl el Anillo del Sufrimiento Divino.", s: [[3, "Se separa de Maggie; Shi Maria los manipula"]], death: [3, "Lo mata Chris, controlado por Maggie, en la Maraña de Hierro"] },
  { id: "maggie", n: "Maggie My", a: "detective infiltrator yvette", g: "rival", b: 1, f: "1", d: "Ex detective de paisano de Seattle, mujer de Frank. Mata a su hija Yvette tras herirla la trampa de Carl y culpa a Carl y Donut. El Maestro le da una poción de Buscar Crawler. Raza Infiltrator.", s: [[3, "Se separa de Frank y busca venganza"], [4, "Toma el cuerpo de Chris; Donut la tira al subsuelo; se mete en Carl"]], death: [4, "Mongo la despedaza y la devora"] },
  { id: "hekla", n: "Hekla", a: "amazona shieldmaiden ballesta brynhild", g: "rival", b: 2, f: "3", d: "Islandesa líder de las Hijas de Brynhild. Amazona con clase Shieldmaiden y ballesta encantada. Fue psiquiatra de Eva. Pide ayuda a Carl y Donut para encontrar a Katia en Danger Zone; Odette avisa que quiere robarles a Donut.", s: [[3, "Segunda del ranking; traiciona y hiere a Katia"]], death: [3, "Katia la mata por accidente con Rush cuando iba a por Eva; se queda su ballesta"] },
  { id: "eva", n: "Eva", a: "eva sigrid cobra cuatro brazos", g: "rival", b: 3, f: "4", d: "Eva Sigrid, ex colega profesora de Katia y mano derecha de Hekla. Mujer verde de cuatro brazos con cabeza de cobra. Asesina de jugadores.", s: [[3, "Lidera las Hijas tras la muerte de Hekla; abandona a Katia"], [5, "Más de 50 crawlers muertos"]], death: [5, "Katia la mata después de que Eva le ponga la Corona de la Puta Séptica"] },
  { id: "quan", n: "Quan Ch", a: "quan quan gh quan che semielfo cartas", g: "rival", b: 2, f: "3", d: "Ex campeón de un juego de cartas. Semielfo Imperial Security Trooper (luego Sergeant-at-Arms). Vuela y lanza rayos con una túnica celestial. Insulta a Carl y Donut en el chat de misiones; Donut lo bloquea.", s: [[3, "Llega a lo alto del ranking cazando conductores de tren"], [4, "Dispara a Carl y pierde el brazo izquierdo"], [5, "Cae del ranking"], [6, "Duelo de cartas T'Ghee con Carl, Donut y Sor Inés; roba las llaves"]], death: [6, "Muere brutalmente en el piso 8; Donut recibe el crédito. Carl devuelve el anillo de su hija"] },

  // ---- PNJ / Club
  { id: "signet", n: "Tsarina Signet", a: "signet elfa tatuajes naiade circo", g: "npc", b: 2, f: "3", d: "Mitad náyade, mitad alta elfa invocadora, con tatuajes vivos de monstruos (ogro Di-We, dragones, pulpo, anguila, tiburón) que cobran forma con el hechizo Ink Marauder. Grimaldi la rescató de niña de los altos elfos y el circo fue su familia. Tras el ataque de Scolopendra fue la única no afectada y cada noche ataca el circo para matar a Grimaldi y acabar con su sufrimiento. Intenta sacrificar a Carl a los leones de moho; él sobrevive y acaba ayudándola.", s: [[2,"Con Carl logran que Grimaldi la perdone y el circo termine"],[5,"Baile de Máscaras del Carnicero: habla con D'nadia y descubre que su madre nunca existió"]], death: [5, "Se sacrifica rompiendo el hechizo del Baile y atacando a Imogen; la arrastra la Nada"] },
  { id: "remex", n: "Remex", a: "remish remix remex el grande", g: "npc", b: 2, f: "3", d: "Skyfowl no-muerto y ex-crawler «tenner» (llegó al piso 10). Famoso por el hechizo Zerzura, que un día mandó su ejército del piso 6 al 9. Marido de Miss Quill y antiguo magistrado; tras morir a manos de un orco, Quill lo convirtió en Soul Leech Capacitor, una batería de almas. Con Quill crea las krasue (como Burgundy). Cuenta a Carl toda la trama.", s: [], death: [2, "Muere cuando Katia detona las bombas del edificio"] },
  { id: "gumgum", n: "GumGum", a: "gungun gum gum orca prostitutas krasue", g: "npc", b: 2, f: "3", d: "Orca del asentamiento skyfowl del Over City. Cada mañana encuentra cadáveres de trabajadoras sexuales que caen del cielo por la noche; el magistrado le permite dejarlos fuera de las puertas para los pilluelos. Cuenta el caso a Carl y Donut, y cuando Carl promete ayudar se activa la misión de los asesinatos. Investigaba por su cuenta: había visto a los krasue.", s: [[2,"Fitz, el dueño del pub, cuenta que intentaba resolver los asesinatos"],[2,"Al saquear su cuerpo encuentran un uniforme del 201st, un pase y una carta en necroescritura"]], death: [2,"La encuentran muerta en un callejón con el pecho abierto y krasue encima; un elfo de ciudad había atraído a Mongo"] },
  { id: "fitz", n: "Fitz", a: "fitz tabernero posadero pub narval tuerto one-eyed narwhal", g: "npc", b: 2, f: "3", d: "Humano de nivel 30, grande y calvo, tabernero del One-Eyed Narwhal (el Narval Tuerto), un pub pequeño y poco recomendable del asentamiento skyfowl. Carl y Donut lo eligen para no llamar la atención de otros crawlers. Adora a Donut y les da buen precio por dos habitaciones: una para Carl y Donut y otra para Mordecai.", s: [[2,"Ven allí el programa resumen con otros crawlers y sus mascotas"],[2,"Cuenta que GumGum investigaba los asesinatos y había visto a los krasue; les extraña porque el magistrado es clérigo negro"],[2,"Apunta sus sospechas hacia el magistrado Featherfall"]] },
  { id: "quill", n: "Miss Quill", a: "quill", g: "npc", b: 2, f: "3", d: "Nieta de la antigua realeza skyfowl y magistrada en la sombra del asentamiento. Manipuló la muerte de Featherfall, usó a Remex como capacitor y convertía mujeres en krasue para recoger plumas para el hechizo Final War.", s: [], death: [2, "La mata Carl"] },
  { id: "grimaldi", n: "Grimaldi", a: "redstone grimaldi arbol enredadera vid jefe de ciudad circo", g: "npc", b: 2, f: "3", d: "Redstone Grimaldi, enano y jefe de pista del circo ambulante del Over City. Marido de Signet. La nube venenosa de Scolopendra lo convirtió en una Pestiferous Vine (enredadera gigante), jefe de ciudad nivel 85; controla con parásitos de moho a su troupe y la resucita cada día. Carl lo envenena con sangre, chantajea a los productores de Vengeance of the Daughter y luego lo cura; habla con él comiendo un helado con gusanos de Apollon.", s: [[3,"Carl lo recuerda al ver a los Cornets zombis con gusanos"]] },
  { id: "bomo", n: "Bomo", a: "cretino guardaespaldas", g: "npc", b: 3, f: "4", d: "Cretino con esmoquin, guardaespaldas del Club Desperado y gran amigo de Sledge. Carl y Donut lo contratan como seguridad personal.", s: [[3, "No impide el atentado de Ji-Hoon contra Donut"], [5, "Mercenario; Yemaya lo teletransporta al piso 9 con Sledge"], [7, "Faction Wars"]] },
  { id: "sledge", n: "Sledge", a: "sledgey cretino roca", g: "npc", b: 3, f: "4", d: "Monstruo de roca de 2 metros, guardaespaldas del Club Desperado. Donut lo adora («Sledgey»). Baila el robot con Donut a hombros. Como mercenario revive al empezar cada piso.", s: [[3, "Compra un hechizo de protección para Donut; va al Penis Parade"], [5, "Recibe Zerzura: teletransporta el castillo de Imogen al piso 9"], [7, "Faction Wars"]] },
  { id: "bones", n: "Doctor Bones", a: "doctor bones skellie bardo dj", g: "npc", b: 3, f: "4", d: "Skin Skellie bardo de nivel 90, presentador y DJ del Penis Parade. Carl lo contrata como mercenario con un cupón de Meat Shields. Su hechizo Conscript convierte enemigos en aliados.", s: [[7, "Faction Wars; usa Super Spreader con los sluggalos"], [8, "Juega a carreras con Samantha; desaparece con Splash Zone"]] },
  { id: "juicebox", n: "Juice Box", a: "changeling juice box", g: "npc", b: 4, f: "5", d: "Changeling, hermana de Henrik. En una temporada anterior fue maestra y todos sus alumnos tuvieron que morir por una enfermedad. Se promete con Louis.", s: [[5, "Enviada al piso 9, asesina a miembros de otras facciones"], [6, "Co-señora de la guerra de la facción PNJ con Ferdinand"]] },
  { id: "imogen", n: "Reina Imogen", a: "reina elfa fallen cleric", g: "npc", b: 5, f: "6", d: "Alta elfa Fallen Cleric Sorcerer de nivel 145, jefa de país del piso 6 e hija del rey Finian. Quiso exterminar a los hijos mestizos de su padre, incluida Signet. Convirtió a los Chee en were-kin. En la Masquerade tenía maná ilimitado.", s: [[5, "Signet la ataca con sus tatuajes en la Masquerade"]], death: [5, "Muere a manos de Signet"] },
  { id: "kiwi", n: "Kiwi", a: "osa ursina mongoliensis", g: "npc", b: 5, f: "6", d: "Mongoliensis líder de manada de nivel 60, antes una Ursina. Ella y Mongo se aparean en cuanto se conocen en los Cotos de Caza. Su marido la maltrataba; su hija Tina se volvió alosaurio.", s: [[5, "Queda embarazada; talent show; Carl la devuelve a su forma Ursina"], [7, "Da a luz a dos crías Ursensus"]] },
  { id: "ferdinand", n: "Ferdinand", a: "gravy boat gato naranja", g: "npc", b: 5, f: "6", d: "En realidad Gravy Boat, gato naranja sin castrar del edificio de Carl y Bea en Seattle; se sentaba en la ventana cuando Donut estaba en celo. Donut lo llama «el amor de mi vida». Borant lo convierte en jefe de provincia de nivel 100 y familiar de Imogen. Voz neoyorquina.", s: [[5, "Ataca a Mongo con rayos; Zerzura lo manda al piso 9"], [6, "Co-señor de la guerra de la facción PNJ con Juice Box en Larracos"]] },

  // ---- Producción y alienígenas
  { id: "bea", n: "Bea", a: "beatrice exnovia", g: "tierra", b: 1, f: "Prólogo", d: "Beatrice, exnovia de Carl y dueña original de Donut. Carl rompe con ella tras una foto en Bahamas con Brad. Sobrevive al colapso, llega al campamento de New Queen Anne y Odette la rescata para chantajear a Borant.", s: [[4, "Recompensa más alta de la lista Walk-On"], [5, "Carl y Donut la rechazan en televisión"], [7, "Reaparece ligada a Ferdinand"]] },
  { id: "zev", n: "Zev", a: "kua-tin pez relaciones publicas", g: "alien", b: 1, f: "2", d: "Kua-Tin de bajo rango del departamento de comunicación de Borant. Enlace con los programas y luego responsable de redes y relaciones públicas de la Royal Court.", s: [[1, "Avisa a Carl del Elemental de Ira y la sancionan"], [2, "Ayuda a negociar con Vengeance of the Daughter"], [3, "Enviada a reeducación; Loita la sustituye"], [4, "Vuelve convertida por la Bloom, pero señala resistencia"], [5, "Frente de Emancipación de Borant"], [6, "Organiza la entrevista con Rosetta"], [7, "Transición a Valtay"]] },
  { id: "odette", n: "Odette", a: "odette presentadora after hours", g: "alien", b: 1, f: "1–2", d: "Ex crawler y presentadora de Dungeon Crawler After Hours. Les enseña que todo es una estadística y la mazmorra un negocio. Fue mánager de Mordecai y ordenó a Chaco matar a su hermano.", s: [[2, "Les aconseja buscar el Manager Benefit"], [3, "Patrocina a Hekla; incluye a Katia en las entrevistas"], [5, "Revela que rescató a Bea para chantajear a Borant"], [6, "Patrocina a Nekhebit; derriba una nave para hablar a solas con Carl"], [8, "Se prepara para crisis más profundas"]] },
  { id: "maestro", n: "El Maestro", a: "maestro orco pork boy", g: "alien", b: 1, f: "2", d: "Enorme orco, hijo menor del rey Rust del Imperio Calavera. Presenta Death Watch Extreme Dungeon Mayhem, donde Carl lo humilla. El vídeo «Pork Boy Snick» lo convierte en el «cerdito travieso de Carl». Da a Maggie la poción de Buscar Crawler.", s: [[2, "Su padre lo repudia; se le da por muerto en la destrucción del yate de Stalwart"], [3, "Estaba en la mazmorra; patrocina al dios Grull contra Carl"], [5, "Condenado, pero se libra"]] },
  { id: "stalwart", n: "Príncipe Stalwart", a: "stalwart jabali capitan enorme", g: "alien", b: 1, f: "2", d: "Príncipe heredero del Imperio Calavera, parecido a un jabalí y cruel. Productor del programa de su hermano Maestro.", s: [[2, "Mata por accidente a la cantante Manasa; su yate es destruido por Valtay"], [7, "Señor de la guerra en Faction Wars"]] },
  { id: "loita", n: "Loita", a: "loita bloom", g: "alien", b: 3, f: "4", d: "Kua-Tin de la Bloom, el partido ultranacionalista de Borant. Se queda con las relaciones públicas de la Royal Court alegando que Katia está a su cargo, y Zev es enviada a reeducación.", s: [] },
  { id: "chaco", n: "Chaco", a: "chaco carrusel pterolykos", g: "alien", b: 3, f: "4", d: "Ex crawler Skyfowl (Pterolykos) con clase Song Bard, presentador del Carrusel de Premios. Fue de la misma temporada que Mordecai y, por orden de Odette, mató a su hermano.", s: [[3, "Mordecai lo ataca y lo castigan siete días"], [5, "Atiende el mostrador de premios de la Masquerade"], [7, "Presenta la reunión de señores de la guerra"], [8, "Carl lo cura tras perder las alas"]] },
  { id: "quasar", n: "Quasar", a: "quasar abogado nulliano", g: "alien", b: 5, f: "Escalera al 6", d: "Nulliano de 1,35 m, gris y de cabeza bulbosa, con traje marrón y corbatas absurdas. Abogado de Carl (solo de Carl). Negocia con Orren el cambio de la Puerta de los Dioses Salvajes por seguridad y hechizos, incluido Zerzura; estudió el trato de salida de Remex.", s: [[7, "Faction Wars"], [8, "Negociaciones de salida del piso 11"]] },
  { id: "cascadia", n: "Cascadia", a: "cascadia productora ejecutiva", g: "alien", b: 5, f: "7", d: "Pequeña Kua-Tin de la Bloom, ingeniera jefe y productora ejecutiva de Dungeon Crawler World: Earth. Dedicó años a diseñar el piso 7 (la Gran Carrera). Pony la llama «mujercita odiosa».", s: [[6, "Prepotente le rompe el piso 7; al borde del colapso"], [7, "Coordina Faction Wars"]] },
  { id: "rosetta", n: "Rosetta Thagra", a: "rosetta thagra cookbook libro de cocina crest", g: "alien", b: 6, f: "8", d: "Crest, ex crawler y ex guía, autora de la 9ª edición del Libro de Cocina del Anarquista de la Mazmorra. Presenta el programa Shadow Boxer.", s: [[3, "Carl usa su entrada sobre mochilas para Katia"], [6, "Entrevista a Carl y Donut; se vuelve fugitiva galáctica"], [7, "Entra en la mazmorra como Crest Barnburner con la Princess Posse"]] },

  // ---- Dioses y entidades
  { id: "ai", n: "La IA del sistema", a: "ia sistema macro", g: "divino", b: 1, f: "1", d: "Macro IA injertada en el motor primal de la Tierra; dirige la mazmorra y puede alterar la realidad. Borant la compró de segunda mano a los Mantis; antes estuvo en un parque de atracciones. Fascinada por Carl y por los pies.", s: [[3, "Tras anularse la recompensa de la misión, da a Carl el logro Cuck Aquaman"], [4, "Misión Squeeze out the Juice Box"], [8, "Se explica su origen"]] },
  { id: "emberus", n: "Emberus", a: "emberus dios sol ceniza", g: "divino", b: 4, f: "5", d: "Dios del Sol y la Ceniza, nivel 250, aspirante a la Ascendencia Celestial. Hermano gemelo de Hellik y padre de Geyrun. Carl lo invoca con una granada celestial para devolverle a Orthrus y se hace su acólito.", s: [[4, "Misiones Find Out Who Killed My Son y Kill Hellik"], [5, "Vrah lo invoca en Zockau"], [7, "Misión Kill the Blasphemer"]] },
  { id: "shimaria", n: "Shi Maria", a: "novia de bedlam bedlam bride arana screamer", g: "divino", b: 6, f: "8", d: "La Novia de Bedlam (Screamer, Widow Endless): araña segadora de nivel 140 con cabeza de mujer. Jefa de ciudad y semidiosa. Pacta el viaje a Larracos, acepta ser carta T'Ghee y pone en Carl el Ojo de la Novia de Bedlam, desde donde le habla y le controla.", s: [[7, "A través de Carl arranca un ojo a Li Jun y hiere a Mongo"]] },
  { id: "scolopendra", n: "Scolopendra", a: "scolopendra ciempies", g: "divino", b: 8, f: "10", d: "Ciempiés gigante que «duerme» en el piso 18; los pisos 3, 6, 9, 12, 15 y 18 son su guarida. Su ataque de Nueve Niveles causó el cataclismo del Over City (transformó a Grimaldi).", s: [[2, "Su ataque explica el piso 3"], [5, "Los altos elfos robaron cristales de alma"], [6, "Ninfas de Scolopendra; plan de Prepotente"], [7, "«Scolopendra se agita»"]] },
  { id: "vrah", n: "Vrah", a: "vrah mantis cazadora", g: "rival", b: 5, f: "6", d: "Mantis, alcaldesa de Zockau y temida ex cazadora número uno de los Cotos de Caza. Lleva las cabezas de sus presas a la espalda. Su hermana Xindy muere en el ataque de Carl y Donut a Zockau. Carl la apuñala con la Flecha de la Gonorrea Doble Entusiasta.", s: [[5, "Invoca a Emberus en Zockau contra Carl"]], death: [5, "Destrozada por Mongo y Kiwi"] },
];

// t: aliado | familia | enemigo | trabajo ; b = libro en que la relación se hace visible
window.LINKS = [
  ["carl","donut","aliado","Compañeros inseparables",1],
  ["donut","mongo","familia","Su mascota y montura",1],
  ["carl","mordecai","trabajo","Guía del juego",1],
  ["donut","mordecai","trabajo","Su mánager",2],
  ["carl","bea","familia","Exnovia",1],
  ["donut","bea","familia","Su dueña original",1],
  ["carl","katia","aliado","Miembro de la Corte",2],
  ["carl","samantha","aliado","Se une a la Corte",4],
  ["donut","samantha","aliado","Amigas que discuten",4],
  ["carl","ai","enemigo","Obsesión mutua",1],
  // Meadow Lark
  ["carl","imani","aliado","Aliada de rescates",1],
  ["carl","elle","aliado","Carl la salva",1],
  ["imani","elle","aliado","Líderes de Meadow Lark",1],
  ["imani","brandon","aliado","Compañeros de residencia",1],
  ["imani","yolanda","aliado","Compañeras cuidadoras",1],
  ["brandon","chris","familia","Hermanos",1],
  ["imani","agatha","aliado","Viaja con el grupo",1],
  ["chris","imani","familia","Pareja",6],
  // Rivales iniciales
  ["frank","maggie","familia","Ex-matrimonio",1],
  ["carl","frank","enemigo","Emboscada en sala segura",1],
  ["carl","maggie","enemigo","Juramento de venganza",1],
  ["maggie","chris","enemigo","Lo controla",3],
  ["chris","frank","enemigo","Lo mata (controlado)",3],
  // Death Watch
  ["carl","maestro","enemigo","Humillación en su programa",1],
  ["maestro","stalwart","familia","Hermanos",1],
  ["donut","stalwart","enemigo","«Capitán Enorme»",1],
  ["lijun","lina","familia","Hermanos",1],
  ["lijun","zhang","aliado","Equipo del almacén",1],
  ["carl","lijun","aliado","Los rescata en Death Watch",1],
  // producción
  ["carl","remex","trabajo","Le revela el plan de Quill",2],
  ["remex","quill","familia","Marido / su capacitor",2],
  ["carl","quill","enemigo","Carl la mata",2],
  ["carl","gumgum","trabajo","Le encarga el caso de las prostitutas",2],
  ["gumgum","quill","enemigo","Víctima del plan de los krasue",2],
  ["carl","fitz","trabajo","Posada y pistas del caso",2],
  ["fitz","gumgum","aliado","Conocía su investigación",2],
  ["carl","zev","trabajo","Relaciones públicas",1],
  ["donut","zev","aliado","Vínculo de famosas",1],
  ["donut","odette","trabajo","Entrevistas",1],
  ["mordecai","odette","enemigo","Antigua mánager y traidora",2],
  ["mordecai","chaco","enemigo","Viejo rencor",3],
  ["carl","quasar","trabajo","Su abogado",5],
  ["zev","loita","trabajo","Borant",3],
  ["zev","cascadia","trabajo","Producción",5],
  // Piso 3
  ["katia","hekla","enemigo","Rival: quiere reclutarla",2],
  ["hekla","eva","aliado","Hijas de Hekla",3],
  ["katia","eva","enemigo","Venganza",3],
  ["carl","signet","aliado","Intenta sacrificarlo; luego aliados",2],
  ["signet","grimaldi","familia","Marido; lo ataca cada noche",2],
  ["carl","quan","enemigo","Rival oportunista",2],
  // Piso 4
  ["katia","bautista","familia","Pareja",5],
  ["carl","bautista","aliado","Red de crawlers",3],
  ["prepotente","miriam","familia","Madre adoptiva",3],
  ["prepotente","bianca","familia","Hermana y montura",3],
  ["miriam","bianca","familia","Su cabra",3],
  ["carl","prepotente","aliado","Aliado caótico",3],
  ["carl","ren","aliado","Alianza",3],
  ["donut","ren","enemigo","Antipatía",3],
  ["donut","bomo","aliado","Guardaespaldas",3],
  ["donut","sledge","aliado","Guardaespaldas",3],
  ["bomo","sledge","aliado","Rivales amistosos",3],
  ["carl","bones","aliado","Mercenario",3],
  // Piso 5
  ["carl","louis","aliado","Aliado de confianza",4],
  ["louis","firas","familia","Pareja",4],
  ["louis","juicebox","familia","Pareja",4],
  ["carl","juicebox","aliado","Aliada PNJ",4],
  ["gwen","tran","aliado","Compañeros",4],
  ["carl","gwen","aliado","Aliada",4],
  ["carl","florin","aliado","Contacto independiente",4],
  ["carl","emberus","aliado","Su dios patrón",4],
  // Piso 6-7
  ["florin","lucia","aliado","Compañeros de viaje",5],
  ["donut","lucia","enemigo","Mata a Cici",5],
  ["carl","grimaldi","enemigo","Lo envenena y luego lo cura",2],
  ["signet","imogen","familia","Medio hermanas enemigas",5],
  ["imogen","firas","enemigo","Lo mata",5],
  ["vrah","eva","aliado","Cazadoras aliadas",5],
  ["carl","vrah","enemigo","Venganza por su hermana",5],
  ["mongo","kiwi","familia","Rival y pareja",5],
  ["quan","miriam","enemigo","Sabotaje",5],
  ["prepotente","cascadia","enemigo","Destruye su piso 7",5],
  // Piso 8+
  ["carl","shimaria","enemigo","Se aloja en su mente",6],
  ["samantha","shimaria","aliado","La identifica",6],
  ["carl","rosetta","aliado","Aliada anarquista",6],
  ["ferdinand","bea","familia","Su gato",7],
  ["ferdinand","juicebox","aliado","Co-señores de guerra",7],
  ["donut","ferdinand","familia","Su «prometido»",7],
  ["carl","lucia","aliado","Reclutada en Faction Wars",7],
  ["carl","scolopendra","enemigo","Jefa final",8]
];
