<template>
    <div class="newArticle">
      <div class='toolbar' @click="format"  >
        <i v-if="config.insertImage" class="iconfont icon-charutupian" @click="insertImage"></i>
        <i v-if="config.bold" :class="'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')" data-name="bold"></i>
        <i v-if="config.italic" :class="'iconfont icon-zitixieti ' + (formats.italic ? 'ql-active' : '')" data-name="italic"></i>
        <i v-if="config.underline" :class="'iconfont icon-zitixiahuaxian ' + (formats.bold ? 'ql-active' : '')" data-name="underline"></i>
        <i v-if="config.strike" :class="'iconfont icon-zitishanchuxian ' + (formats.bold ? 'ql-active' : '')" data-name="strike"></i>
        <i v-if="config.alignLeft" :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align" data-value="left"></i>
        <i v-if="config.alignCenter" :class="'iconfont icon-juzhongduiqi  ' + (formats.align === 'center' ? 'ql-active' : '')" data-name="align" data-value="center"></i>
        <i v-if="config.alignRight" :class="'iconfont icon-youduiqi  ' + (formats.align === 'right' ? 'ql-active' : '')" data-name="align" data-value="right"></i>
        <i v-if="config.justify" :class="'iconfont icon-zuoyouduiqi  ' + (formats.align === 'justify' ? 'ql-active' : '')" data-name="align" data-value="justify"></i>
        <i v-if="config.lineHeight" :class="'iconfont icon-line-height ' + (formats.bold ? 'ql-active' : '')" data-name="lineHeight" data-value="2"></i>
        <i v-if="config.letterSpacing" :class="'iconfont icon-Character-Spacing  ' + (formats.letterSpacing ? 'ql-active' : '')" data-name="letterSpacing" data-value="2em"></i>
        <i v-if="config.marginTop" :class="'iconfont icon-722bianjiqi_duanqianju ' + (formats.marginTop ? 'ql-active' : '')" data-name="marginTop" data-value="20px"></i>
        <i v-if="config.marginBottom" :class="'iconfont icon-723bianjiqi_duanhouju ' + (formats.micon-previewarginBottom ? 'ql-active' : '')" data-name="marginBottom" data-value="20px"></i>
        <i v-if="config.removeFormat" class="iconfont icon-clearedformat" @click="removeFormat"></i>
        <i v-if="config.fontFamily" :class="'iconfont icon-font ' + (formats.fontFamily ? 'ql-active' : '')" data-name="fontFamily" data-value="Pacifico"></i>
        <i v-if="config.fontSize" :class="'iconfont icon-fontsize ' + (formats.fontSize === '24px' ? 'ql-active' : '')" data-name="fontSize" data-value="24px"></i>

        <i v-if="config.color" :class="'iconfont icon-text_color ' + (formats.color === '#0000ff' ? 'ql-active' : '')" data-name="color" data-value="#0000ff"></i>
        <i v-if="config.backgroundColor" :class="'iconfont icon-fontbgcolor ' + (formats.backgroundColor === '#00ff00' ? 'ql-active' : '')" data-name="backgroundColor" data-value="#00ff00"></i>

        <i v-if="config.insertDate" class="iconfont icon-date" @click="insertDate"></i>
        <i v-if="config.listCheck" class="iconfont icon--checklist" data-name="list" data-value="check"></i>
        <i v-if="config.listOrdered" :class="'iconfont icon-youxupailie ' + (formats.list === 'ordered' ? 'ql-active' : '')" data-name="list" data-value="ordered"></i>
        <i v-if="config.listBullet" :class="'iconfont icon-wuxupailie ' + (formats.list === 'bullet' ? 'ql-active' : '')" data-name="list" data-value="bullet"></i>
        <i v-if="config.undo" class="iconfont icon-undo" @click="undo"></i>
        <i v-if="config.redo" class="iconfont icon-redo" @click="redo"></i>

        <i v-if="config.indentReduce" class="iconfont icon-outdent" data-name="indent" data-value="-1"></i>
        <i v-if="config.indentAdd" class="iconfont icon-indent" data-name="indent" data-value="+1"></i>
        <i v-if="config.insertDivider" class="iconfont icon-fengexian" @click="insertDivider"></i>
        <i v-if="config.header" :class="'iconfont icon-format-header-1  ' + (formats.header === 1 ? 'ql-active' : '')" data-name="header" data-value="1"></i>
        <i v-if="config.scriptSub" :class="'iconfont icon-zitixiabiao  ' + (formats.script === 'sub' ? 'ql-active' : '')" data-name="script" data-value="sub"></i>
        <i v-if="config.scriptSuper" :class="'iconfont icon-zitishangbiao  ' + (formats.script === 'super' ? 'ql-active' : '')" data-name="script" data-value="super"></i>
        <!-- <i class="iconfont icon-quanping"></i> -->
        <i v-if="config.clear" class="iconfont icon-shanchu" @click="clear"></i>
        <i v-if="config.direction" :class="'iconfont icon-direction-rtl  ' + (formats.direction === 'rtl' ? 'ql-active' : '')" data-name="direction" data-value="rtl"></i>
      </div>
      <editor id="editor" class="ql-container" :style="{heigth:heigth+'px'}" :placeholder="placeholder" showImgSize showImgToolbar showImgResize @input="changeContent" @statuschange="onStatusChange" @ready="onEditorReady">
      </editor>
    </div>
