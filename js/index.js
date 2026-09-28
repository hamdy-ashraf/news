getData();

$("form").submit(function (e) {
  e.preventDefault();
  console.log("ok");
  let category = $("#Category").val(),
    search = $("#Search").val();
  console.log(category);
  getData(category, search);
});
