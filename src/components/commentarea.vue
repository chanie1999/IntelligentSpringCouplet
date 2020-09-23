<template>

    <div>
        <el-button type="primary" @click="comeback">
            去评论
        </el-button> <br><br>
        <el-table
        :data="comment.slice((curPage -1)*pagesize,curPage*pagesize)"
        style="width:1183px"

        >
        <el-table-column
            label="用户"
        >
         <template slot-scope="scope">{{ scope.row.userId}}</template>
        </el-table-column>
        <el-table-column
            label="时间"
        >
         <template slot-scope="scope">{{ scope.row.feedbackDatetime}}</template>
        </el-table-column>
        <el-table-column
            label="评论"
        >
         <template slot-scope="scope">{{ scope.row.feedbackText}}</template>
        </el-table-column>
        </el-table>
        <!-- <div class="cmt-list">
            <div class="cmt-item" v-for="(i,index) in comment">
                <div class="cmt-title">
                    第{{index+1}}楼&nbsp;&nbsp;用户：{{i.userId}}&nbsp;&nbsp;{{i.feedbackDatetime}}
                </div>
                <div class="cmt-body">
                    {{i.feedbackText}}
                </div>
            </div>
        </div> -->
        <br>
         <el-pagination 
         :current-page="curPage"
         :page-size="pagesize"
         :pager-count="5"
          layout="total,prev,pager,next"
         :total="this.comment.length"
         @prev-click="prevClick"
         @next-click="nextClick"
         @current-change="handleCurrentChange"
        />
        
        

    </div>
</template>
<script>
export default {
    data(){
        return{
          comment:[],
          //[{comment1},{comment2},...{comment*n}]
          //根据列表的长度设置单个页面显示的评论数
          page:1,
          pagesize:3,//每页最大页码数
          curPage:1//当前页面
        }   
    },
    methods:{
        comeback(){
            this.$router.push('yonghufankui');
        },
        handleCurrentChange(val){
            this.curPage = val;
        },
        prevClick(){
            if(this.curPage!== 1){
                this.curPage--;
                console.log("当前页数为:"+this.curPage)
            }
        },
        nextClick(){
            if(this.curPage!== this.page){
                this.curPage++;
                console.log("当前页数为:"+this.curPage)
            }
        }
    },
    created(){
        this.$axios.get('/feedback/all?current=1',
                    {
                        headers: {'token':window.localStorage['token']}
                    })
                   .then(
                      res => {
                        if (res.data.code === 1) {
                            this.comment = res.data.data;
                            this.page = parseInt(this.comment.length/3);//每页显示3条
                            if (this.comment.length%3 != 0) {
                                this.page++;
                            }
                            console.log(this.page);
                            for(var i = 0;i<this.comment.length;i++)
                            {
                                    this.comment[i]['page'] = parseInt(i/3)+1;//给列表添加页数属性
                            }
                            console.log(this.comment);
                        }
                   });
    }
}
</script>

<style lang="scss" scoped>
 .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: rgb(241, 64, 64);
                color: white;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
</style>