</template>
<script>
  export default {
    config: {
      navigationBarTitleText: '编辑文章',
      navigationBarTextStyle: 'black',
      navigationBarBackgroundColor: '#FFFFFF'
    },
    props:{
      heigth:{
        type:Number || String,
        default:200
      }
    },
    components: {
    },
    data () {
      return {
        keyboardHeight:0,
        isIOS:false,
        content: '',
        placeholder: '请输入内容',
        editorCtx: null,
        formats: {},
        config: { /** 配置粗体 */
          bold: true,
          italic: true,
          underline: true,
          strike: false,
          alignLeft: false,
          alignCenter: false,
          alignRight: false,
          justify: false,
          lineHeight: true,
          letterSpacing: true,
          marginBottom: true,
          removeFormat: false,
          fontFamily: false,
          fontSize: true,
          color: false,
          backgroundColor: true,
          insertDate: true,
          listCheck: true,
          listOrdered: true,
          listBullet: true,
          undo: true,
          redo: true,
          indentReduce: false,
          indentAdd: false,
          insertDivider: false,
          insertImage: true,
          header: false,
          scriptSub: false,
          scriptSuper: false,
          clear: false,
          direction: false

        }
      }
    },
    methods: {
      format (e) {
        // console.log('format')
        // console.log(e)
        let { name, value } = e.target.dataset
        if (!name) return
        this.editorCtx.format(name, value)
      },
      onEditorReady () {
        // console.log('onEditorReady')
        const that = this
        wx.createSelectorQuery().select('#editor').context(function (res) {
          that.editorCtx = res.context
          console.log(that.editorCtx)
        }).exec()
      },
      onStatusChange (e) {
        // console.log(e)
        this.formats = e.mp.detail
        // this.$emit('updata',this.formats)
      },
      changeContent(e){
        this.content = e.mp.detail.html
        this.$emit('updata',this.content)
      },
      removeFormat () {
        this.editorCtx.removeFormat()
      },
      insertDate () {
        const date = new Date()
        const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        this.editorCtx.insertText({
          text: formatDate
        })
      },
      undo () {
        this.editorCtx.undo()
      },
      redo () {
        this.editorCtx.redo()
      },
      insertDivider () {
        this.editorCtx.insertDivider({
          success: function () {
            console.log('insert divider success')
          }
        })
      },
      clear () {
        this.editorCtx.clear({
          success: function (res) {
            console.log('clear success')
          }
        })
      },
      insertImage () {
        const that = this
        that.api.chooseImg().then(res=>{
          res.path.forEach(item=>{
            that.editorCtx.insertImage({
              src:item,
              extClass:'editorImg',
              success: function () {
                console.log('insert image success')
              }
            })
          })

        })
      },
    },
    onLoad () {
    },
    onShow () {
    },
    /** 页面加载完成时调用函数 */
    mounted () {
      // console.log('mounted')
      // console.log(wx.api)
      const that = this
      wx.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
        console.log(that.editorCtx)
      }).exec()

      // const platform = wx.getSystemInfoSync().platform
      // that.isIOS = platform === 'ios'
      // // that.updatePosition(0)
      // that.keyboardHeight = 0
      // wx.onKeyboardHeightChange(res => {
      //   if (res.height === that.keyboardHeight) return
      //   console.log('键盘的高度：',res.height)
      //   that.keyboardHeight = res.height
      // })
    }
  }
</script>
<style scoped>

  .iconfont {
    display: inline-block;
    padding: 18rpx 18rpx;
    cursor: pointer;
    font-size: 40rpx;
  }
  .toolbar {
    /*position: fixed;*/
    width: 100%;
    left: 0;
    padding: 10rpx 0;
    box-sizing: border-box;
    /* border: 1px solid #ccc; */
    border-bottom: 0;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background: #ffffff;
    bottom: 0;
    z-index: 10;
  }
  .ql-active {
    color: #06c;
  }
  .ql-container {
    box-sizing: border-box;
    padding: 12px 0px;
    width: 100%;
    overflow-y: auto;
    border: 1px solid #ccc;
    font-size: 16px;
    line-height: 1.5;
  }
</style>
