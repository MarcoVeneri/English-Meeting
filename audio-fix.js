(() => {
  const femaleNames=/Serena|Martha|Sonia|Libby|Samantha|Allison|Ava|Susan|Victoria|Jenny|Aria|Michelle|Emma|Google UK English Female|Karen|Moira|Tessa|Siri|Flo|Sandy|Shelley/i;

  function refreshEnglishVoices(){
    try{
      const list=speechSynthesis.getVoices();
      if(list && list.length) voices=list;
    }catch(e){}
    return Array.isArray(voices)?voices:[];
  }

  // Prefer a female voice, but never block playback just because iOS renamed
  // or has not exposed one of the expected voices yet.
  voiceFor=function(locale){
    const all=refreshEnglishVoices();
    const wanted=String(locale||'en-GB').toLowerCase().replace('_','-');
    const english=all.filter(v=>/^en[-_]/i.test(v.lang||''));
    const exact=english.filter(v=>String(v.lang||'').toLowerCase().replace('_','-')===wanted);
    return exact.find(v=>femaleNames.test(v.name||''))
      || exact[0]
      || english.find(v=>femaleNames.test(v.name||''))
      || english[0]
      || null;
  };

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

    if('wakeLock' in navigator){
      navigator.wakeLock.request('screen').then(lock=>{
        if(running) wakeLock=lock; else lock.release();
      }).catch(()=>{});
    }

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

    const v=voiceFor(current.lang);
    if(v){current.voice=v;current.lang=v.lang||current.lang;}

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
  if(note) note.textContent=note.textContent.replace(/Versione\s+10\b/,'Versione 11');
})();
