/* VELCURA logo dance (ported from aurelle-lingerie.pages.dev).
   Every .brand-band plays on its own when it scrolls into view; click the mark to replay.
   The band under the navigation has the speaker: music (logo-music.js) is muted by default. */
(function(){
  var bands=document.querySelectorAll('.brand-band');
  Array.prototype.forEach.call(bands,function(b){
    var mark=b.querySelector('.bb-mark'), snd=b.querySelector('.bb-sound'), musical=!!snd;
    function play(){
      b.classList.remove('is-play','d4','d6');
      void b.offsetWidth;                                   /* restart the animation */
      var v=Math.random()<.5?'d4':'d6';                     /* random: variant 4 or 6 */
      b.classList.add(v); b.classList.add('is-play');
      if(musical && window.VelcuraMusic) VelcuraMusic.play(v);
    }
    if(snd && window.VelcuraMusic){
      snd.addEventListener('click',function(){
        var on=!VelcuraMusic.isOn(); VelcuraMusic.setOn(on);
        snd.classList.toggle('on',on); snd.setAttribute('aria-pressed',on?'true':'false');
        if(on) play();
      });
    }
    if(mark){ mark.style.cursor='pointer'; mark.addEventListener('click',play); }
    if('IntersectionObserver' in window){
      var t=null;
      new IntersectionObserver(function(es){
        var e=es[0];
        if(e.isIntersecting && e.intersectionRatio>=.45){ clearTimeout(t); t=setTimeout(play,150); }
        else if(e.intersectionRatio===0){ clearTimeout(t); b.classList.remove('is-play'); if(musical && window.VelcuraMusic) VelcuraMusic.stop(); }
      },{threshold:[0,.45]}).observe(b);
    } else { play(); }
  });
})();
