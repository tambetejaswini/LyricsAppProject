// finding list of songs from api with keyword and displaying list

const renderList = (list) => {
  let elem = "";
  const listElem = document.getElementById("lyrics");
  for (let i = 0; i < list.length; i++) {
    elem += `<li>
    <div><strong>${list[i].title}</strong></div>
    <button onclick="FindLyric('${list[i].title}')">Get Lyrics</button>
    </li>`;
  }
  listElem.innerHTML = elem;

  document.getElementById("text").innerHTML = "";
};

// To search keyword in api

function searchList() {
  const search = document.getElementById("search").value;
  if (!search) {
    // document.getElementById("lyrics").innerHTML = '';
    document.getElementById("text").innerText="Please Enter....Nothing to search";
  } else {
    fetch("https://api.lyrics.ovh/suggest/" + search)
      .then((response) => response.json())
      .then((data) => {
         if (data.data?.length) {
          renderList(data.data);
         } else {
          document.getElementById("lyrics").innerHTML = '';
          document.getElementById("text").innerText="OOps no result found !!!";
         }
        
      }).catch(() => {
        document.getElementById("lyrics").innerHTML = '';
        document.getElementById("text").innerText="OOps no result found !!!";
      });
  }
}

//displaying lyrics

const renderLyric = (lyrics) => {
  const search = document.getElementById("search").value;
  document.getElementById("lyrics").innerHTML = "";
  document.getElementById("text").innerHTML = `<h1>Song Lyrics</h1>
                                                 <p>${lyrics}</p>`;
};

// findind song

function FindLyric(lyrics) {
  const search1 = document.getElementById("search").value;
  fetch("https://api.lyrics.ovh/v1/" + search1 + "/" + lyrics)
    .then((response) => response.json())
    .then((data) => {
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

      renderLyric(lyrics);
    });
}
