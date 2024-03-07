const loadPosts = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await res.json();
  posts = data.posts;
  setTimeout(() => {
    displayPosts(posts);
  }, 2000); // Adjusted timeout based on elapsed time
};

const displayPosts = (posts) => {
  const postsContainer = document.getElementById("posts-container");

  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    // console.log(post);

    const postCard = document.createElement("div");
    postCard.classList = `flex flex-col lg:flex-row gap-6 bg-[#F3F3F5] hover:bg-[#797DFC1A] mb-6 border border-[#F3F3F5] hover:border-main-color duration-200 cursor-pointer p-6 lg:p-10 rounded-3xl`;

    const badgeColor = post.isActive ? "bg-[#10B981]" : "bg-[#FF3434]";

    postCard.innerHTML = `
      <div>
        <div class="indicator">
          <span id="indicator-icon" class="indicator-item  badge border-white scale-[0.8] ${badgeColor} mt-1"></span>
          <div class="grid w-[85px] h-[85px] bg-base-300 place-items-center rounded-2xl">
            <img class="w-full rounded-2xl object-cover" src="${post.image}">
          </div>
        </div>
      </div>
      <div class="space-y-3 w-full">
        <div class="flex gap-5 font-inter font-medium text-sm text-[#12132DCC]">
          <span>#<span>${post.category}</span></span>
          <p>Author: <span>${post.author?.name}</span></p>
        </div>
        <h3 class="text-lg lg:text-xl font-bold ">${post.title}</h3>
        <p class="font-inter text-dark-color font-medium lg:max-w-[580px]">${post.description}</p>
        <hr>
        <div class="flex justify-between ">
          <div class="flex gap-4 lg:gap-6 text-sm lg:text-base font-inter text-dark-color font-medium">
            <div class="flex gap-[6px] lg:gap-2 items-center">
              <img src="images/messege.svg">
              <span>${post.comment_count}</span>
            </div>
            <div class="flex gap-2 items-center">
              <img src="images/eye.svg">
              <span>${post.view_count}</span>
            </div>
            <div class="flex gap-2 items-center">
              <img src="images/clock.svg">
              <span>${post.posted_time} min</span>
            </div>
          </div>
          <div onclick = "markRead('${post.title}', '${post.view_count}')">
            <img class="hover:scale-[1.1] w-8 lg:w-10 duration-300" src="images/green-mail.svg">
          </div>
        </div>
      </div>
    `;
    postsContainer.appendChild(postCard);
  });
  toggleSpinner(false);
};

let count = 0;

const markRead = (data, data1) => {
  console.log(data, data1);
  const readContainer = document.getElementById("read-container");
  const readElements = document.createElement("div");
  readElements.classList = `flex p-4 bg-white justify-between rounded-3xl items-center gap-2`;

  readElements.innerHTML = `
    <h3 class="font-bold text-sm lg:text-base">${data}</h3>
    <div class="flex gap-1 lg:gap-2 text-sm lg:text-base items-center min-w-max">
      <img src="images/eye.svg">
      <span>${data1}</span>
    </div>
  `;
  readContainer.appendChild(readElements);
  count++;
  // console.log(count);

  const countNumber = document.getElementById("count-number");
  countNumber.innerText = count;
};

const searchHandle = () => {
  toggleSpinner(true);
  const postsContainer = document.getElementById("posts-container");

  postsContainer.innerHTML = "";
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPosts(searchText);
};

const toggleSpinner = (isLoading) => {
  const loadingBar = document.getElementById("loading-bar");
  if (isLoading) {
    loadingBar.classList.remove("hidden");
  } else {
    loadingBar.classList.add("hidden");
  }
};

const loadLatest = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  // console.log(data[0], data[1], data[2]);
  displayLatest(data);
};

const displayLatest = (data) => {
  const latestPostContainer = document.getElementById("whole-container");

  data.forEach((post) => {
    // console.log(post);
    const cardContainer = document.createElement("div");
    cardContainer.innerHTML = `
    <div id="card-container" class="p-5 lg:p-6 border space-y-3 rounded-3xl cursor-pointer border-[#F3F3F5] hover:border-main-color duration-300 hover:bg-[#d7d7ff1a]">
      <div class="w-full h-[190px] rounded-3xl">
        <img class="object-cover w-full h-[190px] rounded-3xl"  src="${
          post.cover_image
        }">
      </div>
      <div class="flex items-center gap-2 lg:text-lg text-dark-color font-medium">
        <img src="images/calender.svg">
        <p>${post.author?.posted_date || "No Publish Date"}</p>
      </div>
      <div class="space-y-2">
        <h1 class="text-black-color font-extrabold text-lg lg:text-xl">${
          post.title
        }</h1>
        <p class="text-dark-color font-medium text-base lg:text-lg">${
          post.description
        }</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="w-11 h-11 rounded-full">
          <img class="w-full h-full rounded-full object-cover" src="${
            post.profile_image
          }">
        </div>
        <div>
          <h3 class="text-black-color font-extrabold text-base lg:text-lg">${
            post.author?.name
          }</h3>
          <p class="text-dark-color font-medium lg:text-base text-sm">${
            post.author?.designation || "Unknown"
          }</p>
        </div>
      </div>
    </div>
  `;
    latestPostContainer.appendChild(cardContainer);
  });
};

loadLatest();
toggleSpinner(true);
loadPosts("");
