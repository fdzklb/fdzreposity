module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
  },
  /*
   * rules: http://eslint.cn/docs/rules/
   * wiki: http://wiki.mobisummer.com/pages/resumedraft.action?draftId=22643867&draftShareId=a9417618-7d30-4a90-a2c8-359c91293ff4
   */
  rules: {
    /**
     * ----js----
     */
    // Enforce “for” loop update clause moving the counter in the right direction
    'for-direction': 'error',
    // Enforces that a return statement is present in property getters
    'getter-return': [
      'error',
      {
        allowImplicit: false,
      },
    ],
    // Disallow await inside of loops
    'no-await-in-loop': 'error',
    // disallow assignment operators in conditional statements
    'no-cond-assign': ['error', 'always'],
    // no-console
    'no-console': 'error',
    // disallow duplicate arguments in function definitions
    'no-dupe-args': 'error',
    // disallow duplicate keys in object literals
    'no-dupe-keys': 'error',
    // Rule to disallow a duplicate case label
    'no-duplicate-case': 'error',
    // disallow empty block statements
    'no-empty': 'off',
    // disallow empty character classes in regular expressions
    'no-empty-character-class': 'error',
    // disallow reassigning exceptions in catch clauses
    'no-ex-assign': 'error',
    // disallow unnecessary boolean casts
    'no-extra-boolean-cast': 'error',
    // disallow reassigning function declarations
    'no-func-assign': 'error',
    // disallow variable or function declarations in nested blocks
    'no-inner-declarations': 'error',
    // disallow invalid regular expression strings in RegExp constructors
    'no-invalid-regexp': 'error',
    // disallow calling global object properties as functions
    'no-obj-calls': 'error',
    // disallow sparse arrays
    'no-sparse-arrays': 'error',
    // disallow unreachable code after return, throw, continue, and break statements
    'no-unreachable': 'error',
    // disallow control flow statements in finally blocks
    'no-unsafe-finally': 'error',
    // disallow negating the left operand of relational operators
    'no-unsafe-negation': 'error',
    // require calls to isNaN() when checking for NaN
    'use-isnan': 'error',
    // enforce comparing typeof expressions against valid strings
    'valid-typeof': 'error',
    // Enforces getter/setter pairs in objects
    'accessor-pairs': 'error',
    // Enforces return statements in callbacks of array’s methods
    'array-callback-return': 'error',
    // Require Default Case in Switch Statements
    'default-case': 'error',
    // no-alert
    'no-alert': 'error',
    // Disallow Regular Expressions That Look Like Division
    'no-div-regex': 'error',
    // Disallow Null Comparisons
    'no-eq-null': 'off',
    // no-eval
    'no-eval': 'error',
    // Disallow unnecessary function binding
    'no-extra-bind': 'error',
    // Disallow Case Statement Fallthrough http://eslint.cn/docs/rules/no-fallthrough
    'no-fallthrough': [
      'error',
      {
        commentPattern: '[throw|return|break][\\s\\w]*omitted',
      },
    ],
    // Disallow Floating Decimals
    'no-floating-decimal': 'error',
    // Disallow assignment to native objects or read-only global variables
    'no-global-assign': [
      'error',
      {
        exceptions: ['String'],
      },
    ],
    // Disallow Implied eval()
    'no-implied-eval': 'error',
    // Disallow Unnecessary Nested Blocks
    'no-lone-blocks': 'error',
    // Disallow Primitive Wrapper Instances
    'no-new-wrappers': 'error',
    // disallow octal literals
    'no-octal': 'error',
    // disallow variable redeclaration
    'no-redeclare': 'error',
    // Disallow Assignment in return Statement
    'no-return-assign': ['error', 'always'],
    // Disallows unnecessary return await
    'no-return-await': 'error',
    // Disallow Script URLs
    'no-script-url': 'error',
    // Disallow Self Assignment
    'no-self-assign': 'error',
    // Disallow Self Compare
    'no-self-compare': 'error',
    // Disallow Unused Expressions
    'no-unused-expressions': 'error',
    // Disallow unnecessary concatenation of strings
    'no-useless-concat': 'error',
    // Disallow redundant return statements
    'no-useless-return': 'error',
    // Disallow use of the void operator
    'no-void': 'error',
    // Disallow use of the label
    'no-labels': 'error',
    // Disallow Undeclared Variables
    'no-undef': 'error',
    // Disallow Initializing to undefined
    'no-undef-init': 'error',
    // Disallow Unused Variables
    'no-use-before-define': 'error',
    // disallow if statements as the only statement in else blocks
    'no-lonely-if': 'error',
    // disallow mixed spaces and tabs for indentation
    'no-mixed-spaces-and-tabs': 'error',
    // disallow use of chained assignment expressions
    'no-multi-assign': 'error',
    // disallow Object constructors
    'no-new-object': 'error',
    // no-tab
    'no-tabs': 'error',
    // require super() calls in constructors
    'constructor-super': 'error',
    // disallow reassigning class members
    'no-class-assign': 'error',
    // disallow reassigning const variables
    'no-const-assign': 'error',
    // disallow duplicate class members
    'no-dupe-class-members': 'error',
    // disallow duplicate module imports
    'no-duplicate-imports': 'error',
    // disallow new operators with the Symbol object
    'no-new-symbol': 'error',
    // disallow this/super before calling super() in constructors
    'no-this-before-super': 'error',
    // disallow renaming import, export, and destructured assignments to the same name
    'no-useless-rename': 'error',
    // no-var
    'no-var': 'error',

    /**
     * ---style---
     */

    // disallow unnecessary parentheses
    'no-extra-parens': 'error',
    // disallow unnecessary semicolons
    'no-extra-semi': 'error',
    // enforce consistent newlines after dots
    'dot-location': ['error', 'property'],
    // enforce consistent brace style for blocks
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: false,
      },
    ],
    // require or disallow trailing commas
    'comma-dangle': ['error', 'always-multiline'],
    // enforce consistent spacing before and after commas
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    // enforce consistent comma style
    'comma-style': ['error', 'last'],
    // require or disallow spacing between function identifiers and their invocations
    'func-call-spacing': ['error', 'never'],
    // enforce consistent indentation
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    // enforce the consistent use of either backticks, double, or single quotes
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    // enforce consistent spacing between keys and values in object literal properties
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    // enforce position of line comments
    'line-comment-position': [
      'error',
      {
        position: 'above',
      },
    ],
    // disallow irregular whitespace outside of strings and comments
    'no-irregular-whitespace': 'error',
    // disallow multiple empty lines
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 1,
      },
    ],
    // disallow multiple spaces in regular expression literals
    'no-regex-spaces': 'error',
    // enforce valid JSDoc comments http://eslint.cn/docs/rules/valid-jsdoc
    'valid-jsdoc': [
      'error',
      {
        prefer: {
          arg: 'param',
          argument: 'param',
          class: 'constructor',
          return: 'returns',
          virtual: 'abstract',
        },
        preferType: {
          Boolean: 'boolean',
          Number: 'number',
          Object: 'object',
          String: 'string',
          Function: 'object',
        },
        requireReturn: false,
      },
    ],
    // disallow whitespace before properties
    'no-whitespace-before-property': 'error',
    // require assignment operator shorthand where possible
    'operator-assignment': 'error',
    // enforce consistent spacing before blocks
    'space-before-blocks': 'error',
    // require spacing around infix operators
    'space-infix-ops': 'error',
    // require braces around arrow function bodies
    'arrow-body-style': ['error', 'as-needed'],
    // enforce consistent spacing before and after the arrow in arrow functions
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    // enforce linebreaks after opening and before closing array brackets
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 3,
      },
    ],
    // enforce consistent spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],
    // enforce camelcase naming convention
    camelcase: [
      'error',
      {
        properties: 'always',
      },
    ],
    // enforce minimum and maximum identifier lengths
    'id-length': [
      'error',
      {
        min: 1,
        max: 30,
        properties: 'always',
      },
    ],
    // require or disallow an empty line between class members
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    // enforce a maximum line length
    'max-len': [
      'error',
      {
        code: 80,
        comments: 80,
      },
    ],
    // enforce a particular style for multiline comments
    'multiline-comment-style': ['error', 'starred-block'],
    // require padding within blocks
    'padded-blocks': [
      'error',
      {
        classes: 'always',
      },
    ],
    // enforce consistent spacing after the // or /* in a comment
    'spaced-comment': ['error', 'always'],
    // enforce spacing around colons of switch statements
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    'no-unused-vars': [
      'warn',
      {
        args: 'none',
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'continue' },
      { blankLine: 'always', prev: '*', next: 'switch' },
      { blankLine: 'always', prev: 'switch', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: 'import', next: 'class' },
      { blankLine: 'always', prev: '*', next: 'for' },
      { blankLine: 'always', prev: 'for', next: '*' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: 'try', next: '*' },
      { blankLine: 'always', prev: '*', next: 'while' },
      { blankLine: 'always', prev: 'while', next: '*' },
    ],
    //require JSDoc comments
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
  },
};
