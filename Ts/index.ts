console.log('hello typescript')

declare const uniqueSymbolFoo: unique symbol
// const uniqueSymbolFoo: unique symbol = Symbol("linbudu")

// 类型不兼容
const uniqueSymbolBar: typeof uniqueSymbolFoo = uniqueSymbolFoo

interface Tmp {
    user:
      | {
          vip: true;
          expires: string;
        }
      | {
          vip: false;
          promotion: string;
        };
  }
  
  declare var tmp: Tmp;
  
  if (tmp.user.vip) {
    console.log(tmp.user.expires);
  }


  interface IStruct {
    foo: string;
    bar: {
      barPropA: string;
      barPropB: number;
      barMethod: () => void;
      baz: {
        handler: () => Promise<void>;
      };
    };
  }


// 这个例子是不会报错的
const obj = <IStruct>{
    foo: '599'
};
