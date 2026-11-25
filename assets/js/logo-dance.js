/* VELCURA footer logo dance (silent). Ported from aurelle-lingerie.pages.dev. Music engine kept in logo-music.js (not loaded). */
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
