import 'reflect-metadata'
//
// @Reflect.metadata('inClass', 'A')
// @Reflect.metadata('inClassV2', 'V2')
// class Test {
//     @Reflect.metadata('inMethod', 'B')
//     public hello(): string {
//         return 'hello world';
//     }
//
//     @Reflect.metadata('inMethod', 'yesB')
//     static yes(){
//
//     }
// }
//
// console.log(Reflect.getMetadata('inClassV2', Test)); // 'A'
// console.log(Reflect.getMetadata('inMethod', Test, 'yes')); // 'B'
//
//
// function Prop(): PropertyDecorator {
//     return (target, key: string) => {
//         const type = Reflect.getMetadata('design:type', target, key);
//         console.log(`${key} type: ${type.name}`);
//         const paramType = Reflect.getMetadata("design:paramtypes", target, key)
//         const returnType = Reflect.getMetadata("design:returntype", target, key)
//         paramType.forEach(item=>console.log(item.name))
//         console.log(returnType.name)
//     };
// }
// class SomeClass {
//     // @Prop()
//     // public Aprop!: string;
//     @Prop()
//     public add(a: string, b: number): string {
//         return a + b
//     }
// }
//
//
// const c = new SomeClass()
//
// // c.Aprop = '1233'
//
// c.add('3',2)
//

type Constructor<T = any> = new (...args: any[]) => T;
const Injectable = (): ClassDecorator => target => {};

class MonitorService {
    public start() {}
}

@Injectable()
class TestService {
    constructor(public readonly monitorService: MonitorService) {}
    init() {
        this.monitorService.start()
    }
}
const Factory = <T>(target: Constructor<T>): T => {
    // 获取所有注入的服务
    const providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]
    console.log(providers)
    const args = providers.map((provider: Constructor) => new provider());
    return new target(...args);
};

Factory(TestService).init(); // 1




const ClassInject = (name): ClassDecorator => {
    console.log(`name:${name}`)
    return (...args) => {
        console.log(args)
    }
}

const FunctionInject = (name): PropertyDecorator => {
    console.log(`name:${name}`)
    return (...args) => {
        console.log(args)
    }
}

// @ClassInject('bob')
class Foo {
    @FunctionInject('bar function')
    public bar(){

    }
}
