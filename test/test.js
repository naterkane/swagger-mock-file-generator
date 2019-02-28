var parser = require('../dist/index');
parser('./test/swagger.json','./swaggerWithMock.json', function(err){
    if (!err) console.log('from JSON Generated successfully')
});
parser('./test/swagger.yaml','./swaggerWithMockFromYaml.json', function(err){
    if (!err) console.log('from YAML Generated successfully')
});
