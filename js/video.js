// Load fetch and display the data

//?Load the data
const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((categories) => displayData(categories.categories))
    .catch((error) => console.log(error));
};
//Display the data
const displayData = (categories) => {
  categories.forEach((item) => {
    const category = document.getElementById("category");
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    category.append(button);
  });
};
loadData();
