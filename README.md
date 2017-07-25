Mesca
===
A Meteor scaffold CLI.

![mesca](https://user-images.githubusercontent.com/29805089/28504837-9a7d38fe-6ff3-11e7-92ff-f1107938008e.png)

## How to use:

### Create project:

You can create meteor projects (with React) by using **mesca create [projectName]**, which downloads the [Meteor Boilerplate](https://github.com/brenopanzolini/meteor-boilerplate).

```sh
$ mesca create [projectName]
```

### Init project:

Initialize the recommended folder structure for your projects.

```sh
$ mesca init
```

The structure below is initialized:

```sh
imports/
  startup/
    client/
    server/
      api.js                     # defines all the collections, publications and methods
      index.js

  api/
    contacts/                  # contacts domain logic
      server/
        publications.js        # contacts-related publications
      model.js                 # definition of the collection
      methods.js               # methods related to contacts

  modules/

  ui/
    components/
    layouts/
    pages/
    stylesheets/

client/
  main.html                    # render-target for React components
  main.js                      # client entry point, imports all client code

server/
  main.js                      # server entry point, imports all server code

public/                        # for static files

private/
```

### Generate templates:

Generate templates for your project.

```sh
$ mesca generate [what] [name]
```

You can generate the following templates:

#### 1. api

```sh
$ mesca generate api [name]
```

This creates all the boilerplate for your domain logic inside *imports/api* folder structure.
