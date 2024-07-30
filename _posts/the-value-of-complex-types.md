---
title: The Value of Complex Types
createdAt: "2024-07-12T17:58:03.284Z"
coverImage: /images/posts/the-value-of-complex-types.webp
excerpt:
  "Discover the value of complex types in programming, focusing on their role in
  ensuring code safety and reducing bugs. This post explores the benefits of
  strong type systems, particularly in TypeScript, and illustrates their
  practical application in web development."
---

I still remember the first time I learned about more advanced types. It was at
university, and the course used generic types in Java to teach us about the
complex parts of data structures. Back then, it was overwhelming, and it was
hard to see the value of it. Especially the notation using single letters like
`T` or `K` didn't make it easier to understand. This is, of course, typical for
academia, and in hindsight, I fully get that the abstract concepts need abstract
variables. But I could see this as a reason why many people are scared of
complex types.

Today, I see more and more generic types, especially in TypeScript, with
descriptive names, which makes it easier to understand. Even on the abstract
level, it's now more common to see `Type` instead of `T` and `Key` instead of
`K`. But still, the complexity of the type system is there, and even though the
barrier of entry got lower, the complexity can be seen as an overhead during
development. So why should we care?

## The Benefits of a Strong Type System

In my opinion, the benefits of a strong type system can be broken down to one
simple point: **Safety**.

A type system allows the compiler to check your code, and with the rule set
defined in the type system, your computer can point out many bugs while you are
still writing the code. This perfectly fits the "fail fast" principle, which is
a key concept in software development. You want to see errors as soon as
possible, so the immediate feedback loop in your IDE is as best as it can be.
This can also be seen as a form of unit testing, e.g., all function inputs are
tested if they are of the correct type, and you can be sure that no unexpected
`null` values are passed down.

For web development, this was not available for a long time. JavaScript started
as a very simple language, with the goal to be directly executable in the
browser. Coming from compiled languages like Java, C#, or even C can be quite
difficult. Suddenly the IDE feels more like a text editor, and you are on your
own to remember all the function signatures and the types of the variables.
Luckily, TypeScript is available, and with the current adoption rate, it is the
de facto industry standard.

## The Rise of TypeScript

The first public release of TypeScript was in 2012 (version 0.8), and for the
first few years, it was a niche project. Back then, it was also not foreseeable
that Microsoft would become so important for the web development community. My
first contact with the language was in 2015, with version 1.4. I was immediately
hooked because finally, my computer was able to help me again with my code. Even
though WebStorm was a great IDE for JavaScript, coding always felt dangerous,
especially when refactoring in larger codebases.

In 2015, Facebook released Flow, which tackled the same problem but with a
different approach. Flow didn't rely so much on annotations and tried to infer
the types automatically. However, from my perspective, TypeScript was still a
lot easier to use because of the tooling and the community.

I think the tooling was also the main reason why TypeScript became so popular
and is now the industry standard for web development. With the release of the
Language Server Protocol (LSP) in 2016, the integration of TypeScript in all
major IDEs was possible, paving the way for widespread adoption.

Over the years, it was interesting to see how the community adopted TypeScript.
In the beginning, there were many loud voices against the "boilerplate," but at
some point, the same people started to tweet about always using the "strict"
config. The last domain regularly complaining about TypeScript is the web
libraries. A common talking point is "use TypeScript for your app, but not for
library code." Perhaps it's still possible to improve the type system to make it
easier for dynamic use cases, but I think dynamic libraries are complex by
definition, so it won't ever be easy to type them.

## Example: Type Safe Navigation in React Native

Recently I had the problem that the navigation in a react native app was not as
stable as I wanted it to be. The navigation was done with the `react-navigation`
library, which is a great library, but not very opinionated about how to use it.
Each screen can define the parameters it expects, but it's up to the developer
to keep the types in sync with the actual implementation. My solution was to
create a function to generate a static navigation config with a `navigate`
function that takes a path and the necessary parameters. Another function
generated from the static config provides access to the screen parameters based
on the path. This creates a single source of truth for the navigation and
provides feedback about broken navigations at compile time.

The basis for this solution is a tree structure to define the screens and their
parameters:

