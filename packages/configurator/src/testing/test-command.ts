import { Command } from '../metadata';
import { ConfigClassWithOptions } from './test-config-class'; 

export class CommandTest {
    @Command()
    doSomething(config: ConfigClassWithOptions) {

    }
}
