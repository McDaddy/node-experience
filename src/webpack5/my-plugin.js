class MyPlugin {

    apply(compiler) {
        compiler.hooks.compilation.tap('MyPlugin', (compilation, { _, normalModuleFactory }) => {
            normalModuleFactory.hooks.parser.for('javascript/auto').tap('MyPlugin', parser => {
            //   parser.hooks.callMemberChain.for('console').tap('MyPlugin', (expression, properties) => {
            //     console.log(expression);
            //   });
              parser.hooks.callMemberChain.for('myFunc').tap('MyPlugin', (expression, properties) => {
                console.log(expression);
              });
            });
        });
    }
}

module.exports = MyPlugin;