```typescript
interface ParamsDefinition {
  [key: string]: {
    type: "string" | "number" | "boolean";
    optional: boolean;
  };
}

interface RouteConfig {
  children?: NavTree;
  params?: ParamsDefinition;
}

interface NavTree {
  [key: string]: RouteConfig;
}
```

This allows a URL structure with with screens on the same level and each screen
can have nested screens as children. Each screen can define the query parameters
it expects. Parameters can be optional or required and can be of type `string`,
`number`, or `boolean`. URL parameters are defined as key in the tree structure.
An example tree could look like this:

```typescript
const navTree = {
  home: {
    children: {
      profile: {
        params: {
          userId: { type: "string", optional: false },
        },
      },
    },
  },
  products: {
    children: {
      ":productId": {},
    },
  },
} satisfies NavTree;
```

These type definitions are pretty simple so far, but with the next helper type
the complexity increases. The goal is to extract the route configuration from
the tree and a URL path:

```typescript
type RouteConfigForUrl<
  Tree extends NavTree,
  Path extends string,
> = Path extends `/${infer Segment}/${infer Rest}`
  ? Segment extends keyof Tree
    ? Tree[Segment]["children"] extends NavTree
      ? RouteConfigForUrl<Tree[Segment]["children"], `/${Rest}`>
      : never
    : never
  : Path extends `/${infer Segment}`
    ? Segment extends keyof Tree
      ? Tree[Segment]
      : never
    : never;
```

This type is not used directly, but it enabled targeting every screen config in
the tree with a URL path. The following example shows how to get the config for
the profile screen:

```typescript
type ProfileConfig = RouteConfigForUrl<Tree, "/home/profile">;

// ProfileConfig = {
//   params: {
//     userId: { type: "string"; optional: false; };
//   };
// }
```

With the route config for a URL path, the next step is to extract the parameters
and their types:

```typescript
type OptionalKeys<Parameters extends ParamsDefinition> = {
  [Key in keyof Parameters]: Parameters[Key]["optional"] extends true
    ? Key
    : never;
}[keyof Parameters];

type ParamDefinitionType<
  Parameters extends ParamsDefinition,
  Key extends keyof Parameters,
> = Parameters[Key]["type"] extends "string"
  ? string
  : Parameters[Key]["type"] extends "number"
    ? number
    : Parameters[Key]["type"] extends "boolean"
      ? boolean
      : never;

type RouteConfigQueryParams<Parameters extends ParamsDefinition> = {
  [Key in OptionalKeys<Parameters>]?: ParamDefinitionType<Parameters, Key>;
} & {
  [Key in Exclude<
    keyof Parameters,
    OptionalKeys<Parameters>
  >]: ParamDefinitionType<Parameters, Key>;
};

type RouteConfigParamsForUrl<
  Tree extends NavTree,
  Path extends string,
> = RouteConfigForUrl<Tree, Path>["params"] extends ParamsDefinition
  ? RouteConfigQueryParams<RouteConfigForUrl<Tree, Path>["params"]>
  : never;
```

Similar to the `RouteConfigForUrl` type the new definitions allow to target the
parameters of a URL:

```typescript
type ProfileParams = RouteConfigParamsForUrl<Tree, "/home/profile">;
// ProfileParams = {
//   userId: string;
// }
type HomeParams = RouteConfigParamsForUrl<Tree, "/home">;
// HomeParams = never
```

Additionally to the query parameters the navigation tree can also define path
parameters:

```typescript
type ParamNameForPathSegment<T extends string> = T extends `:${infer ParamKey}`
  ? ParamKey
  : never;

type PathParamNames<Path extends string> =
  Path extends `/${infer Segment}/${infer Rest}`
    ? ParamNameForPathSegment<Segment> | PathParamNames<`/${Rest}`>
    : Path extends `/${infer Segment}`
      ? ParamNameForPathSegment<Segment>
      : never;

type RouteParamValue = string;
type RouteParams<ParamKeys extends string> = Record<ParamKeys, RouteParamValue>;
type PathParams<Path extends string> = RouteParams<PathParamNames<Path>>;
```

These helper types are independent from the navigation tree and just provide all
segments in a URL starting with `:`.

```typescript
type ProductPathParameters = PathParams<"/products/:productId">;
// ProductPathParameters = {
//   productId: string;
// }
```

The last part of the ground work is one helper type to extract all possible URL
paths from the navigation tree:

