var output = document.getElementById('output')
var progress = document.getElementById('progress')
var download = document.getElementById('download')
var filename = ''

async function readText(event) {
    const file = event.target.files.item(0)
    var text = await file.text();
    filename = file.name
    lines = text.split('\n')
    progress.innerHTML = 'processing'
    for (let index = 0; index < lines.length; index++) {
        infoline = lines[index]
        urlline = lines[index + 1]
        if (infoline.includes('#EXTINF')) {
            channelname = infoline.split(',')[1]
            if (urlline.includes(".m3u8")) {
                fetchdata(urlline, infoline)
            }
        }
    }
    progress.innerHTML = 'completed'
}

function downloadfile() {
    var text = output.innerHTML
    var blob = new Blob([text], { type: 'text/plain' })
    var link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `filtered-${filename}`
    link.click()
}

function addplayer() {
    src = document.getElementById("urltext").value

    player = `
    <media-player autoplay stream-type="ll-live:dvr" title="" src=${src}>
    <media-provider></media-provider>
    <media-video-layout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"></media-video-layout>
    </media-player>`

    
    document.getElementById("player").innerHTML = player


}

function hideplayer() {
    document.getElementById("player").innerHTML = ""
}



async function fetchdata(url, infourl) {
    try {
        response = await fetch(url)
        if (response.ok) {
            data = await response.text()
            if (data.includes('#EXT')) {
                output.innerHTML += infourl + '\n' + url + '\n' + '\n'
            }
        } else { throw new Error('failed to fetch tv') }
    } catch (error) {
        console.log('error;', error)
    }

}