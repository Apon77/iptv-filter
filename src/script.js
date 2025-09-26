var output = document.getElementById('output')
var progress = document.getElementById('progress')
var download = document.getElementById('download')
var search = document.getElementById('search')
var filename = ''

search.style.display = 'none'

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
    search.style.display = 'block'
}

function downloadfile() {
    var text = download.innerHTML
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
                download.innerHTML += infourl + '\n' + url + '\n' + '\n'
                channelname = infourl.split(',')[1]
                chwithlink = `<li><a href=${url}>${channelname}</a></li>`
                output.innerHTML += chwithlink

            }
        } else { throw new Error('failed to fetch tv') }
    } catch (error) {
        console.log('error;', error)
    }

}


function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("output");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}