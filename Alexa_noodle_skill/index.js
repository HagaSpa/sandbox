const Alexa = require('ask-sdk');
const successSlotsMatch = "ER_SUCCESS_MATCH";      //slotに該当した際、alexaから返却される成功ステータス
const successSlotsNoMatch = "ER_SUCCESS_NO_MATCH"; //slotに該当しなかった際、alexaから返却される成功ステータス

let skill;
exports.handler = async function (event, context) {
    if (!skill) {
      skill = Alexa.SkillBuilders.custom()
        .addRequestHandlers(
            LaunchRequestHandler,
            OrderIntentHandler,
            MenuIntentHandler,
            OrderIntentNoMtchSlotsHandler)
        .create();
    }
    return skill.invoke(event);
}

/**
 * LaunchRequest用ハンドラ。
 * LaunchRequestはalexa側で、設定されたIntent以外の発話内容のすべて
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
 * slotが合致した場合実行される。
 */
const OrderIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OrderIntent'
            && handlerInput.requestEnvelope.request.intent.slots.kindOfNoodle.resolutions.resolutionsPerAuthority[0].status.code  === successSlotsMatch;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('ご注文ありがとうございました')
            .getResponse();
    }
};

/**
 * OrderIntent用ハンドラ。
 * slotsが合致しなかった場合実行される。具体的には3種類のラーメン以外が、注文された場合。
 */
const OrderIntentNoMtchSlotsHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OrderIntent'
            && handlerInput.requestEnvelope.request.intent.slots.kindOfNoodle.resolutions.resolutionsPerAuthority[0].status.code  === successSlotsNoMatch;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('その品物はございません。しょうゆラーメン、みそらーめん、とんこつラーメンからお選びください。何になさいますか？')
            .reprompt('ご注文をお伺いします')
            .getResponse();
    }
};

/**
 * MenuIntent用ハンドラ
 * メニューを要望されたときに、実行される。
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
