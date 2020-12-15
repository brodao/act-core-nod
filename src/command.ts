import * as Command from 'commander';
import { actLogger } from './logger';
import { ICommander, ICommandOptions } from './model/model_interfaces';

function newAppCommand(options: ICommandOptions): Command.Command  {
	const command: Command.Command = new Command.Command(options.name)
		.version(options.version)
		.usage(
			(options.commandText ? '[command]' : '') +
				(options.commandText && options.optionsText ? ' ' : '') +
				(options.optionsText ? '[options]' : '')
		)
		.allowUnknownOption(true);

	if (options.default) {
		command
			.option('-v, --verbose', 'detalha a execução', true) //
			.option('--no-banner', 'omite a abertura', true);
	}

	return command;
};

async function commandDidThrowAsync(error: any, exitCode?: number) {
	actLogger.newLine();
	actLogger.nested(`An unexpected error occurred:`);
	actLogger.nested(error);
	actLogger.newLine();

	if (exitCode) {
		process.exit(1);
	}
}

export const actCommander: ICommander = {
	newCommand: (commandOptions: ICommandOptions): Command.Command => {
		return newAppCommand({
			...commandOptions,
			default:
				commandOptions.default === undefined ? true : commandOptions.default,
		});
	},
	commandDidThrowAsync: (error: any, exitCode?: number) =>  {
		commandDidThrowAsync(error, exitCode);
	}
};
