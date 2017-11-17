import { QAStatus, RobotStatus } from '@/utils/constants';
import { sendMessage, receiveMessage } from '@/data/bridge'
import { NameSpaces } from './index';
import * as _ from 'lodash';

export default {
    namespaced: true,

    state: {
        currentCustomer: {
            qas: []
        },
        waitingCustomers: [],
        timeSetting: {
            start: 18,
            end: 8
        },
        addCustomerName: '',
        customerList: [],
        openMoon: false,
        openIntervene: false,
        isBot: true
    },

    actions: {
        // serveManully({ commit }, { waiter }) {
        //     console.log(`TODO: start serve ${waiter.name} manually`);
        //     commit(`${NameSpaces.GLOBAL}/toggleRobotStatus`, { status: RobotStatus.CLOSED }, { root: true });
        // }
    },

    mutations: {
        getInitData(state, { configObj }) {
            state.customerList = configObj.customerList;
            state.status = configObj.status;
            state.timeSetting = configObj.timeSetting;
            console.log(state)
        },
        timeStartSet(state, { event }) {
            console.log(event.target.value)
            state.timeSetting = {
                ...state.timeSetting,
                start: event.target.value - 0
            }
        },
        timeEndSet(state, { event }) {
            console.log(event.target.value)
            state.timeSetting = {
                ...state.timeSetting,
                end: event.target.value - 0
            }
        },
        addCustomer(state, { customer_name }) {
            if (customer_name) {
                if (_.findIndex(state.customerList, function(customer) {
                        return customer == customer_name
                    }) == -1) {
                    state.customerList = [
                        customer_name,
                        ...state.customerList
                    ]
                    console.log(state)
                } else {
                    alert("已存在")
                }
            } else {
                alert("请输入客服名字！")
            }

        },
        switchMoon(state, { status }) {
            console.log(status)
            state.openMoon = status
        },
        switchIntervene(state, { status }) {
            console.log(status)
            state.openIntervene = status
        },
        saveConfig(state) {
            let configObj = {
                customerList: state.customerList,
                status: state.openMoon,
                timeSetting: state.timeSetting,
                interfere: state.openIntervene
            }
            sendMessage({ "operObj": "config", "oper": "handle", "content": JSON.stringify(configObj) })
            console.log(configObj)
        },
        deleteCustomer(state, { customer }) {
            state.customerList = [...(_.remove(state.customerList, function(item) {
                return item !== customer;
            }))]
        },
        switchBot(state) {
            state.isBot = !state.isBot;
            sendMessage({ "operObj": "switch", "oper": "click", "content": !state.isBot })
        },
        switchBotC(state, status) {
            if (status.data.oper == 'off') {
                state.isBot = true;
            } else if (status.data.oper == 'on') {
                state.isBot = false;
            } else {
                alert('oper错误')
            }
        }
    },

    getters: {
        currentCustomer(state) { return state.currentCustomer },

        timeSetting(state) { return state.timeSetting },

        timeSection(state) { return state.timeSection },

        customer_name(state) { return state.addCustomerName },

        customerList(state) { return state.customerList },

        openMoon(state) { return state.openMoon },

        isBot(state) { return state.isBot },

        openIntervene(state) { return state.openIntervene }
    }
}