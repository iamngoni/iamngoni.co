# Your Code Is Forgetting What It Already Knows

It's been a while since I wrote something here — work has been really relentless (what else is new?) — but I've been thinking a lot about a concept that fundamentally changed how I approach writing Dart code. It's not a new framework, not a package, not some fancy architecture pattern. It's a mindset shift, and it fits into three words:

**Parse, don't validate.**

The idea originally comes from the Haskell world, but I mostly learned about it — and really internalized it — through my time entangling myself with Rust. Rust's type system forces you to think this way. You don't get a choice. And once that mindset clicks, you start seeing it everywhere — including in how we write Dart and Flutter applications every single day.

And honestly? This matters more now than ever. We're in an era where AI agents and the models powering them are writing a significant chunk of our code. Cursor, Copilot, Claude — these tools are incredible at generating code fast, but they don't inherently reason about the invariants your system needs to uphold. They'll happily generate a `validate` function that returns `void` and move on. If your codebase is structured around validation, the AI-generated code slots right in and the bugs slot right in with it. But if your codebase is structured around parsing — where the types themselves enforce correctness — then even AI-generated code has to pass through the compiler's gauntlet. The model can write whatever it wants; if it doesn't return the right type, it doesn't compile. That's a safety net you get for free, and in a world where we're reviewing AI output more than we're writing from scratch, having the compiler protect us from the onset isn't just nice to have — it's critical.

Let me break it down.

## The Problem With Validation

We've all written code like this. You get some data — from an API, from user input, from a platform channel — and you check it:

```dart
void validateUserProfile(Map<String, dynamic> json) {
  if (json['name'] == null || (json['name'] as String).isEmpty) {
    throw FormatException('Name is required');
  }
  if (json['age'] == null || json['age'] is! int) {
    throw FormatException('Age must be an integer');
  }
  if ((json['age'] as int) < 0) {
    throw FormatException('Age cannot be negative');
  }
}
```

Cool. You checked everything. Now what? The function returns `void`. All that knowledge you just gained — "name exists and isn't empty, age is a positive integer" — is gone. Evaporated. The next function that touches this `Map<String, dynamic>` has no idea any of that checking ever happened. It either trusts you blindly or does the checks all over again.

This is what validation does. It checks data and then hands you back the exact same unstructured mess you started with. The knowledge doesn't survive past the function boundary.

## What Parsing Looks Like

Now consider the alternative:

```dart
class UserProfile {
  final String name;
  final int age;

  const UserProfile._({required this.name, required this.age});

  static UserProfile? tryParse(Map<String, dynamic> json) {
    final name = json['name'];
    final age = json['age'];

    if (name is! String || name.isEmpty) return null;
    if (age is! int || age < 0) return null;

    return UserProfile._(name: name, age: age);
  }
}
```

Same checks. Same logic. But now the result is a `UserProfile` — a type that *structurally guarantees* the data is valid. Every function that accepts a `UserProfile` knows the name isn't empty and the age isn't negative. Not because someone remembered to validate upstream, but because **the type makes it impossible to represent invalid data**.

That's the difference. Validation checks and forgets. Parsing checks and *remembers* — by encoding what it learned into the type system.

## A Real-World Flutter Example

Let me give you something more practical. Say you're building a delivery app and you have this model for an order:

```dart
class DeliveryOrder {
  final String id;
  final String status; // "pending", "in_transit", "delivered", "cancelled"
  final String? trackingNumber;
  final String? driverName;
  final DateTime? deliveredAt;
  final String? cancellationReason;
}
```

This is a breeding ground for bugs. Nothing stops you from having a "delivered" order with no `deliveredAt` timestamp. Nothing prevents a "cancelled" order from having a `trackingNumber` but no `cancellationReason`. The type system has no idea what combinations are legal — it's all just nullable fields and a raw string for status.

I've seen this exact pattern in production Flutter codebases, and it always leads to the same thing: defensive `if` checks scattered across every widget and service that touches the order. Shotgun validation. A cloud of null checks thrown at the data, hoping one of them catches the bad state before it reaches the UI.

Now parse it instead:

```dart
sealed class DeliveryStatus {}

class Pending extends DeliveryStatus {}

class InTransit extends DeliveryStatus {
  final String trackingNumber;
  final String driverName;
  InTransit({required this.trackingNumber, required this.driverName});
}

class Delivered extends DeliveryStatus {
  final String trackingNumber;
  final String driverName;
  final DateTime deliveredAt;
  Delivered({
    required this.trackingNumber,
    required this.driverName,
    required this.deliveredAt,
  });
}

class Cancelled extends DeliveryStatus {
  final String reason;
  Cancelled({required this.reason});
}
```

