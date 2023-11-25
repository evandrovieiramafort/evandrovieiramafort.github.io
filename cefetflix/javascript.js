window.onload = () => {
  fetch('https://rafaelescalfoni.github.io/desenv_web/filmes.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(movie => {
        createCard(movie)
      })
    })
    .catch(error => console.error(error))
}

function createCard(movie) {
  let catalog = document.getElementById('catalogo')

  let card = document.createElement('div')
  card.className = 'card'

  let img = document.createElement('img')
  img.src = movie.figura
  card.appendChild(img)

  let title = document.createElement('h2')
  title.innerText = movie.titulo
  card.appendChild(title)

  let summary = document.createElement('p')
  summary.innerText = movie.resumo
  card.appendChild(summary)

  let ageRating = document.createElement('p')
  ageRating.innerText = movie.classificacao + ' anos'
  ageRating.className = getAgeRatingColor(movie.classificacao)
  card.appendChild(ageRating)

  let genres = document.createElement('p')
  genres.innerText = movie.generos.join(', ')
  card.appendChild(genres)

  let rating = document.createElement('p')
  for (let i = 0; i < movie.opinioes[0].rating; i++) {
    let star = document.createElement('span')
    star.className = 'star'
    star.innerText = '★'
    rating.appendChild(star)
  }
  card.appendChild(rating)

  catalog.appendChild(card)
}

function getAgeRatingColor(age) {
  if (age <= 14) {
    return 'green'
  } else if (age > 14 && age < 18) {
    return 'yellow'
  } else {
    return 'red'
  }
}
