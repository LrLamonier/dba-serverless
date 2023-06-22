# Dead by API - A Dead by Daylight data API (and database!)

This API features 30 survivors, 27 killers, 197 perks, 588 add-ons, 32 items, and 29 endpoints! Updated for patch 5.7.1 (May 3rd, 2022).

Built with Next.js, MongoDB, and friends!

All Dead by Daylight content belongs to [Behaviour Interactive Inc](https://deadbydaylight.com/).

This API uses data from both in-game and the [Dead by Daylight Wiki](https://deadbydaylight.fandom.com/wiki/Dead_by_Daylight_Wiki).

This repo contains the source code of the API, the database models and schema, a script to import the data into a Mongo database, and thorough (hopefully) instructions on how to get it going.

## Quick links

- [Overview](#overview)

## Overview

The data is divided into 8 collections: item, item-addon, killer, killer-addon, killer-perk, killer-power, survivor, and survivor-perk. All routes are GET routes.

### Name codes

This API features a code system to identify each survivor, killer, perk, add-on, or item. The code is the element's name in lowercase and without spaces or special characters.

#### Examples

| Name                         | Code                    |
| :--------------------------- | :---------------------- |
| Élodie Rakoto                | `elodierakoto`          |
| The Onryō                    | `theonryo`              |
| Coup de Grâce                | `coupdegrace`           |
| "Restraint" - Carter's Notes | `restraintcartersnotes` |

### Field selection query

On all routes, it is possible to choose which fields you want to get back on your response by adding a `?fields=` query string to the request followed by the field names separated by commas.

`?fields=<field names>`

Example:

```http
GET /api/survs/felixrichter?fields=name,role,perks_names
```

returns:

```json
{
  "status": "success",
  "data": [
    {
      "_id": "626fef241b005986989820f3",
      "name": "Felix Richter",
      "role": "Visionary Architect",
      "perks_names": ["Visionary", "Desperate Measures", "Built to Last"]
    }
  ]
}
```

Check out the [model of each collection]() to see which fields are available.

## Endpoints

This API is built on top of Next.js' dynamic routing. Essentially, the API has one single route with 3 dynamic segments: `<collection>`, `<code>`, and `<additional>`

### Get all documents

```http
GET /api/<collection>
```

The `/api/<collection>` returns all documents from the given collection. The options are: `item`, `item-addon`, `killer`, `killer-addon`, `killer-perk`, `killer-power`, `survivor`, and `survivor-perk`. An invalid parameter returns an error.

Example: `/api/killer?fields=overview,terrorRadius`

### Get random sample

```http
GET /api/<collection>/random
```

This endpoint returns a sample of N random documents, up to a maximum of 10. Use the `?amount=<number>` query. A request with an amount number outside the range of 1 to 10 (or even something that's not a number at all) will default to 1 document.

Example: `/api/killer-addon?amount=5&fields=code`

### Get specific document

### Survivors

#### Get all Survivors

```http
  GET /api/survs
```

#### Get one random Survivor

```http
  GET /api/survs/random
```

#### Get specific Survivor

```http
  GET /api/survs/<survivor code>
```

#### Get perks of a specific Survivor

```http
  GET /api/survs/<survivor code>/perks
```

### Killers

#### Get all Killers

```http
  GET /api/killers
```

#### Get one random Killer

```http
  GET /api/killers/random
```

#### Get specific Killer

```http
  GET /api/killers/<killer code>
```

#### Get the power of a specific Killer

```http
  GET /api/killers/<killer code>/power
```

#### Get the power Add-ons of a specific Killer

```http
  GET /api/killers/<killer code>/addons
```

#### Get the perks of a specific Killer

```http
  GET /api/killers/<killer code>/perks
```

#### Get all Killer powers

```http
  GET /api/killers/powers
```

#### Get one random Killer power

```http
  GET /api/killers/powers/random
```

#### Get all Killer power Add-ons

```http
  GET /api/killers/addons
```

#### Get one random Killer power Add-on

```http
  GET /api/killers/powers/random
```

#### Get specific Killer power Add-on

```http
  GET /api/killers/powers/<add-on code>
```

### Perks

#### Get all Survivor perks

```http
  GET /api/perks/surv
```

#### Get one random Survivor perk

```http
  GET /api/perks/surv/random
```

#### Get all Killer perks

```http
  GET /api/perks/killer
```

#### Get one random Killer perk

```http
  GET /api/perks/killer/random
```

### Items

#### Get all Items

```http
  GET /api/items
```

#### Get one random Item

```http
  GET /api/items/random
```

#### Get one specific Item

```http
  GET /api/items/<item code>
```

#### Get one specific Item's Add-ons

```http
  GET /api/items/<item code>/addons
```

#### Get all Item Add-ons

```http
  GET /api/items/addons
```

#### Get one random Item Add-on

```http
  GET /api/items/addons/random
```

#### Get specific Item Add-on

```http
  GET /api/items/addons/<Add-on code>
```

## Additional information

#### This API was built by [Lucas Lamonier](https://github.com/LrLamonier).

#### You can contact me via my [LinkedIn](https://www.linkedin.com/in/lamonier/) or at [lucasrlamonier@gmail.com](mailto:lucasrlamonier@gmail.com).

Special thanks to [Arthur](https://github.com/ArthR1beiro).