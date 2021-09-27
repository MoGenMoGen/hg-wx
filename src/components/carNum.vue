<template>
<!--    车牌输入框，
    使用方法 <car-num :getPlateNum="getNum"  :nums=7></car-num>，在登录页面有例子
-->
    <div>
        <div class="plate-wrap">

            <!-- 已输入信息 -->
            <ul class="ul_input" @click="showKeyboard=true">
                <li v-for="(item,index) in nums" :key="index">
                    <span :class="{active:currentIndex==index}">{{ chooseKey[index] || "" }}</span>
                </li>
            </ul>
        </div>


        <div class="modal" v-if="showKeyboard" @click.stop="showKeyboard=false">
            <!-- 填写省级简称和车牌信息 -->
            <ul class="ul_pro" v-if="showKeyboard">
                <!--                    选择升级-->
                <li v-show="currentIndex == 0" v-for="(item, index) in provinces" :key="index">
                    <span @click.stop="chooseProvince(item)">{{ provinces[index] }}</span>
                </li>
                <!--                    选择数字或者字母-->
                <li v-show="currentIndex != 0" v-for="(item, index) in keyNums" :key="index+999">
                    <span @click.stop="chooseKeyNums(item,index)">{{ keyNums[index] }}</span>
                </li>
                <li class="li_close" @click.stop="closePro()">
                    <span>关闭</span>
                </li>
                <li class="li_clean" @click.stop="clearPro()">
                    <span>清空</span>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
    export default {
        props: {

            /*
            是否获取车牌号，这是从父组件传递过来的方法
            父组件可以传递给子组件方法。。。。。。。
             */
            getPlateNum: {
                type: Function,
                default: new Function()
            },
            //号码数量，可以在这里修改绿牌车还是蓝牌车,默认蓝牌车
            nums:{
                type: Number,
                default:7
            },
            //初始值
            initVal:{
                type:String,
                default:""
            }

        },

        data() {
            return {
                provinces: [
                    "京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀", "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂", "津",
                    "贵", "云", "桂", "琼", "青", "新", "藏", "蒙", "宁", "甘", "陕", "闽", "赣", "湘"
                ],
                keyNums: [
                    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Q", "W", "E", "R", "T", "Y", "U", "I", "O",
                    "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "Del", "确定"
                ],

                showKeyboard:false,//是否显示键盘
                currentIndex: 0,
                chooseKey: [],


            };
        },
        watch:{
            //监听数组，并随时向父组件抛出值
            chooseKey(newVal,oldVal){
                this.showNum()
            },
            nums(newVal,oldVal){
                this.chooseKey = [];
                this.currentIndex = 0;
                if(this.initVal && this.initVal.length==newVal){
                    this.initCarNum(this.initVal)
                }else {
                    this.$emit("result","")
                }

            }
        },

        methods: {
            //初始化车牌号：
            initCarNum(number){
                let arr =number.split('')
                arr.forEach(item=>{
                    this.chooseKey.push(item)
                })
                this.currentIndex=number.length-1
                this.$emit("result",this.chooseKey.join(""))
            },



            //获取车牌信息
            showNum() {
                let palteNum = this.chooseKey.join("");
                // this.getPlateNum(palteNum);
                this.$emit("result",palteNum)
            },

            closePro() {
                this.showKeyboard=false
            },
            clearPro(){
                this.chooseKey = [];
                this.currentIndex = 0;

            },


            //选择省级简称
            chooseProvince(item) {
                console.log("currentIndex的1值："+ this.currentIndex)
                // this.chooseKey[0] = item;
                this.chooseKey.push(item)
                this.currentIndex++

            },
            //点击按钮时间
            chooseKeyNums(item,index) {
                //点击清除时

                console.log("currentIndex的2值："+ this.currentIndex)
                if(item=="Del"){
                    //点击删除，这里又分为好几种情况


                    if(this.chooseKey.length==this.nums){

                        if(this.currentIndex==this.nums-1){
                            //如果是最后一个元素，只弹出选中列表数量，但是currentIndex不减去1
                            this.chooseKey.pop();
                        }

                    }else {
                        if(this.currentIndex>0){
                            this.chooseKey.pop();
                            this.currentIndex--

                        }

                    }

                }else if(item=="确定"){
                    this.showNum();
                    this.showKeyboard=false
                }else {

                    if(this.currentIndex==1){
                       let reg=/^[0-9]*$/
                       if(reg.test(item)) {
                           console.log("第2位不能是数字")
                           return
                       }
                    }

                    if(this.currentIndex<this.nums-1){
                        this.currentIndex++;
                        this.chooseKey.push(this.keyNums[index]);
                    }else if(this.currentIndex==this.nums-1){
                        if(this.chooseKey.length<this.nums){
                            this.chooseKey.push(this.keyNums[index]);
                        }else {
                            console.log(this.keyNums[index])
                            //必须先弹出pop，然后在push，否则dom不会更新
                            this.chooseKey.pop()
                            this.chooseKey.push(this.keyNums[index]);

                        }

                    }



                }



            }
        }
    };
</script>
<style lang="less" scoped>
    .plate-wrap {
        /*输入框宽度*/
        width: 100%;
        .ul_input {

            margin: 0 auto;
            white-space: nowrap;
            display: flex;
            justify-content: flex-end;
            li{

                flex: 1;

                margin-left: 3rpx;
                text-align: center;
                span {
                    display: block;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 4rpx;
                    width: 64rpx;
                    margin: 0 auto;
                    height: 64rpx;
                    line-height: 64rpx;
                }

                /*获得焦点*/
                .active {
                    border: 1px solid #00beff;
                    color: #00beff;
                }

            }
        }
    }



    /*软键盘*/
    .ul_pro {
        background-color: #ced3d9;
        text-align: center;
        padding: 4rpx 2rpx;
        font-size: 28rpx;
        /*固定定位*/
        position: absolute;
        bottom: 0;

        /*每一个键盘按钮*/
        li {
            float: left;
            width: 11.11%;
            padding: 2rpx;

            span {
                display: block;
                background-color: #fff;
                border-radius: 4rpx;
                box-shadow: 2rpx 2rpx 2rpx #888888;
                /* max-width:48px; margin:0 auto; */
                line-height: 32rpx;
                padding-top: 2rpx;
                /*按住时会有动画*/
                &:active{
                    opacity: 0.5;
                }
            }
        }
        /*关闭按钮*/
        .li_close {
            float: right;
            width: 22.22%;
            span {
                background-color: #acb3bb;
            }
        }
        /*清除按钮*/
        .li_clean {
            float: right;
            width: 22.22%;
        }

    }
/*遮罩层*/
    .modal{
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        z-index: 99;


    }

</style>
