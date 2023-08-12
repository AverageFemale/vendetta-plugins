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
                required: true,
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

// Args contains: [{type,name,value},{type,name,value}...]
async function pcommand(args: any, ctx: CommandContext ) {
    let value = args[0].value
    if (!value) return {content: `Something went wrong..\n\`${args[0].value}\``, ephemeral: true}
    let content = "# Receipt"
    value = value.split("|")
    value.forEach(element => {
        let arrayOfShit = element.split("~")
        if (!arrayOfShit[0] || !arrayOfShit[1]) return {content: `Make sure your using the template provided in the description of the command.\n \`${args[0].value}\``, ephemeral: true};
        content = content + `## ${arrayOfShit[0]} - ${arrayOfShit[1]}`
    });
    return {content}
}