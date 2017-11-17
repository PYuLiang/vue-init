<template>

  <div class="content-inner" style="padding-top:0">
    <!-- <status-header :customer="currentCustomer" /> -->
    <div class="page-nav">
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
      </div> 
    <div class="manual-list">
      <div class="manual-list-header">
        <img src="./../imgs/list.png" alt="人工客服列表">
        <span class="manual-list-title">人工客服列表</span>
        <img class="btn-switch-list" src="./../imgs/open_list.png" alt="">
      </div>
      <div class="manual-list-body">
        <div class="manual-list-input">
          <img src="./../imgs/service_active.png" alt="人工客服列表"> 
          <input v-model="customerName" @keyup.enter="addCustomer(customerName)" class="add-manual-input"/>
          <button @click="addCustomer(customerName)">添加</button>
        </div>
        <div class="manual-list-content">
          <div v-for ="customer in customerList" class="manual-list-item">
            <span>{{customer}}</span>
            <img class="btn-delete" @click="deleteCustomer(customer)" src="./../imgs/delete.png" alt="移除">
          </div>  
        </div> 
      </div>
    </div>
    <div class="hr-box"></div>
    <div class="setting-box">
      <div class="setting-header">
        <img src="./../imgs/moon.png" alt="夜间设置模式">
        夜间设置模式
      </div>
      <div class="setting-intervene">
        是否开启人工干预
        <img v-if="openIntervene" @click="switchIntervene(false)" class="" src="./../imgs/open_moon.png" alt="开启">
        <img v-else @click="switchIntervene(true)" class="" src="./../imgs/close_moon.png" alt="关闭"> 
      </div>
      <div class="setting-switch">
        是否开启夜间模式
        <img v-if="openMoon" @click="switchMoon(false)" class="" src="./../imgs/open_moon.png" alt="开启">
        <img v-else @click="switchMoon(true)" class="" src="./../imgs/close_moon.png" alt="关闭"> 
      </div>
      <div class="setting-time">
        夜间时段设置
        <div class="time-setting-start">
          <select v-model="timeSetting.start" v-on:change="timeStartSet">
            <option v-for="(v, index) in Array(24)" :value="index + 1">{{index + 1}}点</option>
          </select>
        </div>
        <div class="time-setting-to"> - </div>
        <div class="time-setting-end">
          <select v-model="timeSetting.end" v-on:change="timeEndSet">
            <option v-for="(v, index) in Array(24)" :value="index + 1">{{index + 1}}点</option>
          </select>
        </div>
      </div>
      <div class="setting-submit">
        <button class="btn_allowed" @click="saveConfig">保 存</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as _ from 'lodash';
import { mapGetters } from 'vuex';
import { NameSpaces } from '@/store';
import { QAStatus } from '@/utils/constants';
import StatusHeader from './StatusHeader';


