# Trellis Core Library
The Trellis core library supports the `trellis-cli` and `trellis-ui` projects by wrapping the [handlebars](https://handlebarsjs.com) and [JSON Schema $Ref Parser](https://github.com/APIDevTools/json-schema-ref-parser) projects to extend and abstract for use in the modeling framework.

> NOTE: Node.js `^18.0.0` is **required** to run tests.

## JSON Schema $Ref Parser Functionality

### Utility Functions
Exports of this module that abstract & extend JSON Schema $Ref Parser.

#### preprocessModel(model, preprocessFn?): Promise<$RefParser.JSONSchema>
**Syntax**: `preprocessModel(model: string | $RefParser.JSONSchema, preprocessFn?: (model: $RefParser.JSONSchema) => $RefParser.JSONSchema)` 

Calls `$RefParser.parse(model)` and then `preprocessFn(model)` on the model to enrich it with additional metadata set by the preprocessing script.

#### postprocessModel(model, postprocessFn): Promise<$RefParser.JSONSchema>
**Syntax**: `postprocessModel(model: string | $RefParser.JSONSchema, preprocessFn: (model: $RefParser.JSONSchema) => $RefParser.JSONSchema)` 

Calls `$RefParser.dereference(model)` and then `preprocessFn(model)` on the model to enrich it with additional metadata set by the postprocessing script.

## Handlebars Functionality

### Utility Functions
Exports of this module that abstract & extend handlebars.

#### registerPartials(partials): void
**Syntax**: `registerPartials(partials: PartialTemplate[])`

Used to register partials that are referenced in templates prior to compiling and using templates.

#### compileTemplate(template): HandlebarsTemplateDelegate<any>
**Syntax**: `compileTemplate(template: string)`

Compiles into a

### Helpers

#### #includes
Alias for `Array.includes()`.

**Syntax**: `{{#includes collection: any[] item: any}}`

#### #ifCond
Alias for conditional test.

**Syntax**: `{{#ifCond a: any logicalOperator: string b: any}}`

The following operators are supported:
- `===` (`==` can be used but evaluates as `===`)
- `!==` (`!=` can be used but evaluates as `!==`)
- `<`
- `>`
- `<=`
- `>=`
- `&&`
- `||`