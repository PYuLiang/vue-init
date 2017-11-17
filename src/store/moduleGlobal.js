import { RobotStatus } from '@/utils/constants';
import { sendMessage, receiveMessage } from '@/data/bridge'

export default {
    namespaced: true,

    state: {
        robotStatus: RobotStatus.OPEN,
        timeSetting: {
            start: 18,
            end: 5
        },
        isBot: true
    },

    mutations: {
        toggleRobotStatus(state, { status }) {
            state.robotStatus = status;
        },
        saveTimeSetting(state, { start, end }) {
            state.timeSetting = { start, end };
            console.log('TODO: save time setting');
        },
        switchBot(state) {
            state.isBot = !state.isBot;
            console.log(state.isBot)
            sendMessage({ "operObj": "switch", "oper": "click", "content": !state.isBot })
        }

    },

    getters: {
        robotStatus(state) { return state.robotStatus },

        timeSetting(state) { return state.timeSetting },

        isBot(state) { return state.isBot }
    }
}