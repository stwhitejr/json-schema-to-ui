# Json (Schema) To Ui

## Use Case

As Frontend engineers we often develop applications that are driven by some kind of backend library of entities and entity types. When a new entity type is introduced we may need to develop new Frontend components to support this.

An example of this would be a campaign management tool that relies on a library of services that are represented in the UI as nodes. They all have the same UX but each node has its own settings. We don't want to create explicit components for each one of these nodes types. We want to standardize the UI/UX through a generic Node component and then use a schema associated with this entity type to automatically generate the settings/form. These schemas would be associated with the node's metadata and surfaced via an API.

## Goal

The goal is to streamline entity creation and management through a self service workflow and frontend implementation without ever needing to change a piece of code other than the entities schema. The management of these schemas are the self service portion of the workflow. As you adjust these the UI will respond accordingly.

## Architecture

<img width="1032" alt="Screenshot 2025-03-16 at 12 14 23 PM" src="https://github.com/user-attachments/assets/5e5532c6-09fe-4662-aee2-d50d41aa5396" />

## Demo

[Go To Stories](https://github.com/stwhitejr/json-schema-to-ui/tree/main/src/stories)
