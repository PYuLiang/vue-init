<template>
  <div id="app">
     <div class="header">
      <div class="page-header">
        <div class="container"> 
          <img src="./imgs/智小点.png" alt="智小点" /> 
          <img class="close-btn"  @click="closeApp" src="./imgs/close.png" alt="关闭" />
        </div>
      </div> 
      <!-- <div class="page-nav">
        <div class="container radiogroup">
           <div class="radio">
            <div @click="switchBot" v-bind:class="{ 'radio-open': isBot, 'radio-empty': !isBot}"></div>
            <span> &nbsp;&nbsp;&nbsp;&nbsp;开启机器人</span>
          </div>
          <div class="radio">
            <div @click="switchBot" v-bind:class="{ 'radio-empty': isBot, 'radio-open': !isBot}"></div>
            <span> &nbsp;&nbsp;&nbsp;&nbsp;关闭机器人 </span>
          </div> 
        </div>
      </div>  -->
    </div> 
    <div class="content"><router-view/></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Routes } from '@/utils/constants'
import { mapGetters } from 'vuex'
import { NameSpaces } from '@/store'
import { sendMessage, receiveMessage } from '@/data/bridge'

export default {
  data() {
    return {
      Routes,
      settingVisible: false,
      startTimeSetting: 0,
      endTimeSetting: 0,
      isBot: true
    }
  },
  computed: {

  },
  created() {
    
  },
  methods: {
    routeTo(route) {
      if (route === Routes.AUTO) {
        this.$store.dispatch(`${NameSpaces.AUTO}/getInitData`);
      } else if (route === Routes.SEMI_AUTO) {
        this.$store.dispatch(`${NameSpaces.SEMI_AUTO}/getInitData`);
      }
      this.$router.push(`/${route}`);
    },
    closeApp() {
      console.log('TODO: close app');
    }
    // switchBot() {
    //   //this.$store.commit(`${NameSpaces.AUTO}/switchBot`)
    //   this.isBot = !this.isBot;
    //   console.log(this.isBot)
    //   sendMessage({ "operObj": "switch", "oper": "click", "content": !this.isBot})
    // }
  }
}
</script>

<style lang="less">
@import "./styles/variable.less";

#app {
  position: relative;
}

label {
  cursor: pointer;
}

.close-btn {
  position: absolute;
  line-height: 100%;
  top: 12px;
  right: 10px;
  cursor: pointer;
}

.page-header {
  position: relative;
  color: #FFF;
  height: 35px;
  line-height: 35px;
  font-size: 20px;
  background-color: @default-blue;
  border-bottom: solid 1px white;
}

// .page-nav {
//   position: relative;
//   color: #FFF;
//   background-color: @default-blue;
//   height: 32px;
//   line-height: 32px;
//   // box-shadow: 0 -1px 3px -3px #e692eb, 0 -1px 0px 1px #4298f5, 0 -1px 2px 1px #589bfa;

//   .radiogroup {
//     display: flex;
//     padding: 0 35px;
//   }

//   .radio {
//     position: relative;
//     font-size: 12px;
//     flex-grow: 1;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     padding: 0 5px;
    
//     .radio-open {
//       position: absolute;
//       display: inline-block;
//       height: 14px;
//       width: 14px;
//       background: url('./imgs/选择.png');
//       background-position:right;
//       top: 8px;
//       left: 0px;
//       cursor: pointer;
//     }

//     .radio-empty {
//       position: absolute;
//       display: inline-block;
//       height: 14px;
//       width: 14px;
//       background: url('./imgs/选择.png');
//       top: 8px;
//       left: 0px;
//       cursor: pointer;
//     }
//   }
// }

.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.content {
  padding-top: 35px;
  padding-bottom: 20px;
  height: 100%;
  overflow: auto;
  position: relative;

  .content-inner {
    padding-top: 36px;
    height: 100%;
    overflow: auto;
  }

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: #bbb;
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: lightgray
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  line-height: 60px;
  color: #FFF;
  font-size: 14px;
  background-color: @default-blue;

  .popup {
    position: absolute;
    color: #333;
    bottom: 100%;
    left: 0;
    right: 0;
    line-height: 100%;
    padding-top: 36px;
    padding-bottom: 24px;
    background-color: #FFF;
    box-shadow: 0 0 0 1px @default-blue inset;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .seperator {
      margin: 2px 10px 0; 
    }

    .btn-container {
      flex-basis: 100%;
      text-align: right;
      margin-top: 15px;
    }

    i { color: @default-blue; }
  }
}
</style>
