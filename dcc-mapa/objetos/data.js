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
      h: [[3,"Mordecai le explica las reglas de invocación de dioses por la advertencia del guantelete (convertir a un adorador de Grull en el propio dios), clave en el plan contra el Maestro."],[4,"Aplica una Platinum Sharpening Stone (piedra de afilar): los pinchos crecen y gana +1 Fuerza, +1 Destreza y un bonus de daño que escala con el nivel."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/war-gauntlet-of-the-exalted-grull.md"
    },
    {
      id: "trollskin-shirt",
      n: "Enchanted Trollskin Shirt of Pummeling",
      es: "Camisa de piel de trol",
      t: "equipo",
      b: 1,
      d: "Su armadura base desde el tutorial: +7 a Regeneración y anula aturdimiento, derribo, desarme y falta de aliento. Le permite encajar golpes brutales sin gastar pociones.",
      h: [[3,"Le aplica un Scroll of Upgrade (pergamino de mejora) y la camisa gana +3 Destreza."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/trollskin-shirt-of-pummeling.md"
    },
    {
      id: "bigboi-boxers",
      n: "Enchanted BigBoi Boxers",
      es: "Calzoncillos BigBoi",
      t: "equipo",
      b: 1,
      d: "Calzoncillos blancos con corazones rojos que le dan +2 Constitución y el hechizo Protective Shell a nivel 15, sin coste de maná. Ese escudo le salva la vida ante la carga del elemental de ira.",
      h: [[2,"Un Scroll of Upgrade cae sobre ellos: +5 Destreza, +5 Inteligencia, más Constitución y el beneficio Freeballing (+100 % de daño por debajo de la cintura, pero nada de pantalones encima)."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/bigboi-boxers.md"
    },
    {
      id: "jug-o-boom",
      n: "Carl's Jug O' Boom",
      es: "Jarra explosiva de Carl",
      t: "arma",
      b: 1,
      d: "Incendiario inventado por Carl con una jarra de licor Rev-Up, aceite de goblin y una antorcha como mecha. Entra en el códice del calabozo y le reporta un canon (muy gravado) por cada muerte que causa.",
      h: [[2,"Otros crawlers ya han copiado la receta, lo que recorta sus derechos."],[4,"Sigue llevando y usando jarras explosivas."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/carls-jug-o-boom.md"
    },
    {
      id: "goblin-pass",
      n: "Goblin Pass",
      es: "Pase de los trasgos (calavera de trasgo)",
      t: "tatuaje",
      b: 1,
      d: "Calavera de trasgo grabada a fuego en la cara interna del antebrazo izquierdo al abrir una de sus primeras cajas del tutorial. Quita la hostilidad automática de los trasgos y permite cruzar su territorio, a cambio de recibir un 20 % más de daño de las criaturas feéricas.",
      h: [[1,"Gracias a él Carl y Donut entran en territorio trasgo y Donut descubre que puede encandilar a casi cualquier PNJ."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/goblin-pass.md"
    },
    {
      id: "desperado-pass-carl",
      n: "Desperado Pass",
      es: "Pase Desperado (daga que gotea sangre)",
      t: "tatuaje",
      b: 1,
      d: "Daga que gotea sangre grabada en el cuello, del mismo botín que el de Donut. Da acceso al Desperado Club e impide conseguir un pase Vanquisher.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/desperado-pass.md"
    },
    {
      id: "nightgaunt-cloak",
      n: "Enchanted Nightgaunt Cloak of Stoutness",
      es: "Capa de nightgaunt de la robustez",
      t: "equipo",
      b: 1,
      d: "Capa de la misma caja dorada del tutorial que la camisa de piel de trol (Mordecai ahoga un grito al verlas juntas): +4 Constitución, resistencia a veneno y hielo y resistencia antiperforación para toda la armadura. «Te hace parecer un Batman de todo a cien».",
      h: [[6,"En el piso 8 el maestro de mazo The Visitor, un nightgaunt, se enfurece tanto por la capa de piel de nightgaunt que no llega a jugar ni una carta."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/nightgaunt-cloak-of-stoutness.md"
    },
    {
      id: "toe-ring-splatter-skunk",
      n: "Enchanted Toe Ring of the Splatter Skunk",
      es: "Anillo de pie de la mofeta",
      t: "equipo",
      b: 1,
      d: "Anillo de pie de sus primeras cajas del tutorial: +3 Fuerza y +3 a Powerful Strike.",
      h: [[3,"Un Scroll of Upgrade ganado en la ruleta del casino lo sube a +10 Fuerza y +5 Powerful Strike."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "pedicure-kit-sylph",
      n: "Enchanted Pedicure Kit of the Sylph",
      es: "Kit de pedicura de la sílfide",
      t: "objeto",
      b: 1,
      d: "Kit de doce útiles para los pies que solo se aplica en un espacio seguro y exige ir descalzo: durante 30 horas da +15 % de daño a los ataques descalzos, +3 a Smush, Unbreakable (solo pies) y Celestially Nimble and Tidy, que avisa y retrasa 5 segundos las trampas de pisada. El pie irrompible le salva la vida en una explosión.",
      src: "https://dungeon-crawler-carl.fandom.com/wiki/Carl"
    },
    {
      id: "xistera",
      n: "Xistera",
      es: "Cesta de jai alai",
      t: "arma",
      b: 2,
      d: "Cesta de cesta punta, que sabe usar gracias a la habilidad aleatoria de su Earth Hobby Potion. Saca bombas del inventario directamente a la cesta y las lanza a unos 400 km/h; sustituye a su tirachinas.",
      h: [[4,"Un patrocinador le envía un accesorio único para lanzar cabezas (500 m × Fuerza) con el que manda la cabeza de Samantha a más de 50 km."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/xistera.md"
    },
    {
      id: "doomsday-scenario",
      n: "Carl's Doomsday Scenario",
      es: "El escenario apocalíptico de Carl",
      t: "arma",
      b: 2,
      d: "Superarma inestable nacida en el clímax de la misión de Miss Quill y Remex: Carl encierra un cristal de almas sobrecargado en un Sheol Glass Reaper Case, que no frena la explosión sino que se funde con ella, y la mete a mano en su inventario dos segundos antes de estallar, quemándose. «Capaz de arrasar una ciudad entera y sus suburbios»; no se puede estabilizar ni sacar con seguridad. Da título al libro 2.",
      h: [[7,"Sigue en su inventario sin detonar; Carl lo compara con Shi Maria encerrada en su tatuaje: «estaba reuniendo toda una colección de armas de destrucción masiva»."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/carls-doomsday-scenario.md"
    },
    {
      id: "anarchists-cookbook",
      n: "The Dungeon Anarchist's Cookbook",
      es: "El libro de cocina del anarquista del calabozo",
      t: "objeto",
      b: 3,
      d: "Premio de \"broma\" del carrusel de Chaco que resulta ser un manual secreto, invisible para la IA, escrito por 24 crawlers anteriores: explosivos, portales, dioses y recetas. Carl se convierte en su 25.º autor.",
      h: [[5,"Las notas de Herot, Everly, Drakea y otros guían sus planes contra Signet y la infiltración en la Butcher's Masquerade."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/the-dungeon-anarchists-cookbook.md"
    },
    {
      id: "haute-bourgeoisie",
      n: "Enchanted Necklace of the Haute Bourgeoisie",
      es: "Collar de la alta burguesía",
      t: "equipo",
      b: 3,
      d: "Cadena de liderazgo de una caja Platinum Tyrant por convertirse en magistrado del asentamiento skyfowl de Miss Quill. Gana una joya por cada asentamiento que controla: el zafiro del piso 3 le da +5 Destreza, Talon Strike nivel 5 y 432 de oro de impuestos cada 10 días.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/necklace-of-the-haute-bourgeoisie.md"
    },
    {
      id: "ring-divine-suffering",
      n: "Enchanted Night Wyrm's Ring of Divine Suffering",
      es: "Anillo del sufrimiento divino del Night Wyrm",
      t: "equipo",
      b: 3,
      d: "Lo saquea del cadáver de Frank Q: +5 % a todas las estadísticas y la habilidad Marked for Death, que da puntos de estadística por cada objetivo marcado que mata. Es un cebo: sus portadores son los primeros cazados en el piso 6, y Mordecai le pega en la cabeza para que se lo quite.",
      h: [[4,"No lo vende: al final del piso 5 lo alza ante la escalera y reta a todos los cazadores del piso 6 a venir por él."],[5,"Lo lleva todo el piso 6 y llega a 5 puntos por muerte; marca en secreto a Miriam Dom antes del amanecer para cobrar su muerte. Su primer uso le da el tatuaje de la telaraña."],[7,"Lo lleva en toda la Faction Wars como una adicción; saquea un segundo anillo de King Rust y se lo da a Li Na."]],
      end: [7,"En las ruinas de Larracos, ganada la guerra, decide destruirlo para no caer en la tentación: Donut se lo traga."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/carl.md"
    },
    {
      id: "auto-buckler",
      n: "Enchanted Auto Buckler of the Peach Pit",
      es: "Rodela automática del hueso de melocotón",
      t: "equipo",
      b: 3,
      d: "Brazal que forma una rodela metálica con un giro de muñeca, con un 1,5 % de desarmar al atacante (Shatter). Se lo pasa Katia cuando su escudo antidisturbios lo deja redundante.",
      end: [6,"Nunca logra que desarme a nadie; al empezar el piso 8 lo sustituye por el Right Back Atcha Personal Shield y lo aparta para el equipo de la Faction Wars."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-auto-buckler-of-the-peach-pit.md"
    },
    {
      id: "battle-rattle",
      n: "Enchanted Anarchist's Battle Rattle",
      es: "Chaqueta de guerra del anarquista",
      t: "equipo",
      b: 4,
      d: "Chaqueta sin mangas que sustituye a su cazadora destrozada: +1 a todas las estadísticas, +50 % de alcance y precisión con explosivos arrojados y huecos ilimitados para parches de mejora.",
      h: [[5,"Gana tres parches: Twelve Flaming Arrows, The Bomb y The Midnight Epicure (protección contra vampirismo y licantropía)."],[6,"Recibe el parche trasero divino The Scavenger's Daughter, que duplica las bonificaciones de los demás parches y otorga Soul Reaper y la Mysterious Bone Key (abre cualquier cerradura una sola vez, a costa de destruir la chaqueta y un hueso de Carl); nunca la usa en los libros 6–8."],[7,"Añade un parche de mercader araña que da acceso al Midnight Market y se niega a coser el parche Lucky Shot. La carga de almas del Scavenger's Daughter empieza a provocarle Soul Poisoning."]],
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
      h: [[5,"Al empezar el piso 6 el enlace Orren le obliga a entregarla como garantía a cambio de un recibo canjeable en el noveno piso."],[7,"Vuelve a entrar en juego en el piso 9: Carl y Elle la usan para entrar en territorio de la Madness en la Operación Ruina."]],
      end: [7,"Akuma, líder de la Rebelión de los Magos de Guerra, se la quita a Elle; la cambian a un agente de Krakaren Prime por cinco pociones de conscripción besadas por el infierno y acaba en el estómago del mercader Paca. Justice Light usa su caja de cuerda rota para crear el portal que rompe la Nada."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/gate-of-the-feral-gods.md"
    },
    {
      id: "extinction-sigil",
      n: "Extinction Sigil Tattoo (Wall Monitor Race)",
      es: "Sello de extinción: huella de geco en forma de lágrima",
      t: "tatuaje",
      b: 4,
      d: "Diminuta huella de geco justo debajo del ojo izquierdo, en el sitio de un tatuaje de lágrima; Katia le dice que parece una peca. Sale de una caja del botín de Grull (capítulo 2): quita la hostilidad automática de los enemigos naturales de los lagartos, pero los lagartos le hacen un 20 % más de daño y los varanos, un 150 % más. Solo se puede tapar con una manga de cobertura.",
      src: "https://dungeon-crawler-carl.fandom.com/wiki/Extinction_Sigil_Tattoo_(Wall_Monitor_Race)"
    },
    {
      id: "emberus-suns",
      n: "Tatuajes de Emberus",
      es: "Soles tribales en el dorso de las manos",
      t: "tatuaje",
      b: 4,
      d: "Soles redondos de estilo tribal, negros con un brillo anaranjado, en el dorso de ambas manos (rayos rizados en la derecha, triangulares en la izquierda). Aparecen al final del piso 5, cuando Carl elige adorar a Emberus casi por accidente al lanzar una granada celestial frente a Quan Ch; lo marcan como fiel del dios, rango que en el piso 8 sube a Devoto.",
      end: [8,"Al renegar de Emberus en el clímax del piso 11, el castigo divino quema los soles y los convierte en las cicatrices Mark of the Damned."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/mark-of-the-damned.md"
    },
    {
      id: "pawnas-tears",
      n: "Pawna's Tears",
      es: "Lágrimas de Pawna",
      t: "pocion",
      b: 4,
      d: "Poción legendaria del botín de Grull (capítulo 2) que suma +5 a cualquier hechizo o habilidad a elección y no caduca.",
      end: [5,"En la batalla final del piso 7, siguiendo una nota de su patrocinador, se gasta en el Laundry Day de Donut (de 12 a 17), con el que despojan a Diwata de su armadura divina."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/spells/laundry-day.md"
    },
    {
      id: "toe-ring-leprous-bandit",
      n: "Enchanted Toe Ring of the Leprous Bandit",
      es: "Anillo de pie del bandido leproso",
      t: "equipo",
      b: 4,
      d: "Del mismo botín de Grull: Sticky Feet (caminar por paredes y techos durante Destreza×2 segundos cada 6 horas) y Super Spreader (pasar un debuff activo a otro objetivo una vez por hora). Con Sticky Feet quema desde el techo a la ooze Mrs. Ghazi.",
      h: [[5,"Super Spreader copia la marca del Ring of Divine Suffering sobre un segundo objetivo."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "kerchief-of-disorder",
      n: "Drakea's Enchanted Kerchief of Disorder",
      es: "Pañuelo del desorden de Drakea",
      t: "equipo",
      b: 4,
      d: "Bandana negra de cachemir blanco, premio por matar al jefe Ruckus, que Carl se ata a la cabeza pese a Donut: +5 a Detect Traps, el hechizo Tripper (dispara todas las trampas en un radio, cada 5 horas) y Remote Detonator para hacer estallar a distancia sus explosivos. Lleva el nombre de Drakea, autor de la 22.ª edición del Cookbook.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/drakeas-enchanted-kerchief-of-disorder.md"
    },
    {
      id: "rockards-ring",
      n: "Rockard's Ring of Sniping",
      es: "Anillo de francotirador de Rockard",
      t: "equipo",
      b: 4,
      d: "Anillo de ámbar que arranca, con otros dos, del brazo de Quan Ch: Ripe muestra en el mapa a las criaturas por debajo del 50 % de vida y Loaded, a las que llevan equipo mágico. Explica la fama de Quan de robar muertes ajenas.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/rockards-ring-of-sniping.md"
    },
    {
      id: "web-of-suffering",
      n: "The Night Wyrm's Nasty Little Web of Suffering",
      es: "Telaraña del Gremio del Sufrimiento",
      t: "tatuaje",
      b: 5,
      d: "Gran telaraña en el codo que le aparece al usar por primera vez el Night Wyrm's Ring of Divine Suffering, en su ataque a Zockau. Le da acceso al Gremio del Sufrimiento, un culto al semidiós Night Wyrm.",
      h: [[6,"Damascus Steel, con la misma telaraña en el codo, le lleva a la entrada secreta del Gremio en el Desperado Club; allí lo reciben como «araña» y aceptan sus contratos."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/dungeon-factions/guild-of-suffering.md"
    },
    {
      id: "enemy-church-tattoo",
      n: "Enemy of the Church Tattoo",
      es: "Tatuaje de enemigo de la Iglesia (bola de serpientes en llamas)",
      t: "tatuaje",
      b: 5,
      d: "Gran bola de serpientes en llamas en la parte superior del brazo izquierdo; una cabeza baja y se enrosca en la telaraña del codo. Sale de una caja dorada Apostate por el logro Temple Defiler en el piso 6: no puede adorar a Diwata, sus fieles le atacan nada más verlo fuera del Club Vanquisher y les hace un 25 % más de daño (50 % al ser fiel de Emberus). No se puede tapar.",
      src: "https://dungeon-crawler-carl.fandom.com/wiki/Enemy_of_the_Church_Tattoo"
    },
    {
      id: "arrow-double-gonorrhea",
      n: "Arrow of Enthusiastic Double Gonorrhea",
      es: "Flecha de la gonorrea doble entusiasta",
      t: "arma",
      b: 5,
      d: "Flecha envenenada de un solo uso que contagia una enfermedad que quema los genitales y los cura una y otra vez; solo se quita castrándose o contagiándola. Carl saquea al menos tres de cazadores elfos de The Dream, que las tenían para Louis.",
      h: [[5,"La usa como arma contra la cazadora mantis Vrah, que no puede curarse sin aparearse."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/arrow-of-enthusiastic-double-gonorrhea.md"
    },
    {
      id: "paupers-ring",
      n: "Enchanted Pauper's Ring of the Steadfast Emberus",
      es: "Anillo del pobre de Emberus",
      t: "equipo",
      b: 6,
      d: "Su anillo de Fuerza del primer piso, reforjado en el Club Vanquisher por un joyero sátiro devoto de Emberus. Para los fieles, anula los efectos (no el debuff en sí) de la mayoría de debuffs de sangrado y enfermedad, como la viruela de babosa; para cualquier otro es un objeto maldito. Cuesta un millón de oro: 10.000 de entrada y un préstamo de 990.000 del templo que le impide renunciar a su religión mientras lo deba.",
      end: [8,"Se lo quita al renegar públicamente de Emberus en el clímax del piso 11."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-paupers-ring-of-the-steadfast-emberus.md"
    },
    {
      id: "eye-bedlam-bride",
      n: "The Eye of the Bedlam Bride",
      es: "El Ojo de la Novia de Bedlam",
      t: "tatuaje",
      b: 6,
      d: "Tatuaje en el esternón que Shi Maria le hace mientras controla su cuerpo, para no depender de su carta. El sistema solo dice su nombre; Carl siente \"un agujero sin fondo\".",
      h: [[7,"Se revela que Shi Maria está encerrada en él; el ojo enloquece a quien lo mira (Vinata, Warlord Stockade)."],[8,"Convertido en perro, Carl lo abre a propósito y congela al mimo de sombras Mitch para que Donut lo remate."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/the-eye-of-the-bedlam-bride.md"
    },
    {
      id: "right-back-atcha",
      n: "Enchanted Right Back Atcha Personal Shield",
      es: "Escudo personal «de vuelta pa' ti»",
      t: "equipo",
      b: 6,
      d: "Brazal de una caja Legendary Scourge que sustituye a la rodela del hueso de melocotón: para golpes físicos según su Destreza y proyectiles mágicos según su Inteligencia, con un 75 % de devolverlos y un 25 % de duplicar la potencia del rebote.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "nipple-ring-defiler",
      n: "Enchanted Nipple Ring of the Defiler",
      es: "Pezonera del profanador",
      t: "equipo",
      b: 6,
      d: "Aro de plata con un ojo colgando, de una caja Platinum Apostate por sobrevivir a la marca de muerte de Diwata; solo lo puede llevar quien ha sido marcado por un dios. Revela la religión de mobs y crawlers cercanos, permite destruir santuarios sin represalias divinas, +25 % de daño contra clérigos y Black Nimbus una vez por hora.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-nipple-ring-of-the-defiler.md"
    },
    {
      id: "ratchet-automaton-kit",
      n: "Doctor Ratchet's Automaton Build-It Kit",
      es: "Kit de autómatas del doctor Ratchet",
      t: "objeto",
      b: 6,
      d: "Cofre steampunk de una caja Legendary Scourge por matar más cazadores en el piso 6, con piezas para más de quince autómatas: justo lo que le faltaba para la mesa de autómatas robada al Dr. Ratchet. Al final del piso 8 apenas le queda un autómata.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/doctor-ratchets-automaton-build-it-kit.md"
    },
    {
      id: "prison-tattoo-kit",
      n: "Enchanted Prison Tattoo Kit",
      es: "Kit de tatuaje carcelario",
      t: "objeto",
      b: 6,
      d: "Kit de aguja y tinta de una caja de misión de Vengeance of the Daughter para tatuar a un objetivo, consienta o no. Carl no sabe qué hacer con él; Shi Maria lo usa con su cuerpo para tatuarle el Ojo de la Novia de Bedlam.",
      h: [[7,"Con la tinta sobrante y raíz de toralina, Rosetta y Mordecai montan el sistema de tatuajes que copia hechizos; Katia le hace así el tatuaje de Profane Iron."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-prison-tattoo-kit.md"
    },
    {
      id: "book-of-voodoo",
      n: "The Filthy Little Crawler's Book of Voodoo",
      es: "El librito de vudú del crawler guarro",
      t: "objeto",
      b: 6,
      d: "Diario negro de una caja dorada Prepotente que reciben casi todos los crawlers: los nombres de quienes lo tienen aparecen al cruzarse en persona y sirve para enviar mensajes privados o públicos. No se puede vender, destruir ni tirar.",
      h: [[7,"Se divide en dos volúmenes; el segundo es Carl's Book of Boom."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/the-filthy-little-crawlers-book-of-voodoo.md"
    },
    {
      id: "wand-nighty-night",
      n: "Wand of Nighty-Night",
      es: "Varita de las buenas noches",
      t: "arma",
      b: 6,
      d: "Varita de 10 cargas que lanza Sleep de nivel 10 sobre un objetivo que no sea jefe durante cinco minutos (despierta si recibe daño físico). Con ella duerme a la hermana Ines Quiteria cuando carga contra él gritando «¡Pecador!».",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/wand-of-nighty-night.md"
    },
    {
      id: "velma",
      n: "Velma",
      es: "Velma, el lanzallamas de Tserendolgor",
      t: "arma",
      b: 6,
      d: "Lanzallamas encantado, mitad peto y mitad arma, que Tserendolgor (Ren) le lega al morir en El Capitolio de La Habana, junto con su inventario «para el esfuerzo de guerra». Carl no llega a leer su descripción en el libro.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/velma.md"
    },
    {
      id: "toe-ring-well-balanced",
      n: "Enchanted Toe Ring of the Well-Balanced",
      es: "Anillo de pie del equilibrio",
      t: "equipo",
      b: 7,
      d: "Anillo para el meñique izquierdo con Heart, Mind y Physical Balance. Mind Balance protege de la esclavitud y la conscripción y es lo que impide a Shi Maria apoderarse de su cuerpo.",
      h: [[7,"Entrena Mind Balance hasta el nivel 16, la primera habilidad de la serie que supera el 15 por las condiciones del combate."]],
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
      id: "profane-iron",
      n: "Tatuaje de Profane Iron",
      es: "Dragón de cadenas en el antebrazo derecho",
      t: "tatuaje",
      b: 7,
      d: "Dragón de cadenas que Katia le tatúa con tinta de toralina y sangre que Li Na da voluntariamente, por el método de Rosetta. Le presta la habilidad de cadenas Profane Iron una vez al día. Es su primer tatuaje en ese brazo y el sistema le da calidad experta.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/carl.md"
    },
    {
      id: "gloom-wraith-potion",
      n: "Hell-Kissed Celestial Skill Potion of the Prince of Woe",
      es: "Poción celestial de Gloom Wraith Phase",
      t: "pocion",
      b: 7,
      d: "Poción parlante besada por el infierno de una caja celestial (la trae un kit de batería demoníaco). Le da la habilidad Gloom Wraith Phase a nivel 13: embestidas incorpóreas que atraviesan materia no encantada y deshacen la carne sin armadura, a costa de la mitad del maná. Con ella mata al Architect Houston.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/spells/gloom-wraith-phase.md"
    },
    {
      id: "hairbrush-beefmaster",
      n: "The Enchanted Hairbrush of the Beefmaster",
      es: "Cepillo del maestro cachas",
      t: "objeto",
      b: 7,
      d: "Objeto celestial de una caja por el ataque al Club Vanquisher. Solo funciona en hombres con el pelo de 25 cm o más (la melena del tónico de Katia): cinco minutos de cepillado al día dan durante 30 horas Shining Charisma, Speedster, +25 % de Constitución y Entourage nivel 10. Grita.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-hairbrush-of-the-beefmaster.md"
    },
    {
      id: "tooth-cap-hi-yo-silver",
      n: "Enchanted Tooth Cap of Hi-Yo Silver",
      es: "Funda dental «¡Arre, Silver!»",
      t: "equipo",
      b: 7,
      d: "Funda donada para monturas que Carl pone en el único diente de su mascota Rend: lo atrae hacia Carl a gran velocidad desde hasta 5 km, a través de paredes, cada 3 minutos. Combinada con Wrecking Ball, parte en dos a Gustavo 3, el rottweiler de Lucia Mar.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-tooth-cap-of-hi-yo-silver.md"
    },
    {
      id: "waffle-maker",
      n: "The Waffle Maker",
      es: "La gofrera",
      t: "arma",
      b: 7,
      d: "Bomba termobárica del tamaño de un termo, heredera de «Just Wait Until Your Daddy Gets Home» del piso 6: incinera todo en 100 m. Louis la lanza con Party Planner junto a los pulsos No Disassemble; acaban con la guardia de Khepri, los robots de los Reaver y el Warlord Fang.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/the-waffle-maker.md"
    },
    {
      id: "stayfast-ink",
      n: "Stayfast Ink and Adept's Fountain Pen",
      es: "Tinta indeleble y pluma de adepto",
      t: "objeto",
      b: 7,
      d: "Regalo de despedida de la crawler Milk: 825 ml de tinta que nada puede borrar y una pluma, para escribir habilidades y hechizos en el Book of Voodoo. Sustituye a la tinta de toralina, ya agotada.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/stayfast-ink-and-adepts-fountain-pen.md"
    },
    {
      id: "book-of-boom",
      n: "Carl's Book of Boom",
      es: "El libro del bum de Carl",
      t: "objeto",
      b: 7,
      d: "Segundo volumen del Book of Voodoo, creado cuando miles de crawlers que abandonan la mazmorra pintan cada uno una habilidad o hechizo en una página (y la pierden para siempre). Comerse una página da esa habilidad durante un rato que depende de la calidad del dibujo. Donut recibe su equivalente, A Banquet Fit for a Princess.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/carls-book-of-boom.md"
    },
    {
      id: "enriched-pet-biscuit",
      n: "Enriched Pet Biscuit",
      es: "Galleta enriquecida para mascotas",
      t: "pocion",
      b: 8,
      d: "Galletas para mascotas de resultado garantizado. Carl da a la cerda Penelope la \"Nothing Special Party Companion\" para volverla sapiente; en la final del piso 11, Donut le pasa por error otra galleta y Scolopendra renace como crawler sapiente en vez de mascota sin mente.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enriched-pet-biscuits.md"
    },
    {
      id: "mark-of-the-damned",
      n: "Mark of the Damned",
      es: "Marca del Condenado",
      t: "tatuaje",
      b: 8,
      d: "Cicatrices en relieve con forma de sol en el dorso de las manos, lo que queda de los tatuajes de Emberus tras renegar de él y confesar que mató a Geyrun, su hijo. El sistema solo les da nombre, sin ningún efecto.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/mark-of-the-damned.md"
    },
    {
      id: "memorial-crystal-emberus",
      n: "Memorial Crystal: Emberus",
      es: "Cristal conmemorativo de Emberus",
      t: "objeto",
      b: 8,
      d: "Cristal ámbar que encuentra medio enterrado en la arena del piso 11 justo después de que Taranis mate a su hermano Emberus. Los cristales conmemorativos guardan los hechizos y conocimientos del dios; Carl lo guarda sin examinarlo.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/memorial-crystal-emberus.md"
    },
    {
      id: "tracking-tag-kyryap",
      n: "Tracking Tag",
      es: "Etiqueta de rastreo del Kyryap",
      t: "objeto",
      b: 8,
      d: "Dardo que descubre clavado en la pierna tras el clímax del piso 11, sin saber cuándo se lo pusieron: «The Kyryap has claimed you. Fucked = you.». Hilo abierto para el libro 9.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/tracking-tag-kyryap.md"
    }
  ],
  donut: [
    {
      id: "enhanced-pet-biscuit",
      n: "Enhanced Pet Biscuit",
      es: "Galleta mejorada para mascotas",
      t: "pocion",
      b: 1,
      d: "Sale de la Legendary Pet Box que recibe Carl por entrar en la mazmorra con una gata; antes de que él decida qué hacer, Donut se la arranca de la mano y se la come. Se disuelve en un charco y vuelve sapiente, capaz de hablar y con el beneficio permanente Enhanced Growth: deja de ser mascota y pasa a ser crawler.",
      src: "https://dungeon-crawler-carl.fandom.com/wiki/Princess_Donut"
    },
    {
      id: "crown-sepsis-whore",
      n: "Enchanted Crown of the Sepsis Whore",
      es: "Corona de la Ramera Séptica",
      t: "equipo",
      b: 1,
      d: "Tiara legendaria y maldita (+5 Inteligencia, 15 % de infligir Sepsis) que se pone sin terminar de leer porque es morada. La inscribe para siempre en la línea sucesoria del Sultanato de Sangre del piso 9.",
      h: [[7,"Se resuelve la maldición sucesoria: cae la sultana Vinata, la herencia del Sultanato pasa a la Princess Posse y Katia se come la orquídea de Eileithyia, lo que permite que Donut baje del piso 9."]],
      end: [2,"La sacrifica durante las ráfagas previas al Doomsday Scenario; al ser Fleeting se deshace, pero la obligación sucesoria se mantiene (la corona regenerada acaba en la cabeza de Katia en el libro 5)."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/crown-of-the-sepsis-whore.md"
    },
    {
      id: "fae-scale-crupper",
      n: "Enchanted Fae Scale Quadruped Crupper of the Fleet",
      es: "Grupera de escamas feéricas",
      t: "equipo",
      b: 1,
      d: "Armadura de acero feérico que lleva como faldita sobre los cuartos traseros: +2 Destreza. Llega en el mismo reparto de botín que su Desperado Pass (la corona venía de otra caja, la Legendary Quadruped Box).",
      end: [8,"La sustituye por la Crupper of the Benevolent Champion, a juego con su capa de campeona."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/fae-scale-crupper-of-the-fleet.md"
    },
    {
      id: "desperado-pass",
      n: "Desperado Pass",
      es: "Pase Desperado",
      t: "tatuaje",
      b: 1,
      d: "Tatuaje de facción grabado junto a su omóplato derecho (Carl lleva otro en el cuello) que da acceso al Desperado Club e impide obtener un pase Vanquisher. Donut lo considera una profanación.",
      h: [[2,"Junto con la corona, reduce sus opciones de clase a solo 34; elige Former Child Actor."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/desperado-pass.md"
    },
    {
      id: "slate-butterfly-talisman",
      n: "Talisman of the Slate Butterfly",
      es: "Talismán de la mariposa pizarra",
      t: "equipo",
      b: 1,
      d: "Colgante para el collar sacado de una caja en el tutorial: +4 a Light on Your Feet (le dobla la altura de salto), +1 Inteligencia y las hadas aladas dejan de serle hostiles de forma automática.",
      h: [[5,"Lo quita del collar para ponerse el Collar Charm of the Effete Bourgeoisie; no se destruye, lo guarda."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/talisman-of-the-slate-butterfly.md"
    },
    {
      id: "fur-brush-ecclesiastic",
      n: "Enchanted Fur Brush of the Ecclesiastic",
      es: "Cepillo del eclesiástico",
      t: "objeto",
      b: 1,
      d: "Cepillo de una caja de jefe. Si Carl la cepilla diez minutos cada noche, gana +2 Constitución durante 30 horas; uno de los pocos remedios contra su fragilidad, aunque solo la sube a 4.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/fur-brush-of-the-ecclesiastic.md"
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
      id: "tizheruk-fang-caps",
      n: "Enchanted Fang Caps of the Expectorating Tizheruk",
      es: "Fundas de colmillo del tizheruk",
      t: "equipo",
      b: 2,
      d: "Fundas de colmillo de una Platinum Quest Box (+50 % al daño de mordisco, con probabilidad de envenenar y paralizar). Donut no les saca partido.",
      end: [2,"Se las pasa a Mongo, cuyas mordidas empiezan a echar chispas; al ser Fleeting, desaparecerían si se las quitara."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/fang-caps-of-the-expectorating-tizheruk.md"
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
      h: [[6,"Sigue siendo su tiara de diario hasta mitad del piso 8, cuando la relega la del Inebriated Dragonfly; la conserva en el inventario."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/tiara-of-mana-genita.md"
    },
    {
      id: "prism-goggles",
      n: "Prism Industries Capacitating and Focusing Goggles",
      es: "Gafas de Prism Industries",
      t: "equipo",
      b: 3,
      d: "Gafas únicas firmadas por la princesa D'Nadia, de su primera caja de patrocinio: protegen de la ceguera mágica, potencian la visión y concentran los hechizos que salen de los ojos. Con ellas ve los virotes invisibles que Hekla dispara contra Katia, y convierten su Magic Missile en un láser de disparo doble.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/prism-industries-capacitating-and-focusing-goggles.md"
    },
    {
      id: "belt-of-buoyancy",
      n: "Belt of Buoyancy",
      es: "Cinturón de flotación",
      t: "equipo",
      b: 4,
      d: "Lo único que saca de una caja plateada \"I'm Wet\" tras la necrópolis sumergida: un cinturón sencillo que le impide hundirse, pero solo en el agua. Se pasa tres minutos quejándose.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/belt-of-buoyancy.md"
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
      id: "silver-bracelet-ab-solar",
      n: "Enchanted Silver Bracelet of the Ab-solar",
      es: "Brazalete de plata del Ab-solar",
      t: "equipo",
      b: 5,
      d: "Pulsera para la pata de una Gold Benefactor Box del Apothecary: protege del vampirismo y la licantropía y da +25 % de daño mágico contra muertos vivientes sapientes. Llega justo antes de que la plaga vampírica se extienda por el piso 6.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/silver-bracelet-of-the-ab-solar.md"
    },
    {
      id: "collar-charm-effete",
      n: "Enchanted Collar Charm of the Effete Bourgeoisie",
      es: "Colgante de la burguesía afectada",
      t: "equipo",
      b: 5,
      d: "Lo recibe al conquistar Point Mongo: cada asentamiento que controla le añade una gema con bonificaciones y un estipendio de oro cada diez días. La primera, turquesa, da +8 Destreza, +4 Inteligencia y la habilidad Snitch (llama a los guardias). Hace pareja con el collar de Carl.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-collar-charm-of-the-effete-bourgeoisie.md"
    },
    {
      id: "charm-mongoliensis-potion",
      n: "Charm Mongoliensis (Charm Animal Potion)",
      es: "Poción de encantar mongoliensis",
      t: "pocion",
      b: 5,
      d: "Mordecai la elabora con una receta del Apothecary y más de un litro de sangre de Mongo que Donut tiene que sacarle ella misma. Encanta al animal más cercano para el resto del piso.",
      end: [5,"La usa con Kiwi, la jefa de la manada de velocirraptores, que pasa a ser su esbirra y arrastra consigo al resto de la manada."],
      src: "https://www.supersummary.com/the-butchers-masquerade/part-3-chapters-45-55-summary/"
    },
    {
      id: "charm-cat-potion",
      n: "Charm Animal Potion (gatos)",
      es: "Poción de encantar gatos",
      t: "pocion",
      b: 5,
      d: "Segunda poción de encantamiento, esta vez para gatos, pensada para Ferdinand, el gato de nivel 100 que sirve de familiar a la reina Imogen.",
      end: [5,"Se la bebe en el concurso de talentos de la Butcher's Masquerade y Ferdinand se convierte en su esbirro."],
      src: "https://manatoastmedia.com/dcc-charm-animal-potions/"
    },
    {
      id: "i-take-it-all-back",
      n: "\"I Take It All Back\" potion",
      es: "Poción «Lo retiro todo»",
      t: "pocion",
      b: 5,
      d: "Poción de una caja de patrocinio de Prepotente, con la etiqueta \"dásela a Princess Donut, NO a Tina\", que anula la Transmutación de Scolopendra.",
      end: [5,"En plena batalla de la Masquerade se la da a Kiwi, que vuelve a ser una osa (embarazada); Big Tina reconoce a su madre y se completa la misión The Recital."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/bosses/big-tina.md"
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
      end: [7,"La deja diez horas en el cojín de carga universal morado (otro regalo del Apothecary), que la despoja para siempre de su magia para traspasarla a la Tiara of a Thousand Lights; el objeto en sí lo conserva en su colección."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-tiara-of-the-inebriated-dragonfly.md"
    },
    {
      id: "bards-golden-throat",
      n: "The Bard's Golden Throat",
      es: "La garganta dorada del bardo",
      t: "equipo",
      b: 6,
      d: "Micrófono de diadema dorado con amatistas, votado por la Princess Posse en una caja de fans: afina sus canciones hasta 1,5 tonos, ayuda con todos los hechizos de bardo, amplifica la voz hasta 5 veces y da +5 % de Carisma. Por fin canta afinada y sirve de megáfono en el campo de batalla.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/the-bards-golden-throat.md"
    },
    {
      id: "bull-rush-shield",
      n: "The Bull Rush, Bespoke Personal Shield",
      es: "Escudo personal Bull Rush",
      t: "equipo",
      b: 6,
      d: "Insignia con forma de toro de Hereford War Machines que se prende en el collar, desbloqueada con un pergamino Cracker Jack. La envuelve en una burbuja móvil, más potente que el escudo de Carl, y su modo montura protege también a Mongo (o un vehículo, con menos fuerza).",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "tiara-thousand-lights",
      n: "The Tiara of a Thousand Lights",
      es: "Tiara de las mil luces",
      t: "equipo",
      b: 7,
      d: "Regalo celestial de su nuevo patrocinador Long Haul: solo da +10 Carisma, pero sus 99 joyas de absorción almacenan para siempre los efectos de cualquier sombrero encantado que deje en su cojín.",
      h: [[7,"Absorbe el sombrero boonie de Deathbed Hellcat (Targeting y alcance extra) y, a través del cojín morado, las ventajas de la tiara de la libélula, Hover incluido."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/tiara-of-a-thousand-lights.md"
    },
    {
      id: "champion-cloak",
      n: "Cloak of the Benevolent Champion",
      es: "Capa del campeón benévolo",
      t: "equipo",
      b: 7,
      d: "Capa celestial que Carl saqueó a Quan Ch: iguala su estadística base más baja con la más alta y sube cuatro hechizos y una habilidad al nivel 15. Donut la llama su chal y le atribuye el ascenso de su habilidad Claw.",
      h: [[8,"Forma un conjunto con la Crupper of the Benevolent Champion: +20 % a la Constitución que había igualado la capa, Find Weakened a nivel 10 y Puddle Jumper un nivel más."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/cloak-of-the-benevolent-champion.md"
    },
    {
      id: "kina-knee-pads",
      n: "Enchanted Spiked Knee Pads of Kina",
      es: "Rodilleras de la diosa Kina",
      t: "equipo",
      b: 7,
      d: "Rodilleras divinas hechas con pestañas de la diosa Kina (25 % de reflejo cuerpo a cuerpo, respirar bajo el agua, Iron Stomach). Katia se las regala y Donut las lleva al acabar con Huanxin Jinx.",
      end: [8,"Se las pasa a Penelope, la cerda que se ha vuelto sapiente."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-spiked-knee-pads-of-kina.md"
    },
    {
      id: "scorpions-bite",
      n: "Quadruped Weapon Mount \"The Scorpion's Bite\"",
      es: "Montura de armas \"El aguijón del escorpión\"",
      t: "equipo",
      b: 7,
      d: "Arnés no mágico enviado por el Apothecary que le permite montar armas a distancia en la espalda y dispararlas desde el inventario. Con él maneja la ballesta repetidora de Katia, más grande que ella.",
      h: [[8,"Clava en los ojos de Emberus el Bolt of Ophiotaurus de Katia y un virote Danforth, dejándolo vulnerable e inmóvil para que Taranis lo mate."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/scorpions-bite.md"
    },
    {
      id: "ghillie-suit-boonie-hat",
      n: "Ghillie Suit and Boonie Hat",
      es: "Traje ghillie y sombrero boonie",
      t: "equipo",
      b: 7,
      d: "Equipo de su especialidad Deathbed Hellcat. El traje, de tela que cambia de color, da Blend into the Background y Cone of Silence; el sombrero da Targeting y más alcance. Juntos le permiten hacer de francotiradora a más de una milla desde la torre del Nido.",
      h: [[7,"El sombrero es lo primero que absorbe la Tiara of a Thousand Lights, así que ya no le hace falta una torre de francotirador."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/ghillie-suit-and-boonie-hat.md"
    },
    {
      id: "myspace-photo-potion",
      n: "MySpace Photo (Charisma Cheat)",
      es: "Poción «Foto de MySpace»",
      t: "pocion",
      b: 7,
      d: "Poción de Mordecai que, durante dos minutos, hace creer al sistema que su Carisma es 30 puntos más alto (193 en vez de 163).",
      end: [7,"Se la toma justo antes de ponerse por primera vez la Cloak of the Benevolent Champion, así que su Constitución sube hasta 193; se gana el logro Catfish."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/cloak-of-the-benevolent-champion.md"
    },
    {
      id: "bijanbi-tattoo",
      n: "Bijanbi spell tattoo",
      es: "Tatuaje del perro (Bijanbi)",
      t: "tatuaje",
      b: 7,
      d: "Edgar le tatúa en el flanco derecho afeitado un perrito de líneas que se mueve, con el hechizo Bijanbi (una variante de Dinner Bell que arrastra a los enemigos) sacado de un clérigo caído de Wepwawet. Milk lo cubre con caligrafía de Words of Power para subirlo a nivel 15. Donut solo acepta si Carl se hace otro a juego.",
      h: [[7,"Combina Bijanbi con Astral Paw en War Crime, su tercera Atrocidad."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/toraline-tattoo-transfer.md"
    },
    {
      id: "assassins-veil",
      n: "The Assassin's Veil",
      es: "El velo de la asesina",
      t: "equipo",
      b: 8,
      d: "Tocado egipcio de cuentas de su clase Assassin of Sekhmet: +10 % Destreza y Precognición (avisa de hechizos ofensivos o de atadura cercanos), a cambio de ser hostil para todos los enemigos de Sekhmet.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "benevolent-champion-crupper",
      n: "Crupper of the Benevolent Champion",
      es: "Grupera del campeón benévolo",
      t: "equipo",
      b: 8,
      d: "Grupera de malla celestial que forma conjunto con su capa: +20 % a la Constitución que había igualado la capa, Find Weakened a nivel 10 y un hechizo subido por la capa a nivel 16 (elige Puddle Jumper). La descripción le echa en cara las víctimas de War Crime y la deja abatida.",
      src: "https://chapter-summaries.com/books/a-parade-of-horribles/chapters/"
    },
    {
      id: "danforth-bolts",
      n: "The Danforth",
      es: "Virotes Danforth",
      t: "arma",
      b: 8,
      d: "Diez virotes encantados que no hacen daño, pero clavan en el sitio la parte del cuerpo donde impactan (2 segundos por nivel de Ballesta del tirador). Los dispara de dos en dos con la montura The Scorpion's Bite.",
      h: [[8,"Con ellos inmoviliza al dios Emberus para que Taranis acabe con él."]],
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
      id: "gear-head-potion",
      n: "Earth Hobby Potion (Gear Head)",
      es: "Poción de afición terrestre (Gear Head)",
      t: "pocion",
      b: 2,
      d: "La poción obligatoria de afición terrestre que acompaña a su clase de base terrestre le da la habilidad Gear Head (competencia con motores): conocimiento mecánico que usa sin llegar a entenderlo del todo y que es el origen de su faceta de ingeniera.",
      h: [[3,"Resulta imprescindible para recuperar y reconstruir los motores de los carros hobgoblin."],[4,"Con ella construye junto a Carl el Royal Chariot, un todoterreno de orugas portátil."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    },
    {
      id: "scavenger-crossbow",
      n: "Enchanted Repeating Crossbow of the Scavenger Mother of Mothers",
      es: "Ballesta repetidora de la Madre de Madres",
      t: "arma",
      b: 3,
      d: "La ballesta de Hekla, recuperada tras matarla Katia por accidente: munición básica infinita, +15 Destreza, +10 Fuerza y +25 % de daño y cadencia por cada mujer del grupo. La monta en un trípode formado con su propio cuerpo.",
      h: [[4,"Dispara virotes Petrify Rock Class que petrifican brevemente a las criaturas de roca."]],
      end: [7,"En el capítulo 86, antes de que Katia elija su don, la ballesta aparece montada en The Scorpion's Bite a la espalda de Donut, que dispara con ella el virote con las cenizas de la madre de Mordecai y mata a Huanxin Jinx. Se queda con Donut."],
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
      h: [[6,"Se lo da a Paz Lo, que lo clava en el ojo de la diosa Ysalte antes de autodestruirse y decapitarla."],[8,"Vuelve a usarse: Donut lo dispara al ojo de Emberus en el piso 11."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/bolt-of-ophiotaurus.md"
    },
    {
      id: "left-fang",
      n: "The Left Fang of the Green Sultan",
      es: "El colmillo izquierdo del Sultán Verde",
      t: "arma",
      b: 3,
      d: "Sable de Eva Sigrid, sin magia sin su gemelo, que Katia le quita en la pelea del tren. Su valor es simbólico: es el hilo de su venganza contra la amiga que la traicionó.",
      h: [[4,"Carl, que lo tenía, se lo devuelve al separarse para que se lo \"devuelva\" a Eva."]],
      end: [5,"Tras cortarle la mano del anillo de huida, Katia ejecuta a Eva con este sable."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    },
    {
      id: "ugly-ass-backpack",
      n: "Ugly Ass Backpack",
      es: "Mochila \"fea de narices\"",
      t: "objeto",
      b: 3,
      d: "Truco de inventario diseñado por Carl: Katia equipa más de una tonelada de chatarra de robots enanos como masa propia y se convierte en un gigante acorazado de más de tres metros.",
      h: [[4,"Una caja de jefe la mejora a una mochila de almacenamiento de masa ajustable con zancos retráctiles."]],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "katia-auto-buckler",
      n: "Enchanted Auto Buckler of the Peach Pit",
      es: "Rodela automática del Hueso de Melocotón",
      t: "equipo",
      b: 3,
      d: "Brazalete de una de sus cajas de botín de principios del piso 4 que forma una rodela metálica al sacudir la muñeca. Su encantamiento Shatter da un 1,5 % de probabilidad de desarmar al atacante. Katia lo usaba sobre todo para añadir masa.",
      end: [3,"Se lo da a Carl cuando el escudo antidisturbios de su caja de fans ocupa la misma ranura del brazo."],
      src: "https://dungeon-crawler-carl.fandom.com/wiki/Enchanted_Auto_Buckler_of_the_Peach_Pit"
    },
    {
      id: "katia-find-crawler-potion",
      n: "Find Crawler Skill Potion",
      es: "Poción de habilidad Encontrar Crawler",
      t: "pocion",
      b: 3,
      d: "Recompensa de una Gold Savage Box por su primera muerte de jugador (Hekla): concede la habilidad Find Crawler a nivel 3, que muestra en el mapa a los crawlers cercanos.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "katia-club-vanquisher-pass",
      n: "Club Vanquisher Pass",
      es: "Pase del Club Vanquisher (tatuaje)",
      t: "tatuaje",
      b: 3,
      d: "Tatuaje de facción que se forma solo a partir de una de sus cajas de botín de la recompensa por Hekla. Le da acceso al Club Vanquisher, la contrapartida del Desperado Club para quienes matan a otros crawlers.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/index.md"
    },
    {
      id: "apothecary-beanie",
      n: "Apothecary beanie (\"I Need My Personal Space\")",
      es: "Gorro de punto del Apothecary",
      t: "equipo",
      b: 5,
      d: "Gorro de su patrocinador: +3 % a todas sus estadísticas y el hechizo I Need My Personal Space, que empuja violentamente a todos los que la rodean.",
      end: [5,"Se lo da a Carl en la Butcher's Masquerade para que se abra paso hasta Donut; con la cabeza descubierta, la corona de Eva acaba sobre ella."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    },
    {
      id: "crown-sepsis-whore",
      n: "Enchanted Crown of the Sepsis Whore",
      es: "Corona de la Ramera Séptica",
      t: "equipo",
      b: 5,
      d: "La corona regenerada que Eva Sigrid se saca de la armadura al morir y que vuela a la cabeza de Katia: la mete en la sucesión del Sultanato de Sangre y la enfrenta a Donut, porque solo una podrá bajar del piso 9.",
      h: [[6,"Se lo confiesa a Carl y a Donut: \"Nunca lucharé contigo. Moriré antes\"."]],
      end: [7,"Kandy «Bigs» Newton, una sluggalo de la Princess Posse, mata a la princesa Vinata en el capítulo 55, tras la operación Snake Pit contra el Club Vanquisher. Aun así ninguna de las dos puede bajar mientras la otra siga viva: al comer la Orquídea y quedar marcada como Ineligible (caps. 84–86), Katia sale del juego y Donut queda libre para descender."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/crown-of-the-sepsis-whore.md"
    },
    {
      id: "katia-blitz-sticks",
      n: "Blitz Sticks",
      es: "Barritas Blitz",
      t: "pocion",
      b: 5,
      d: "Droga que encuentra en el piso 6 como «regalo» de Eva sobre el cadáver de una de las Hijas de Brynhild. Fumada, da recuerdos falsos: Katia revive una y otra vez a Annie, la niña que quiso adoptar, y se vuelve adicta en secreto.",
      h: [[6,"Se le suman otras drogas del Desperado Club (Travis Priest, Creamsicle Charm y Glory Bound). Según Mordecai, le dejan las estadísticas revueltas para siempre y una vulnerabilidad permanente a los hechizos adictivos."]],
      end: [7,"Se desintoxica en el capítulo 16 con una doble dosis de Glory Bound mezclada con la poción Tough Love, y Carl la acompaña dentro de su recuerdo."],
      src: "https://dungeon-crawler-carl.fandom.com/wiki/Katia_Grim"
    },
    {
      id: "orchid-eileithyia",
      n: "Orchid of Eileithyia's Grace",
      es: "Orquídea de la Gracia de Eileithyia",
      t: "pocion",
      b: 6,
      d: "Va dentro de la Engaged Lock Box of the Night Wyrm, el premio de su caja celestial por abrir la Puerta de los Dioses Salvajes e inundar Larracos, que guarda en secreto. Tiene tres sellos: matar a un antiguo compañero de grupo (Eva), matar a un jefe de país o de nivel (la reina Imogen) y cumplir un encargo del Gremio del Sufrimiento (matar a Astrid). Con el tercer sello cumplido, la Orquídea es suya en el capítulo 33. Al comerla queda una hora inconsciente al 1 % de vida y la diosa le concede uno de tres dones: Constitución triple, asistente celestial o volver a ser humana y quedar embarazada.",
      end: [7,"La come en el capítulo 84 y elige el embarazo: vuelve a ser humana, con sus prótesis, embarazada del hijo de Louis, y la sacan del calabozo."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    },
    {
      id: "katia-annie-card",
      n: "Annie (crow totem card)",
      es: "Annie, carta tótem del cuervo",
      t: "objeto",
      b: 6,
      d: "Carta tótem T'Ghee de un pájaro con cráneo de bebé que lleva desde el piso 8 y a la que pone el nombre de la niña que no pudo adoptar. El cuervo le arranca los ojos a Astrid en el asesinato que rompe el tercer sello.",
      end: [7,"Al marcharse la deja sobre la mesa y Donut se la queda."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    },
    {
      id: "kina-knee-pads",
      n: "Enchanted Spiked Knee Pads of Kina",
      es: "Rodilleras de la diosa Kina",
      t: "equipo",
      b: 7,
      d: "Objeto divino de su caja celestial por el asalto al Club Vanquisher. Con su habilidad Iron Stomach se come montones de objetos mágicos desechables para subir su Inteligencia.",
      end: [7,"Se las quita y se las regala a Donut antes de marcharse."],
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/items/enchanted-spiked-knee-pads-of-kina.md"
    },
    {
      id: "katia-cybernetic-prosthetics",
      n: "Cybernetic prosthetics",
      es: "Prótesis cibernéticas",
      t: "equipo",
      b: 7,
      d: "Brazo derecho, dos piernas y demás prótesis que construye en secreto en la sala de artesanía, previendo el momento en que volviera a ser humana. Bautista las termina mientras ella está inconsciente por la Orquídea. Al revertirla, la diosa deja al descubierto todo lo que había perdido (el brazo, las dos piernas y una oreja), y el grupo se las coloca antes de que ella se marche.",
      src: "https://github.com/cdkolb/dcc-compendium/blob/main/docs/characters/katia.md"
    }
  ]
};
