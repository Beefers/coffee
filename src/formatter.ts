import { VM as CVM, run, libBasic } from "cumlisp";
import { VMContext, installDiscord } from "./formatter/lib-discord";
import { installCoffee } from "./formatter/lib-coffee";

// This file serves as a wrapper to minimize the used API of the formatter.

export { VMContext };

export class VM extends CVM {
    public readonly context: VMContext;
    public constructor(context: VMContext) {
        super();
        this.context = context;
        libBasic.installBasic(this);
        installDiscord(this, context);
        installCoffee(this, context);
    }
}

export { run };
