let output = "";
let color;
let socialmendia;
let  iconMedia;

const request = new XMLHttpRequest();
request.open('GET', 'data.json', true);
request.responseType = 'json';
request.send();

request.onload = function() {
  if(this.readyState == 4 && this.status == 200){
  const data = request.response;
  

  newData = Object.fromEntries(Object
    .entries(data)
    .map(([k, v]) => [k, Object.values(v).flat()]))

  const finalData = Object.values(newData).flat();
 
  function changeColor (status){
    if (status===0) {
      color = " #eaea53";
    }
    if (status===1) {
      color = " #5f9a5f";
    }
    if (status===2) {
      color = "#1373a6";
    }
    if (status===3) {
      color = "#777";
    }
    if (status===4) {
      color = "#eb2f64";
    }
}

function changeChannel (channel){
  if (channel==="facebook") {
    iconMedia = `<i class="fa-brands fa-facebook icon-media"></i>` ;
    
  }
  if (channel==="twitter") {
    iconMedia = `<i class="fa-brands fa-twitter icon-media"></i>` ;
  }
  if (channel==="instagrambusiness") {
    iconMedia = `<i class="fa-brands fa-instagram icon-media"></i>` ;
  }
  
 
}





  const groups = finalData.reduce((groups, post) => {
    const date = post.published_at.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(post);
    return groups;
  }, {});
  
  
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      articles: groups[date]
    };
  });
  

 
  groupArrays.forEach(element => {
    const options = {year: 'numeric', month: 'long', day: 'numeric' };

    let dateFormated =  new Date(element.date).toLocaleDateString('en-us', options)
    output += `
      
      <div class="article-channel">
        <p class="article-dates">${dateFormated}</p>
      </div>
     
       
    `;
      for(let item of element.articles){
        changeColor (item.status);
        changeChannel (item.account.channel);
        
      
      
        const isPublished = item.is_published 
        ? ` 
        <i class="fa-solid fa-check article-icon"></i>                        `
        : ``
        
       
           
        output += `
        
          <div class="article" >
          <div class="article-media"style="background-color:${color}; ">
            <a href="#">${iconMedia}
            </a>
          </div>
          <div class="article-info">
            <div class="article-head fullwidth">
              <p class="article-published">${item.published_at}</p>
            <div class="icons-options">
              <li>
                <a href="#">${isPublished}</i>
              </a>     
              </li>
              <li>
                <a href="#"><i class="fa-regular fa-trash-can article-icon"></i>
                </a>
              </li>
              <li>
                <a href="#"><i class="fa-solid fa-ellipsis article-icon"></i>
               </a>
              </li> 
            </div>
          </div>  
          <div class="article-content">  
            <p class="article-message">${item.entry.message}</p>
            <div class="article-image">
              <img src="${item.entry.image}" alt="Image not found" onerror="this.onerror=null;this.src='./img/no-post-image.png';" />
            </div>   
            <div class="article-footer">
              <div class="icons-footer">
               <li>
                 <a href="#"><i class="fa-regular fa-thumbs-up article-icon"></i>
              5555</a>
              </li>
               <li>
                <a href="#"><i class="fa-regular fa-message article-icon"></i>
                555</a>     
              </li>
              <li>
                <a href="#"><i class="fa-solid fa-share-nodes article-icon"></i>
              55</a>     
              </li>
              <li>
               <a href="#"><i class="fa-regular fa-eye article-icon"></i>
               5</a>     
              </li>
            </div>
          </div>
        </div>
        </div>
        </div>
      
      `;
      
      changeColor ();
        }
        document.querySelector(".article-container").innerHTML = output;    
  });

  
  
  



 


  
 
 


 }
}

