const videogames = [
  {
    title: "Super Mario Bros.",
    year: 1985,
    genres: ["Platformer", "Action"],
    console: "NES",
    description:
      "El juego que definió el género de plataformas con Mario y Luigi.",
    cover_img:
      "https://cdn.mobygames.com/b26e0410-aba3-11ed-a519-02420a00019d.webp",
  },
  {
    title: "The Legend of Zelda",
    year: 1986,
    genres: ["Adventure", "RPG"],
    console: "NES",
    description:
      "La primera aventura épica de Link en el vasto mundo de Hyrule.",
    cover_img:
      "https://cdn.mobygames.com/e955b57c-aba3-11ed-8bb9-02420a000197.webp",
  },
  {
    title: "Pac-Man",
    year: 1980,
    genres: ["Arcade", "Maze"],
    console: "Arcade",
    description:
      "El icónico juego de laberintos donde Pac-Man debe comer todos los puntos mientras esquiva fantasmas.",
    cover_img:
      "https://cdn.mobygames.com/6bc75cb0-aba2-11ed-8e21-02420a00019b.webp",
  },
  {
    title: "Tetris",
    year: 1989,
    genres: ["Puzzle"],
    console: "Game Boy",
    description:
      "El adictivo juego de bloques de lógica que popularizó el Game Boy.",
    cover_img:
      "https://cdn.mobygames.com/785b49a8-aba9-11ed-8e21-02420a00019b.webp",
  },
  {
    title: "Donkey Kong",
    year: 1981,
    genres: ["Platformer", "Arcade"],
    console: "Arcade",
    description:
      "El juego donde Mario (Jumpman) debe rescatar a la chica de las garras de Donkey Kong.",
    cover_img:
      "https://cdn.mobygames.com/d7e9507e-abf2-11ed-887e-02420a00012e.webp",
  },
  {
    title: "Street Fighter II",
    year: 1991,
    genres: ["Fighting"],
    console: "Arcade",
    description:
      "El clásico que definió el género de lucha con doce personajes seleccionables.",
    cover_img:
      "https://cdn.mobygames.com/dde7c2ca-abad-11ed-9ab3-02420a0001a0.webp",
  },
  {
    title: "Metroid",
    year: 1986,
    genres: ["Action", "Adventure"],
    console: "NES",
    description:
      "Samus Aran se aventura en el planeta Zebes para derrotar a Mother Brain.",
    cover_img:
      "https://cdn.mobygames.com/4ee92740-aba7-11ed-8ed2-02420a0001a0.webp",
  },
  {
    title: "Sonic the Hedgehog",
    year: 1991,
    genres: ["Platformer"],
    console: "Genesis",
    description:
      "El debut del erizo azul Sonic, en su misión de derrotar al Dr. Robotnik.",
    cover_img:
      "https://cdn.mobygames.com/60a6b006-abd9-11ed-ba50-02420a000199.webp",
  },
  {
    title: "Castlevania",
    year: 1986,
    genres: ["Platformer", "Action"],
    console: "NES",
    description: "Simon Belmont lucha contra Drácula en su castillo.",
    cover_img:
      "https://cdn.mobygames.com/485ef400-ab65-11ed-9482-02420a000179.webp",
  },
  {
    title: "Mega Man 2",
    year: 1988,
    genres: ["Platformer", "Action"],
    console: "NES",
    description:
      "La secuela que perfeccionó la fórmula del bombardero azul con más jefes y armas.",
    cover_img:
      "https://cdn.mobygames.com/0c85ef76-aba9-11ed-8b6f-02420a00019c.webp",
  },
  {
    title: "Final Fantasy",
    year: 1987,
    genres: ["RPG"],
    console: "NES",
    description: "El inicio de la aclamada saga JRPG que definió el género.",
    cover_img:
      "https://cdn.mobygames.com/0373eda6-abaa-11ed-87d1-02420a000197.webp",
  },
  {
    title: "Contra",
    year: 1987,
    genres: ["Run and Gun", "Action"],
    console: "NES",
    description:
      "Clásico de acción conocido por su dificultad y el famoso 'Konami Code'.",
    cover_img:
      "https://cdn.mobygames.com/6c427dd8-ab7e-11ed-9377-02420a000197.webp",
  },
  {
    title: "Duck Hunt",
    year: 1984,
    genres: ["Shooter"],
    console: "NES",
    description: "El icónico juego del Zapper y el perro burlón.",
    cover_img:
      "https://cdn.mobygames.com/fabd3312-ab8a-11ed-9d05-02420a000198.webp",
  },
  {
    title: "Kirby's Adventure",
    year: 1993,
    genres: ["Platformer"],
    console: "NES",
    description:
      "El primer juego de Kirby con la habilidad de copiar poderes enemigos.",
    cover_img:
      "https://cdn.mobygames.com/c50b7dba-abca-11ed-ba50-02420a000199.webp",
  },
  {
    title: "Punch-Out!!",
    year: 1987,
    genres: ["Sports", "Fighting"],
    console: "NES",
    description:
      "Boxeo arcade con Little Mac enfrentándose a personajes extravagantes.",
    cover_img:
      "https://cdn.mobygames.com/0214c934-ab7e-11ed-ab77-02420a000198.webp",
  },
  {
    title: "Excitebike",
    year: 1984,
    genres: ["Racing"],
    console: "NES",
    description: "Carreras de motocross con manejo basado en la física.",
    cover_img:
      "https://cdn.mobygames.com/cc3dd1fc-aba5-11ed-aecf-02420a000198.webp",
  },
  {
    title: "Dr. Mario",
    year: 1990,
    genres: ["Puzzle"],
    console: "NES",
    description:
      "Juego de puzles donde Mario lucha contra virus usando cápsulas de colores.",
    cover_img:
      "https://cdn.mobygames.com/9e2cac34-aba0-11ed-b430-02420a0001a0.webp",
  },
  {
    title: "River City Ransom",
    year: 1989,
    genres: ["Beat 'em up", "RPG"],
    console: "NES",
    description:
      "Un 'beat 'em up' con elementos de RPG y un estilo gráfico único.",
    cover_img:
      "https://cdn.mobygames.com/094a380e-abb7-11ed-a13c-02420a00019f.webp",
  },
  {
    title: "Bionic Commando",
    year: 1988,
    genres: ["Platformer", "Action"],
    console: "NES",
    description:
      "Juego de acción donde el protagonista usa un brazo biónico para moverse.",
    cover_img:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x9y.jpg",
  },
];

module.exports = videogames;