export default {
  name: 'ModeAuto',
  data() {
    return { 
      customerName: ''
    }
  },
  components: {
    StatusHeader
  },
  computed: {
    ...mapGetters(NameSpaces.AUTO, {
      currentCustomer: 'currentCustomer',
      waitingCustomers: 'waitingCustomers',
      timeSetting: 'timeSetting',
      customerList: 'customerList',
      openMoon: 'openMoon',
      openIntervene: 'openIntervene',
      isBot: 'isBot'
    })
  },
  methods: {
    answer(qa) {
      this.$store.commit(`${NameSpaces.AUTO}/answerQuestion`, { qa })
    },
    showWaitingList() {
      this.waitingVisible = true;
    },
    hideWaitingList() {
      this.waitingVisible = false;
    },
    serveManully(waiter) {
      this.waitingVisible = false;
      this.$store.dispatch(`${NameSpaces.AUTO}/serveManully`, { waiter });
    },
    timeStartSet(event) {
      this.$store.commit(`${NameSpaces.AUTO}/timeStartSet`, { event });
    },
    timeEndSet() {
      this.$store.commit(`${NameSpaces.AUTO}/timeEndSet`, { event });
    },
    addCustomer(customer_name) {
      this.customerName = '';
      this.$store.commit(`${NameSpaces.AUTO}/addCustomer`, {customer_name});
    },
    switchMoon(status) {
      this.$store.commit(`${NameSpaces.AUTO}/switchMoon`, {status});
    },
    switchIntervene(status) {
      this.$store.commit(`${NameSpaces.AUTO}/switchIntervene`, {status});
    },
    saveConfig() {
      this.$store.commit(`${NameSpaces.AUTO}/saveConfig`);
    },
    deleteCustomer(customer) {
      this.$store.commit(`${NameSpaces.AUTO}/deleteCustomer`, {customer});
    },
    // switchBotC(status) {
    //   alert('commit' + status)
    //   this.$store.commit(`${NameSpaces.AUTO}/switchBotC`, {status});
    //   // this.isBot = !this.isBot;
    //   // console.log(this.isBot)
    //   //sendMessage({ "operObj": "switch", "oper": "click", "content": !this.isBot})
    // },
    switchBot() {
      this.$store.commit(`${NameSpaces.AUTO}/switchBot`)
      // this.isBot = !this.isBot;
      // console.log(this.isBot)
      // sendMessage({ "operObj": "switch", "oper": "click", "content": !this.isBot})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../styles/variable.less';

.page-nav {
  position: relative;
  color: #FFF;
  background-color: @default-blue;
  height: 32px;
  line-height: 32px;
  // box-shadow: 0 -1px 3px -3px #e692eb, 0 -1px 0px 1px #4298f5, 0 -1px 2px 1px #589bfa;

  .radiogroup {
    display: flex;
    padding: 0 35px;
  }

  .radio {
    position: relative;
    font-size: 12px;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 5px;
    
    .radio-open {
      position: absolute;
      display: inline-block;
      height: 14px;
      width: 14px;
      background: url('../imgs/选择.png');
      background-position:right;
      top: 8px;
      left: 0px;
      cursor: pointer;
    }

    .radio-empty {
      position: absolute;
      display: inline-block;
      height: 14px;
      width: 14px;
      background: url('../imgs/选择.png');
      top: 8px;
      left: 0px;
      cursor: pointer;
    }
  }
}

.manual-list {
  padding: 6px;

  .manual-list-header {
    height: 29px;
    line-height: 29px;
    border-bottom: solid 1px @bdg-gray;

    .manual-list-title {
      font-size: 12px;
    }

    .btn-switch-list {
      cursor: pointer;
    }
  }

  .manual-list-body {
    
    ::-webkit-scrollbar {
      width: 3px;
    }

    .manual-list-input {
      padding: 7px 0;

      img {
        position: fixed;
        left: 8px;
        margin:6px;
      }

      input {
        height: 24px;
        border: solid 1px @default-blue;
        border-radius: 3px;
        width: 182px;
        font-size: 12px;
        padding: 4px 4px 4px 24px;
      }

      button {
        background-color: @default-blue;
        border: none;
        height: 24px;
        width: 50px;
        color: @bg-white;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
      }
    }

    .manual-list-content {
      max-height: 290px;
      min-height: 290px;
      overflow: auto;

      .manual-list-item {
        position: relative;
        height: 30px;
        line-height: 30px;
        border-top: solid 1px @bdg-gray;
        font-size: 12px;

        span {
          position: absolute;
        }
        
        img {
          position: absolute;
          right: 2px;
          margin-top: 10px;
          cursor: pointer;
        }
      }

    }

  }
}

.hr-box {
  border-bottom: solid 8px @bdg-gray;
}

.setting-box {
  font-size: 12px;

  .setting-header {
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    border-bottom: solid 1px @bdg-gray;
  }

  .setting-switch {
    position: relative;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    border-bottom: solid 1px @bdg-gray;
    color: #414852;
    
      img {
        position: absolute;
        right: 10px;
        margin-top: 8px;
      }
  }

  .setting-intervene {
    position: relative;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    border-bottom: solid 1px @bdg-gray;
    color: #414852;
    
      img {
        position: absolute;
        right: 10px;
        margin-top: 8px;
      }
  }

  .setting-time {
    position: relative;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    border-bottom: solid 1px @bdg-gray;
    color: #414852;
     
      .time-setting-start {
        position: absolute;
        right: 80px;
        top: 2px;
      }

      .time-setting-to {
        position: absolute;
        right: 70px;
        top: 0px;
      }

      .time-setting-end {
        position: absolute;
        right: 10px;
        top: 2px;
      }
  }

  .setting-submit {
    position: relative;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    color: @bg-white;

      button {
        position: absolute;
        top: 7px;
        right: 10px;
        border: none;
        height: 24px;
        width: 92%;
        font-size: 12px;
        border-radius: 3px; 
      }

      .btn_disabled {
        cursor: not-allowed;
        background-color: @bdg-gray;
        color: @bg-white;
      }

      .btn_allowed {
        cursor: pointer;
        background-color: @default-blue;
        color: @bg-white;
      }
  }
}

.warning-bar {
  background-color: @default-red;
  color: #FFF;
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;

  i.btn-slideup {
    float: right;
    cursor: pointer;
  }
}

.waiting-container {
  position: fixed;
  bottom: 108px;
  left: 0;
  right: 0;
  height: ~"calc(100% - 250px)";
  background-color: #FFF;
  z-index: 20;
  padding-top: 40px;

  i.btn-close {
    font-size: 12px;
    color: @default-blue;
  }

  ul.waiting-list {
    font-size: 12px;
    
    .status-label {
      margin-top: 8px;
      float: right;
    }

    li {
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid #D8D8D8;
      cursor: pointer;
    }
  }
}
</style>
