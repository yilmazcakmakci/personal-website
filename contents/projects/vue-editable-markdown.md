---
excerpt: 'Twifo, attığınız tweetleri sizin izniniz ile analiz eden bir web uygulamasıdır.'
title: 'Vue Editable Markdown'
coverImage: 'https://dl.airtable.com/.attachmentThumbnails/1f496377d47474279031b0e80a030a10/60c3d641'
date: '2020-02-07T21:00:00.000Z'
github_link: 'https://github.com/yilmazcakmakci/twifo-client'
---
# vue-editable-markdown

![npm](https://img.shields.io/npm/dw/vue-editable-markdown)
![npm](https://img.shields.io/npm/v/vue-editable-markdown)

> Click to edit textarea with markdown support.

![Example](https://raw.githubusercontent.com/yilmazcakmakci/vue-editable-markdown/master/example.gif)

### Install

```shell
npm i vue-editable-markdown
```

### Usage

```javascript
<template>
  <editable-markdown mode="dark" :source="source" v-model="source" @blur="someFunction" />
</template>

<script>
import EditableMarkdown from "vue-editable-markdown"
export default {
  components: {
    EditableMarkdown
  },
  data () {
    return {
      source: "### Example"
    }
  },
  methods: {
    someFunction () {
      console.log("It's worked.")
    }
  }
}
</script>
```

### Features
* Dark/Light mode
* Markdown Support(table,syntax highlighting...)
* GitHub Flavored Markdown Style

### Props

| Prop   	| Options         	| Required 	| Default 	|
|--------	|-----------------	|----------	|---------	|
| mode   	| dark \| light   	| false    	| light   	|
| source 	| markdown string 	| false    	| empty string  |

### Event

@blur : Called when textarea blurred.

### Customization

You can override following classnames for changing components background color and of course you can also use DevTools to find classnames and editing them.

```css
.light.md-text-container {
    background-color: transparent !important; /* your favourite color */
}

.dark.md-text-container {
    background-color: #000 !important;  /* your favourite color */
}
```