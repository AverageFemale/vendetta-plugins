import { logger } from "@vendetta";
import { registerCommand } from "@vendetta/commands";
import { findByStoreName, findByProps } from "@vendetta/metro";
const UserStore = findByStoreName("UserStore");
import Settings from "./Settings";

let command;
export default {
    onLoad: () => {
        logger.log("Hello world!");
        command = registerCommand({
            name: "receipt",
            description: "Prepare a receipt for a user.",
            options: [{
                name: "Items",
                description: "Template: Name~Price|Name~Price",
                type: 3,
                displayName: "Items",
                displayDescription: "Template: Name~Price|Name~Price",
            }],
            execute: pcommand,
            applicationId: "-1",
            displayName: "receipt",
            displayDescription: "Prepare a receipt for a user.",
            inputType: 1,
            type: 1
        })
    },

    onUnload: () => {
        command();

    },
    settings: Settings,
}


async function pcommand(args: any, ctx: CommandContext ) {
    logger.log(args)
    return {content: "Woogaloo"}
}