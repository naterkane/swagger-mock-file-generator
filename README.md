# swagger-mock-file-generator
A generator of mock file base on swagger yaml or JSON, output swagger with mock data JSON file.

**Now supports Swagger 2.0 and OpenAPI 3.0 (aka. Swagger 3.0)!**

The mock data will pour into  ````responses.[code].schema.example````, if your original swagger file has already defined example, it will not change
Spec: [here](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#fixed-fields-13)
## Install
````javascript
npm i @naterkane/swagger-mock-file-generator;
````
## API
````javascript
require('@naterkane/swagger-mock-file-generator')(<swaggerFile>, <mockFile>[, callback])
````
Notice: mockFile must be a **JSON** format.
## Example
````javascript
var parser = require('@naterkane/swagger-mock-file-generator');
// swagger source file is both .yaml and .json is OK.
parser('./swagger.yaml','./swaggerWithMock.json', function(){
    console.log('mock json file created!')
});

````
This mocked file supports :
**https://github.com/whq731/swagger-express-middleware-with-chance** and
**https://github.com/BigstickCarpet/swagger-express-middleware**
Free to choose!
