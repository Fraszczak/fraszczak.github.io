---
title: JavaScript design patterns - observer pattern
author: pf
publishDate: 2024-06-13
slug: 2024-06-13-javaScript-observer-pattern
description: "<b>Stay in Sync: The Observer Pattern in JavaScript</b><br>Ever struggled to keep different parts of your web app updated? The Observer Pattern is here to help! It lets one object notify others when it changes, keeping everything in sync. Learn how it works and leverage it to build more efficient and scalable JavaScript applications."
coverImage: /images/posts/observer-pattern.png
tags:
  - java-script
  - design-patterns
---

## The Observer Pattern in JavaScript keeping objects in sync

Imagine you're building a complex web application. You have different parts of your application that need to stay in sync with each other. For example, a shopping cart might need to update whenever a product is added or removed from the product list. **This is where Observer Pattern comes in.**

## Understanding the Observere Pattern

The Observer Pattern is a software design pattern that establishes a one-to-many relationship between objects. In simpler terms, it allows one object (the Subject) to notify multiple other objects (Observers) when its state changes. This notification lets the Observers update themselves accordingly, keeping everything in sync.

### The Player involved:

- **Subject (Observable):** This is the object that holds the data and is responsible for notifying Observers when the data changes. It maintains a list of subscribed Observers.
- **Observer:** These are object that are interested in changes to the Subject's data. They subscribe to the Subject and get notified whenever the data changes.

### Benefits of using the Observer Pattern:

- **Loose Coupling:** The Observer and Subject are loosely coupled. This means they don't need to know about each other's internal implementation details. This improves code maintainability and reusability.
- **Flexibility** You can easly add or remove Observers without affecting the Subject or other Observers.
- **Scalability:** The Observer Pattern can handle a large number of Observers efficiently.

## Implementing the Observer Pattern in JavaScript

Here's a basic example of how to implement the Observer Pattern in JavaScrip:

```javascript
// Subject (Observable)
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// Observer
class Observer {
  update(data) {
    console.log("Observer received data:", data);
  }
}

// Usage
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify("1, 2, 3... Data has changed!");
```

_In this example, the **Subject** class manages a list of subscribed **Observer** objects When the Subject's data changes, it calls the **notify** method, which iterates through the list and calls the **update** method on each Observer, passing the new data_

### Beyond the Basics:

This is a basic implementation. In real-world applications, you might want to consider:

- **Event Names:** Instead of a generic **notify** method, you could have specific methods for different events (e.g. **dataChanged**, **itemAdded**).
- **Error Handling:** Implement error handling in the notification process.

## Conclusion:

The Observer Pattern is a powerful tool for building applications with loosely coupled components the need to stay in sync. It promotes code reusability, maintainability and scalability. By understanding and implementing this pattern, you can create more efficient and well-structured JavaScript applications.
