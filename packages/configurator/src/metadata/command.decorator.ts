import { CommandModule } from 'yargs';
import { ICommand } from '../interfaces/command.interface';

function getCommandModule(command?: ICommand) {
    
}

export function Command(command?: ICommand) {
    return (
        target: Object, 
        propertyKey: string, 
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        
    }
} 