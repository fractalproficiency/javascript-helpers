import { ICommand } from '../interfaces/command.interface';
export declare function Command(command?: ICommand): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
