
let term ='';
const songContainer= document.getElementById('songs');

const updateterm = () =>{
    term =document.getElementById('searchInput').value;

    if(!term || term ===''){
        alert('please enter the search querry');

    }
    else{
            while(songContainer.firstChild)
            {
                songContainer.removeChild(songContainer.firstChild);
            }

        const url=`https://itunes.apple.com/search?media=music&term=${term}`
        fetch(url)
        .then( (responce) => responce.json())
        .then( (data) => {
            const artist=data.results;
            return artist.map(result => {
        
                const article=document.createElement('article'),
                        artist=document.createElement('p'),
                        song=document.createElement('p'),
                        imag=document.createElement('img'),
                        audio=document.createElement('audio'),
                        audiosource=document.createElement('source');
                console.log(result);
                artist.innerHTML=result.artistName
                song.innerHTML=result.trackName
                imag.src=result.artworkUrl100
                audiosource.src=result.previewUrl
                audio.setAttribute('controls','')
        
        
                article.appendChild(imag)
                article.appendChild(artist)
                article.appendChild(song)
                article.appendChild(audio)
        
                audio.appendChild(audiosource)
                songContainer.appendChild(article)
        
        
            })
        })
        .catch(error => console.log('request failed:',error));

    }
}

const searchbtn=document.querySelector('button')

searchbtn.addEventListener('click',updateterm);

document.addEventListener('play', event=>{
    const audio=document.getElementsByTagName('audio');
    for(let i=0;i<audio.length;i++)
    {
        if(audio[i]!=event.target)
        {
            audio[i].pause();
        }
    }
}, true );
