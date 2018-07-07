const Alexa = require('ask-sdk');
 
let skill;
exports.handler = async function (event, context) {
    if (!skill) {
      skill = Alexa.SkillBuilders.custom()
        .addRequestHandlers(LaunchRequestHandler,OrderIntentHandler,MenuIntentHandler)
        .create();
    }
    return skill.invoke(event);
}

/**
 * LaunchRequest用ハンドラ。
 * ※LaunchRequestはalexa側で、設定されたIntent以外の発話内容のすべて
 * 
 * canHandle()がtureを返すときのみ、handle()は実行される。
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('ようこそ、ラーメン出前スキルへ、ご注文をどうぞ')
            .reprompt('ご注文をお伺いします')
            .getResponse();
    }
};
 
/**
 * OrderIntent用ハンドラ
 */
const OrderIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OrderIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('ご注文ありがとうございました')
            .getResponse();
    }
};

/**
 * MenuIntent用ハンドラ
 */
const MenuIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'MenuIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('メニューは、しょうゆラーメン、みそらーめん、とんこつラーメンの三種類あります。何になさいますか？')
            .reprompt('ご注文をお伺いします')
            .getResponse();
    }
};