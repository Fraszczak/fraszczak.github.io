---
title: JavaScript design patterns - module pattern / singleton pattern
author: pf
publishDate: 2024-05-21
slug: 2024-05-21-javaScript-module-singleton-pattern
description: "<b>Unleash the power of organized code!</b><br>
This article delves into two fundamental JavaScript design patterns: the Module Pattern and the Singleton Pattern.  While serving distinct purposes, they share a focus on clean and maintainable code."
coverImage: /images/posts/javaScript-module-singleton-pattern.jpg
prev: 2024-06-19-angular-signals-streamlining-change-detection
tags:
  - java-script
  - design-patterns
---

## TL;DR

JavaScript offers design patterns to organize code. The module pattern groups related functions and variables, hiding unnecessary details. The singleton pattern ensures only one instance of a class exists. Both patterns promote clean and maintainable code.

## Introduction

JavaScript offers a variety of design patterns that help developers create organized, modular, and maintainable code. Two common patterns are the module pattern and the singleton pattern. Although they serve different purposes, they share some similarities. In fact, the singleton pattern can be seen as a specialized version of the module pattern. Let's take a closer look at both patterns.

### Module Pattern

The module pattern is a design pattern that allows you to organize your code into modules. Modules help encapsulate code, manage dependencies, and keep the global namespace clean. This means you can hide private variables and functions, exposing only what is necessary.

```javascript
const myModule = (() => {
  // Private variables and functions
  const privateVariable = "Hello";
  const privateFunction = () => {
    console.log(privateVariable);
  };

  return {
    // Public methods and properties
    publicMethod: () => {
      privateFunction();
    },
    publicVariable: "World",
  };
})();

// Using the module
myModule.publicMethod(); // Logs "Hello"
console.log(myModule.publicVariable); // Logs "World"
```

_In the example above, privateVariable and privateFunction are not accessible outside the module. Only the publicMethod and publicVariable are exposed._

#### Module Pattern Nuances

The module pattern offers a powerful approach to code organization, but it's also worth considering some nuances:

Naming Conventions: Consistent naming conventions within modules can enhance readability and maintainability. Consider using prefixes or suffixes to identify functions and variables specific to the module.

Nested Modules: While modules promote organization, creating deeply nested modules can become cumbersome. Strive for a balance between code organization and accessibility. If necessary, consider breaking down complex modules into smaller, more manageable ones.

Module Revealing Pattern (MRP): The Module Revealing Pattern (MRP) is a variation of the module pattern that offers more control over what gets exposed publicly. With MRP, you can selectively return functions and variables from the inner module closure, providing finer-grained control over the module's public interface.

Module Loaders: For large-scale projects with numerous modules, consider using a module loader like CommonJS or AMD. These loaders handle dependency management and ensure modules are loaded in the correct order.

Here's an example of using a naming convention to differentiate between public and private members within a module:

```javascript
const myModule = (() => {
  // Private variables and functions (prefixed with underscore)
  const _privateVariable = "Hello";
  const _privateFunction = () => {
    console.log(_privateVariable);
  };

  // Public methods and properties (no prefix)
  function publicMethod() {
    _privateFunction();
  }
  const publicVariable = "World";

  return {
    publicMethod,
    publicVariable,
  };
})();
```

_By understanding these considerations, you can effectively leverage the module pattern to write clean, maintainable, and scalable JavaScript code._

While the basic concept of using closures to create private variables and functions remains consistent across module pattern implementations, the nuances we discussed (naming conventions, module revealing pattern, etc.) allow for customization based on your specific needs. Now, let's explore another design pattern that leverages the concept of modules in a unique way: the Singleton Pattern.

This transition acknowledges that the code structure might appear similar but emphasizes the importance of the nuances for tailoring the module pattern to your project. It then smoothly introduces the singleton pattern as a related concept that builds upon modules.

### Singleton Pattern

The singleton pattern is a design pattern that ensures a class has only one instance and provides a global point of access to it. This pattern is useful when you need to guarantee that only one object of a particular class exists throughout the application's lifecycle. You can implement the singleton pattern using the module pattern.

```javascript
class DatabaseConnection {
  // Private variable holding the single instance
  static instance;

  // Private constructor to prevent direct instantiation
  constructor() {
    if (DatabaseConnection.instance) {
      throw new Error("You can only create one instance!");
    }
    this.connection = this.connect();
    DatabaseConnection.instance = this;
  }

  // Method to simulate a database connection
  connect() {
    console.log("Connecting to the database...");
    return "Database connection established";
  }

  // Public method to access the instance
  static getInstance() {
    if (!DatabaseConnection.instance) {
      new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}

// Using the singleton
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 === db2); // Logs "true"
console.log(db1.connection); // Logs "Database connection established"
console.log(db2.connection); // Logs "Database connection established"
```

_In the example above, the singleton pattern ensures there is only one instance of DatabaseConnection. Trying to create a new instance with new DatabaseConnection() throws an error, while getInstance() always returns the same instance._

#### Singleton Drawbacks

While singletons offer a convenient way to ensure a single instance of a class, they also come with some drawbacks to consider:

Tight Coupling: Singletons can create tight coupling between different parts of your code. Since there's only one instance, any code that interacts with the singleton becomes dependent on its specific implementation. This can make it difficult to test and modify the code in isolation.

Difficulty in Testing: Testing code that relies on singletons can be challenging. Because the singleton instance holds global state, it can be difficult to mock or isolate its behavior during unit tests. This can lead to flaky tests and make it harder to refactor the code.

Limited Flexibility: Singletons can limit flexibility by forcing a global approach. In some cases, you might want to have multiple instances of a class depending on the context. Singletons make this difficult to achieve.

Dependency Injection Alternative: In many cases, dependency injection can be a better alternative to singletons. Dependency injection allows you to explicitly pass dependencies to your classes, making them more modular and easier to test.

Here's an example of how tight coupling can occur with singletons:

```javascript
class Logger {
  static instance;

  constructor() {
    if (Logger.instance) {
      throw new Error("You can only create one instance!");
    }
    Logger.instance = this;
  }

  logMessage(message) {
    console.log(message);
  }
}

// Usage (tight coupling)
function someFunction() {
  const logger = Logger.getInstance();
  logger.logMessage("This message is logged using the singleton");
}
```

_In this example, the someFunction function is tightly coupled to the Logger singleton. If we wanted to use a different logging mechanism in the future, we would need to modify someFunction to use the new approach.By considering these drawbacks, you can make informed decisions about when and how to use singletons in your JavaScript projects._

## Summary

As you can see, the singleton pattern can be viewed as a specific version of the module pattern. Both patterns aim to encapsulate and control access to certain resources. The module pattern groups related functions and variables, hiding implementation details, whereas the singleton pattern goes a step further by ensuring only one instance of an object exists.

Both the module pattern and the singleton pattern are powerful tools in a JavaScript developer's toolkit. Used appropriately, they help keep your code clean, modular, and manageable, which is crucial for success in larger projects.

| Feature     | Module Pattern                                     | Singleton Pattern                                             |
| ----------- | -------------------------------------------------- | ------------------------------------------------------------- |
| Purpose     | Encapsulate code & manage dependencies             | Ensure only one instance of a class exists                    |
| Key Idea    | Closure to create private variables & functions    | Private constructor & static method to access single instance |
| Benefits    | Clean, modular, organized code                     | Centralized access to a single object                         |
| Drawbacks   | Can become nested and cumbersome                   | Tight coupling, difficulty testing, limited flexibility       |
| When to Use | Organize related code, hide implementation details | Need a single global point of access (carefully!)             |