```typescript
type RouteConfigUrl<Tree extends NavTree> = {
  [Key in keyof Tree & (string | number)]: Tree[Key]["children"] extends NavTree
    ? `/${Key}` | `/${Key}${RouteConfigUrl<Tree[Key]["children"]>}`
    : `/${Key}`;
}[keyof Tree & (string | number)];
```

This generates a union type of all possible URL paths in the navigation tree:

```typescript
type Routes = RouteConfigUrl<Tree>;
// Routes = "/home" | "/home/profile" | "/products" | "/products/:productId"
```

The last step is now to generate the type definition for all possible app links,
so the combination of all possible URLs with their parameters:

```typescript
type RouteConfigLink<
  Path extends string,
  Tree extends NavTree,
> = Path extends `/${infer Url}`
  ?
      | PathParamNames<`/${Url}`>
      | RouteConfigParamsForUrl<Tree, `/${Url}`> extends never
    ? {
        path: `/${Url}`;
        params?: never;
      }
    : RouteConfigParamsForUrl<Tree, `/${Url}`> extends never
      ? {
          path: `/${Url}`;
          params: Prettify<PathParams<`/${Url}`>>;
        }
      : PathParamNames<`/${Url}`> extends never
        ? RequiredKeys<RouteConfigParamsForUrl<Tree, `/${Url}`>> extends never
          ? {
              path: `/${Url}`;
              params?: Prettify<RouteConfigParamsForUrl<Tree, `/${Url}`>>;
            }
          : {
              path: `/${Url}`;
              params: Prettify<RouteConfigParamsForUrl<Tree, `/${Url}`>>;
            }
        : {
            path: `/${Url}`;
            params: Prettify<
              PathParams<`/${Url}`> & RouteConfigParamsForUrl<Tree, `/${Url}`>
            >;
          }
  : never;
```

This allows the definition of the `AppLink` type, which can be used for type
save navigation:

```typescript
type AppLink = RouteConfigLink<Routes, Tree>;
// AppLink = {
//     path: "/home";
//     params?: never;
// } | {
//     path: "/home/profile";
//     params: {
//         userId: string;
//     };
// } | {
//     path: "/products";
//     params?: never;
// } | {
//     path: "/products/:productId";
//     params: {
//         productId: string;
//     };
// }
```

