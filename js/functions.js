async function getData(category = "business", search = "", page = 1) {
  let parameters = new URLSearchParams({
    category: category,
    q: search,
    from: "2026-09-28",
    sortBy: "publishedAt",
    apiKey: "3b28059725b5442184b2abdf93131188",
    pageSize: 10,
    page: page,
  });

  let response = await fetch(
    `https://newsapi.org/v2/top-headlines?${parameters.toString()}`,
  );
  let myData = await response.json();

  showData(myData, page);
}

function showData(data, currentPage) {
  let numOfPages = Math.ceil(data.totalResults / 10),
    $dataContainer = $("#Data .row"),
    news = data.articles;

  $dataContainer.html("");

  if (news.length > 0) {
    for (let item of news) {
      $dataContainer.append(cardComponent(item));
    }
    $("nav .pagination").html(preparePagination(currentPage, numOfPages));
  }
}

function preparePagination(currentPage, totalPages) {
  let lis = `<li class="page-item ${currentPage == 1 ? "disabled" : ""}">
        <a class="page-link" onclick="paginate(${currentPage > 1 ? currentPage - 1 : 1})">Previous</a>
    </li>`;

  for (let i = 1; i <= totalPages; i++) {
    lis += `
        <li class="page-item ${currentPage == i ? "active" : ""}"><a class="page-link" onclick="paginate(${i})">${i}</a></li>
        `;
  }

  lis += `<li class="page-item ${currentPage == totalPages ? "disabled" : ""}">
        <a class="page-link" onclick="paginate(${currentPage < totalPages ? currentPage + 1 : totalPages})">Next</a>
    </li>`;

  return lis;
}

function cardComponent(item) {
  let cardCom = `
    <div class="col-lg-4 mb-4">
        <div class="item">
            <div class="card m-auto" style="width: 18rem">
                <img src="${item.urlToImage}" class="card-img-top" onerror="this.src = 'image/istockphoto-1980276924-1024x1024.jpg'" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${item.title.slice(0, 20)}...</h5>
                    <p class="card-text">
                        ${item.description}
                    </p>
                    <a href="${item.url}" target="_blank" class="btn btn-primary">See More</a>
                </div>
            </div>
        </div>
    </div>
    `;

  return cardCom;
}

function paginate(pageNum) {
  let category = $("#Category").val(),
    search = $("#Search").val();
  getData(category, search, pageNum);
}
