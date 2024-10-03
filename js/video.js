//Convert time
const convertTime = (time) => {
  const day = parseInt(time / 86400);
  const remainHour = time % 86400;
  const hour = parseInt(remainHour / 3600);
  const remainMin = remainHour % 3600;
  const min = parseInt(remainMin / 60);
  const remainSec = remainMin % 60;
  return `${day}d ${hour}h ${min}m ${remainSec}s ago`;
};
//function to remove active element
const removeActive = () => {
  const buttons = document.getElementsByClassName("btn-category");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
// Load fetch and display the data

//?Load the data
const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.categories))
    .catch((error) => console.log(error));
};
//Display the data
const displayData = (categories) => {
  const category = document.getElementById("category");
  categories.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideo(${item.category_id})" class="btn btn-category">${item.category}</button>
    `;
    category.append(div);
  });
};

const loadCategoryVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const activeBtn = document.getElementById(`btn-${id}`);

      activeBtn.classList.add("active");
      displayVideo(data.category);
    })
    .catch((error) => console.log(error));
};

//?Load the video
const loadVideo = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};
const displayDetails = (video) => {
  const modal = document.getElementById("modal-content");
  modal.innerHTML = `
  <img src=${video.thumbnail}/>
  <p class="py-3 text-gray-400">${video.description}</p>`;

  document.getElementById("customModal").showModal();
};
// const dummyData = {
//   category_id: "1003",
//   video_id: "aaaj",
//   thumbnail: "https://i.ibb.co/xgWL3vQ/kid-gorgeous.jpg",
//   title: "Kid Gorgeous",
//   authors: [
//     {
//       profile_picture: "https://i.ibb.co/xsfkwN2/john.jpg",
//       profile_name: "John Mulaney",
//       verified: true,
//     },
//   ],
//   others: {
//     views: "241K",
//     posted_date: "",
//   },
//   description:
//     "John Mulaney's 'Kid Gorgeous' has captured the hearts of many with 241K views. As a verified comedian, John delivers a masterclass in stand-up with clever anecdotes, quick wit, and relatable humor. This performance is a laugh-filled adventure through his unique take on life, politics, and pop culture.",
// };

//?Display the video
const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[300px] w-11/12 mx-auto flex justify-center items-center flex-col">
    <img src="assets/Icon.png"/>
    <h2 class="font-bold text-[50px] text-center w-1/2 mx-auto">Oops!!!! Sorry There Is No Content Here</h2>
    </div>`;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    // console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = ` 
   <figure class="h-[200px] relative">
    <img  src=${video.thumbnail}
     class="h-ful w-full object-cover"
     
       />
${
  video.others.posted_date?.length == 0
    ? ""
    : `       <span class="absolute p-2 text-xs bg-black text-white rounded right-2 bottom-2">${convertTime(
        video.others.posted_date
      )}</span>`
}
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div class='h-10 w-10'>
      <img class='h-full w-full object-cover rounded-full' src=${
        video.authors[0].profile_picture
      }/>
    </div>
    <div class="gap-2">
    <h2 class="font-bold">${video.title}</h2>
      <div class="flex items-center gap-2">
        <p class="text-gray-400">${video.authors[0].profile_name}</p>

          ${
            video.authors[0].verified === true
              ? '<img class="h-5 w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>'
              : ""
          }
      </div>
      <p class="text-gray-400">${video.others.views} views</p>
    </div>
    <div class="pl-9 pt-3"><button onclick="loadDetails('${
      video.video_id
    }')" class ="btn btn-error text-white">Details</button></div>
  </div>
    `;
    videoContainer.append(card);
  });
};
document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideo(e.target.value);
});
loadData();
loadVideo();