If you want to see the full example in action, you can use the
[TypeScript playground](https://www.typescriptlang.org/play/?#code/C4TwDgpgBACgThYwCWAzEAeAKuCA+KAXigG8BYAKCmqgG0BpCEKZAOygGsmB7VKHSAF0AXP1wMmggNyUAvlABkpWTIqU2wCHFQBDAMbQYOuDoC2AZwAiEVG2Qpu7clRq0uIUeeBw2AcxGklDTBUKCQogDkXj6svhFQAD5QEawArqYARlrxSREZ3NwANhA6rBGqITTcYA6sOoWi+UUlrBU0KnKU6qya2vrQAErcqZoAwo62voEu1HoAFsiFACYIrAD8ogByOgBuWAgQbdRgxmbmG7CnFta2rPbIjqqyXRQaWroGUNt7B9PBbkxPN4-AEhiMIONWJMni8woNhmMJshfAAxbhwACqcEKGCCNH2EGgEAAHppWEtzF9dgSIAAaPHUIzAOZQElkilQaJ+ekUAjEJkstkQcmUgAGAHoACQkNioLRQADKEF8pmFwFkUplUPlAwgXlkooZUDWiuVqp6rNJwo57l4-AORpNNNoSpVasEtAi80WK2FEUElvZlO+NMdUDBiKhyLRmOx2AOLrN7s93uWq39tKgEuluv1orwRtErAgOy0hagxdLcHLAsD1rFmtl8td5vVhpmxtNbotQpFnB4fFDHadCZb7vLlbLHaLJa0qkocKgAHkag86oVGCBzBgjCZVb1Kb2Obuzjc7LU+X9XJuWOxbXwT-utOYAo-EM+JCAPRFqrV6v66z7bxUmgE0bxnKsngBEA7TfA9pFhXBLj3M87lqAQIFxDs4OfQDjyuKwbHPNceWCG8j0pe9kLMd84HMHlLxwujP2-OEAIo5IuViCIwy43wayuWjzBYz02IDDiUnSLI4B44cKykqdglEJjhM3VjcHYq0+zyApilKWTghNJo9NYCdZzgecKEXCMISRXwAEUQLgEBH23FS8MpVzUPuRxL2cf4bzYZdV0cepNzcwSDzwQQLkfbz0NwHdIufTNNzwJ5FCvahP1vKAAFFiT0QpUiWTCqJUzMVz-DcmAivchLwaLlKueK1wwpL6oPVKmHSuRLOshFbKjXxXJjLEcSNGkPKpH5CVImhaw4viGKIcNBshSYxrjGlMwFPBPROPdzE0oNqOuIi0LXMMbI25FHK0FyCIwG67K2nEdsuZl9oiQ6zn9Atpwrcz+qQx9tlVGMBTHHpsGmvjLywabRWEaUmzgM7NwNMNH03MzIMQyBPrmMGaIi5k4eBWI+SNRatI5bMtTldHofVRttXR3M22xq5wYgSGdGZFmMBZggkgFEnVW3BnOYNAGlKJpG2aZrtWyxuSJb59EoaTGGRbxucCfhcFHwANXqEDVr41QBuNp6cdqimYl8S9dT0dElg6sxwszGzTfN-BrdBgXibt4PHb8F3BtcpLmQ1sm5kakHCZe4bxvjQlppDA4-KNHKgqoqaFCNAAKPjEnkzItAASgCZ01JTBY0z9cS6eDakHTkhnMdFcuu6YWQc3Wuy07ryQG59dNBDwNX5b7kADSggvfiUUvKamJI0kruAa6TwYIAAR1SZAECWcLsBzjsGFygvBAAWguEh5A4mBkD0DhsFSggTUndHRHoReBz8AQmoKySEU6TAADJsHfjTMOS017zWoFNDiWc5qUEYnA1uWYlbynGjPGgawjRi2DnHDADM8H5iIWtcEt0RoETeunOk2DpQUIIBxH+YZ-KVCgCcZkohyHYgXkaYIv0LAXB-kcKAzxAbgORKNdEI8DiZgEYUWW00OFyS4ZUXhcx+GagoZIkRBFlIICQGgTA4snoqNlr1Ds0j5aWL3LzKW+jBH5nUeZa6B8j4nzPrIuhR0GEfWsfmNhWCNGGSyiEHReiWFuMMTQUR5wTGIBQOgZ6Q9hryNjO9JRzCSCsNscEexNBRBaOicHWJBT4nCMScY2Api0mYH8dkxRc18mFMkSU6gZTanHEqR0mpHYjFHRSWY9JfSQiOLOGQ1xqj3FKBafQhR208khLltwop7R9YWReJQN2rAvAVnbhnYg5S5jcFVL04ZNBUy+lYNc7h0S4C8EWBAR5TzuFJI+Z8z5qRzBaAAJJLDKaEXAogABEfEIWZl-GueoohdCFABVIxBvz2hoqebITFGKjTYqNGAF5SxUh6GAOYH5IQ7mrApU8iFwhCXcGJaS4FdLlA4uoPiuxPJ5DmAFsgcwtg9QzRpJZBcSEprEDhHaOos0ICG2oZoSkxB-FtIDmKwmABBMAYAoGsA4Ktfxur342XovaQktiXilSKsYaAqBUisFJWuY5OxkQCwgMXHQ2qjWiC1Tq6BVdRA7G4MgJYLwZWus0MXEgPCBkQvFAyplZLxT0qJSS4ALLMzfNIDw1NzKQVQAhQARgAEwAGYIVSKkVXSg4bfBuqjTGvhBbxQXNVBW2Q1aKC1vrdGmJzbW0QHjS82wxQYUxtGdm-5QL81FvbVWoAA)

## Conclusion

The example above shows how complex it can get, but also how powerful the type
system in TypeScript is. Coming up with this solution took a lot of time, but as
the navigation is a core part for the app the gain in safety was worth it.

In general it is very important to find the right balance between premature
optimization and too much technical dept. In the concrete example I introduced
the type safe navigation after the app already had more than 70 screens.

For a project like this be sure of the behavior you want to describe, and don't
spend too much time to over-engineer the solution. But also take your time to
learn what TypeScript can do for you, learning the ins and outs of the advanced
types opens up a whole new solution space for your projects.
