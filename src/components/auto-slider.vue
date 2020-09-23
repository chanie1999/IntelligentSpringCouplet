<template>
<!-- 制作一个框架包裹slider -->
 <div style="width:100%;margin:20px auto;height:220px">
      <!-- 配置slider组件 -->
      <!-- <slider :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'> -->
      <slider :pages="pages" :sliderinit="sliderinit" style="height:250px" >         
          <!-- 设置loading,可自定义 -->
          <div slot="loading">loading...</div>
      </slider>
 </div>
</template>
<script>
import slider from 'vue-concise-slider'// import slider components
// import cl from '@/components/chunlian'

export default {
   data () {
      return {
        //Image list
        pages:[
          {
            html: '<div class="slider1">slider1</div>',
            style: {
            'background': 'yellow'
            }
          },
          { 
            html: '<div class="slider2">slider2</div>',
            style: {
            'background': 'red'
            }
          },
          {
            html: '<div class="slider3">slider3</div>',
            style: {
            'background': 'blue'
            }
          }
        ],
        //Sliding configuration [obj]
        sliderinit: {
          currentPage: 0,
          thresholdDistance: 500,
          thresholdTime: 100,
          autoplay:10000,
          loop:true,
          direction:'horizontal',
          infinite:1,
          slidesToScroll:1,
          timingFunction: 'ease',
          duration: 300
        }
      }
    },
    components: {
        slider
    },
    // methods: {
      // Listener event
    //   slide (data) {
    //     console.log(data)
    //   },
    //   onTap (data) {
    //     console.log(data)
    //   },
    //   onInit (data) {
    //     console.log(data)
    //   }
    //  }
}
</script>
