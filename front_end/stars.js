const BACK_END_URL = 'http://localhost:3001'
const stars = document.getElementsByClassName("stars")[0]
const icons = document.getElementsByClassName("fa-star")
let vote = 0
const score = document.getElementById("score")
score.innerText = vote




stars.addEventListener("click",async function(event) {
  vote = 0
  for (let i = 0; i < 5; i++) {
    icons[i].style.setProperty("--v",0)
    if (icons[i] == event.target) {
      vote = i
      for (let j = 0; j < i; j++) {
        icons[j].style.setProperty("--v",100)
      }
      let ps = event.clientX - icons[i].getBoundingClientRect().left
      if (ps/icons[i].offsetWidth < 0.5) {
        icons[i].style.setProperty("--v",50)
        vote += 0.5
      } else {
        icons[i].style.setProperty("--v",100)
        vote++
      }
    }
    
  }
  score.innerText = vote;

 
  try {
    const response = await saveStars(vote);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  
  window.location.href = 'avg_stars.html';
})




const saveStars = async (vote) => {
  try {
    const response = await fetch(BACK_END_URL + '/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vote })
    });
    return response.json();
  } catch (error) {
    alert("Error saving stars: " + error.message);
  }
};


