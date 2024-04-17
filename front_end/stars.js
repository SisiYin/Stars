window.history.pushState(null, '', '/post/2');
const BACK_END_URL = 'http://localhost:3001'
const stars = document.getElementsByClassName("stars")[0]
const icons = document.getElementsByClassName("fa-star")
let vote = 0
const score = document.getElementById("score")
score.innerText = vote

// 获取当前页面的 URL
const url = window.location.href;
// 从 URL 中提取文章 ID
const article_id = url.substring(url.lastIndexOf('/') + 1);




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
  score.innerText = vote.toFixed(1);

  console.log(article_id);
  try {
    const response = await saveStars(vote);
    console.log(vote);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  
  //window.location.href = 'avg_stars.html';
})


// 当鼠标悬停在星星上时，显示相应评分
// stars.addEventListener('mouseover', (event) => {
//   const star = event.target;
//   if (star.classList.contains('fa-star')) {
//     const value = parseInt(star.getAttribute('data-value'));
//     renderStars(value);
//   }
// });
// // 渲染星星的函数
// function renderStars(value) {
//   for (let i = 0; i < starIcons.length; i++) {
//     if (i < value) {
//       starIcons[i].classList.add('filled');
//     } else {
//       starIcons[i].classList.remove('filled');
//     }
//   }
// }



const saveStars = async (vote) => {
  try {
    const response = await fetch(BACK_END_URL + '/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        article_id:article_id,
        vote:vote 
      })
    });
    return response.json();
  } catch (error) {
    alert("Error saving stars: " + error.message);
  }
};


