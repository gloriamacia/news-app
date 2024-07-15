const apiKey = process.env.NEWS_API_KEY;

const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

async function fetchNews() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const filteredArticles = data.articles.filter(article => article.title !== '[Removed]');
      displayNews(filteredArticles);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }
  function displayNews(articles) {
    const newsDiv = document.querySelector('#news');
    for (const article of articles) {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('col-12', 'col-md-6', 'col-lg-3', 'col-xl-2', 'mb-4', 'card'); // Bootstrap classes

        // Create and append the image to the articleDiv
        if (article.urlToImage) {
            const image = document.createElement('img');
            image.src = article.urlToImage;
            image.alt = article.title;
            image.classList.add('card-img-top'); // Bootstrap class for responsive images
            articleDiv.appendChild(image);
        }

        const articleBodyDiv = document.createElement('div');
        articleBodyDiv.classList.add('card-body');
        articleDiv.appendChild(articleBodyDiv);

        // Create and append a headline to the articleDiv
        const title = document.createElement('h6');
        title.textContent = article.title;
        title.classList.add('card-title');
        articleBodyDiv.appendChild(title);

        // Create and append the author to the articleDiv
        if (article.author) {
            const author = document.createElement('p');
            author.textContent = `By: ${article.author}`;
            author.classList.add('card-text');
            articleBodyDiv.appendChild(author);
        }

        // Create and append the URL to the source to the articleDiv
        if (article.url) {
            const link = document.createElement('a');
            link.classList.add('btn', 'btn-primary');
            link.href = article.url;
            link.textContent = 'Read more';
            link.target = '_blank';
            articleBodyDiv.appendChild(link);
        }

        newsDiv.appendChild(articleDiv);
    }
}

  
  fetchNews();