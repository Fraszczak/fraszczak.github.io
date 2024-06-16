---
title: "Angular Signals: Streamlining Change Detection"
author: pf
publishDate: 2024-06-19
slug: 2024-06-19-angular-signals-streamlining-change-detection
description: "<b>Ever felt frustrated with complex change detection in your Angular applications?</b><br>
This article dives into Angular Signals, a new approach that simplifies how components react to data changes. Learn how Signals improve performance, streamline code, and offer a more granular way to manage updates in your Angular apps."
coverImage: /images/posts/angular-signals.png
tags:
  - angular
  - angular signals
---

## TL;DR

Angular Signals are a new way to manage change detection in Angular applications. They act like special observables that notify components when their data changes, leading to more efficient updates and cleaner code.

**Benefits:** Improved performance, simplified change management, enhanced code readability. <br>
**How it Works:** Signals hold values and trigger notifications when those values change. <br>
**Current Status:** Under development (introduced in Angular v16), but offers a glimpse into the future of Angular change detection. <br>

## Angular Signals: Streamlining Change Detection

Angular applications are known for their reactivity, but under the hood, change detection can become complex, especially when dealing with asynchronous data. Angular Signals offer a new approach to managing this complexity, improving performance and code maintainability.

## What are Angular Signals?

Signals encapsulate a value and provide a way to notify interested parts of your application when that value changes. This notification system allows Angular to pinpoint exactly which components need to be updated, leading to more efficient re-renders. <br>

Signals may be either **writable** or **read-only**.<br>
Explore how signals can be integrated into your components. Here's an example of using them:

