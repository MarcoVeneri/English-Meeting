(() => {

  // iOS keeps an installed web app alive in the background only while a real
  // HTMLMediaElement owns the playback session. SpeechSynthesis alone is often
  // suspended as soon as the screen locks. This inaudible WAV carrier starts
  // inside the user's tap and keeps the audio session active.
  let backgroundCarrier=null;
  let backgroundCarrierUrl=null;

  function makeCarrierUrl(){
    if(backgroundCarrierUrl)return backgroundCarrierUrl;
    const sampleRate=8000;
    const seconds=2;
    const samples=sampleRate*seconds;
    const bytes=new Uint8Array(44+samples*2);
    const view=new DataView(bytes.buffer);
    const write=(offset,text)=>{for(let i=0;i<text.length;i++)bytes[offset+i]=text.charCodeAt(i)};
    write(0,'RIFF');view.setUint32(4,36+samples*2,true);write(8,'WAVE');
    write(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);
    view.setUint16(22,1,true);view.setUint32(24,sampleRate,true);
    view.setUint32(28,sampleRate*2,true);view.setUint16(32,2,true);
    view.setUint16(34,16,true);write(36,'data');view.setUint32(40,samples*2,true);
    for(let i=0;i<samples;i++){
      // Non-zero but effectively inaudible; prevents WebKit from treating the
      // track as empty while never interfering with the spoken lesson.
      const sample=Math.round(Math.sin(2*Math.PI*220*i/sampleRate)*2);
      view.setInt16(44+i*2,sample,true);
    }
    backgroundCarrierUrl=URL.createObjectURL(new Blob([bytes],{type:'audio/wav'}));
    return backgroundCarrierUrl;
  }

  function getBackgroundCarrier(){
    if(backgroundCarrier)return backgroundCarrier;
    const audio=document.createElement('audio');
    audio.id='english-drive-background-audio';
    audio.src=makeCarrierUrl();
    audio.loop=true;
    audio.preload='auto';
    audio.playsInline=true;
    audio.setAttribute('playsinline','');
    audio.setAttribute('webkit-playsinline','');
    audio.setAttribute('aria-hidden','true');
    audio.style.display='none';
    document.body.appendChild(audio);
    backgroundCarrier=audio;
    return audio;
  }

  function startBackgroundCarrier(){
    try{
      const audio=getBackgroundCarrier();
      const playPromise=audio.play();
      if(playPromise&&typeof playPromise.catch==='function'){
        playPromise.catch(()=>{});
      }
      if('mediaSession' in navigator)navigator.mediaSession.playbackState='playing';
    }catch(e){}
  }

  function stopBackgroundCarrier(){
    try{
      if(backgroundCarrier){
        backgroundCarrier.pause();
        backgroundCarrier.currentTime=0;
      }
      if('mediaSession' in navigator)navigator.mediaSession.playbackState='paused';
    }catch(e){}
  }

  requestLessonAudio=function(){
    try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
    startBackgroundCarrier();
  };

  releaseLessonAudio=function(){
    stopBackgroundCarrier();
    try{if(navigator.audioSession)navigator.audioSession.type='auto'}catch(e){}
  };

  function refreshEnglishVoices(){
    try{
      const list=speechSynthesis.getVoices();
      if(list && list.length) voices=list;
    }catch(e){}
    return Array.isArray(voices)?voices:[];
  }

  // Select recognised natural English voices for each speaker. Prefer voice quality over
  // accent, and never fall through to an arbitrary device/default voice.
  const naturalFemale=/\b(Serena|Martha|Sonia|Libby|Samantha|Allison|Ava|Susan|Victoria|Jenny|Aria|Michelle|Emma|Karen|Moira|Tessa)\b|Google UK English Female/i;
  const effectVoice=/Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Hysterical|Jester|Organ|Trinoids|Whisper|Zarvox|Robot/i;
  const naturalMale=/\b(Daniel|Oliver|Arthur|Thomas|Alex|Tom|Nathan|Aaron|Gordon|Guy|Ryan|Davis|Tony|Andrew|Brian)\b|Google UK English Male/i;
  const speakerGender={Sarah:'female',Emma:'female',Narrator:'male'};
  voiceFor=function(locale,speaker){
    const gender=speakerGender[speaker]||'female';
    const recognised=gender==='male'?naturalMale:naturalFemale;
    const wanted=String(locale||'en-GB').toLowerCase().replace('_','-');
    const candidates=refreshEnglishVoices().filter(v=>
      /^en[-_]/i.test(v.lang||'') &&
      recognised.test(v.name||'') &&
      !effectVoice.test(v.name||'')
    );
    const quality=v=>{
      const label=(v.name||'')+' '+(v.voiceURI||'');
      return (/premium|enhanced|neural|natural/i.test(label)?100:0)
        +(String(v.lang||'').toLowerCase().replace('_','-')===wanted?10:0);
    };
    return candidates.sort((a,b)=>quality(b)-quality(a))[0]||null;
  };

  function missingNaturalVoice(){
    paused=true;
    clearTimeout(startWatchdog);
    voiceStarted=false;
    releaseLessonAudio();
    document.getElementById('pauseBtn').textContent='▶';
    document.getElementById('voiceLabel').textContent='Voce naturale non disponibile';
    document.getElementById('bottomText').textContent=
      'La voce inglese richiesta non è disponibile. Premi ▶ per riprovare; se manca, scarica una voce inglese di qualità superiore (Daniel per il narratore, Samantha o Serena per Sarah ed Emma) nelle impostazioni delle voci di Accessibilità.';
  }

  // iOS can expose voices late. Starting the player must not depend on the
  // voice list being populated at the exact instant the user taps START.
  preparePlayer=function(){
    if(!('speechSynthesis' in window)){
      alert('Apri la PWA con Safari su iPhone/iPad o Chrome.');
      return false;
    }

    refreshEnglishVoices();
    blockIndex=0;lineIndex=0;elapsed=0;blockElapsed=0;running=true;paused=false;

    speechGeneration++;
    clearTimeout(nextSpeech);
    clearTimeout(startWatchdog);
    nextSpeech=null;
    voiceStarted=false;
    try{
      if(speechSynthesis.speaking||speechSynthesis.pending||speechSynthesis.paused) speechSynthesis.cancel();
    }catch(e){}

    document.getElementById('player').classList.add('open');
    document.getElementById('playing').style.display='block';
    document.getElementById('done').classList.remove('show');
    document.getElementById('playTopic').textContent=extraMode?'Fuori orario · Mini riunioni':'Mini riunioni di lavoro';
    document.getElementById('pauseBtn').textContent='Ⅱ';
    document.getElementById('closeBtn').textContent=extraMode?'■ Stop':'✕ Chiudi';
    document.getElementById('clockCaption').textContent=extraMode?'TEMPO ASCOLTATO':'TEMPO RIMANENTE';
    document.getElementById('bottomText').textContent=extraMode
      ?'Ascolto libero: fermalo quando vuoi. Non modifica il programma.'
      :'Segui il problema, la decisione e chi farà cosa. La riunione termina senza tagliare il discorso.';

    requestLessonAudio();
    // This first speak stays directly inside the tap/click activation path.
    speak();

    // Intentionally do not request a screen wake lock: playback must continue
    // with the display dimmed or locked to save battery.

    updatePlayer();
    clearInterval(timer);
    timer=setInterval(()=>{
      if(running&&!paused&&voiceStarted){elapsed++;blockElapsed++;updateClock();}
    },1000);
    return true;
  };

  // More tolerant speech loop for iPhone/PWA. If WebKit silently drops the
  // first utterance, refresh voices and retry automatically instead of making
  // the user stop/restart the whole lesson.
  speak=function(){
    if(!running||paused||speechSynthesis.speaking)return;
    const b=blocks[blockIndex];
    if(!b||!b.lines||!b.lines.length)return;
    if(lineIndex>=b.lines.length)lineIndex=0;

    const generation=speechGeneration;
    const line=b.lines[lineIndex];
    const current=new SpeechSynthesisUtterance(line.text);
    utterance=current;
    current.lang=line.locale||'en-GB';
    current.rate=rate();
    current.pitch=1;
    current.volume=1;

    const v=voiceFor(current.lang,line.speaker);
    if(!v){missingNaturalVoice();return;}
    current.voice=v;current.lang=v.lang;

    document.getElementById('speakerLabel').textContent=line.speaker==='Narrator'
      ?'Scenario'
      :line.speaker+(line.speaker==='Sarah'?' · Delivery Lead':' · Technical Lead');
    document.getElementById('spokenText').textContent=line.text;
    const shownLang=(v?.lang||current.lang||'').replace('_','-');
    document.getElementById('voiceLabel').textContent=(shownLang==='en-GB'?'🇬🇧 UK':shownLang==='en-US'?'🇺🇸 USA':'EN')+' · '+(v?.name||'voce dispositivo');

    const retryKey=blockIndex+':'+lineIndex;
    if(window.__edAudioRetryKey!==retryKey){
      window.__edAudioRetryKey=retryKey;
      window.__edAudioRetryCount=0;
    }

    let settled=false;
    voiceStarted=false;

    current.onstart=()=>{
      if(generation!==speechGeneration||!running||paused)return;
      clearTimeout(startWatchdog);
      voiceStarted=true;
      window.__edAudioRetryCount=0;
      document.getElementById('bottomText').textContent='Ascolto in corso · Segui la conversazione.';
    };

    const advance=()=>{
      if(settled||generation!==speechGeneration||!running)return;
      settled=true;
      clearTimeout(startWatchdog);
      voiceStarted=false;
      window.__edAudioRetryCount=0;
      lineIndex++;

      if(lineIndex>=b.lines.length){
        if(!extraMode&&elapsed>=3600){complete();return;}
        blockElapsed=0;lineIndex=0;blockIndex=(blockIndex+1)%blocks.length;
        updatePlayer();
      }
      if(!paused)scheduleSpeech(lineIndex===0?1200:450);
    };

    current.onend=advance;
    current.onerror=()=>{
      if(generation!==speechGeneration||!running)return;
      settled=true;
      clearTimeout(startWatchdog);
      voiceStarted=false;
      audioFailed();
    };

    startWatchdog=setTimeout(()=>{
      if(generation!==speechGeneration||!running||paused||settled||voiceStarted)return;
      refreshEnglishVoices();

      // Some iOS versions speak correctly without firing onstart reliably.
      if(speechSynthesis.speaking){
        voiceStarted=true;
        return;
      }

      const attempts=Number(window.__edAudioRetryCount||0);
      if(attempts<2){
        window.__edAudioRetryCount=attempts+1;
        settled=true;
        speechGeneration++;
        try{speechSynthesis.cancel();}catch(e){}
        voiceStarted=false;
        document.getElementById('bottomText').textContent='Riattivo automaticamente la voce…';
        scheduleSpeech(180);
      }else{
        audioFailed();
      }
    },3000);

    try{
      speechSynthesis.speak(current);
      setTimeout(()=>{
        if(generation===speechGeneration&&running&&!paused&&!settled&&!voiceStarted&&speechSynthesis.speaking){
          voiceStarted=true;
        }
      },120);
    }catch(e){
      audioFailed();
    }
  };

  try{
    speechSynthesis.addEventListener('voiceschanged',refreshEnglishVoices);
    refreshEnglishVoices();
  }catch(e){}

  const note=document.querySelector('.note');
  if(note) note.textContent=note.textContent.replace(/Versione\s+\d+\b/,'Versione 13');
})();
