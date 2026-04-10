// Nome: Emanuel José Fernandes Gomes
// Número: 40230432

// CLASSE FILM

class Film {
 #rating;

 constructor(title, year, genre, rating) {
  this.title = title;
  this.year = year;
  this.genre = genre;
  this.#rating = rating;
 }

 get rating() {
  return this.#rating;
 }

 set rating(value) {
  if (value < 0 || value > 10) return;
  this.#rating = value;
 }

 getInfo() {
  return `${this.title} (${this.year}) [${this.genre}] — ★ ${this.#rating}`;
 }

 static fromObject(obj) {
  // return new Film(obj.title, obj.year, obj.genre);
  return new Film(obj.title, obj.year, obj.genre, obj.rating); // ao retornar o novo filme sem o construtor de rating, o valor vai ser undefied
 }
}

// CLASSE DOCUMENTARY (herança)

class Documentary extends Film {
 constructor(title, year, topic, rating) {
  this.topic = topic;
  super(title, year, "Documentário", rating);
 }

 getInfo() {
  return `${super.getInfo()} | Tema: ${this.topic}`;
 }
}

// DADOS

const data = [
 { title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8 },
 { title: "Parasite", year: 2019, genre: "Thriller", rating: 8.5 },
 { title: "Dune", year: 2021, genre: "Sci-Fi", rating: 8.0 },
 {
  title: "The Godfather",
  year: 1972,
  genre: "Crime",
  rating: 9.2,
 },
 { title: "Arrival", year: 2016, genre: "Sci-Fi", rating: 7.9 },
];

const catalogue = data.map((d) => Film.fromObject(d));

// RENDERIZAÇÃO

const renderFilm = (film) => `
 <div class="film-card" data-title="${film.title}">
   <h3>${film.title}</h3>
   <p>${film.genre} · ${film.year}</p>
   <p class="rating">★ ${film.rating}</p>
   <button class="btn-remove">Remover</button>
 </div>
`;

const renderCatalogue = (films) => {
 document.getElementById("film-list").innerHTML = films
  .map(renderFilm)
  .join("");
 document.getElementById("film-count").textContent = `${films.length} filmes`;
};

renderCatalogue(catalogue);

// EVENTOS

document.getElementById("film-list").addEventListener("click", (event) => {
 const card = event.target.closest(".film-card");
 if (!card) return;

 if (event.target.classList.contains("btn-remove")) {
  const title = card.dataset.title;
  card.remove();
  const idx = catalogue.findIndex((f) => f.title === title);
  if (idx !== -1) catalogue.splice(idx, 1);
  renderCatalogue(catalogue);
 }
});

// PESQUISA

// TODO (Alínea 2): Complete a função searchFilms
const searchFilms = (catalogue, query) => {
 const search = query.toLowerCase();
 return catalogue.filter(
  (movie) =>
   movie.title.toLowerCase().includes(search) ||
   movie.artist.toLowerCase().includes(search)
 );
};

document.getElementById("search-input").addEventListener("input", (event) => {
 const query = event.target.value.toLowerCase();
 renderCatalogue(searchFilms(catalogue, query));
});

// FORMULÁRIO

document.getElementById("add-film-form").addEventListener("submit", (event) => {
 event.preventDefault();

 const title = document.getElementById("form-title").value.trim();
 const year = parseInt(document.getElementById("form-year").value);
 const genre = document.getElementById("form-genre").value.trim();

 if (!title || !genre || isNaN(year)) return;

 //  const newFilm = { title: title, year: year, genre: genre, rating: 0 };
 //  catalogue.push(newFilm);
 catalogue.push(new Film(title, year, genre, 0)); // o catalogo so deve ter atributos do filme, que vieram pelo input do utilizador, nao é necessario criar a variavel newFilm quando podemos so adicionar um novo filme com "new Filme()"
 renderCatalogue(catalogue);
 document.getElementById("add-film-form").reset();
});
