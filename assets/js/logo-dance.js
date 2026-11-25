/* VELCURA logo band: dance animation controller + music synthesized in the browser
   (no audio files; muted by default, the speaker button turns it on).
   Ported from aurelle-lingerie.pages.dev. */
  (function(){
    var ctx=null, master=null, wet=null, active=[], on=false;
    var AN={ d6:{snap:4200,end:5200,arrive:672,bow:[882,1260],moments:[1680,2268,2772,3360]},
             d4:{snap:3360,end:4300,arrive:0,bow:null,moments:[840,1680,2520]} };
    function init(){
      if(ctx) return;
      var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
      ctx=new AC();
      var comp=ctx.createDynamicsCompressor(); comp.threshold.value=-14; comp.ratio.value=3; comp.connect(ctx.destination);
      master=ctx.createGain(); master.gain.value=.7; master.connect(comp);
      var conv=ctx.createConvolver(), len=ctx.sampleRate*2.4, ir=ctx.createBuffer(2,len,ctx.sampleRate);
      for(var c=0;c<2;c++){var d=ir.getChannelData(c);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.2);}
      conv.buffer=ir; wet=ctx.createGain(); wet.gain.value=.32; wet.connect(conv); conv.connect(master);
    }
    function out(node,rev){ node.connect(master); if(rev!==0){var g=ctx.createGain(); g.gain.value=(rev==null?1:rev); node.connect(g); g.connect(wet);} }
    function track(n){active.push(n); return n;}
    function stopAll(){ active.forEach(function(n){try{n.stop();}catch(e){}}); active=[]; }
    function mf(m){return 440*Math.pow(2,(m-69)/12);}
    // ---------- 乐器 ----------
    function env(g,t,a,peak,dec,sus){g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(Math.max(sus,0.0001),t+a+dec);}
    function piano(t,m,v,len){ len=len||1.8; var g=ctx.createGain(), f=ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.setValueAtTime(5200,t); f.frequency.exponentialRampToValueAtTime(900,t+len);
      [[1,1],[2,.42],[3,.2],[4,.09],[5,.05]].forEach(function(h){var o=track(ctx.createOscillator()); o.type='sine'; o.frequency.value=mf(m)*h[0]*(1+(h[0]-1)*0.0009); var hg=ctx.createGain(); hg.gain.value=h[1]; o.connect(hg); hg.connect(f); o.start(t); o.stop(t+len+.2);});
      g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v*.32,t+.006); g.gain.exponentialRampToValueAtTime(v*.1,t+.35); g.gain.exponentialRampToValueAtTime(0.0001,t+len);
      f.connect(g); out(g,.7); }
    function harp(t,m,v){ var g=ctx.createGain(), o=track(ctx.createOscillator()), o2=track(ctx.createOscillator()); o.type='triangle'; o2.type='sine'; o.frequency.value=mf(m); o2.frequency.value=mf(m)*2;
      var g2=ctx.createGain(); g2.gain.value=.25; o.connect(g); o2.connect(g2); g2.connect(g);
      g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v*.22,t+.004); g.gain.exponentialRampToValueAtTime(0.0001,t+1.6);
      o.start(t); o2.start(t); o.stop(t+1.7); o2.stop(t+1.7); out(g,1.1); }
    function pad(t,ms,dur,v,cut,type){ var g=ctx.createGain(), f=ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=cut||1400; f.Q.value=.5;
      ms.forEach(function(m){[-8,0,8].forEach(function(dt){var o=track(ctx.createOscillator()); o.type=type||'sawtooth'; o.frequency.value=mf(m); o.detune.value=dt;
        var lfo=track(ctx.createOscillator()), lg=ctx.createGain(); lfo.frequency.value=4.8+Math.random(); lg.gain.value=6; lfo.connect(lg); lg.connect(o.detune);
        o.connect(f); o.start(t); o.stop(t+dur+1.4); lfo.start(t); lfo.stop(t+dur+1.4);});});
      g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v*.05/Math.sqrt(ms.length),t+Math.min(.7,dur*.5)); g.gain.setValueAtTime(v*.05/Math.sqrt(ms.length),t+dur); g.gain.exponentialRampToValueAtTime(0.0001,t+dur+1.3);
      f.connect(g); out(g,1); return g; }
    function reed(t,m,dur,v){ var g=ctx.createGain(), f=ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=1600; f.Q.value=.7;
      [['square',0,.6],['sawtooth',6,.5],['sawtooth',-6,.5]].forEach(function(s){var o=track(ctx.createOscillator()); o.type=s[0]; o.frequency.value=mf(m); o.detune.value=s[1]; var og=ctx.createGain(); og.gain.value=s[2]; o.connect(og); og.connect(f); o.start(t); o.stop(t+dur+.15);});
      g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v*.09,t+.02); g.gain.setValueAtTime(v*.09,t+dur*.7); g.gain.exponentialRampToValueAtTime(0.0001,t+dur+.1);
      f.connect(g); out(g,.6); }
    function bass(t,m,dur,v,type){ var g=ctx.createGain(), o=track(ctx.createOscillator()), f=ctx.createBiquadFilter(); o.type=type||'triangle'; o.frequency.value=mf(m); f.type='lowpass'; f.frequency.value=700;
      o.connect(f); f.connect(g); g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v*.5,t+.008); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.start(t); o.stop(t+dur+.05); out(g,.25); }
    function bell(t,m,v,len){ len=len||2.4; var c=track(ctx.createOscillator()), mo=track(ctx.createOscillator()), mg=ctx.createGain(), g=ctx.createGain();
      c.frequency.value=mf(m); mo.frequency.value=mf(m)*3.5; mg.gain.setValueAtTime(mf(m)*2.2,t); mg.gain.exponentialRampToValueAtTime(1,t+len); mo.connect(mg); mg.connect(c.frequency);
      c.connect(g); g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v*.16,t+.003); g.gain.exponentialRampToValueAtTime(0.0001,t+len);
      c.start(t); mo.start(t); c.stop(t+len+.1); mo.stop(t+len+.1); out(g,1.2); }
    function noiseBuf(){ if(noiseBuf.b) return noiseBuf.b; var n=ctx.sampleRate*3, b=ctx.createBuffer(1,n,ctx.sampleRate), d=b.getChannelData(0); for(var i=0;i<n;i++)d[i]=Math.random()*2-1; return noiseBuf.b=b; }
    function whoosh(t,dur,v,f0,f1){ var s=track(ctx.createBufferSource()), f=ctx.createBiquadFilter(), g=ctx.createGain(); s.buffer=noiseBuf(); f.type='bandpass'; f.Q.value=1.4;
      f.frequency.setValueAtTime(f0||400,t); f.frequency.exponentialRampToValueAtTime(f1||3200,t+dur); s.connect(f); f.connect(g);
      g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v*.25,t+dur*.6); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); s.start(t); s.stop(t+dur+.05); out(g,.8); }
    function cymbal(t,dur,v,swellIn){ var s=track(ctx.createBufferSource()), f=ctx.createBiquadFilter(), g=ctx.createGain(); s.buffer=noiseBuf(); f.type='highpass'; f.frequency.value=6500; s.connect(f); f.connect(g);
      if(swellIn){ g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(v*.12,t+dur); g.gain.linearRampToValueAtTime(0.0001,t+dur+.05); }
      else { g.gain.setValueAtTime(v*.12,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); }
      s.start(t); s.stop(t+dur+.1); out(g,1); }
    function boom(t,v){ var o=track(ctx.createOscillator()), g=ctx.createGain(); o.frequency.setValueAtTime(95,t); o.frequency.exponentialRampToValueAtTime(42,t+.5);
      g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v*.7,t+.01); g.gain.exponentialRampToValueAtTime(0.0001,t+1.3); o.connect(g); o.start(t); o.stop(t+1.4); out(g,.2); }
    function hit(t,v){ var s=track(ctx.createBufferSource()), f=ctx.createBiquadFilter(), g=ctx.createGain(); s.buffer=noiseBuf(); f.type='bandpass'; f.frequency.value=2200; f.Q.value=.8; s.connect(f); f.connect(g);
      g.gain.setValueAtTime(v*.3,t); g.gain.exponentialRampToValueAtTime(0.0001,t+.09); s.start(t); s.stop(t+.12); out(g,.5); }
    // ---------- 四种风格（a = 动画时间点，t0 = 开始时刻，单位秒） ----------
    var D=62; // D4
    var S={
     piano:function(t0,a){
       var n=12, beat=a.snap/n/1000, prog=[[38,[62,66,69]],[47,[62,66,71]],[43,[62,67,71]],[45,[61,64,69]]]; // D  Bm  G  A
       for(var i=0;i<n;i++){ var bar=Math.floor(i/3), pos=i%3, ch=prog[bar%4], t=t0+i*beat, cres=.55+.45*i/n;
         if(pos===0) bass(t,ch[0],beat*2.6,.9*cres,'sine'), piano(t,ch[0]+12,.5*cres,1.2);
         else ch[1].forEach(function(m){ piano(t,m,.32*cres,.6); }); }
       a.moments.forEach(function(ms,k){ var t=t0+ms/1000-.12, ch=prog[Math.min(3,Math.floor(ms/a.snap*4))][1];
         [0,1,2,3].forEach(function(j){ piano(t+j*.045, ch[j%3]+12+(j===3?12:0), .5, 1.1); }); });
       if(a.bow){ piano(t0+a.bow[0]/1000,81,.55,1.4); piano(t0+a.bow[0]/1000+.28,78,.45,1.6); piano(t0+a.bow[1]/1000,74,.35,1.2); }
       var ts=t0+a.snap/1000; [38,50,57,62,66,69,74,78,86].forEach(function(m,j){ piano(ts+j*.028,m,.8,3.2); }); bass(ts,26,2.4,1,'sine');
     },
     strings:function(t0,a){
       var sn=a.snap/1000, q=sn/4, prog=[[50,57,62,66],[47,54,62,66],[43,50,59,67],[45,52,61,69]];
       prog.forEach(function(ch,i){ pad(t0+i*q, ch, q+.15, .7+.35*i, 900+500*i); bass(t0+i*q, ch[0]-12, q+.6, .55, 'sine'); });
       a.moments.forEach(function(ms){ var t=t0+ms/1000-.22; [62,64,66,69,71,74,76,78].forEach(function(m,j){ harp(t+j*.03,m,.75); }); });
       if(a.bow) pad(t0+a.bow[0]/1000,[38,50],(a.bow[1]-a.bow[0])/1000+.3,1.1,600,'sawtooth');
       cymbal(t0+sn-1.3,1.3,.9,true);
       var ts=t0+sn; pad(ts,[38,50,57,62,66,69,74],1.6,1.8,2600); bass(ts,26,2.6,1,'sine'); boom(ts,.6);
       [62,66,69,74,78,81,86,90,93,98].forEach(function(m,j){ harp(ts+.02+j*.028,m,.8); }); cymbal(ts,2.2,.8,false);
     },
     tango:function(t0,a){
       var n=16, beat=a.snap/n/1000, sn=a.snap/1000, mute=a.bow?[a.bow[0]/1000,a.bow[1]/1000]:null;
       var prog=[[38,[62,65,69]],[45,[61,64,67]],[38,[62,65,69]],[45,[61,64,69]]]; // Dm  A7  Dm  A7
       function muted(t){ return mute && t-t0>=mute[0]-.02 && t-t0<mute[1]-.02; }
       for(var b=0;b<n;b+=2){ var ch=prog[Math.floor(b/4)%4], base=t0+b*beat;
         [[0,1],[.75,.6],[1,.8],[1.5,.6]].forEach(function(h){ var t=base+h[0]*beat; if(t-t0<sn-.05 && !muted(t)){ bass(t,ch[0],beat*.55,h[1],'sawtooth'); hit(t,h[1]*.5);} });
         [0,1.5].forEach(function(o){ var t=base+o*beat; if(t-t0<sn-.05 && !muted(t)) ch[1].forEach(function(m){ reed(t,m,beat*.45,.8); }); }); }
       a.moments.forEach(function(ms){ var t=t0+ms/1000-.16; [74,73,74,76,77].forEach(function(m,j){ reed(t+j*.035,m,.06,.8); }); });
       if(mute){ reed(t0+mute[0],69,(mute[1]-mute[0])*.9,.9); }          // 鞠躬：伴奏停，只留一个长音
       var ts=t0+sn; ch=[38,50,62,65,69,74];
       ch.forEach(function(m){ reed(ts-beat*1.5,m,.09,1); }); hit(ts-beat*1.5,1); bass(ts-beat*1.5,38,.15,1,'sawtooth');   // 嚓——
       ch.forEach(function(m){ reed(ts,m,.22,1.3); }); hit(ts,1.4); bass(ts,26,.6,1.2,'sawtooth'); boom(ts,.5);           // 当！
     },
     chic:function(t0,a){
       var sn=a.snap/1000, beat=sn/8;
       pad(t0,[50,57,61,64,66],sn+.1,1.2,1100,'triangle'); pad(t0+sn*.5,[54,61,64,69],sn*.5+.1,.8,1600,'triangle');
       for(var i=0;i<8;i++) bass(t0+i*beat,26,beat*.9,.75,'sine');
       whoosh(t0,Math.max(.6,(a.arrive||700)/1000),1,300,2800);
       var pent=[74,76,78,81,83,86];
       a.moments.forEach(function(ms,k){ var t=t0+ms/1000; whoosh(t-.35,.4,.7,600,4200); bell(t,pent[k%pent.length],.8,1.8); bell(t+.12,pent[(k+2)%pent.length]+12,.4,1.4); });
       if(a.bow){ bell(t0+a.bow[0]/1000,69,.7,2.2); whoosh(t0+a.bow[0]/1000+.1,(a.bow[1]-a.bow[0])/1000,.5,2400,500); bell(t0+a.bow[1]/1000,74,.6,1.8); }
       whoosh(t0+sn-1.4,1.4,1.3,250,9000);
       var ts=t0+sn; boom(ts,1); bass(ts,26,2.4,1,'sine'); [74,81,86,90].forEach(function(m,j){ bell(ts+j*.05,m,.9,3); }); cymbal(ts,1.8,.6,false);
     }
    };
    var NAMES=['piano','strings','tango','chic'], last=null;
    window.VelcuraMusic={
      isOn:function(){ return on; },
      setOn:function(v){ on=!!v; if(on){ init(); if(ctx&&ctx.state==='suspended') ctx.resume(); } else stopAll(); },
      play:function(variant){
        if(!on) return; init(); if(!ctx) return; if(ctx.state==='suspended') ctx.resume();
        stopAll();
        var pick=NAMES.filter(function(n){ return n!==last; });      /* 随机，但不连续重复同一首 */
        var st=pick[Math.floor(Math.random()*pick.length)]; last=st;
        try{ S[st](ctx.currentTime+.03, AN[variant]); }catch(e){}
        return st;
      },
      stop:function(){ stopAll(); }
    };
  })();
  (function(){
    var b=document.querySelector('.brand-band'); if(!b) return;
    var mark=b.querySelector('.bb-mark');
    function play(){
      b.classList.remove('is-play','d4','d6');
      void b.offsetWidth;              /* 强制重排，让动画可以再次播放 */
      var v = Math.random() < .5 ? 'd4' : 'd6';            /* 随机：方案四 或 方案六 */
      b.classList.add(v);
      b.classList.add('is-play');
      if(window.VelcuraMusic) VelcuraMusic.play(v);        /* 小喇叭开着时，随机配一首同步的音乐 */
    }
    var snd=b.querySelector('.bb-sound');
    if(snd && window.VelcuraMusic){
      snd.addEventListener('click',function(){
        var on=!VelcuraMusic.isOn(); VelcuraMusic.setOn(on);
        snd.classList.toggle('on',on); snd.setAttribute('aria-pressed',on?'true':'false');
        if(on) play();                                     /* 打开声音时，动画带音乐重播一次 */
      });
    }
    /* 点标志可重播，方便查看动效 */
    if(mark){ mark.style.cursor='pointer'; mark.addEventListener('click',play); }
    if('IntersectionObserver' in window){
      var t=null;
      var io=new IntersectionObserver(function(es){
        var e=es[0];
        if(e.isIntersecting && e.intersectionRatio>=.45){
          clearTimeout(t); t=setTimeout(play,150);
        }else if(e.intersectionRatio===0){
          clearTimeout(t); b.classList.remove('is-play'); if(window.VelcuraMusic) VelcuraMusic.stop();   /* 完全离开视野后复位，下次进入再播 */
        }
      },{threshold:[0,.45]});
      io.observe(b);
    } else { play(); }
  })();
