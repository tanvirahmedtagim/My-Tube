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
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    category.append(button);
  });
};
//?Load the video
const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((error) => console.log(error));
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
  </div>
    `;
    videoContainer.append(card);
  });
};
loadData();
loadVideo();