Now a `Delivered` order *always* has a timestamp. An `InTransit` order *always* has a driver and tracking number. A `Cancelled` order *always* has a reason. You can't construct these objects without the required data — the compiler won't let you.

And when you use it:

```dart
Widget buildOrderCard(DeliveryStatus status) => switch (status) {
  Pending()   => const Text('Waiting for driver assignment'),
  InTransit(:final driverName, :final trackingNumber) =>
    Text('$driverName is on the way • $trackingNumber'),
  Delivered(:final deliveredAt) =>
    Text('Delivered on ${deliveredAt.toLocal()}'),
  Cancelled(:final reason) =>
    Text('Cancelled: $reason'),
};
```

No null checks. No `if (status == "delivered" && deliveredAt != null)`. No `default` branch hiding a bug. The pattern match is exhaustive — if you add a new status tomorrow, every `switch` in your codebase lights up red until you handle it.

## Where to Parse

The principle is simple: **parse at the boundary, act on the result.**

The boundary is wherever untrusted or unstructured data enters your application:
- API responses (`Map<String, dynamic>` from JSON)
- Form input (raw strings from `TextEditingController`)
- Platform channels (dynamic payloads from native code)
- Local storage (raw values from SharedPreferences or SQLite)
- Deep links and route parameters

You parse the data into precise types *once*, right at that boundary. Everything downstream works with the parsed types and never has to second-guess the data's validity.

For API responses, your `fromJson` factory is already a parser — just make sure it's producing types that actually encode the constraints you care about, not just mirroring the JSON structure with nullable fields everywhere.

For form input, instead of validating an email string in the widget and then passing the raw string around:

```dart
// ❌ Validation: knowledge lost
if (!isValidEmail(emailController.text)) {
  showError('Invalid email');
  return;
}
submitRegistration(emailController.text); // still just a String
```

Parse it:

```dart
extension type const Email(String value) {
  static Email? tryParse(String input) {
    if (!_emailRegex.hasMatch(input)) return null;
    return Email(input);
  }
}

// ✅ Parsing: knowledge preserved
final email = Email.tryParse(emailController.text);
if (email == null) {
  showError('Invalid email');
  return;
}
submitRegistration(email); // an Email, not a String
```

Now `submitRegistration` accepts an `Email`, not a `String`. You literally cannot call it with an unvalidated string — the type system blocks it.

## Some Rules of Thumb

**Be suspicious of functions that return `void` after checking something.** If a function's whole purpose is to verify data and it returns nothing, it's doing work and throwing away the result. Make it return a more precise type.

**Don't use `bool` flags where a type would be better.** A `bool isLoggedIn` field means you have to check it every time before accessing the user's token. A sealed `AuthState` with `Authenticated` and `Unauthenticated` variants makes the token structurally available only when you're logged in.

**Use extension types for lightweight wrappers.** Not everything needs a full class. Dart 3.3's `extension type` gives you compile-time type safety with zero runtime overhead. Perfect for things like `UserId`, `PhoneNumber`, `Currency` — simple values that have constraints.

```dart
extension type const PhoneNumber(String value) {
  static PhoneNumber? tryParse(String raw) {
    final cleaned = raw.replaceAll(RegExp(r'[\s\-\(\)]'), '');
    if (!RegExp(r'^\+?\d{10,15}$').hasMatch(cleaned)) return null;
    return PhoneNumber(cleaned);
  }
}
```

**Avoid denormalized state.** If the same piece of information lives in two places (a list and a map, a flag and a field), they will get out of sync. That's an illegal state you've made trivially representable. Parse into a single source of truth.

**Don't be afraid of small types.** I know it feels like creating `Email`, `PhoneNumber`, `UserId`, `Percentage` etc. is over-engineering. It's not. Each one is a checkpoint where the compiler verifies an assumption. They're cheap to write, free at runtime (with extension types), and they catch bugs at compile time instead of at 2am in production.

## Final Thoughts

Dart 3 gave us sealed classes, pattern matching, and extension types. These aren't just nice syntax — they're the tools that make "parse, don't validate" practical and idiomatic in Dart. We have everything we need to write code where invalid states are structurally impossible, not just checked-for.

The habit is simple: every time you write a check, ask yourself — *where does this knowledge go?* If the answer is "nowhere," you're validating. Refactor until the answer is "into a type that the rest of my code can rely on." That's parsing.

It's a small shift, but it compounds. Fewer runtime errors. Fewer null checks. Fewer "impossible" `default` branches that turn out to be very possible. More confidence that when something compiles, it actually works.

Parse, don't validate.

And I'll try not to wait another two months before writing the next one. 🚀
