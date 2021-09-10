// 经典继承
{
    function Parent() {
        this.name = ['hahah']
    }

    function Child() {
        Parent.call(this)
    }

    let p1 = new Child()
    p1.name.push('嘿嘿')
    console.log(p1.name)
}

// 组合继承
{
    function Parent(name) {
        this.name = name
        this.color = ['red']
    }
    Parent.prototype.getName = function (){
        return this.color
    }
    function Child(name,age){
        Parent.call(this,name)
        this.age= age
    }
    Child.prototype = new Parent()
    Child.prototype.constructor = Parent
    const c1 = new Child('bob',22)
    console.log( c1.getName())
}