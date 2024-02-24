const { Message } = require("discord.js");
const { Structure } = require("erela.js");
const Client = require("./DiscordMusicBot");

Structure.extend(
	"Player",
	(Player) =>
		class extends Player {
			constructor(...props) {
				super(...props);
				this.twentyFourSeven = false;
			}
			
			/**
			 * @param {Client} client
			 * @param {Message} message
			 * @returns the Set Message
			 */
			setResumeMessage(client, message) {
				if (this.pausedMessage && !client.isMessageDeleted(this.pausedMessage)) {
					this.pausedMessage.delete();
					client.markMessageAsDeleted(this.pausedMessage);
				}
				return (this.resumeMessage = message);
			}
			
			/**
			 * @param {Client} client
			 * @param {Message} message
			 * @returns
			 */
			setPausedMessage(client, message) {
				if (this.resumeMessage && !client.isMessageDeleted(this.resumeMessage)) {
					this.resumeMessage.delete();
					client.markMessageAsDeleted(this.resumeMessage);
				}
				return (this.pausedMessage = message);
			}
			
			/**
			 * @param {Client} client
			 * @param {Message} message
			 * @returns
			 */
			setNowplayingMessage(client, message) {
				if (this.nowPlayingMessage && !client.isMessageDeleted(this.nowPlayingMessage)) {
					this.nowPlayingMessage.delete();
					client.markMessageAsDeleted(this.nowPlayingMessage);
				}
				return (this.nowPlayingMessage = message);
			}
		},
);
