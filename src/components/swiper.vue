<template>
    <div style="width:100%;height:340px">
        <br>
        类别：<el-select v-model="value" style="height:40px;width:100px;">
          <el-option v-for="i in SpringCoupletList"
          :key="i.id"
          :value="i"
          >{{i}}</el-option>
          <el-option value=" ">(空)</el-option>
        </el-select>
        组别： <el-input style="height:40px;width:100px;" v-model="group"></el-input>
        上联： <el-input style="height:40px;width:150px;" v-model="question"></el-input>
        <el-button type="primary" @click="searchchunlian" style="margin-left:10px;">检索春联</el-button>
        <el-button type="primary" style="margin-left:150px;" @click="editchunlian">编辑春联</el-button>
        <!-- 展示春联 -->
        <swiper :options="swiperOption" class="swiper-container swiper-pagination1"  ref="mySwiper" style="height:290px" >
          <!-- v-if="sp.length"  -->
          <swiper-slide v-for="i in sp"
          :key="i.id"
          >
          <br><br><br>
          <h2>上联：{{i.chunlianQuestion}}</h2>
          <h2>下联：{{i.chunlianAnswer}}</h2>
          <!-- <el-button type="danger"style="margin-top:20px;" @click="dialogVisible = true">删除春联</el-button> -->
          <el-button type="danger" style="margin-top:20px;" @click="deletechunlian">删除春联</el-button>
          <!-- <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :modal-append-to-body='false'
            :append-to-body='true'
            style="width:800px;"
            center
            >
          <span>此操作将永久删除春联，是否继续？</span>  
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="deletechunlian">确定</el-button>
          </div>
          </el-dialog> -->
          </swiper-slide>
        <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination" style="display: none;"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
  require('swiper/dist/css/swiper.css');
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    created(){
      this.$axios.get('/menu/category',
                    {
                      headers: {'token':window.localStorage['token']}
                    }
                  )
                 .then(res =>{
                    // console.log(res);
                   if(res.data.code === 1){
                    this.SpringCoupletList = res.data.data;
                   }
                 });
    },
    data() {
      return {
        value:" ",
        SpringCoupletList: [],
        sp:[],
        group:"",
        question:"",
        // dialogVisible: false,

        swiperOption: {
          //pagination: '.swiper-pagination1',
          pagination: '.swiper-pagination',
          slidesPerView: 1,
          spaceBetween: 30,
          centeredSlides: false,
          spaceBetween: 0,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex+1;
            this.index = swiper.realIndex;
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          //自动播放
          autoplay:{
            delay:3000,
            disableOnInteraction:false,
            stopOnLastSlide:true
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          //循环
          loop:true
        }
      }
    },
    methods: {
      searchchunlian(){
        this.sp = []
        //请求春联
        // if(this.value === " " && this.group === "" && this.question === ""){
        //   this.$axios.get('/chunlian/all',
        //               {
        //               headers: {'token':window.localStorage['token']}
        //               })
        //              .then( res => {
        //                console.log("hello")
        //                if(res.data.code === 1){
        //                  this.sp = res.data.data;
        //                }
        //                else{
        //                  this.$message({
        //                    type:'error',
        //                    message:'查无此联，请重新输入'
        //                  })
        //                }
        //              });
        // }
        // else{
          if (this.value != " " && this.group != "" && this.question === "") {
           this.$axios.get('/chunlian/'+this.value+'/'+this.group,
                      {
                      headers: {'token':window.localStorage['token']}
                      })
                     .then( res => {
                       console.log(res)
                       if(res.data.code === 1){
                         this.sp = res.data.data;
                       }
                       else{
                         this.$message({
                           type:'error',
                           message:'查无此联，请重新输入'
                         })
                       }
                     });     
          }
          else{
            if(this.value === " " && this.group === "" &&this.question != ""){
           this.$axios.get('/chunlian/question/' + this.question,
                    {
                      headers: {'token':window.localStorage['token']}
                    })
                     .then( res => {
                       console.log(res.data.data)
                       if (res.data.code === 1){
                         this.sp.push(res.data.data) ;
                       }
                       else{
                         this.$message({
                           type:'error',
                           message:'查无此联，请重新输入'
                         })
                       }
                     })
          }
          else {
            this.$message({
                           type:'error',
                           message:'请同时输入类别和组别或只输入上联以便检索'
                         })
           } 
         }
        },
      editchunlian(){
        this.$router.push('edit');
      },
      deletechunlian(){
        // this.$confirm('此操作将永久删除春联，是否继续？','提示',{
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消'
        // })

        // this.dialogVisible = false;
        console.log(this.swiper.activeIndex)
        let index = this.swiper.activeIndex//获取swiper当前滑块的索引值
        console.log(this.sp[index].chunlianId)
        this.$axios.delete('/chunlian/delete/'+this.sp[index].chunlianId,
        {
          headers: {'token':window.localStorage['token']}
        })
        .then(
          res => {
            this.sp.splice(index,1)//移除已删除春联
            if(res.data.code === 1){
              this.$message({

                type:'success',
                message:'删除成功'
              })
            }
            else{
              this.$message({
                type:'error',
                message:'删除失败'
              })
            }
          });
      }
    },
    //定义swiper对象
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted () {
      this.swiper.slideTo(1, 1000, false);
    }
 
  }
</script>

<style lang="scss">
// .el-dialog{
//        display: flex;
//        flex-direction: column;
//        margin:0 !important;
//        position:absolute;
//        top:50%;
//        left:50%;
//        transform:translate(-50%,-50%);
//        /*height:600px;*/
//        max-height:calc(100% - 30px);
//        max-width:calc(100% - 30px);
//    }
//    .el-dialog .el-dialog__body{
//        flex:1;
//        overflow: auto;
//    }
</style>