```typescript
import { Component, signal } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div>
      <p>Writable signal value: {{ writableSignal() }}</p>
      <!-- Displaying the signal value in the template.  -->
      <button (click)="increseWritableSignal()">Increse</button>
      <button (click)="resetWritableSignal()">Reset</button>
    </div>
  `,
  standalone: true,
})
export class AppComponent {
  #initValue: number = 1;
  writableSignal = signal(this.#initValue); // Defining a writable signal with an initial value.
  //writableSignal: WritableSignal<number> = signal(this.#initValue);

  // Updating the signal to compute new value through a function.
  increseWritableSignal(): void {
    this.writableSignal.update((signalValue) => signalValue + 1);
  }

  // Resetting the signal value to its initial state.
  resetWritableSignal(): void {
    this.writableSignal.set(this.#initValue); // Set is a method to change signal directly
  }
}
```

> Note: Angular Signals were introduced in Angular v16 and may be still under development. They offer a glimpse into the future of Angular change detection, but their API and behavior might change in future releases.

## Computed Signals: Reacting to Changes without Modification

Imagine signals as boxes that hold data. These boxes can be opened to see what's inside (read), but not directly changed (write-only).

Computed signals are special boxes. They don't store their own data, but instead peek into other signals (their dependencies) and perform calculations based on those values. Like a mini-calculator, they use a formula (derivation function) to determine their own value.

The cool part is, computed signals are always up-to-date. If a signal they rely on changes, the computed signal automatically recalculates its value based on the new information. This ensures everything stays in sync without you needing to manually update anything.

In short, computed signals are derived from other signals, offering a way to create new data streams based on existing ones, all in a reactive and automatic fashion.

```typescript
import { Component, signal, computed } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div>
      <p>First signal value: {{ writableSignal() }}</p>
      <p>Second signal value: {{ writableSignal() }}</p>

      <p>Computed multiplication of first and second signal: {{ computedSignals() }}</p>
      <!-- Displaying the signal value in the template.  -->
      <button (click)="increseFirstSignal()">Increse</button>
      <button (click)="increseSecondSignal()">Reset</button>
    </div>
  `,
  standalone: true,
})
export class AppComponent {
  #initValue: number = 1;
  firstSignal = signal(this.#initValue);
  secondSignal = signal(this.#initValue);

  computedSignals = computed(() => this.firstSignal() * this.secondSignal());

  increseFirstSignal(): void {
    this.firstSignal.update((signalValue) => signalValue + 1);
  }

  increseSecondSignal(): void {
    this.firstSignal.update((signalValue) => signalValue + 1);
  }

  // That something what you cannot do
  // increseComputedSignals(): void {
  //   this.computedSignals.update((signalValue) => signalValue + 1);
  //   this.computedSignals.set((signalValue) => firstSignal * secondSignal);
  // }
}
```

_You cannot directly assign values to a computed signal. increseComputedSignals will produce compilation errors_

### Computed signals are both lazily evaluated and memoized

Imagine computed signals as efficient chefs. They only cook (evaluate) when there are hungry diners (your component needs the data). But they're also smart - they remember what they've cooked before (memoization).

**Lazy evaluation:** The chef only starts cooking when someone orders (requests the data). They don't waste effort pre-calculating things that might not be needed.<br>
**Memoization:** If someone orders the same dish again (the same dependencies haven't changed), the chef simply pulls it out from their memory (cached value) instead of starting all over again.
This way, computed signals ensure your components only get the freshest data (updated when needed) while avoiding unnecessary work (recalculating the same thing repeatedly).

### Computed signal dependencies are dynamic

Imagine computed signals as detectives piecing together a case. They don't rely on a fixed set of clues (dependencies).

**Dynamic:** The detective can follow new leads (dependencies) as they become available. This allows the computed signal to consider additional information that might influence its value. <br>
**Not pre-defined:** You don't have to specify all the dependencies upfront. The computed signal can adapt to what it "sees" within its code block.
This dynamic nature makes computed signals flexible and responsive. They can react to changes in the data landscape without needing constant reconfiguration.

```typescript

const isThereAnyNewLeads = signal(true)
const leads = signal('new leads');
const case = computed(() => {
  if(isThereAnyNewLeads()) {
    return `The new leads are:  {{ leads() }}`
  } else {
    return "There is no new leads, sorry...";
  }
})

```

## Reading signals in OnPush components

Imagine OnPush components as fuel-efficient cars. They only update their engines (re-render) when they absolutely need to conserve energy (performance).

**Fuel-efficient:** OnPush components avoid unnecessary re-renders, saving on processing power. <br>
**Reading signals:** To know when to refuel (update), the car listens closely to the gas gauge (signal). <br>
**Here's the connection:** When a signal you're "listening to" (reading from) within an OnPush component changes (gas gauge reading drops), Angular recognizes this as a need for more fuel (data).
The component then gets flagged for a refresh (engine starts) to display the updated information based on the new signal value (refueled with fresh data).<br>
**This analogy emphasizes the key points:** OnPush components are performance-focused, minimizing unnecessary updates.
Reading signals allows them to stay informed about data changes and trigger updates only when necessary.<br>

## Effects

Imagine you have a notice board where you post updates (signals). Anyone interested (consumers) can watch the board and get notified whenever something new goes up (signal changes). An effect is like an automated task that springs into action whenever there's a new update on the board (one or more signals change).
You can create an effect with the effect function:

```typescript
effect(() => {
  console.log(`Do we have any new leads? (true/false): ${isThereAnyNewLeads()}`);
});
```

Effects are like watchers that listen for updates on the notice board (signals). They spring into action at least once when first set up. Here's how they work:

- **Initial Run:** When an effect starts, it takes note of all the updates it checks on the board (reads signal values).
- **Triggered by Changes:** If anything on the board changes (any signal value it's tracking is updated), the effect jumps back into action.
- **Smart Tracking:** Just like reminders that update automatically, effects only keep track of the latest updates they've checked. They don't waste time watching things they already know about.
- **Behind the Scenes:** These updates happen smoothly in the background (asynchronously) while the system keeps track of changes.
  This ensures effects react efficiently to what matters and only re-run when necessary.

### Use cases for effects

While effects might seem like a niche tool, they actually shine in some key situations where you want more control over how your application reacts to changes. Here are some examples:

- **Data Fetching:** Imagine you have a product list that needs to update whenever new products are added. An effect can be triggered by a "new product added" signal, fetching the latest data and refreshing the list automatically.
- **Side Effects:** Effects are handy for handling actions that cause changes outside your program's main logic. This could be saving data to a database, sending notifications, or interacting with external APIs – all triggered by relevant signals.
- **User Interaction:** Effects can be used to respond to user actions. For example, clicking a "like" button could trigger an effect that updates the like count and sends a notification to the user being liked.
- **Long-Running Processes:** Effects are great for managing tasks that take time, like uploading a large file. The effect can handle the upload progress and update the UI accordingly, without blocking the main program.
  <br>

**In these scenarios, effects provide a clean way to separate the "what" (updating the list, saving data, etc.) from the "when" (triggered by a signal change), making your code more organized and easier to reason about.**

Here are some situations where you might not want to use effects:

- **Simple Data Transformations:** If you're just manipulating data within your program without any external interactions, effects might be overkill. Use simpler functions for these tasks as they can be easier to understand and test.
- **Frequent Updates with No Side Effects:** Effects re-run whenever their dependencies change. If you have a piece of code that updates frequently based on signals but doesn't actually cause any side effects (like saving data or user interactions), using a pure function that recalculates the value on each change might be more efficient.
- **Unnecessary Complexity:** Effects can add complexity to your code. If the logic you're trying to achieve can be implemented clearly without them, it's better to avoid the extra layer of abstraction.
  <br>

**Remember, effects are a powerful tool, but use them judiciously. When in doubt, a simpler approach might be better for readability and maintainability.**

## Injection context

**Effects need a helping hand to get started.** They can only be created within special zones in your code called "injection contexts". These zones provide the tools (like the inject function) that effects need to function properly.

The easiest way to give your effect this helping hand is to create it inside the constructor of a component, directive, or service. These are all common places where injection contexts exist.

```typescript
@Component({...})
export class Component {
  readonly isThereAnyNewLeads = signal(false);
  constructor() {
    effect(() => {
      console.log(`Do we have any new leads? (true/false): ${isThereAnyNewLeads()}`);
    });
  }
}
```

Alternatively, you can assign the effect to a field (which also gives it a descriptive name).

```typescript
@Component({...})
export class Component {
  readonly isThereAnyNewLeads = signal(false);
  constructor() {
    checkIsThereAnyNewLeads();
  }

  checkIsThereAnyNewLeads(): void {
    effect(() => {
      console.log(`Do we have any new leads? (true/false): ${isThereAnyNewLeads()}`);
    });
  }
}
```

To create an effect outside of the constructor, you can pass an Injector to effect via its options:

```typescript
@Component({...})
export class Component {
  readonly isThereAnyNewLeads = signal(false);
  constructor(private injector: Injector) {}

  checkIsThereAnyNewLeads(): void {
    effect(() => {
      console.log(`Do we have any new leads? (true/false): ${isThereAnyNewLeads()}`);
    }, {injector: this.injector});
  }
}
```

## Effects: Keeping Things Clean

- **Automatic Cleanup:** Effects are like rented apartments in your code. They get cleaned up (destroyed) automatically when their "landlord" (the component, directive, or service) is gone.
- **Manual Control (optional):** If you need an effect to stick around longer than its "landlord", you can give it a special instruction flag called manualCleanup. This lets you control its lifespan more precisely. But remember, with great power comes great responsibility! Make sure to manually clean up these effects using the .destroy() method when they're no longer needed. Leaving them hanging around can clutter your code.

## Smart Updates for Signals (optional)

Normally, signals update whenever they receive a new value. But you can set up a special check if you want. This check is like a gatekeeper, using a custom function (equality function) to decide if the new value is truly different from the old one. If it's not really different, the signal won't update, avoiding unnecessary work.

```typescript
import _ from "lodash";
const data = signal(["test"], { equal: _.isEqual });
// Even though this is a different array instance, the deep equality
// function will consider the values to be equal, and the signal won't
// trigger any updates.
data.set(["test"]);
```

> Equality functions can be provided to both writable and computed signals. <br>
> By default, signals use referential equality (=== comparison).

## Reading without tracking dependencies

Sometimes you might need to peek at signals within a reactive function (like computed or effect) without actually making your function track those signals as dependencies. This can be useful in specific situations.

For example, suppose that when detective changes, the value of a leadsCounter should be logged, you could create an effect which reads both signals:

```typescript
effect(() => {
  console.log(`${detective()} has ${leadsCounter()} new leads.`);
});
```

This example will log when either **detective** or **leadsCounter** changes. However, if the effect should only run when **detective** changes, then the read of **leadsCounter** is only incidental and channges to counter shouldn't log a new message.

You can prevent a signal read from being tracked by calling its getter with untracked:

```typescript
effect(() => {
  console.log(`${detective()} has ${untracked(leadsCounter)} new leads.`);
});
```

**untracked** is also useful when an effect needs to invoke some external code which shouldn't be treated as a dependency:

```typescript
effect(() => {
  const detective = detective();

  untracked(() => {
    // If the `loggingService` reads signals, they won't be counted as
    // dependencies of this effect.
    this.loggingService.log(`Good morning detective, set to ${detective}`);
  });
});
```

## Effect cleanup functions

Imagine you have a background task manager (effect) that can launch long-running jobs (like data fetching). It's important to clean up these jobs if the manager is shut down (effect is destroyed) or if a new job starts before the old one finishes.

To handle this, the manager can take a special "cleanup function" as an instruction. This function gets called whenever the manager needs to shut down a long-running job, either because it's no longer needed or because a new job has higher priority.

This way, you can ensure that your application avoids running unnecessary tasks in the background and keeps things running smoothly.

```typescript
effect((onCleanup) => {
  const user = currentUser();
  const timer = setTimeout(() => {
    console.log(`1 second ago, the user became ${user}`);
  }, 1000);
  onCleanup(() => {
    clearTimeout(timer);
  });
});
```

## Benefits and Drawbacks

#### Benefits of Angular Signals

- **Improved Performance** <br>
  Imagine a large dashboard with multiple sections. Traditionally, changes in one section might trigger re-renders of the entire dashboard. With signals, only the affected sections would update, leading to a smoother user experience.
- **Simplified Change Management** <br>
  Instead of manually tracking data dependencies in your components, you can rely on signals to automatically notify interested components when the data changes.
- **Enhanced Code Readability** <br>
  Signals promote a more declarative style of programming. Code using signals often involves clear functions for updating and reading signal values, making the data flow within your components more explicit.

#### Drawbacks of Angular Signals

- **Learning Curve**
- **Not a Replacement for Everything**

## Conclusion

Angular Signals represent a significant step forward in managing change detection within Angular applications. By providing a more granular approach to notifications, Signals can enhance performance and code maintainability. As this feature matures, it has the potential to become a cornerstone for building even more efficient and scalable Angular applications.
