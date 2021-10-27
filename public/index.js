let BTN = document.getElementById('videoBtn')
let VIDEO_URL=document.getElementById('videoUrl')

BTN.addEventListener('click',async e=>{
   e.preventDefault();
   let VIDEO = VIDEO_URL.value.trim()
  if(VIDEO.length === 0){
      alert('Please enter video URL')
  }else{
      let videoReference = await window.fetch(`http://localhost:5500/videoInfo?videoURL=${VIDEO}`)
      let videoData = await videoReference.json()
      console.log(videoData);
      let allnodes = {
          thumbnails : document.getElementById('img_thumbnail'),
          title : document.getElementById('video_h2'),
          description : document.getElementById('video_description'),
          downloadOptions : document.getElementById('download_options')
      }
      let output ="";
    for(let i=0;i<videoData.formats.length;i++){
        // console.log(videoData.formats[i]);
        output += `
           <option value=${videoData.formats[i].itag}>
                 ${videoData.formats[i].container}-${videoData.formats[i].qualityLabel}
           </option>
        `;
    let thumbnail_image = videoData.videoDetails.thumbnails[videoData.videoDetails.thumbnails.length-1].url
        allnodes.thumbnails.src = thumbnail_image;
        allnodes.title.innerHTML = `Title:-${videoData.videoDetails.title}`
        allnodes.description.innerHTML = `Description:-<br>${videoData.videoDetails.description}`
        allnodes.downloadOptions.innerHTML = output;
        document.querySelector('.data').style.cssText=`
                      display:flex;
                      justify-content:space-around;
                      box-shadow:2px 2px 10px 1px black;
                      border-radius:10px;
                      background-color:#f7f06a;
                      width:60%;
                      margin:10px auto;
                      padding:25px;
        `;
        let x=document.querySelectorAll('#dataAlign')
        for(let i=0;i<x.length;i++){
           x[i].style.cssText=`width:46%`;
        }
    }
      document.getElementById('download_btn').addEventListener('click', e=>{
             e.preventDefault();
             let itag = document.getElementById('download_options').value;
             window.open(`http://localhost:5500/download?videoURL=${videoData.videoDetails.videoId}&itag=${itag}`);
    })
  }
})
