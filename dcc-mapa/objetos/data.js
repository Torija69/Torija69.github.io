// Inventario de Carl, Princess Donut y Katia Grim por libro (contiene spoilers de los libros 1–8).
// Fuente principal: compendio de fans dcc-compendium (docs/items, docs/characters, docs/chapter-summaries).
window.INV_SOURCES = {
  compendio: "https://github.com/cdkolb/dcc-compendium"
};

window.INVENTORY = {
  carl: [
    {
      id: "war-gauntlet",
      n: "Enchanted War Gauntlet of the Exalted Grull",
      es: "Guantelete de guerra de Grull",
      t: "arma",
      b: 1,
      d: "Brazal que se transforma en un guantelete de acero orco con pinchos al cerrar el puño: +3 Fuerza, +1 Destreza, +2 a Iron Punch, +1 a Powerful Strike y un 2 % de aturdir. Es el arma insignia de su estilo a puño limpio.",
      h: [[3, "Mordecai le explica las reglas de invocación de dioses por la advertencia del guantelete (convertir a un adorador de Grull en el propio dios), clave en el plan contra el Maestro."], [4, "Aplica una Platinum Sharpening Stone (piedra de afilar): los pinchos crecen y gana +1 Fuerza, +1 Destreza y un bonus de daño que escala con el nivel."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/war-gauntlet-of-the-exalted-grull.md"
    },
    {
      id: "trollskin-shirt",
      n: "Enchanted Trollskin Shirt of Pummeling",
      es: "Camisa de piel de trol",
      t: "equipo",
      b: 1,
      d: "Su armadura base desde el tutorial: +7 a Regeneración y anula aturdimiento, derribo, desarme y falta de aliento. Le permite encajar golpes brutales sin gastar pociones.",
      h: [[3, "Le aplica un Scroll of Upgrade (pergamino de mejora) y la camisa gana +3 Destreza."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/trollskin-shirt-of-pummeling.md"
    },
    {
      id: "bigboi-boxers",
      n: "Enchanted BigBoi Boxers",
      es: "Calzoncillos BigBoi",
      t: "equipo",
      b: 1,
      d: "Calzoncillos blancos con corazones rojos que le dan +2 Constitución y el hechizo Protective Shell a nivel 15, sin coste de maná. Ese escudo le salva la vida ante la carga del elemental de ira.",
      h: [[2, "Un Scroll of Upgrade cae sobre ellos: +5 Destreza, +5 Inteligencia, más Constitución y el beneficio Freeballing (+100 % de daño por debajo de la cintura, pero nada de pantalones encima)."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/bigboi-boxers.md"
    },
    {
      id: "jug-o-boom",
      n: "Carl's Jug O' Boom",
      es: "Jarra explosiva de Carl",
      t: "arma",
      b: 1,
      d: "Incendiario inventado por Carl con una jarra de licor Rev-Up, aceite de goblin y una antorcha como mecha. Entra en el códice del calabozo y le reporta un canon (muy gravado) por cada muerte que causa.",
      h: [[2, "Otros crawlers ya han copiado la receta, lo que recorta sus derechos."], [4, "Sigue llevando y usando jarras explosivas."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/carls-jug-o-boom.md"
    },
    {
      id: "xistera",
      n: "Xistera",
      es: "Cesta de jai alai",
      t: "arma",
      b: 2,
      d: "Cesta de cesta punta, que sabe usar gracias a la habilidad aleatoria de su Earth Hobby Potion. Saca bombas del inventario directamente a la cesta y las lanza a unos 400 km/h; sustituye a su tirachinas.",
      h: [[4, "Un patrocinador le envía un accesorio único para lanzar cabezas (500 m × Fuerza) con el que manda la cabeza de Samantha a más de 50 km."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/xistera.md"
    },
    {
      id: "anarchists-cookbook",
      n: "The Dungeon Anarchist's Cookbook",
      es: "El libro de cocina del anarquista del calabozo",
      t: "objeto",
      b: 3,
      d: "Premio de \"broma\" del carrusel de Chaco que resulta ser un manual secreto, invisible para la IA, escrito por 24 crawlers anteriores: explosivos, portales, dioses y recetas. Carl se convierte en su 25.º autor.",
      h: [[5, "Las notas de Herot, Everly, Drakea y otros guían sus planes contra Signet y la infiltración en la Butcher's Masquerade."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/the-dungeon-anarchists-cookbook.md"
    },
    {
      id: "battle-rattle",
      n: "Enchanted Anarchist's Battle Rattle",
      es: "Chaqueta de guerra del anarquista",
      t: "equipo",
      b: 4,
      d: "Chaqueta sin mangas que sustituye a su cazadora destrozada: +1 a todas las estadísticas, +50 % de alcance y precisión con explosivos arrojados y huecos ilimitados para parches de mejora.",
      h: [[5, "Gana tres parches: Twelve Flaming Arrows, The Bomb y The Midnight Epicure (protección contra vampirismo y licantropía)."], [6, "Recibe el parche trasero divino The Scavenger's Daughter, que duplica las bonificaciones de los demás parches y otorga Soul Reaper y la Mysterious Bone Key."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-anarchists-battle-rattle.md"
    },
    {
      id: "phase-lava-rock",
      n: "Phase Lava Rock Potion",
      es: "Poción de fase de roca de lava",
      t: "pocion",
      b: 4,
      d: "Poción que Mordecai elabora con el misterioso \"ñame\" de un patrocinador. Con ella Carl atraviesa el cráneo de roca fundida de Chris Andrews y le arranca con la mano el parásito Scree de Maggie My.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/chapter-summaries/book-04.md"
    },
    {
      id: "double-healing",
      n: "Double-healing potion",
      es: "Poción de doble curación",
      t: "pocion",
      b: 4,
      d: "Al extraer a Maggie, el gusano se mete en el brazo de Carl; la poción de doble curación de Mordecai lo expulsa por su cuello y Mongo lo remata, liberando por fin a Chris.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/chris-andrews.md"
    },
    {
      id: "gate-feral-gods",
      n: "The Gate of the Feral Gods",
      es: "La Puerta de los Dioses Salvajes",
      t: "objeto",
      b: 4,
      d: "Artefacto de tres piezas (dos relojes de bolsillo y una caja de cuerda) que abre portales y libera dioses salvajes. Carl lo usa para evacuar a unos 2.300 crawlers y para inundar el mercado de Larracos.",
      end: [5, "Al empezar el piso 6 la Syndicate le obliga a entregársela al enlace Orren a cambio de un recibo canjeable en el noveno piso."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/gate-of-the-feral-gods.md"
    },
    {
      id: "paupers-ring",
      n: "Enchanted Pauper's Ring of the Steadfast Emberus",
      es: "Anillo del pobre de Emberus",
      t: "equipo",
      b: 6,
      d: "Su primer anillo de Fuerza reforjado en el Club Vanquisher: elimina la mayoría de debuffs de sangrado y enfermedad. Lo paga con un préstamo de 990.000 de oro del templo que le impide renunciar a su religión.",
      end: [8, "Se lo quita al renegar públicamente de Emberus en el clímax del piso 11."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-paupers-ring-of-the-steadfast-emberus.md"
    },
    {
      id: "eye-bedlam-bride",
      n: "The Eye of the Bedlam Bride",
      es: "El Ojo de la Novia de Bedlam",
      t: "tatuaje",
      b: 6,
      d: "Tatuaje en el esternón que Shi Maria le hace mientras controla su cuerpo, para no depender de su carta. El sistema solo dice su nombre; Carl siente \"un agujero sin fondo\".",
      h: [[7, "Se revela que Shi Maria está encerrada en él; el ojo enloquece a quien lo mira (Vinata, Warlord Stockade)."], [8, "Convertido en perro, Carl lo abre a propósito y congela al mimo de sombras Mitch para que Donut lo remate."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/the-eye-of-the-bedlam-bride.md"
    },
    {
      id: "toe-ring-well-balanced",
      n: "Enchanted Toe Ring of the Well-Balanced",
      es: "Anillo de pie del equilibrio",
      t: "equipo",
      b: 7,
      d: "Anillo para el meñique izquierdo con Heart, Mind y Physical Balance. Mind Balance protege de la esclavitud y la conscripción y es lo que impide a Shi Maria apoderarse de su cuerpo.",
      h: [[7, "Entrena Mind Balance hasta el nivel 16, la primera habilidad de la serie que supera el 15 por las condiciones del combate."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-toe-ring-of-the-well-balanced.md"
    },
    {
      id: "hell-kissed-conscription",
      n: "Hell-Kissed Potion of Conscription",
      es: "Poción de conscripción besada por el infierno",
      t: "pocion",
      b: 7,
      d: "Conscripción de nivel 18, elaborada por Krakaren Prime, capaz de reclutar incluso a la mayoría de dioses. Li Na la duplica y le da la copia; Carl se la estampa en la cabeza a Lucia Mar y la recluta para la Princess Posse.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/hell-kissed-potion-of-conscription.md"
    },
    {
      id: "enriched-pet-biscuit",
      n: "Enriched Pet Biscuit",
      es: "Galleta enriquecida para mascotas",
      t: "pocion",
      b: 8,
      d: "Galletas para mascotas de resultado garantizado. Carl da a la cerda Penelope la \"Nothing Special Party Companion\" para volverla sapiente; en la final del piso 11, Donut le pasa por error otra galleta y Scolopendra renace como crawler sapiente en vez de mascota sin mente.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enriched-pet-biscuits.md"
    }
  ],

  donut: [
    {
      id: "enhanced-pet-biscuit",
      n: "Enhanced Pet Biscuit",
      es: "Galleta mejorada para mascotas",
      t: "pocion",
      b: 1,
      d: "Carl se la da a la fuerza, sacada de una Legendary Pet Box: Donut se disuelve en un charco y vuelve sapiente, capaz de hablar y con el beneficio permanente Enhanced Growth. Así deja de ser mascota y pasa a ser crawler.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/princess-donut.md"
    },
    {
      id: "crown-sepsis-whore",
      n: "Enchanted Crown of the Sepsis Whore",
      es: "Corona de la Ramera Séptica",
      t: "equipo",
      b: 1,
      d: "Tiara legendaria y maldita (+5 Inteligencia, 15 % de infligir Sepsis) que se pone sin terminar de leer porque es morada. La inscribe para siempre en la línea sucesoria del Sultanato de Sangre del piso 9.",
      end: [2, "La sacrifica durante las ráfagas previas al Doomsday Scenario; al ser Fleeting se deshace, pero la obligación sucesoria se mantiene (la corona regenerada acaba en la cabeza de Katia en el libro 5)."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/crown-of-the-sepsis-whore.md"
    },
    {
      id: "fae-scale-crupper",
      n: "Enchanted Fae Scale Quadruped Crupper of the Fleet",
      es: "Grupera de escamas feéricas",
      t: "equipo",
      b: 1,
      d: "Armadura de acero feérico que lleva como faldita sobre los cuartos traseros: +2 Destreza. Llega en la misma tanda que la corona y el Desperado Pass.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/fae-scale-crupper-of-the-fleet.md"
    },
    {
      id: "desperado-pass",
      n: "Desperado Pass",
      es: "Pase Desperado",
      t: "tatuaje",
      b: 1,
      d: "Tatuaje de facción grabado junto a su omóplato derecho (Carl lleva otro en el cuello) que da acceso al Desperado Club e impide obtener un pase Vanquisher. Donut lo considera una profanación.",
      h: [[2, "Junto con la corona, reduce sus opciones de clase a solo 34; elige Former Child Actor."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/desperado-pass.md"
    },
    {
      id: "anklet-fallen-oak",
      n: "Enchanted Anklet of the Fallen Oak",
      es: "Tobillera del Roble Caído",
      t: "equipo",
      b: 2,
      d: "Saqueada de una crawler muerta por los lémures del circo: +1 Destreza, +1 Constitución y +3 a Double Tap. Primera respuesta a su fragilidad; la lleva en una pata trasera, oculta en el pelo.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/anklet-of-the-fallen-oak.md"
    },
    {
      id: "mongoliensis-saddle",
      n: "Enchanted Mongoliensis Saddle",
      es: "Silla de montar de Mongo",
      t: "equipo",
      b: 3,
      d: "Regalo de los fans que convierte a Mongo en su montura: ella gana +15 % de daño de hechizos ofensivos y él +20 % de Constitución y de daño cuerpo a cuerpo mientras está montado.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/mongoliensis-saddle.md"
    },
    {
      id: "tiara-mana-genita",
      n: "Enchanted Tiara of Mana Genita",
      es: "Tiara de Mana Genita",
      t: "equipo",
      b: 3,
      d: "Tiara de cristal blanco que sustituye a la corona perdida: +3 Inteligencia, más alcance de detección de enemigos y sin hostilidad automática de los adoradores de Mana Genita.",
      h: [[6, "Sigue siendo su tiara de diario hasta mitad del piso 8, cuando la relega la del Inebriated Dragonfly; la conserva en el inventario."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/tiara-of-mana-genita.md"
    },
    {
      id: "obsidian-bracelet",
      n: "Enchanted Obsidian Bracelet of the Raggle Rouser",
      es: "Brazalete de obsidiana",
      t: "equipo",
      b: 5,
      d: "Carl lo saquea del cazador Akland y se lo da: +10 Constitución, +5 Destreza y una Fireball de nivel 10 cada 20 minutos. Con ella remata al jefe Claude Sludgington y se enfrenta a Lucia Mar.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/obsidian-bracelet-of-the-raggle-rouser.md"
    },
    {
      id: "fire-demon-nipple-ring",
      n: "Enchanted Nipple Ring of the Superior Fire Demon's Hand Maiden",
      es: "Piercing de la doncella del demonio de fuego",
      t: "equipo",
      b: 6,
      d: "Premio por seducir a Ferdinand: sus hechizos de fuego hacen un (Inteligencia) % más de daño, es inmune al fuego natural y a la lava y puede lanzar Bitch, What? (berserker) una vez al día.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-nipple-ring-of-the-superior-fire-demons-hand-maiden.md"
    },
    {
      id: "dragonfly-tiara",
      n: "Enchanted Tiara of the Inebriated Dragonfly",
      es: "Tiara de la libélula ebria",
      t: "equipo",
      b: 6,
      d: "Hecha con la gema de la reina Imogen: −50 % de enfriamiento de pociones, +10 Inteligencia, protección contra veneno y Hover de nivel 10. Donut por fin puede \"volar\".",
      end: [7, "La deja diez horas en el cojín de carga de la Tiara of a Thousand Lights, que absorbe para siempre su magia."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-tiara-of-the-inebriated-dragonfly.md"
    },
    {
      id: "tiara-thousand-lights",
      n: "The Tiara of a Thousand Lights",
      es: "Tiara de las mil luces",
      t: "equipo",
      b: 7,
      d: "Regalo celestial de su nuevo patrocinador Long Haul: solo da +10 Carisma, pero sus 99 joyas de absorción almacenan para siempre los efectos de cualquier sombrero encantado que deje en su cojín.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/tiara-of-a-thousand-lights.md"
    },
    {
      id: "champion-cloak",
      n: "Cloak of the Benevolent Champion",
      es: "Capa del campeón benévolo",
      t: "equipo",
      b: 7,
      d: "Capa celestial que Carl saqueó a Quan Ch: iguala su estadística base más baja con la más alta y sube cuatro hechizos y una habilidad al nivel 15. Donut la llama su chal y le atribuye el ascenso de su habilidad Claw.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/cloak-of-the-benevolent-champion.md"
    },
    {
      id: "kina-knee-pads",
      n: "Enchanted Spiked Knee Pads of Kina",
      es: "Rodilleras de la diosa Kina",
      t: "equipo",
      b: 7,
      d: "Rodilleras divinas hechas con pestañas de la diosa Kina (25 % de reflejo cuerpo a cuerpo, respirar bajo el agua, Iron Stomach). Katia se las regala y Donut las lleva al acabar con Huanxin Jinx.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-spiked-knee-pads-of-kina.md"
    },
    {
      id: "scorpions-bite",
      n: "Quadruped Weapon Mount \"The Scorpion's Bite\"",
      es: "Montura de armas \"El aguijón del escorpión\"",
      t: "equipo",
      b: 7,
      d: "Arnés no mágico enviado por el Apothecary que le permite montar armas a distancia en la espalda y dispararlas desde el inventario. Con él maneja la ballesta repetidora de Katia, más grande que ella.",
      h: [[8, "Clava en los ojos de Emberus el Bolt of Ophiotaurus de Katia y un virote Danforth, dejándolo vulnerable e inmóvil para que Taranis lo mate."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/scorpions-bite.md"
    },
    {
      id: "assassins-veil",
      n: "The Assassin's Veil",
      es: "El velo de la asesina",
      t: "equipo",
      b: 8,
      d: "Tocado egipcio de cuentas de su clase Assassin of Sekhmet: +10 % Destreza y Precognición (avisa de hechizos ofensivos o de atadura cercanos), a cambio de ser hostil para todos los enemigos de Sekhmet.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    }
  ],

  katia: [
    {
      id: "constitution-ring",
      n: "Constitution Ring (+15)",
      es: "Anillo de Constitución +15",
      t: "equipo",
      b: 2,
      d: "Su principal pieza para acumular estadística y uno de los motivos de su Constitución desmesurada, la base de su papel de tanque.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "scavenger-crossbow",
      n: "Enchanted Repeating Crossbow of the Scavenger Mother of Mothers",
      es: "Ballesta repetidora de la Madre de Madres",
      t: "arma",
      b: 3,
      d: "La ballesta de Hekla, recuperada tras matarla Katia por accidente: munición básica infinita, +15 Destreza, +10 Fuerza y +25 % de daño y cadencia por cada mujer del grupo. La monta en un trípode formado con su propio cuerpo.",
      h: [[4, "Dispara virotes Petrify Rock Class que petrifican brevemente a las criaturas de roca."]],
      end: [7, "Cuando Katia abandona el calabozo, la ballesta acaba en la espalda de Donut, montada en The Scorpion's Bite."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-repeating-crossbow-of-the-scavenger-mother-of-mothers.md"
    },
    {
      id: "gorgo-belt",
      n: "Enchanted Wrestling Belt of the Great Gorgo",
      es: "Cinturón de lucha del Gran Gorgo",
      t: "equipo",
      b: 3,
      d: "Premio de los fans por matar con ataques de impulso: +5 % Fuerza, +5 % Constitución y Avalanche, que hace que su cuerpo en movimiento golpee como si pesara el doble.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-wrestling-belt-of-the-great-gorgo.md"
    },
    {
      id: "riot-shield",
      n: "Enchanted Shade Gnoll Riot Forces Crowd Control Shield",
      es: "Escudo antidisturbios de los gnolls de sombra",
      t: "equipo",
      b: 3,
      d: "Escudo de dos metros con \"GET BACK\" pintado: +5 % Constitución, +5 a Rooted in Place y convierte su Rush en Crowd Blast, un ataque en cono cada cinco minutos. Llega con una porra telescópica a juego.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-shade-gnoll-riot-forces-crowd-control-shield.md"
    },
    {
      id: "bolt-ophiotaurus",
      n: "The Bolt of Ophiotaurus",
      es: "El virote de Ofiotauro",
      t: "arma",
      b: 3,
      d: "Virote único (1 de 100) regalado por la princesa Formidable: disparado al ojo de un dios, anula su invulnerabilidad 15 segundos. No llega a usarlo contra el Maestro.",
      h: [[6, "Se lo da a Paz Lo, que lo clava en el ojo de la diosa Ysalte antes de autodestruirse y decapitarla."], [8, "Vuelve a usarse: Donut lo dispara al ojo de Emberus en el piso 11."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/bolt-of-ophiotaurus.md"
    },
    {
      id: "left-fang",
      n: "The Left Fang of the Green Sultan",
      es: "El colmillo izquierdo del Sultán Verde",
      t: "arma",
      b: 3,
      d: "Sable de Eva Sigrid, sin magia sin su gemelo, que Katia le quita en la pelea del tren. Su valor es simbólico: es el hilo de su venganza contra la amiga que la traicionó.",
      h: [[4, "Carl, que lo tenía, se lo devuelve al separarse para que se lo \"devuelva\" a Eva."]],
      end: [5, "Tras cortarle la mano del anillo de huida, Katia ejecuta a Eva con este sable."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    },
    {
      id: "ugly-ass-backpack",
      n: "Ugly Ass Backpack",
      es: "Mochila \"fea de narices\"",
      t: "objeto",
      b: 3,
      d: "Truco de inventario diseñado por Carl: Katia equipa más de una tonelada de chatarra de robots enanos como masa propia y se convierte en un gigante acorazado de más de tres metros.",
      h: [[4, "Una caja de jefe la mejora a una mochila de almacenamiento de masa ajustable con zancos retráctiles."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "gear-head-potion",
      n: "Gear Head potion",
      es: "Poción Gear Head",
      t: "pocion",
      b: 3,
      d: "Poción de conocimiento mecánico, imprescindible para recuperar y reconstruir motores de carros hobgoblin; es el origen de su faceta de ingeniera.",
      h: [[7, "Pasa el piso en la mesa de autómatas: el exoesqueleto de Tran, las patas de Jamal y sus propias prótesis."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    },
    {
      id: "apothecary-beanie",
      n: "Apothecary beanie (\"I Need My Personal Space\")",
      es: "Gorro de punto del Apothecary",
      t: "equipo",
      b: 5,
      d: "Gorro de su patrocinador: +3 % a todas sus estadísticas y el hechizo I Need My Personal Space, que empuja violentamente a todos los que la rodean.",
      end: [5, "Se lo da a Carl en la Butcher's Masquerade para que se abra paso hasta Donut; con la cabeza descubierta, la corona de Eva acaba sobre ella."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    },
    {
      id: "crown-sepsis-whore",
      n: "Enchanted Crown of the Sepsis Whore",
      es: "Corona de la Ramera Séptica",
      t: "equipo",
      b: 5,
      d: "La corona regenerada que Eva Sigrid se saca de la armadura al morir y que vuela a la cabeza de Katia: la mete en la sucesión del Sultanato de Sangre y la enfrenta a Donut, porque solo una podrá bajar del piso 9.",
      h: [[6, "Se lo confiesa a Carl y a Donut: \"Nunca lucharé contigo. Moriré antes\"."]],
      end: [7, "La incursión en el Club Vanquisher mata a Vinata, y al comer la Orquídea Katia sale de la sucesión y del juego."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/crown-of-the-sepsis-whore.md"
    },
    {
      id: "orchid-eileithyia",
      n: "Orchid of Eileithyia's Grace",
      es: "Orquídea de la Gracia de Eileithyia",
      t: "pocion",
      b: 6,
      d: "Premio de una caja con tres sellos que lleva en secreto: al comerla queda una hora inconsciente al 1 % de vida y la diosa elige un don (Constitución triple, asistente celestial o volver a ser humana y quedar embarazada).",
      end: [7, "La come en el capítulo 84 y elige el embarazo: vuelve a ser humana, con sus prótesis, embarazada del hijo de Louis, y la sacan del calabozo."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    },
    {
      id: "kina-knee-pads",
      n: "Enchanted Spiked Knee Pads of Kina",
      es: "Rodilleras de la diosa Kina",
      t: "equipo",
      b: 7,
      d: "Objeto divino de su caja celestial por el asalto al Club Vanquisher. Con su habilidad Iron Stomach se come montones de objetos mágicos desechables para subir su Inteligencia.",
      end: [7, "Se las quita y se las regala a Donut antes de marcharse."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-spiked-knee-pads-of-kina.md"
    }
  ]
};
