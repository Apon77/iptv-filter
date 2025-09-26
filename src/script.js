var output = document.getElementById('output')
var progress = document.getElementById('progress')
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
            if (urlline.includes(".m3u8")) {
                try {
                    response = await fetch(urlline)
                    progress.innerHTML = `processing ${index}/${lines.length}`
                    if (response.ok) {
                        data = await response.text()
                        if (data.includes('#EXT')) {
                            output.innerHTML += infoline + '\n' + urlline + '\n' + '\n'
                        }
                    } else { throw new Error('failed to fetch tv') }
                } catch (error) {
                    console.log('error;', error)
                }
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
    <media-player autoplay title="" src=${src}>
    <media-provider></media-provider>
    <media-video-layout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"></media-video-layout>
    </media-player>`

    document.getElementById("player").innerHTML = player


}