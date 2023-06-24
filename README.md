# Dead by API - A Dead by Daylight data API (and database!)

## Hey!

> I'm [Lucas](https://www.lucaslamonier.com/) and I built this API for you! Download it, use for your projects, create new features, ~~fix it~~ and have fun!
If you use this code and feel like it, show me what you made. It'll make my day to see someone putting this thing to good use! 😉

<br/>

This API features 30 survivors, 27 killers, 197 perks, 588 add-ons, 32 items, and 29 endpoints! Updated for patch 5.7.1 (May 3rd, 2022).

Built with Next.js, MongoDB, and friends!

All Dead by Daylight content belongs to [Behaviour Interactive Inc](https://deadbydaylight.com/).

This API uses data from both in-game and the [Dead by Daylight Wiki](https://deadbydaylight.fandom.com/wiki/Dead_by_Daylight_Wiki).

This repo contains the source code of the API, the database models and schema, a script to import the data into a Mongo database, and thorough (hopefully) instructions on how to get it going.

## Summary

- [Overview](#overview)
  - [Data structure](#data-structure)
  - [Name codes](#name-codes)
    - [Code examples](#code-examples)
  - [Field selection query](#field-selection-query)
    - [Field selection example](#example)
- [Endpoints](#endpoints)
  - [API route structure](#api-route-structure)
  - [Collection](#collection)
  - [Code | Random](#code--random)
    - [Code](#code)
    - [Random](#random)
  - [Additional](#additional)


## Overview

### Data structure

The data is divided into 8 collections:

- [item](#item)
- [item-addon](#item-addon)
- [killer](#killer)
- [killer-addon](#killer-addon)
- [killer-perk](#killer-perk)
- [survivor](#survivor)
- [survivor-perk](#survivor-perk)

Click on the name of the collection to see its model or [here](#models) to go to the model section.

### Name codes

This API features a code system to identify each survivor, killer, perk, add-on, or item. The code is the element's name in lowercase and without spaces or special characters. Every document in every collection has its own unique code.

This API features a code system that helps you quickly find a specific resource. A document's code is its name in lowercase, without spaces, and special characters. Accented letters are replaced. For example: `Onryō` becomes `onryo`. See more examples below.

##### Code examples

| Name                         | Code                    |
| :--------------------------- | :---------------------- |
| Élodie Rakoto                | `elodierakoto`          |
| The Onryō                    | `theonryo`              |
| Coup de Grâce                | `coupdegrace`           |
| "Restraint" - Carter's Notes | `restraintcartersnotes` |

### Field selection query

It is possible to filter which fields will be returned in your request. To do so, add a `fields` query string with the name(s) of the field(s) you want. When selecting multiple fields, separate them with commas.

Field selection is available on all routes.

`?fields=<field>`

##### Example

```http
GET /api/survivor/felixrichter?fields=name,role,perks_names
```

Returns:

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "name": "Felix Richter",
    "role": "Visionary Architect",
    "perks_names": [
      "Visionary",
      "Desperate Measures",
      "Built to Last"
    ]
  }
}
```

For more details on available fields, refer to the [models](#models) section.

## Endpoints

### API route structure

Dead by API routes are divided into 3 segments: the collection name, specific or random document, and an additional parameter to retrieve documents related to the first one.

### Collection

```http
GET /api/<collection>
```

Providing only the collection name will return all of its documents. For example, `GET /api/killer` will return every single killer in the game. Note that the collection parameter is singular, passing `killers` will return an error.
[Fields](#field-selection-query) available.

### Code | Random

There are two options for the second parameter: the [code](#name-codes) or the word random.

#### Code

```http
GET /api/<collection>/<code>
```

Retrieves one single document based on the code supplied. `GET /api/survivor/felixrichter` will return Felix's document.
[Fields](#field-selection-query) available.

#### Random

```http
GET /api/item/random
```

Fetches a random sample from the given collection. The default amount is 1, but it is possible to get up to 10. In order to do that, use the amount query:

`?amount=<number>`

Passing a number below 1, higher than 10, or not a number at all, defaults to 1.

You can combo amount with [fields](#field-selection-query): `?amount=1&fields=name,description`

### Additional

Finally, the last segment retrieves data related to the collection:

- Killer: `power`, `perk`, and `addon`
- Survivor: `perk`
- Item: `addon`

⚠ Additional queries can only be used in routes that received a `<code>` parameter. It won't work for `<random>` requests.

```http
GET /api/<collection>/<code>/<additional>
```

Examples:

```http
GET /api/killer/trapper/addon
GET /api/killer/trapper/perk
GET /api/killer/trapper/power

GET /api/survivor/felixrichter/perk

GET /api/item/flashlight/addon
```

The additional queries are meant to retrieve addons, perks, and powers from specific killers/survivors/items. You can access the collections `item-addon`, `killer-addon`, `killer-perk` and `survivor-perk` to get [all documents](#collection) or [random samples](#random).
[Fields](#field-selection-query) available.

## Running the code

In order to run this API, you need:

- Git (optional) to clone the repository
  - Alternatively, you can download the code directly from the green "code" button on the top of the page
  - Read the docs on [how to get started with Git](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

- Node (to run the thing, version 18.16.1 or higher)
  - [Download and install](https://nodejs.org/en/download)

- MongoDB (the actual database)
  - This one is a little tricky and requires a considerable amount of work
  - There are two possibilites:
      1) Run locally, [some tips here](https://zellwk.com/blog/local-mongodb/), or
      2) Run it in the magical place called [_the cloud_](https://www.mongodb.com/)

## Quickstart

#### 1. Get the code

`git clone` or download the code.

#### 2. Installing dependencies

- Open your favorite CLI in the root folder of the project.
- Run `npm install`
- Wait for the dependencies to install

#### 3. Run it!

- Run `npm run dev`
- The API should be running on `http://localhost:3000/api/`
- You can build scripts to fetch data or use API testing tools such as [Postman](https://www.postman.com/) and [Insomnia](https://insomnia.rest/).


## Populating the database

The folder `data` contains










## Additional information

#### This API was built by [Lucas Lamonier](https://github.com/LrLamonier).

#### You can contact me via my [LinkedIn](https://www.linkedin.com/in/lamonier/) or at [lucasrlamonier@gmail.com](mailto:lucasrlamonier@gmail.com).

Special thanks to [Arthur](https://github.com/ArthR1beiro).