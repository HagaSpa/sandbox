const Alexa = require('ask-sdk');
const successSlotsMatch = "ER_SUCCESS_MATCH";      //slotに該当した際、alexaから返却される成功ステータス
const successSlotsNoMatch = "ER_SUCCESS_NO_MATCH"; //slotに該当しなかった際、alexaから返却される成功ステータス

/**
 * countのId => Number型 変換マップ
 */
const countIdMap = new Map([
    ["One", 1],
    ["Two", 2],
    ["Three", 3],
    ["Four", 4],
    ["Five", 5]
]);

/**
 * kindOfNoodleのId => 値段 変換マップ
 */
const kindOfNoodleIdMap = new Map([
    ["Soysauce", 700],
    ["Miso", 800],
    ["Tonkotsu", 900]
]);

/**
 * メイン処理
 */
let skill;
exports.handler = async function (event, context) {
    if (!skill) {
      skill = Alexa.SkillBuilders.custom()
        .addRequestHandlers(
            LaunchRequestHandler,
            OrderIntentCompletedHandler,
            OrderIntentNoMatchKindOfNoodleHandler,
            OrderIntentNoMatchCountHandler,
            OrderIntentProgressHandler,
            MenuIntentHandler,
            NoIntentHandler)
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
 * kindOfNoodleが合致した場合、かつcountも合致した場合
 */
const OrderIntentCompletedHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'OrderIntent'
            && request.dialogState === 'COMPLETED'
            && request.intent.slots.kindOfNoodle.resolutions.resolutionsPerAuthority[0].status.code  === successSlotsMatch
            && request.intent.slots.count.resolutions.resolutionsPerAuthority[0].status.code  === successSlotsMatch;
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        // 会計処理
        const totalFee = toAccount(slots);
        // セッション情報の取得
        let attributes = handlerInput.attributesManager.getSessionAttributes();
        // 合計金額をsessionAttributeへセット
        if (!attributes.totalFee) { 
            attributes.totalFee = totalFee;
        } else {
            attributes.totalFee += totalFee;
        }
        // セッション情報の保存
        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(`お会計は${attributes.totalFee}円です。他に何か注文しますか？`)
            .reprompt('ご注文は以上でよろしいでしょうか？')
            .getResponse();
    }
};

/**
 * OrderIntent用ハンドラ
 * 必須にしているslotが、入力されていない場合に実行される。alexaで設定した音声プロンプトを実行するように、処理を委譲する。
 */
const OrderIntentProgressHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'OrderIntent'
            && (request.dialogState === 'STARTED' || request.dialogState === 'IN_PROGRESS')
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addDelegateDirective()
            .getResponse();
    }
};

/**
 * OrderIntent用ハンドラ。
 * kindOfNoodleが合致しなかった場合実行される。具体的には3種類のラーメン以外が、注文された場合。
 */
const OrderIntentNoMatchKindOfNoodleHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'OrderIntent'
            && request.dialogState === 'COMPLETED'
            && request.intent.slots.kindOfNoodle.resolutions.resolutionsPerAuthority[0].status.code  === successSlotsNoMatch;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('その品物はございません。しょうゆラーメン、みそらーめん、とんこつラーメンからお選びください。何になさいますか？')
            .reprompt('ご注文をお伺いします')
            .getResponse();
    }
};

/**
 * OrderIntent用ハンドラ。
 * countが合致しなかった場合実行される。具体的には五つより多い個数が、注文された場合。
 */
const OrderIntentNoMatchCountHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'OrderIntent'
            && request.dialogState === 'COMPLETED'
            && request.intent.slots.count.resolutions.resolutionsPerAuthority[0].status.code  === successSlotsNoMatch;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('注文数は最大で五つまでとなっています。いくつ注文しますか？')
            .reprompt('いくつ注文しますか？')
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
            && (handlerInput.requestEnvelope.request.intent.name === 'MenuIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('メニューは、しょうゆラーメン、みそらーめん、とんこつラーメンの三種類あります。何になさいますか？')
            .reprompt('ご注文をお伺いします')
            .getResponse();
    }
};

/**
 * いいえの場合
 * 具体的には、OrderIntentHandler の後に使われる想定
 */
const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(`ご注文を承りました。`)
            .getResponse();
    }
};

/**
 * 会計する
 * @param {Object} slots 
 */
const toAccount = (slots) => {
    const kindOfNoodleId = slots.kindOfNoodle.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const countId = slots.count.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    // ラーメンの値段
    const kindOfNoodleValue = kindOfNoodleIdMap.get(kindOfNoodleId); 
    // 個数
    const countValue = countIdMap.get(countId);
    // 金額を作成（値段 * 個数）
    const fee = kindOfNoodleValue * countValue;
    // 合計金額を返却
    return fee;
}