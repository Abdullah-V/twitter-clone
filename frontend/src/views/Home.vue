<template>
  <div class="home-root">

    <div class="main-section">
      <Tweet
          tweet-user-name="Selçuk Bayraktar"
          tweet-user-username="@Selcuk"
          tweet-created-date="11h"
          tweet-user-img="https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg"
          tweet-text="
#BayraktarTB2 S/İHA

7/24 devam eden uçuş eğitimlerinden...

#MilliTeknolojiHamlesi"
          tweet-img="https://pbs.twimg.com/media/EoLHVqaXYAcny8X?format=jpg&name=large"
      ></Tweet>

      <Tweet
          tweet-user-name="Abdullah Çiftçi"
          tweet-user-username="@abdullahciftcib"
          tweet-created-date="8h"
          tweet-user-img="https://pbs.twimg.com/profile_images/977615534517825536/gFLYeB5K_400x400.jpg"
          tweet-text="
Arkadaşlar

Çin'den sızan gizli koronavirüs salgını belgeleri yayımlandı.
Çin dünyayı yanlış mı yönlendirdi?
Wuhan Gizli Dosyalarında neler var?

Video analizi için:
https://youtube.com/watch?v=8p5Fvh"
          tweet-img="https://pbs.twimg.com/media/EoLcNgNWEAINgJ5?format=jpg&name=small"
      ></Tweet>
      <Tweet
          tweet-user-name="Abdurrahman Uzun"
          tweet-user-username="@uzunabdurrahman
"
          tweet-created-date="Nov 30"
          tweet-user-img="https://pbs.twimg.com/profile_images/1279006755637297156/XpQ-Jemo_400x400.jpg"
          tweet-text="
MİT tırları kumpasında FETÖ den yana taraf olanların, Can Dündar denen
haini cansiperane savunanların
bugün çıkıp
Almanya’nın Akdeniz’de gemimize korsanca çıkmasına
“kabul edilemez “diyor
@asdsadsa Samimiyetinizi yesinler!!!"
      ></Tweet>
      <Tweet
          tweet-user-name="İlham Əliyev "
          tweet-user-username="@azpresident"
          tweet-created-date="17h"
          tweet-user-img="https://pbs.twimg.com/profile_images/1317884017333723138/3gyjyuL2_400x400.jpg"
          tweet-img="https://pbs.twimg.com/media/EoJzsN1XcAENVNZ?format=jpg&name=large"
      ></Tweet>

      <Tweet
          tweet-user-name="Selçuk Bayraktar"
          tweet-user-username="@Selcuk"
          tweet-created-date="11h"
          tweet-user-img="https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg"
          tweet-text="
#BayraktarTB2 S/İHA

7/24 devam eden uçuş eğitimlerinden...

#MilliTeknolojiHamlesi"
          tweet-img="https://pbs.twimg.com/media/EoLHVqaXYAcny8X?format=jpg&name=large"
      ></Tweet>

      <Tweet
          tweet-user-name="Abdullah Çiftçi"
          tweet-user-username="@abdullahciftcib"
          tweet-created-date="8h"
          tweet-user-img="https://pbs.twimg.com/profile_images/977615534517825536/gFLYeB5K_400x400.jpg"
          tweet-text="
Arkadaşlar

Çin'den sızan gizli koronavirüs salgını belgeleri yayımlandı.
Çin dünyayı yanlış mı yönlendirdi?
Wuhan Gizli Dosyalarında neler var?

Video analizi için:
https://youtube.com/watch?v=8p5Fvh"
          tweet-img="https://pbs.twimg.com/media/EoLcNgNWEAINgJ5?format=jpg&name=small"
      ></Tweet>
      <Tweet
          tweet-user-name="Abdurrahman Uzun"
          tweet-user-username="@uzunabdurrahman
"
          tweet-created-date="Nov 29"
          tweet-user-img="https://pbs.twimg.com/profile_images/1279006755637297156/XpQ-Jemo_400x400.jpg"
          tweet-text="
Paris’te çarşı pazar karışık...ama CNN, BBC, France24 belgesel yayınlıyor...
Oysa bunlar Gezi Terör eylemlerini sokak sokak canlı yayınlıyordu.

Neyse... demekki insanların sadece Türkiye’den haber alma özgürlüğü varmış.

İkiyüzlüğün adıdır çağdaşlık!"
          tweet-img="https://pbs.twimg.com/media/En-0rLkXYAUyrYX?format=jpg&name=medium"
      ></Tweet>
      <Tweet
          tweet-user-name="İlham Əliyev "
          tweet-user-username="@azpresident"
          tweet-created-date="17h"
          tweet-user-img="https://pbs.twimg.com/profile_images/1317884017333723138/3gyjyuL2_400x400.jpg"
          tweet-img="https://pbs.twimg.com/media/EoJzsN1XcAENVNZ?format=jpg&name=large"
      ></Tweet>

    </div>

  </div>
</template>

<script>
import Tweet from "@/components/Tweet";

export default {
  components:{
    Tweet
  }
}
</script>

<style scoped>

.trial-div{
  width: 100%;
  height: 300px;
  background: #fafafa;
  border: 1px solid #bfbfbf;
  transition: 200ms all;
  scroll-behavior: smooth;
}

.trial-div:hover{
  background: #ececec;
}

/*  #f1f1f1 */

.main-section{
  width: 51%;
  height: 100%;
  background: white;
  position: fixed;
  top: 0px;
  left: 23.5%;
  overflow: auto;
  scrollbar-width: none;
}

@media screen and (max-width: 1000px){
  .main-section{
    width: 76.5%;
  }
}


</style>