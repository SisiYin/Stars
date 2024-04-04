const BACK_END_URL = 'http://localhost:3001'



const averageScore= document.getElementById('averageScore');


async function fetchAverageStars() {
  try {
      const response = await fetch(BACK_END_URL + "/average-stars");
      if (!response.ok) {
          throw new Error('Failed to fetch average stars');
      }
      const data = await response.json();
      return parseFloat(data[0].avg_stars); // 转换为浮点数
  } catch (error) {
      console.error(error);
      return null; // 返回 null 表示获取失败
  }
}

fetchAverageStars().then((avgStars) => {
  if (avgStars !== null) {
      averageScore.textContent = avgStars.toFixed(1);
      colorStars(avgStars); 
  } else {
      averageScore.textContent = 'N/A'; // 显示未获取到评分
  }
});


function colorStars(avgStars) {
  const starIcons = document.querySelectorAll('.stars .fa-star');

  for (let i = 0; i < starIcons.length; i++) {
    if (avgStars >= i + 1) {
      starIcons[i].classList.add('rated');
      starIcons[i].classList.remove('half-rated');
    } else if (avgStars > i) {
      starIcons[i].classList.add('half-rated');
      starIcons[i].classList.remove('rated');
    } else {
      starIcons[i].classList.remove('rated');
      starIcons[i].classList.remove('half-rated');
    }
  }

}



//colorStars(avgStars);

