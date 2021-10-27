const cors = require('cors')
const ytld = require('ytdl-core')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile('index.html')
})
app.get('/videoInfo',async (req,res)=>{
    let videoUrl = req.query.videoURL
    let info =await ytld.getInfo(videoUrl)
    console.log(info.videoDetails.videoId);
    res.status(200).json(info)
})
app.get('/download',async (req,res)=>{
    let videoUrl = req.query.videoURL
    let Itag = req.query.Itag
    res.header('Content.Disposition',`attachment:filename=video.mp4`);
    ytdl(videoUrl,{filter:format=>format.Itag===Itag}).pipe(res)
})

const port = 5500;
app.listen(port,()=>{
    console.log(`Listening to the port ${port}......`);
})