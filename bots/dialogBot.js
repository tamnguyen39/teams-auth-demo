// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { TeamsActivityHandler, TurnContext } = require('botbuilder');

class DialogBot extends TeamsActivityHandler {
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState, userState, dialog) {
        super();
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');

        this.onMessage(async (context, next) => {
            console.log('Running dialog with Message Activity.');

            if (context.activity.text == 'logout') {
                const botAdapter = context.adapter;
                await botAdapter.signOutUser(context, this.dialog.connectionName);
                await context.sendActivity('You have been signed out.');
                // return await innerDc.cancelAllDialogs();
            } else {
                await context.sendActivity('Please sent post request to http://localhost:3978/api/12956/proactive to login');
                // Run the Dialog with the new message Activity.
                // await this.dialog.run(context, this.dialogState);
                const conversationReference = TurnContext.getConversationReference(context.activity);
                this.conversationReferences[this.bcid] = conversationReference;
            }

            await next();
        });
    }

    /**
     * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
     */
    async run(context) {
        await super.run(context);

        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}

module.exports.DialogBot = DialogBot;
