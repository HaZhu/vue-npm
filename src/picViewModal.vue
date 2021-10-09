<template>
  <div class="picViewModal" v-if="value" @click.stop="close">
    <div class="warp">
      <div class="close" @click.stop="close"></div>
      <div
        :class="`leftBtn ${info.leftDisabled ? 'disabled' : ''}`"
        @click.stop="switchPic(0)"
      ></div>
      <div class="centerBox" @click.stop>
        <img
          v-if="info.type === 'img'"
          :src="info.url"
          alt="img"
          width="100%"
          height="100%"
        />
        <video
          class="video"
          controls
          v-if="info.type === 'video'"
          :src="info.url"
          width="100%"
          height="100%"
        />
      </div>
      <div
        :class="`rightBtn ${info.rightDisabled ? 'disabled' : ''}`"
        @click.stop="switchPic(1)"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name:'picPreViewModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      info: {
        leftDisabled: true,
        rightDisabled: true
      }
    };
  },
  watch: {
    list(v) {
      if (v && v.length) {
        this.info = {
          ...v[0],
          leftDisabled: true,
          rightDisabled: v.length === 1
        };
      }
    }
  },
  created(){
      
  },
  methods: {
    close(event) {
      this.$emit('input', false);
    },
    // 切换图片预览
    switchPic(type) {
      if (type === 1) {
        const index = this.list.findIndex((i) => i.id === this.info.id);
        if (index < this.list.length - 1) {
          this.info = this.list[index + 1];
          this.info.index = index + 1;
          if (index + 1 === this.list.length - 1) {
            this.info.rightDisabled = true;
          } else this.info.rightDisabled = false;
        } else {
          this.info.rightDisabled = true;
        }
      } else {
        const index = this.list.findIndex((i) => i.id === this.info.id);
        if (index > 0) {
          this.info = this.list[index - 1];
          this.info.index = index - 1;
          if (this.info.index === 0) {
            this.info.leftDisabled = true;
          } else this.info.leftDisabled = false;
        } else this.info.leftDisabled = true;
      }
    }
  }
};
</script>
<style lang="scss"  scoped>
.picViewModal {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0, 0.6);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .warp {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    .close {
      position: absolute;
      width: 48px;
      height: 48px;
      right: 54px;
      top: -48px;
      background: url('http://ergeng-static.oss-cn-hangzhou.aliyuncs.com/gengFire/icon/picClose@2x.png')
        no-repeat center;
      background-size: cover;
      cursor: pointer;
    }
  }
  .centerBox {
    width: 900px;
    height: 700px;
    position: relative;
    background-color: white;
    .video {
      background-color: #232323;
    }
    .dbox {
      height: 108px;
      border-bottom: 1px solid #e8e8e8;
      padding: 20px;

      .dboxtop {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .title {
        width: 722px;
        color: #232323;
        line-height: 22px;
      }
      .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        color: #666;
        .dele {
          margin-right: 30px;
          cursor: pointer;
        }
        .edit {
          cursor: pointer;
        }
      }
      .tags {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-top: 10px;
        .tag {
          height: 24px;
          line-height: 24px;
          background: #f7faff;
          border: 1px solid #0069ff;
          border-radius: 2px;
          font-size: 12px;
          color: #0069ff;
          padding: 0 10px;
          margin-right: 10px;
          margin-top: 10px;
        }
      }
    }
    .infoBox {
      padding: 20px;
      line-height: 24px;
      color: #666666;
      font-size: 14px;
    }
  }
  .leftBtn,
  .rightBtn {
    margin-right: 40px;
    width: 60px;
    height: 60px;
    background: url('http://ergeng-static.oss-cn-hangzhou.aliyuncs.com/gengFire/icon/picleft@2x.png')
      no-repeat center;
    background-size: cover;
    cursor: pointer;
    &.disabled {
      opacity: 0.4;
      cursor: no-drop;
    }
  }
  .rightBtn {
    margin-left: 40px;
    margin-right: 0px;
    transform: rotate(-180deg);
  }
}
</style>
