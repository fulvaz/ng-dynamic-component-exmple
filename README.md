# 花式在angular中创建组件例子

-----------------------------------------------------------------------

附录:

## Modal的用法

### 介绍

原理是动态加载组件, 然后再动态地插入根节点中.

### 用法

在AppModule导入
```
    imports: [
        ... 
        DialogModule,
        ...
    ],
 ```
 
注入service
```
constructor(
    private dialogService: DialogService,
) {}
```

下面有多种方法创建一个modal, 当然还没来得及完善, 我们先用着

创建方法1: 传入template
```
<ng-template #copyLink>
    <div class="copyLink-container">
        <p>复制成功, 链接:
            <a [href]="linkCopied">{{linkCopied}}</a>
        </p>
        <p>请确保落地页的有效性与稳定性再进行广告投放</p>
    </div>
</ng-template>
```

然后用templateRef或者在模板中传参的方式获取这个tpl.


````
this.dialogService.create({
    title: 'title',
    context: [],
    template: tpl // 这里传入tpl
});
````

````
this.dialogService.create({
    title: 'title',
    context: [],
    template: tpl // 这里传入tpl
});
````

方法2: 直接传内容, 可以是字符串或者html, 但是使用html注意angular的安全规则.

````
this.dialogService.create({
    title: 'title',
    content: '你需要的内容',
});
````

方法3: 传入组件的viewRef

```
this.dialogService.create({
    title: 'title',
    viewRef: componentRef.hostView,
});

```

ps: 传入组件也是可以的, 但是我还没实现.

### 事件回调

提供了三个事件, 确定, 取消, 关闭

监听方法如下:

```
 open(content: any, tip?: any) {
        const modalRef = this.dialogService.create({
            content,
        });
        // 监听确定事件
        // 获取dialog组件实例的confirm
        modalRef.instance.confirm.subscribe(() => {
            console.log('确定按钮事件')
        });
         modalRef.instance.cancel.subscribe(() => {
            console.log('取消按钮事件')
         });
         modalRef.instance.close.subscribe(() => {
             console.log('模态框关闭事件(只要模态框消失就会调用)')
         });
    }
 ```

